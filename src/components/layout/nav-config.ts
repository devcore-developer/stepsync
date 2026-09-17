import { LayoutDashboard, CalendarDays, BarChart3, Users, MessageSquare, Network, Bell, User, Settings, LifeBuoy, BookOpen, BrainCircuit, LineChart, FolderKanban, FileQuestion, Layers, ShieldCheck, ShieldAlert } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  adminOnly?: boolean; // Add this line
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
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
      { label: "Assistant", href: "/assistant", icon: ShieldAlert },
      { label: "Accountability", href: "/accountability", icon: Users },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Admin Dashboard", href: "/admin", icon: ShieldAlert, adminOnly: true },
      { label: "User Management", href: "/admin/users", icon: Users, adminOnly: true },
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

export const supportItem: NavItem = { label: "Help & Support", href: "/settings", icon: LifeBuoy };