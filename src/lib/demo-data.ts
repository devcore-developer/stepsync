export const demoUser = {
  name: "Student",
  role: "USMLE Step 1 Candidate",
  email: "student@stepsync.com",
  avatarInitials: "ST",
  targetExam: "March 18, 2025",
  daysRemaining: 124,
  studyStreak: 0,
  planName: "6-Month Intensive Plan",
  overallProgress: 0,
  greeting: "Welcome",
};

export interface StudyTask {
  id: string;
  title: string;
  system: string;
  resource: string;
  duration: number;
  completed: boolean;
  type: "Reading" | "Videos" | "Questions" | "Review";
}

export const todayStudy: {
  system: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  tasks: StudyTask[];
} = {
  system: "Cardiovascular",
  progress: 0,
  totalTasks: 3,
  completedTasks: 0,
  tasks: [
    { id: "ts1", title: "Read First Aid — Heart Failure", system: "Cardiovascular", resource: "First Aid", duration: 45, completed: false, type: "Reading" },
    { id: "ts2", title: "Watch Pathoma — Heart Failure", system: "Cardiovascular", resource: "Pathoma", duration: 35, completed: false, type: "Videos" },
    { id: "ts3", title: "UWorld Cardio Block", system: "Cardiovascular", resource: "UWorld", duration: 60, completed: false, type: "Questions" },
  ],
};

export interface DayActivity {
  day: string;
  hours: number;
  minutes: number;
  isToday?: boolean;
}

export const weeklyActivity: DayActivity[] = [
  { day: "Mon", hours: 0, minutes: 0 },
  { day: "Tue", hours: 0, minutes: 0 },
  { day: "Wed", hours: 0, minutes: 0 },
  { day: "Thu", hours: 0, minutes: 0 },
  { day: "Fri", hours: 0, minutes: 0 },
  { day: "Sat", hours: 0, minutes: 0 },
  { day: "Sun", hours: 0, minutes: 0, isToday: true },
];

export interface SystemProgress {
  id: string;
  name: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  status: "Active" | "Upcoming" | "Locked";
}

export const systems: SystemProgress[] = [
  { id: "cardio", name: "Cardiovascular", progress: 0, completedTasks: 0, totalTasks: 20, status: "Active" },
  { id: "neuro", name: "Neurology", progress: 0, completedTasks: 0, totalTasks: 20, status: "Upcoming" },
  { id: "renal", name: "Renal", progress: 0, completedTasks: 0, totalTasks: 18, status: "Upcoming" },
];

export const aiRecommendation = {
  title: "StepSync AI",
  message: "Welcome to StepSync! Start a study session or create a plan to get personalized recommendations.",
  confidence: "System Generated",
  actionLabel: "Get Started",
  secondaryAction: "Create Plan",
};

export interface UpcomingItem {
  id: string;
  when: string;
  title: string;
  detail: string;
}

export const upcoming: UpcomingItem[] = [];

export const quickActions = [
  { id: "q1", label: "Continue Studying", description: "Resume your block", href: "/study/today", icon: "play", variant: "primary" },
  { id: "q2", label: "View Study Plan", description: "Roadmap overview", href: "/study-plans", icon: "calendar", variant: "default" },
  { id: "q3", label: "Review Progress", description: "Analytics & performance", href: "/performance", icon: "chart", variant: "default" },
  { id: "q4", label: "Find Study Partner", description: "Connect with peers", href: "/accountability", icon: "users", variant: "default" },
];