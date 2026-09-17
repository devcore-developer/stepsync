"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function getUserStudyPlans() {
  const session = await getSession();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { studyPlans: { include: { tasks: true } } }
  });

  return user?.studyPlans || [];
}

export async function createStudyPlanInDb(data: any) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");

  const newPlan = await prisma.studyPlan.create({
    data: {
      userId: user.id,
      name: data.name,
      examDate: data.examDate,
      startDate: data.startDate,
      status: "Active",
      progress: 0,
    }
  });

  revalidatePath("/study-plans");
  return newPlan;
}

export async function toggleTaskInDb(taskId: string, completed: boolean) {
  await prisma.studyTask.update({
    where: { id: taskId },
    data: { completed }
  });
  revalidatePath("/study-plans");
}