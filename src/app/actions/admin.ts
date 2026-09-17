"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session.user;
}

export async function getAdminMetrics() {
  await requireAdmin();
  
  const [users, studyPlans, questions, flashcards] = await Promise.all([
    prisma.user.count(),
    prisma.studyPlan.count(),
    prisma.questionSession.count(),
    prisma.flashcard.count()
  ]);

  return { users, studyPlans, questions, flashcards };
}

export async function getUsers() {
  await requireAdmin();
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function changeUserRole(userId: string, role: "USER" | "ADMIN") {
  const admin = await requireAdmin();
  if (admin.id === userId) throw new Error("Cannot change your own role.");

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  // Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "ROLE_CHANGE",
      targetType: "USER",
      targetId: userId,
      metadata: `Set role to ${role}`
    }
  });

  revalidatePath("/admin/users");
  return updated;
}

export async function getAuditLogs() {
  await requireAdmin();
  return prisma.auditLog.findMany({
    include: { actor: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });
}