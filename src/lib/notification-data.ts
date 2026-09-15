export type NotificationType = 
  | 'STUDY_TASK' | 'MISSED_TASK' | 'REVIEW_DUE' | 'REVIEW_OVERDUE'
  | 'QUESTION_GOAL' | 'WEEKLY_GOAL' | 'STREAK' | 'ACCOUNTABILITY'
  | 'READINESS' | 'EXAM_COUNTDOWN' | 'SYSTEM_ALERT';

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  category: 'Study' | 'Review' | 'Questions' | 'Goals' | 'Accountability' | 'Readiness';
  priority: NotificationPriority;
  createdAt: string;
  readAt: string | null;
  actionLabel: string;
  actionHref: string;
  isReminder?: boolean;
}

export interface NotificationPreferences {
  quietHours: { enabled: boolean; start: string; end: string };
  frequency: 'Minimal' | 'Standard' | 'Frequent';
  categories: {
    Study: boolean;
    Review: boolean;
    Questions: boolean;
    Goals: boolean;
    Streaks: boolean;
    Accountability: boolean;
    Readiness: boolean;
  };
}

export const defaultPreferences: NotificationPreferences = {
  quietHours: { enabled: true, start: '22:00', end: '07:00' },
  frequency: 'Standard',
  categories: {
    Study: true, Review: true, Questions: true, Goals: true, 
    Streaks: true, Accountability: true, Readiness: true
  }
};

// Simulated Notification Generation Service
class NotificationService {
  generate(prefs: NotificationPreferences): AppNotification[] {
    // In a real app, this would evaluate user state and generate dynamically.
    // Here we simulate the output based on standard StepSync demo data.
    const now = new Date();
    const minsAgo = (m: number) => new Date(now.getTime() - m * 60000).toISOString();
    
    const candidates: AppNotification[] = [
      {
        id: 'n1', type: 'REVIEW_DUE', title: '12 flashcards are due today', description: 'Keep your retention high by reviewing them now.', category: 'Review', priority: 'HIGH', createdAt: minsAgo(10), readAt: null, actionLabel: 'Start Review', actionHref: '/review', isReminder: true
      },
      {
        id: 'n2', type: 'STUDY_TASK', title: 'Your Renal study task is scheduled for today', description: 'Complete today\'s planned Renal physiology review.', category: 'Study', priority: 'NORMAL', createdAt: minsAgo(32), readAt: null, actionLabel: 'Open Today\'s Plan', actionHref: '/study/today', isReminder: true
      },
      {
        id: 'n3', type: 'WEEKLY_GOAL', title: 'Your weekly study goal is 86% complete', description: '2 study days remain this week to hit your target.', category: 'Goals', priority: 'LOW', createdAt: minsAgo(60), readAt: null, actionLabel: 'View Accountability', actionHref: '/accountability', isReminder: true
      },
      {
        id: 'n4', type: 'READINESS', title: 'Renal is now a high-priority weak system', description: 'Your accuracy dropped to 67%. Consider focused practice.', category: 'Readiness', priority: 'HIGH', createdAt: minsAgo(120), readAt: null, actionLabel: 'View Performance', actionHref: '/performance'
      },
      {
        id: 'n5', type: 'STREAK', title: 'Your 12-day study streak is active', description: 'Great consistency! Study today to maintain it.', category: 'Accountability', priority: 'LOW', createdAt: minsAgo(300), readAt: null, actionLabel: 'View Accountability', actionHref: '/accountability'
      },
      {
        id: 'n6', type: 'MISSED_TASK', title: 'Yesterday\'s study task wasn\'t completed', description: 'Your Cardiovascular review is still incomplete.', category: 'Study', priority: 'HIGH', createdAt: minsAgo(1440), readAt: minsAgo(1400), actionLabel: 'View Recovery Plan', actionHref: '/study/adaptive'
      }
    ];

    // Apply frequency settings
    if (prefs.frequency === 'Minimal') {
      return candidates.filter(n => n.priority === 'HIGH' || !n.isReminder);
    }

    return candidates;
  }
}

export const notificationService = new NotificationService();