export type PerformanceStatus = 'Strong' | 'On Track' | 'Needs Review' | 'Weak' | 'Not Started';

export interface TopicPerformance {
  name: string;
  questions: number;
  accuracy: number;
  trend: number; // + or -
}

export interface SystemPerformance {
  id: string;
  name: string;
  questionsCompleted: number;
  questionsCorrect: number;
  accuracy: number;
  completion: number;
  trend: number; // + or -
  status: PerformanceStatus;
  topics: TopicPerformance[];
}

export interface PerformanceSummary {
  planCompletion: number;
  uworldCompletion: number;
  questionAccuracy: number;
  studyConsistency: number;
  avgDailyStudyTime: string;
  currentStreak: number;
}

export interface PerformanceScenario {
  id: string;
  name: string;
  description: string;
  summary: PerformanceSummary;
  uworld: {
    completed: number;
    total: number;
    correct: number;
    incorrect: number;
    avgPerDay: number;
  };
  weeklyAccuracy: { week: string; accuracy: number }[];
  weeklyVolume: { week: string; questions: number }[];
  systems: SystemPerformance[];
  insights: string[];
}

export const STATUS_THRESHOLDS = {
  STRONG: 75,
  ON_TRACK: 70,
  NEEDS_REVIEW: 65,
};

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getPerformanceStatus(accuracy: number, completion: number): PerformanceStatus {
  if (completion === 0 || accuracy === 0) return 'Not Started';
  if (accuracy >= STATUS_THRESHOLDS.STRONG) return 'Strong';
  if (accuracy >= STATUS_THRESHOLDS.ON_TRACK) return 'On Track';
  if (accuracy >= STATUS_THRESHOLDS.NEEDS_REVIEW) return 'Needs Review';
  return 'Weak';
}