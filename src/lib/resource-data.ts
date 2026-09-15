export type ResourceType = 'Video' | 'Question Bank' | 'Book' | 'Flashcards' | 'Notes' | 'Review' | 'Practice' | 'Other';
export type ResourceStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Paused';

export interface Resource {
  id: string;
  name: string;
  provider: string;
  type: ResourceType;
  description: string;
  url?: string;
  systems: string[];
  status: ResourceStatus;
  unitsCompleted: number;
  unitsTotal: number;
  unitType: string;
  lastUsedAt?: string;
  isCustom?: boolean;
}

export interface ResourceScenario {
  id: string;
  name: string;
  description: string;
  resources: Resource[];
}

export const resourceScenarios: ResourceScenario[] = [
  {
    id: 'active',
    name: 'Active Student',
    description: 'Standard mix of USMLE resources in progress.',
    resources: [
      { id: 'r1', name: 'Boards & Beyond', provider: 'B&B', type: 'Video', description: 'Comprehensive video lectures for Step 1.', systems: ['Pathology', 'Biochemistry', 'Physiology'], status: 'In Progress', unitsCompleted: 84, unitsTotal: 200, unitType: 'lessons', lastUsedAt: 'Today' },
      { id: 'r2', name: 'UWorld Step 1', provider: 'UWorld', type: 'Question Bank', description: 'Premier QBank for USMLE Step 1 preparation.', systems: ['All Systems'], status: 'In Progress', unitsCompleted: 1284, unitsTotal: 3645, unitType: 'questions', lastUsedAt: 'Today' },
      { id: 'r3', name: 'First Aid for the USMLE Step 1', provider: 'McGraw Hill', type: 'Book', description: 'The bible of USMLE Step 1 preparation.', systems: ['All Systems'], status: 'In Progress', unitsCompleted: 320, unitsTotal: 640, unitType: 'pages', lastUsedAt: 'Yesterday' },
      { id: 'r4', name: 'Pathoma', provider: 'Pathoma', type: 'Video', description: 'Fundamentals of pathology.', systems: ['Pathology'], status: 'In Progress', unitsCompleted: 12, unitsTotal: 35, unitType: 'chapters', lastUsedAt: '2 days ago' },
      { id: 'r5', name: 'Sketchy Micro', provider: 'Sketchy', type: 'Video', description: 'Visual memory tools for microbiology.', systems: ['Microbiology'], status: 'In Progress', unitsCompleted: 45, unitsTotal: 100, unitType: 'lessons', lastUsedAt: '3 days ago' },
      { id: 'r6', name: 'AnKing Deck', provider: 'Anki', type: 'Flashcards', description: 'Comprehensive Anki deck for Step 1.', systems: ['All Systems'], status: 'In Progress', unitsCompleted: 4200, unitsTotal: 8000, unitType: 'cards', lastUsedAt: 'Today' },
      { id: 'r7', name: 'Personal Pathology Notes', provider: 'My Notes', type: 'Notes', description: 'Custom compiled notes for Pathology.', systems: ['Pathology'], status: 'Not Started', unitsCompleted: 0, unitsTotal: 120, unitType: 'pages', isCustom: true },
    ]
  },
  {
    id: 'new',
    name: 'New Student',
    description: 'Mostly untouched resources.',
    resources: [
      { id: 'r1', name: 'Boards & Beyond', provider: 'B&B', type: 'Video', description: 'Comprehensive video lectures.', systems: ['Pathology'], status: 'Not Started', unitsCompleted: 0, unitsTotal: 200, unitType: 'lessons' },
      { id: 'r2', name: 'UWorld Step 1', provider: 'UWorld', type: 'Question Bank', description: 'Premier QBank.', systems: ['All Systems'], status: 'Not Started', unitsCompleted: 0, unitsTotal: 3645, unitType: 'questions' },
      { id: 'r3', name: 'First Aid', provider: 'McGraw Hill', type: 'Book', description: 'The bible.', systems: ['All Systems'], status: 'Not Started', unitsCompleted: 0, unitsTotal: 640, unitType: 'pages' },
    ]
  }
];

export const resourceTypes: ResourceType[] = ['Video', 'Question Bank', 'Book', 'Flashcards', 'Notes', 'Review', 'Practice', 'Other'];

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Simulate tasks from Phase 4 that need resource association
export const unlinkedStudyTasks = [
  { id: 'ut1', title: 'Microbiology — Bacterial Genetics', system: 'Microbiology' },
  { id: 'ut2', title: 'Biochemistry — Urea Cycle', system: 'Biochemistry' },
  { id: 'ut3', title: 'Ethics — Physician Responsibilities', system: 'Ethics' },
];

export const resourceActivity = [
  { id: 'a1', time: 'Today', action: 'Completed: Boards & Beyond — Cell Injury' },
  { id: 'a2', time: 'Today', action: 'Started: UWorld — Pathology Block' },
  { id: 'a3', time: 'Yesterday', action: 'Updated: First Aid — Biochemistry' },
];