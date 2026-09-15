import { Flame, CalendarClock, CalendarDays } from "lucide-react";
import { demoUser } from "@/lib/demo-data";

export function DashboardHeader() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-navy-600 p-6 text-white shadow-nav">
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-navy-100">{demoUser.greeting},</p>
          <h1 className="mt-0.5 text-3xl font-bold tracking-tight">{demoUser.name}</h1>
          <p className="mt-2 text-sm text-navy-100">Here&apos;s your Step 1 progress for today.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <Flame className="h-5 w-5 text-accent-gold mb-1" />
            <span className="text-2xl font-bold">{demoUser.studyStreak}</span>
            <span className="text-[0.6875rem] uppercase tracking-wide text-navy-200">Day Streak</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <CalendarDays className="h-5 w-5 text-brand-200 mb-1" />
            <span className="text-xs font-bold text-center">6-Month</span>
            <span className="text-[0.6875rem] uppercase tracking-wide text-navy-200">Plan</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <CalendarClock className="h-5 w-5 text-accent-red mb-1" />
            <span className="text-2xl font-bold">{demoUser.daysRemaining}</span>
            <span className="text-[0.6875rem] uppercase tracking-wide text-navy-200">Days Left</span>
          </div>
        </div>
      </div>
    </div>
  );
}