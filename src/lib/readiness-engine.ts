export type ReadinessStatus = 'Excellent' | 'On Track' | 'Needs Attention' | 'At Risk' | 'Insufficient Data';

export interface SystemReadiness {
  id: string;
  name: string;
  coverage: number;
  accuracy: number;
  questions: number;
  reviewStatus: 'Strong' | 'Needs Review' | 'Weak' | 'Not Started';
  readiness: 'Strong' | 'Needs Attention' | 'At Risk';
}

export interface ReadinessData {
  id: string;
  name: string;
  description: string;
  examDate: string | null;
  planCompletion: number;
  questionAccuracy: number;
  systemCoverage: number;
  reviewRetention: number;
  studyConsistency: number;
  uworldProgress: number;
  systems: SystemReadiness[];
  goals: { id: string; title: string; progress: number; target: number; unit: string; status: 'Active' | 'Completed' }[];
  timeline: { id: string; title: string; status: 'Completed' | 'Active' | 'Upcoming' }[];
  dailyConsistency: { day: string; hours: string }[];
  studyStreak: number;
  reviewCardsDue: number;
  reviewOverdue: number;
  questionsCompleted: number;
  questionsTotal: number;
  avgDailyQuestions: number;
  planDaysCompleted: number;
  planDaysTotal: number;
  history: { date: string; score: number; status: ReadinessStatus }[];
}

export function calculateReadinessScore(data: ReadinessData): number {
  if (data.id === 'insufficient') return 0;
  const score = 
    (data.questionAccuracy * 0.25) +
    (data.planCompletion * 0.20) +
    (data.systemCoverage * 0.15) +
    (data.reviewRetention * 0.15) +
    (data.studyConsistency * 0.15) +
    (data.uworldProgress * 0.10);
  return Math.round(score);
}

export function getReadinessStatus(score: number, scenarioId: string): ReadinessStatus {
  if (scenarioId === 'insufficient') return 'Insufficient Data';
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'On Track';
  if (score >= 50) return 'Needs Attention';
  return 'At Risk';
}

export function getDaysRemaining(examDate: string | null): number {
  if (!examDate) return 0;
  const diff = new Date(examDate).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}