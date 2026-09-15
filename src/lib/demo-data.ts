export const demoUser = {
  name: "Alex Morgan",
  role: "USMLE Step 1 Candidate",
  email: "alex.morgan@medstudent.edu",
  avatarInitials: "AM",
  targetExam: "March 15, 2025",
  daysRemaining: 124,
  studyStreak: 42,
  planName: "6-Month Intensive Plan",
  overallProgress: 28,
  greeting: "Good morning",
  studyHours: 146,
  uworldQuestions: 1284,
  uworldTotal: 3200,
};

export type MetricTrend = "up" | "down" | "neutral";

export interface Metric {
  id: string;
  label: string;
  value: string;
  icon: "progress" | "streak" | "hours" | "questions";
  trend: MetricTrend;
  trendValue: string;
  context: string;
  accent: "brand" | "gold" | "navy" | "red";
}

export const metrics: Metric[] = [
  {
    id: "progress",
    label: "Overall Progress",
    value: "68%",
    icon: "progress",
    trend: "up",
    trendValue: "+8.4%",
    context: "this month",
    accent: "brand",
  },
  {
    id: "streak",
    label: "Study Streak",
    value: "14 days",
    icon: "streak",
    trend: "up",
    trendValue: "+2",
    context: "vs last week",
    accent: "gold",
  },
  {
    id: "hours",
    label: "Study Hours",
    value: "146h",
    icon: "hours",
    trend: "up",
    trendValue: "+12.5h",
    context: "this week",
    accent: "navy",
  },
  {
    id: "questions",
    label: "UWorld Questions",
    value: "1,284 / 3,200",
    icon: "questions",
    trend: "up",
    trendValue: "40.1%",
    context: "completion",
    accent: "red",
  },
];

export type TaskStatus = "completed" | "in-progress" | "upcoming";

export interface StudyTask {
  id: string;
  title: string;
  system: string;
  resource: string;
  resourceType: "First Aid" | "Pathoma" | "UWorld" | "Anki" | "Boards & Beyond" | "Sketchy";
  duration: number;
  status: TaskStatus;
  detail?: string;
  completed?: boolean;
  type?: "Reading" | "Videos" | "Questions" | "Review";
}

export const todaysTasks: StudyTask[] = [
  {
    id: "t1",
    title: "Heart Failure — Pathophysiology & Pharmacology",
    system: "Cardiovascular",
    resource: "First Aid",
    resourceType: "First Aid",
    duration: 45,
    status: "completed",
    detail: "Pages 284–291",
  },
  {
    id: "t2",
    title: "Cardiovascular Pathology Review",
    system: "Cardiovascular",
    resource: "Pathoma",
    resourceType: "Pathoma",
    duration: 55,
    status: "completed",
    detail: "Chapter 8",
  },
  {
    id: "t3",
    title: "Cardiology Question Block",
    system: "Cardiovascular",
    resource: "UWorld",
    resourceType: "UWorld",
    duration: 60,
    status: "in-progress",
    detail: "40 questions · timed",
  },
  {
    id: "t4",
    title: "Anki Card Review — Cardio + Renal",
    system: "Spaced Repetition",
    resource: "Anki",
    resourceType: "Anki",
    duration: 30,
    status: "upcoming",
    detail: "~180 cards due",
  },
];

export const todayStudy: {
  system: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  tasks: StudyTask[];
} = {
  system: "Cardiovascular",
  progress: 60,
  totalTasks: 5,
  completedTasks: 3,
  tasks: [
    { id: "ts1", title: "Read First Aid — Heart Failure", system: "Cardiovascular", resource: "First Aid", resourceType: "First Aid", duration: 45, completed: true, type: "Reading", status: "completed" },
    { id: "ts2", title: "Watch Pathoma — Heart Failure", system: "Cardiovascular", resource: "Pathoma", resourceType: "Pathoma", duration: 35, completed: true, type: "Videos", status: "completed" },
    { id: "ts3", title: "UWorld Cardio Block", system: "Cardiovascular", resource: "UWorld", resourceType: "UWorld", duration: 60, completed: true, type: "Questions", status: "completed" },
    { id: "ts4", title: "Review Anki Cards", system: "Cardiovascular", resource: "Anki", resourceType: "Anki", duration: 30, completed: false, type: "Review", status: "upcoming" },
    { id: "ts5", title: "Review Cardiac Pharmacology", system: "Cardiovascular", resource: "First Aid", resourceType: "First Aid", duration: 25, completed: false, type: "Review", status: "upcoming" },
  ],
};

export interface DayActivity {
  day: string;
  hours: number;
  minutes: number;
  isToday?: boolean;
}

export const weeklyActivity: DayActivity[] = [
  { day: "Mon", hours: 4.2, minutes: 145 },
  { day: "Tue", hours: 5.1, minutes: 210 },
  { day: "Wed", hours: 3.8, minutes: 180 },
  { day: "Thu", hours: 6.0, minutes: 240 },
  { day: "Fri", hours: 4.7, minutes: 120 },
  { day: "Sat", hours: 5.4, minutes: 195 },
  { day: "Sun", hours: 2.9, minutes: 90, isToday: true },
];

export interface SystemProgressItem {
  id: string;
  name: string;
  progress: number;
  tasksCompleted: number;
  tasksTotal: number;
  color: "brand" | "navy" | "red" | "gold";
}

export const systemProgress: SystemProgressItem[] = [
  { id: "cardio", name: "Cardiovascular", progress: 82, tasksCompleted: 18, tasksTotal: 22, color: "brand" },
  { id: "renal", name: "Renal", progress: 64, tasksCompleted: 14, tasksTotal: 22, color: "navy" },
  { id: "resp", name: "Respiratory", progress: 58, tasksCompleted: 11, tasksTotal: 19, color: "brand" },
  { id: "neuro", name: "Neuroscience", progress: 51, tasksCompleted: 9, tasksTotal: 18, color: "navy" },
  { id: "micro", name: "Microbiology", progress: 43, tasksCompleted: 7, tasksTotal: 16, color: "red" },
  { id: "biochem", name: "Biochemistry", progress: 38, tasksCompleted: 6, tasksTotal: 16, color: "gold" },
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
  { id: "cardio", name: "Cardiovascular", progress: 72, completedTasks: 18, totalTasks: 25, status: "Active" },
  { id: "neuro", name: "Neurology", progress: 48, completedTasks: 12, totalTasks: 25, status: "Active" },
  { id: "renal", name: "Renal", progress: 35, completedTasks: 8, totalTasks: 23, status: "Upcoming" },
  { id: "resp", name: "Respiratory", progress: 24, completedTasks: 6, totalTasks: 25, status: "Upcoming" },
  { id: "endocrine", name: "Endocrine", progress: 18, completedTasks: 4, totalTasks: 22, status: "Upcoming" },
  { id: "gi", name: "Gastrointestinal", progress: 12, completedTasks: 3, totalTasks: 25, status: "Locked" },
];

export const aiInsight = {
  title: "AI Study Insight",
  message:
    "You're maintaining a strong 14-day streak, but your Microbiology progress (43%) is falling behind your weekly target by 1.5 hours.",
  recommendation:
    "Consider adding 30 minutes of Microbiology review over the next 4 days to stay on track for your October target.",
  confidence: "High",
  actionLabel: "View Recommendation",
};

export const aiRecommendation = {
  title: "StepSync AI",
  message: "You're slightly behind your target pace this week. Consider completing one additional UWorld block tomorrow to get back on track.",
  confidence: "High Confidence",
  actionLabel: "View Recommendation",
  secondaryAction: "Plan Tomorrow",
};

export interface UpcomingItem {
  id: string;
  when: string;
  title: string;
  detail: string;
  label?: string;
  day?: string;
  system?: string;
  taskCount?: number;
  duration?: number;
}

export const upcoming: UpcomingItem[] = [
  { id: "u1", when: "Tomorrow", title: "Cardiovascular Review", detail: "Complete remaining FA pages & Anki", label: "Tomorrow", day: "Tomorrow", system: "Renal Physiology", taskCount: 2, duration: 100 },
  { id: "u2", when: "In 2 days", title: "Neurology — Neuroanatomy", detail: "Start Pathoma Chapter 10", label: "Friday", day: "Friday", system: "Microbiology", taskCount: 4, duration: 200 },
  { id: "u3", when: "In 3 days", title: "UWorld Mixed Block", detail: "40 Questions across systems", label: "Saturday", day: "Saturday", system: "Neuroscience", taskCount: 5, duration: 250 },
  { id: "u4", when: "In 5 days", title: "Renal Review", detail: "First Aid Renal Physiology" },
];

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: "play" | "calendar" | "chart" | "users";
  variant: "primary" | "default";
}

export const quickActions: QuickAction[] = [
  { id: "q1", label: "Continue Studying", description: "Resume Cardiology block", href: "/study-plan", icon: "play", variant: "primary" },
  { id: "q2", label: "View Study Plan", description: "6-month roadmap overview", href: "/study-plan", icon: "calendar", variant: "default" },
  { id: "q3", label: "Review Progress", description: "Analytics & performance", href: "/analytics", icon: "chart", variant: "default" },
  { id: "q4", label: "Find Study Partner", description: "Connect with peers", href: "/partners", icon: "users", variant: "default" },
];

export const analyticsSummary = [
  { label: "Study Hours", value: "146h", sub: "this month" },
  { label: "Avg Daily Study", value: "4h 52m", sub: "last 7 days" },
  { label: "Questions Completed", value: "1,284", sub: "of 3,200" },
  { label: "Completion Rate", value: "87%", sub: "tasks on time" },
];

export const studyPlanSystems = [
  { id: "s1", name: "Cardiovascular", progress: 82, tasks: 18, focus: true },
  { id: "s2", name: "Renal", progress: 64, tasks: 14 },
  { id: "s3", name: "Respiratory", progress: 58, tasks: 11 },
  { id: "s4", name: "Neuroscience", progress: 51, tasks: 9 },
  { id: "s5", name: "Microbiology", progress: 43, tasks: 7 },
  { id: "s6", name: "Biochemistry", progress: 38, tasks: 6 },
  { id: "s7", name: "Immunology", progress: 29, tasks: 4 },
  { id: "s8", name: "Endocrine", progress: 22, tasks: 3 },
];

export const studyPartners = [
  { id: "p1", name: "Sara Chen", system: "Cardiovascular", progress: 84, status: "online", initials: "SC", match: 94 },
  { id: "p2", name: "James Okafor", system: "Microbiology", progress: 61, status: "online", initials: "JO", match: 88 },
  { id: "p3", name: "Maya Patel", system: "Neuroscience", progress: 72, status: "offline", initials: "MP", match: 85 },
  { id: "p4", name: "Daniel Reyes", system: "Biochemistry", progress: 55, status: "away", initials: "DR", match: 79 },
];

export const studyGroups = [
  { id: "g1", name: "Cardio Masters", members: 8, system: "Cardiovascular", activity: "High", lastActive: "2m ago" },
  { id: "g2", name: "Microbiology Sprint", members: 12, system: "Microbiology", activity: "Medium", lastActive: "1h ago" },
  { id: "g3", name: "Neuro Study Crew", members: 6, system: "Neuroscience", activity: "High", lastActive: "15m ago" },
  { id: "g4", name: "Biochem Bootcamp", members: 10, system: "Biochemistry", activity: "Low", lastActive: "3h ago" },
];

export const conversations = [
  { id: "c1", name: "Sara Chen", initials: "SC", lastMessage: "Did you finish the Pathoma chapter?", time: "2m", unread: 2, online: true },
  { id: "c2", name: "Cardio Masters", initials: "CM", lastMessage: "James: Let's review the UWorld block together", time: "18m", unread: 5, online: false },
  { id: "c3", name: "Maya Patel", initials: "MP", lastMessage: "Sending you my neuro notes", time: "1h", unread: 0, online: false },
  { id: "c4", name: "Daniel Reyes", initials: "DR", lastMessage: "Thanks for the biochem breakdown!", time: "3h", unread: 0, online: false },
];

export const notifications = [
  { id: "n1", type: "streak", title: "14-day streak achieved!", body: "You're on fire. Keep the momentum going.", time: "Just now", read: false },
  { id: "n2", type: "insight", title: "New AI insight available", body: "Microbiology progress is 1.5h behind target.", time: "20m ago", read: false },
  { id: "n3", type: "partner", title: "Sara Chen wants to connect", body: "94% study-match compatibility.", time: "1h ago", read: false },
  { id: "n4", type: "group", title: "New message in Cardio Masters", body: "James shared a UWorld explanation.", time: "2h ago", read: true },
  { id: "n5", type: "system", title: "Weekly report ready", body: "You studied 32.1h this week (+4.3h).", time: "1d ago", read: true },
];

export const onboardingResources = [
  { id: "fa", name: "First Aid" },
  { id: "uw", name: "UWorld" },
  { id: "bb", name: "Boards & Beyond" },
  { id: "path", name: "Pathoma" },
  { id: "sketch", name: "Sketchy" },
  { id: "anki", name: "Anki" },
  { id: "other", name: "Other" },
];