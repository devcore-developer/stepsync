"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { curriculumBlocks, validateCurriculum } from "@/lib/curriculum-data";

async function getAuthUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");
  return user.id;
}

// --- PROFILE ---
export async function getUserProfile() {
  const userId = await getAuthUserId();
  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: { userId }
  });
  return profile;
}

export async function updateUserProfile(data: any) {
  const userId = await getAuthUserId();
  await prisma.userProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data }
  });
  revalidatePath("/profile");
  revalidatePath("/dashboard");
}

// --- STUDY PLANS ---
export async function getStudyPlans() {
  const userId = await getAuthUserId();
  return prisma.studyPlan.findMany({
    where: { userId },
    include: { tasks: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function createStudyPlan(data: { name: string, startDate: string, examDate: string }) {
  const userId = await getAuthUserId();
  
  // Validate curriculum before generating
  const totals = validateCurriculum();

  const plan = await prisma.studyPlan.create({
    data: {
      userId,
      name: data.name || "USMLE Step 1 Study Plan",
      examDate: data.examDate,
      startDate: data.startDate,
    }
  });

  const start = new Date(data.startDate);
  let currentDate = new Date(start);

  // Generate tasks for all 18 blocks (198 Study Days + 32 Review Days = 230 Days)
  for (const block of curriculumBlocks) {
    // Generate Study Days
    for (let i = 0; i < block.studyDays; i++) {
      await prisma.studyTask.create({
        data: {
          planId: plan.id,
          title: `${block.name} - Study Day ${i + 1}`,
          system: block.name,
          date: currentDate.toISOString().split('T')[0],
          type: "Study"
        }
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }

    // Generate Review/Rest Days
    for (let i = 0; i < block.reviewDays; i++) {
      await prisma.studyTask.create({
        data: {
          planId: plan.id,
          title: `${block.name} - Review & Checkpoint ${i + 1}`,
          system: block.name,
          date: currentDate.toISOString().split('T')[0],
          type: "Review"
        }
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }
  }

  // إضافة إشعار تلقائي عند إنشاء خطة جديدة
  await prisma.notification.create({
    data: {
      userId,
      title: "Study Plan Created",
      message: `Your ${data.name || "USMLE Step 1 Study Plan"} has been successfully generated. Start studying today!`
    }
  });

  revalidatePath("/study-plans");
  revalidatePath("/notifications");
  return plan;
}

export async function toggleStudyTask(taskId: string, completed: boolean) {
  await prisma.studyTask.update({
    where: { id: taskId },
    data: { completed }
  });
  revalidatePath("/study-plans");
}

// --- FLASHCARDS ---
export async function getDecks() {
  const userId = await getAuthUserId();
  return prisma.flashcardDeck.findMany({
    where: { userId },
    include: { cards: true }
  });
}

export async function createDeck(name: string) {
  const userId = await getAuthUserId();
  const deck = await prisma.flashcardDeck.create({
    data: { userId, name }
  });
  revalidatePath("/review");
  return deck;
}

// --- RESOURCES ---
export async function getResources() {
  const userId = await getAuthUserId();
  return prisma.resource.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

export async function createResource(data: { name: string, type: string }) {
  const userId = await getAuthUserId();
  const resource = await prisma.resource.create({
    data: { userId, name: data.name, type: data.type }
  });
  revalidatePath("/resources");
  return resource;
}

export async function deleteResource(id: string) {
  await prisma.resource.delete({ where: { id } });
  revalidatePath("/resources");
}

// --- NOTIFICATIONS ---
export async function getNotifications() {
  const userId = await getAuthUserId();
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

export async function markNotificationRead(id: string) {
  await prisma.notification.update({
    where: { id },
    data: { read: true }
  });
  revalidatePath("/notifications");
}