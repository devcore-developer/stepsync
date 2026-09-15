import { LayoutDashboard, CalendarDays, BarChart3, Users, MessageSquare, Network, Bell, User, Settings, LifeBuoy, BookOpen, BrainCircuit, LineChart, FolderKanban, FileQuestion, Layers, ShieldCheck, Sparkles, Target } from "lucide-react";

export const navSections = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Study Today", href: "/study/today", icon: BookOpen },
      { label: "Study Plans", href: "/study-plans", icon: CalendarDays },
      { label: "Adaptive Planning", href: "/study/adaptive", icon: BrainCircuit },
      { label: "Performance", href: "/performance", icon: LineChart },
      { label: "Resources", href: "/resources", icon: FolderKanban },
      { label: "Question Bank", href: "/questions", icon: FileQuestion },
      { label: "Review", href: "/review", icon: Layers },
      { label: "Readiness", href: "/readiness", icon: ShieldCheck },
      { label: "Assistant", href: "/assistant", icon: Sparkles },
      { label: "Accountability", href: "/accountability", icon: Target }, // <-- Added
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Study Partners", href: "/partners", icon: Users },
      { label: "Messages", href: "/messages", icon: MessageSquare },
      { label: "Groups", href: "/groups", icon: Network },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const supportItem = { label: "Help & Support", href: "/settings", icon: LifeBuoy };