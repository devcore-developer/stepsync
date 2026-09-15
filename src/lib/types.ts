export interface USMLESystem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  defaultEstimatedDays: number;
}

export interface StudyPlanSystem {
  id: string;
  systemId: string;
  name: string;
  startDate: string;
  endDate: string;
  estimatedDays: number;
  progress: number;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface StudyTask {
  id: string;
  planId: string;
  systemId: string;
  systemName: string;
  date: string; // ISO string
  title: string;
  resource: string;
  duration: number; // minutes
  questions?: number;
  completed: boolean;
  type: 'Reading' | 'Videos' | 'Questions' | 'Review';
  priority: 'High' | 'Medium' | 'Low';
}

export interface StudyPlan {
  id: string;
  name: string;
  examDate: string;
  startDate: string;
  studyDaysPerWeek: number;
  dailyHours: string; // Changed from number to string
  status: 'Active' | 'Completed' | 'Draft';
  progress: number;
  systems: StudyPlanSystem[];
  tasks: StudyTask[];
  resources: string[];
  questionTarget: number;
  strategy: string;
  createdAt: string;
}