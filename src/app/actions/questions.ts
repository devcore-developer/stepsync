"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getAuthUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");
  return user.id;
}

// داخل src/app/actions/questions.ts

export async function saveQuestionSession(data: any) {
  const userId = await getAuthUserId();
  
  const session = await prisma.questionSession.create({
    data: {
      userId,
      mode: data.mode,
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
      accuracy: data.accuracy,
      answers: {
        create: data.answers.map((a: any) => ({
          questionId: a.questionId,
          system: a.system,
          isCorrect: a.isCorrect,
          timeSpent: a.timeSpent || 0
        }))
      }
    }
  });

  // إضافة إشعار تلقائي عند إكمال الاختبار
  await prisma.notification.create({
    data: {
      userId,
      title: "Question Block Completed",
      message: `You completed a block with ${data.accuracy}% accuracy. Keep it up!`
    }
  });
  
  revalidatePath("/performance");
  revalidatePath("/questions");
  revalidatePath("/notifications");
  return session;
}

export async function getPerformanceData() {
  const userId = await getAuthUserId();
  
  const sessions = await prisma.questionSession.findMany({
    where: { userId },
    include: { answers: true },
    orderBy: { createdAt: "desc" }
  });

  if (sessions.length === 0) {
    return { totalQuestions: 0, accuracy: 0, systems: [], recentSessions: [] };
  }

  const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
  const correctAnswers = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Calculate system performance
  const systemMap = new Map<string, { correct: number; total: number }>();
  
  sessions.forEach(s => {
    s.answers.forEach(a => {
      if (!systemMap.has(a.system)) {
        systemMap.set(a.system, { correct: 0, total: 0 });
      }
      const sys = systemMap.get(a.system)!;
      sys.total++;
      if (a.isCorrect) sys.correct++;
    });
  });

  const systems = Array.from(systemMap.entries()).map(([name, data]) => ({
    name,
    accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    total: data.total
  })).sort((a, b) => a.accuracy - b.accuracy); // Sort by weakest first

  return { 
    totalQuestions, 
    accuracy, 
    systems,
    recentSessions: sessions.slice(0, 5).map(s => ({
      id: s.id,
      date: s.createdAt,
      total: s.totalQuestions,
      correct: s.correctAnswers,
      accuracy: s.accuracy
    }))
  };
}