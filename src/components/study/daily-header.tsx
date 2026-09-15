import { Flame, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { demoUser } from "@/lib/demo-data";

export function DailyHeader({ progress, tasksCompleted, totalTasks }: { progress: number; tasksCompleted: number; totalTasks: number }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-navy-600 p-6 text-white shadow-nav">
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-navy-100">{demoUser.greeting}, {demoUser.name.split(' ')[0]}</p>
          <h1 className="mt-0.5 text-3xl font-bold tracking-tight">Today&apos;s Study</h1>
          <p className="mt-2 text-sm text-navy-100 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> {today}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Flame className="h-4 w-4 text-accent-gold" />
            12 Day Streak — You&apos;re on track today.
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[0.6875rem] uppercase tracking-wide text-navy-200">Daily Progress</p>
              <p className="text-3xl font-bold">{progress}%</p>
            </div>
          </div>
          <div className="w-full md:w-64">
            <Progress value={progress} color="gold" size="md" />
            <p className="mt-1 text-xs text-navy-100">{tasksCompleted} of {totalTasks} tasks completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}