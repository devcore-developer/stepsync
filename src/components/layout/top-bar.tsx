"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { demoUser } from "@/lib/demo-data";
import { NotificationBell } from "@/components/notifications/notification-bell";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/study-plan": "Study Plan",
  "/analytics": "Analytics",
  "/study/today": "Study Today",
  "/study-plans": "Study Plans",
  "/study/adaptive": "Adaptive Planning",
  "/performance": "Performance",
  "/resources": "Resources",
  "/questions": "Question Bank",
  "/review": "Review",
  "/readiness": "Readiness",
  "/assistant": "Assistant",
  "/accountability": "Accountability",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const pageTitle = titleMap[pathname ?? ""] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-surface-border bg-white/95 px-4 backdrop-blur-sm sm:px-6">
      <button onClick={onMenuClick} className="flex h-9 w-9 items-center justify-center rounded-md text-navy-500 hover:bg-surface-muted lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[1.0625rem] font-semibold text-navy-700">{pageTitle}</h1>
      </div>

      <div className="hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
          <input
            placeholder="Search..."
            className="h-9 w-56 rounded-md border border-surface-border bg-surface-muted pl-9 pr-3 text-sm placeholder:text-ink-tertiary focus:border-brand-400 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <NotificationBell />

      <div className="hidden h-6 w-px bg-surface-border sm:block" />

      <Link href="/settings" className="flex items-center gap-2.5 rounded-md p-1 pr-2 hover:bg-surface-muted">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[0.75rem] font-semibold ring-2 ring-white text-white">
          {demoUser.avatarInitials}
        </div>
        <div className="hidden text-left lg:block">
          <p className="text-[0.8125rem] font-semibold leading-tight text-navy-700">{demoUser.name}</p>
          <p className="text-[0.6875rem] text-ink-secondary">Step 1 Candidate</p>
        </div>
      </Link>
    </header>
  );
}