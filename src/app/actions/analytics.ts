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

// 1. حفظ وقت الدراسة الحقيقي (Timer)
export async function saveStudySession(durationSeconds: number) {
  const userId = await getAuthUserId();
  await prisma.studySession.create({
    data: { userId, duration: durationSeconds }
  });
  revalidatePath("/dashboard");
  revalidatePath("/accountability");
}

// 2. حفظ تقييم البطاقات التعليمية (Spaced Repetition)
export async function rateFlashcard(cardId: string, rating: 'Again' | 'Hard' | 'Good' | 'Easy') {
  const userId = await getAuthUserId();
  const card = await prisma.flashcard.findUnique({ where: { id: cardId } });
  if (!card) throw new Error("Card not found");

  let { interval, ease, repetitions, status, dueDate } = card;

  if (rating === 'Again') {
    repetitions = 0; interval = 0; status = 'LEARNING'; ease = Math.max(1.3, ease - 0.2);
  } else {
    if (rating === 'Hard') { interval = Math.max(1, Math.round(interval * 1.2)); ease = Math.max(1.3, ease - 0.15); }
    else if (rating === 'Good') { interval = repetitions === 0 ? 1 : Math.round(interval * ease); }
    else if (rating === 'Easy') { interval = repetitions === 0 ? 2 : Math.round(interval * ease * 1.3); ease += 0.15; }
    repetitions++;
    status = repetitions >= 3 ? 'MASTERED' : 'REVIEW';
  }

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + interval);
  if (interval === 0) nextDue.setMinutes(nextDue.getMinutes() + 10);

  await prisma.flashcard.update({
    where: { id: cardId },
    data: { interval, ease, repetitions, status, dueDate: nextDue }
  });

  await prisma.flashcardReview.create({
    data: { userId, cardId, rating }
  });

  revalidatePath("/review");
  revalidatePath("/dashboard");
}

// 3. التخطيط التكيفي (Adaptive Planning)
export async function getAdaptiveState() {
  const userId = await getAuthUserId();
  const today = new Date().toISOString().split('T')[0];
  
  const missedTasks = await prisma.studyTask.count({
    where: { plan: { userId }, date: { lt: today }, completed: false }
  });

  if (missedTasks === 0) {
    return { status: 'On Track', daysBehind: 0, reason: "You are on schedule. No missed tasks." };
  }

  return {
    status: 'Behind Schedule',
    daysBehind: missedTasks,
    reason: `You have ${missedTasks} incomplete tasks from previous days.`
  };
}

// 4. المساءلة (Accountability)
export async function getAccountabilityData() {
  const userId = await getAuthUserId();
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const sessions = await prisma.studySession.findMany({
    where: { userId, date: { gte: startOfWeek } }
  });
  const weeklySeconds = sessions.reduce((sum, s) => sum + s.duration, 0);
  const weeklyHours = Math.round((weeklySeconds / 3600) * 10) / 10;

  const tasks = await prisma.studyTask.findMany({
    where: { plan: { userId }, completed: true },
    orderBy: { date: 'desc' }
  });

  let streak = 0;
  let currentDate = new Date();
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const studiedToday = tasks.some(t => t.date === dateStr);
    if (studiedToday) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      if (currentDate.toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
        currentDate.setDate(currentDate.getDate() - 1);
        continue;
      }
      break;
    }
  }

  return { streak, weeklyHours };
}

// 5. المساعد الذكي (Assistant)
export async function getAssistantInsights() {
  const userId = await getAuthUserId();
  const today = new Date().toISOString().split('T')[0];

  const dueCards = await prisma.flashcard.count({
    where: { deck: { userId }, dueDate: { lte: new Date() } }
  });

  const missedTasks = await prisma.studyTask.count({
    where: { plan: { userId }, date: { lt: today }, completed: false }
  });

  const totalQuestions = await prisma.questionSession.aggregate({
    where: { userId },
    _sum: { totalQuestions: true }
  });

  let message = "Based on your real data:\n";
  if (missedTasks > 0) message += `- You have ${missedTasks} missed tasks. Consider using Adaptive Planning.\n`;
  if (dueCards > 0) message += `- You have ${dueCards} flashcards due for review.\n`;
  if (totalQuestions._sum.totalQuestions && totalQuestions._sum.totalQuestions < 100) {
    message += `- You've completed ${totalQuestions._sum.totalQuestions} questions. Keep practicing!\n`;
  }
  if (missedTasks === 0 && dueCards === 0) message = "You're all caught up! Great job.";

  return { message };
}

// 6. الجاهزية (Readiness) - الدالة المفقودة
export async function getReadinessData() {
  const userId = await getAuthUserId();
  
  const studyPlans = await prisma.studyPlan.findMany({
    where: { userId },
    include: { tasks: true }
  });

  const questionSessions = await prisma.questionSession.findMany({
    where: { userId },
    include: { answers: true }
  });

  const dueCards = await prisma.flashcard.count({
    where: { deck: { userId }, dueDate: { lte: new Date() } }
  });

  const totalTasks = studyPlans.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = studyPlans.reduce((sum, p) => sum + p.tasks.filter(t => t.completed).length, 0);
  const planCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalQuestions = questionSessions.reduce((sum, s) => sum + s.totalQuestions, 0);
  const correctQuestions = questionSessions.reduce((sum, s) => sum + s.correctAnswers, 0);
  const questionAccuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  const totalCards = await prisma.flashcard.count({ where: { deck: { userId } } });
  const reviewRetention = totalCards > 0 ? Math.round(((totalCards - dueCards) / totalCards) * 100) : 0;

  const studyConsistency = Math.min(100, planCompletion + 10);

  const readinessScore = Math.round(
    (questionAccuracy * 0.4) + 
    (planCompletion * 0.3) + 
    (reviewRetention * 0.15) + 
    (studyConsistency * 0.15)
  );

  return {
    readinessScore,
    planCompletion,
    questionAccuracy,
    reviewRetention,
    studyConsistency,
    dueCards,
    totalQuestions,
    totalTasks,
    completedTasks
  };
}
// في نهاية ملف src/app/actions/analytics.ts

// جلب وقت الدراسة الحقيقي للأسبوع (لرسم البيان في لوحة التحكم)
export async function getWeeklyStudyTime() {
  const userId = await getAuthUserId();
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // بداية الأسبوع (الأحد)
  startOfWeek.setHours(0, 0, 0, 0);

  const sessions = await prisma.studySession.findMany({
    where: { userId, date: { gte: startOfWeek } }
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = days.map(day => ({ day, minutes: 0, isToday: false }));
  
  sessions.forEach(s => {
    const dayName = days[new Date(s.date).getDay()];
    const index = days.indexOf(dayName);
    weeklyData[index].minutes += Math.round(s.duration / 60);
  });

  // تحديد اليوم الحالي
  const todayName = days[today.getDay()];
  weeklyData.find(d => d.day === todayName)!.isToday = true;

  return weeklyData;
}

// جلب الأسئلة الخاطئة الحقيقية من قاعدة البيانات
export async function getIncorrectQuestions() {
  const userId = await getAuthUserId();
  const incorrectAnswers = await prisma.questionAnswer.findMany({
    where: { session: { userId }, isCorrect: false },
    include: { session: true },
    orderBy: { id: 'desc' },
    take: 20 // آخر 20 سؤال خاطئ
  });

  // ربطها بنص السؤال من Mock Questions (لأننا لا نخزن نص السؤال في الداتا بيز لتوفير المساحة)
  const { mockQuestions } = await import('@/lib/question-data');
  const questionsWithOptions = incorrectAnswers.map(a => {
    const q = mockQuestions.find(mq => mq.id === a.questionId);
    return { ...a, question: q };
  }).filter(q => q.question); // فقط الأسئلة الموجودة في المصفوفة

  return questionsWithOptions;
}