import { CalendarClock, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { demoUser } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export function WelcomeHero() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative overflow-hidden rounded-lg border border-navy-700 bg-navy-600 p-6 text-white shadow-nav sm:p-7">
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg">
          <p className="text-[0.8125rem] font-medium text-navy-100">{greeting},</p>
          <h2 className="mt-0.5 text-[1.625rem] font-bold tracking-tight sm:text-[1.875rem]">
            {demoUser.name}
          </h2>
          <p className="mt-2 text-[0.9375rem] text-navy-100">
            "Stay consistent. Stay on track."
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
              <CalendarClock className="h-4 w-4 text-accent-gold" />
              <div className="leading-tight">
                <p className="text-[0.625rem] uppercase tracking-wide text-navy-200">Target Exam</p>
                <p className="text-[0.8125rem] font-semibold text-white">{demoUser.targetExam}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
              <Flame className="h-4 w-4 text-accent-gold" />
              <div className="leading-tight">
                <p className="text-[0.625rem] uppercase tracking-wide text-navy-200">Days Remaining</p>
                <p className="text-[0.8125rem] font-semibold text-white">{demoUser.daysRemaining} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress ring visualization */}
        <div className="flex items-center gap-5">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F0B758"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - demoUser.overallProgress / 100)}`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[1.5rem] font-bold leading-none text-white">
                {demoUser.overallProgress}%
              </span>
              <span className="mt-1 text-[0.625rem] uppercase tracking-wide text-navy-200">Progress</span>
            </div>
          </div>
          <Link href="/study-plan">
            <Button variant="gold" size="sm" className="hidden sm:inline-flex">
              View Plan <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}