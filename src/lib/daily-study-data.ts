export interface DailyTask {
  id: string;
  system: string;
  topic: string;
  title: string;
  type: 'Study' | 'UWorld' | 'Review' | 'Flashcards' | 'Practice';
  resource: string;
  duration: number;
  status: 'completed' | 'in-progress' | 'not-started';
  priority: 'High' | 'Medium' | 'Low';
  questions?: number;
  description: string;
  objectives: string[];
}

export const dailyTasks: DailyTask[] = [
  {
    id: 'dt1',
    system: 'Pathology',
    topic: 'Cell Injury & Cellular Adaptations',
    title: 'Review Cell Injury Mechanisms',
    type: 'Study',
    resource: 'Boards & Beyond',
    duration: 45,
    status: 'completed',
    priority: 'High',
    description: 'Review the major mechanisms of reversible and irreversible cell injury.',
    objectives: ['Understand cellular adaptations', 'Review mechanisms of cell injury', 'Recognize major causes of cellular damage'],
  },
  {
    id: 'dt2',
    system: 'Pathology',
    topic: 'Cell Injury Question Block',
    title: 'UWorld Pathology Block',
    type: 'UWorld',
    resource: 'UWorld',
    duration: 60,
    questions: 40,
    status: 'in-progress',
    priority: 'High',
    description: 'Complete 40 timed questions on cellular injury.',
    objectives: ['Apply concepts to clinical vignettes', 'Review incorrect answers thoroughly'],
  },
  {
    id: 'dt3',
    system: 'Biochemistry',
    topic: 'Metabolic Pathways',
    title: 'Study Metabolic Pathways',
    type: 'Study',
    resource: 'First Aid',
    duration: 50,
    status: 'not-started',
    priority: 'Medium',
    description: 'Glycolysis, TCA cycle, and oxidative phosphorylation.',
    objectives: ['Memorize rate-limiting enzymes', 'Understand ATP yield'],
  },
  {
    id: 'dt4',
    system: 'Review',
    topic: 'Pathology Checkpoint',
    title: 'Pathology Review Checkpoint',
    type: 'Review',
    resource: 'Anki',
    duration: 30,
    status: 'not-started',
    priority: 'Medium',
    description: 'Review missed Pathology Anki cards.',
    objectives: ['Clear daily review queue'],
  },
  {
    id: 'dt5',
    system: 'Microbiology',
    topic: 'Gram Positive Rods',
    title: 'Sketchy Microbiology',
    type: 'Study',
    resource: 'Sketchy',
    duration: 35,
    status: 'not-started',
    priority: 'Low',
    description: 'Watch Sketchy videos for Gram Positive Rods.',
    objectives: ['Recall visual associations', 'Complete corresponding Anki cards'],
  },
];

export const upcomingTasks = [
  { id: 'u1', day: 'Tomorrow', system: 'Cardiovascular', topic: 'Heart Failure', type: 'Study — 45 min', resource: 'First Aid' },
  { id: 'u2', day: 'Tomorrow', system: 'Cardiovascular', topic: 'UWorld Block', type: '40 Questions', resource: 'UWorld' },
  { id: 'u3', day: 'Wednesday', system: 'Renal', topic: 'Acid-Base Disorders', type: 'Study — 50 min', resource: 'Boards & Beyond' },
];

export const recentActivity = [
  { id: 'a1', time: 'Today', action: 'Completed Pathology — Cell Injury' },
  { id: 'a2', time: 'Today', action: 'Completed 40 UWorld questions' },
  { id: 'a3', time: 'Yesterday', action: 'Completed Biochemistry Review' },
  { id: 'a4', time: 'Yesterday', action: 'Completed 3h 42m of study' },
];

export const uworldStats = {
  completed: 1284,
  total: 3645,
  remaining: 2361,
  thisWeek: 280,
  accuracy: 72,
};

export const weeklyStats = [
  { day: 'Mon', completion: 100 },
  { day: 'Tue', completion: 100 },
  { day: 'Wed', completion: 100 },
  { day: 'Thu', completion: 82 },
  { day: 'Fri', completion: 0 },
  { day: 'Sat', completion: 0 },
  { day: 'Sun', completion: 0 },
];