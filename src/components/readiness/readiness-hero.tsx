"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CalendarDays, Edit, ArrowRight } from "lucide-react";
import { getDaysRemaining } from "@/lib/readiness-engine";
import Link from "next/link";

interface Props {
  examDate: string | null;
  onEdit: () => void;
}

export function ReadinessHero({ examDate, onEdit }: Props) {
  if (!examDate) {
    return (
      <Card className="bg-surface-muted border-dashed">
        <CardContent className="py-12 flex flex-col items-center justify-center text-center">
          <CalendarClock className="h-12 w-12 text-ink-tertiary mb-4" />
          <h3 className="text-lg font-semibold text-navy-700">Set your exam date</h3>
          <p className="mt-1 text-sm text-ink-secondary max-w-sm">Set your target USMLE Step 1 date to start tracking your readiness.</p>
          <Button variant="primary" className="mt-6" onClick={onEdit}>Set Exam Date</Button>
        </CardContent>
      </Card>
    );
  }

  const daysRemaining = getDaysRemaining(examDate);
  const formattedDate = new Date(examDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const weeksRemaining = Math.ceil(daysRemaining / 7);

  return (
    <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700 overflow-hidden">
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
      <CardContent className="relative p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Badge variant="gold" className="mb-2">Exam Readiness</Badge>
          <h1 className="text-2xl font-bold text-white">USMLE Step 1</h1>
          <p className="mt-1 text-sm text-navy-100">See how prepared you are based on your progress, performance, and consistency.</p>
          
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-accent-gold" />
              <div>
                <p className="text-xs uppercase tracking-wide text-navy-200">Exam Date</p>
                <p className="text-sm font-semibold text-white">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-center md:text-right">
            <p className="text-4xl font-bold text-accent-gold leading-none">{daysRemaining}</p>
            <p className="text-xs uppercase tracking-wide text-navy-200 mt-1">Days Remaining</p>
            <p className="text-xs text-navy-100 mt-1">~{weeksRemaining} weeks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="gold" size="sm" onClick={onEdit}><Edit className="h-3.5 w-3.5 mr-1" /> Update Date</Button>
            <Link href="/study-plans"><Button variant="ghost" size="sm" className="text-white hover:bg-white/10">View Plan</Button></Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}