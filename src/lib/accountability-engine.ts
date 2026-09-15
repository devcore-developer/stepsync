export type GoalType = 'Study Time' | 'Questions' | 'Study Days' | 'Review Cards' | 'Tasks Completed';
export type GoalStatus = 'Not Started' | 'In Progress' | 'Almost Complete' | 'Completed' | 'At Risk';

export interface AccountabilityGoal {
  id: string;
  type: GoalType;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: GoalStatus;
}

export interface StudyPartner {
  name: string;
  status: 'Active' | 'Pending' | 'Inactive';
  currentStreak: number;
  weeklyGoalProgress: number;
  lastActive: string;
}

export interface Milestone {
  id: string;
  title: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export function getGoalStatus(current: number, target: number): GoalStatus {
  if (current === 0) return 'Not Started';
  const pct = (current / target) * 100;
  if (pct >= 100) return 'Completed';
  if (pct >= 75) return 'Almost Complete';
  if (pct < 50 && pct > 0) return 'At Risk'; // Simplified risk logic
  return 'In Progress';
}

export const initialGoals: AccountabilityGoal[] = [
  { id: 'g1', type: 'Study Time', target: 20, current: 18.7, unit: 'hours', deadline: 'Sunday', status: 'Almost Complete' },
  { id: 'g2', type: 'Questions', target: 250, current: 214, unit: 'questions', deadline: 'Sunday', status: 'In Progress' },
  { id: 'g3', type: 'Study Days', target: 6, current: 6, unit: 'days', deadline: 'Sunday', status: 'Completed' },
  { id: 'g4', type: 'Review Cards', target: 150, current: 126, unit: 'cards', deadline: 'Sunday', status: 'In Progress' },
];

export const mockPartner: StudyPartner = {
  name: 'Sarah M.',
  status: 'Active',
  currentStreak: 9,
  weeklyGoalProgress: 85,
  lastActive: 'Today',
};

export const milestones: Milestone[] = [
  { id: 'm1', title: 'First Study Session', unlocked: true },
  { id: 'm2', title: '100 Questions', unlocked: true },
  { id: 'm3', title: '7-Day Streak', unlocked: true },
  { id: 'm4', title: '500 Questions', unlocked: true },
  { id: 'm5', title: '50 Study Hours', unlocked: true },
  { id: 'm6', title: '1,000 Questions', unlocked: false, progress: 1284, target: 1000 },
  { id: 'm7', title: '30-Day Streak', unlocked: false, progress: 12, target: 30 },
];

export const accountabilityActivity = [
  { id: 'a1', time: 'Today', action: 'Completed 40 questions', icon: 'FileQuestion' },
  { id: 'a2', time: 'Today', action: 'Reviewed 24 flashcards', icon: 'Layers' },
  { id: 'a3', time: 'Yesterday', action: 'Completed Cardiovascular study task', icon: 'CheckCircle' },
  { id: 'a4', time: 'Yesterday', action: 'Reached 7-day study streak', icon: 'Flame' },
  { id: 'a5', time: 'Sep 12', action: 'Completed weekly goal', icon: 'Trophy' },
];