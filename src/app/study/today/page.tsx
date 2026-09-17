"use client";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyPlans } from "@/context/study-plan-context";
import { useAccount } from "@/context/account-context";
import { CheckCircle2, CalendarClock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudyTodayPage() {
  const { plans, loading } = useStudyPlans();
  const { profile } = useAccount();

  const todayStr = new Date().toISOString().split('T')[0];
  
  // Fetch real tasks for today across all user's plans
  const todayTasks = plans.flatMap(p => p.tasks.filter((t: any) => t.date === todayStr));
  const completedCount = todayTasks.filter((t: any) => t.completed).length;
  const progress = todayTasks.length > 0 ? Math.round((completedCount / todayTasks.length) * 100) : 0;

  if (loading) return <AppShell><div className="p-8 text-center text-ink-secondary">Loading today's plan...</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-navy-600 p-6 text-white shadow-nav">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-navy-100">Good morning,</p>
              <h1 className="mt-0.5 text-3xl font-bold tracking-tight">{profile.fullName || "User"}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
                <CalendarClock className="h-4 w-4 text-accent-gold" />
                <p className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium">{progress}% Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today's Tasks</CardTitle>
                  <Badge variant={progress === 100 ? "green" : "brand"}>{completedCount}/{todayTasks.length} done</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-700">You're all caught up!</h3>
                    <p className="mt-1 text-sm text-ink-secondary">No study tasks scheduled for today. Enjoy your rest or get ahead.</p>
                    <Link href="/study-plans" className="mt-6">
                      <Button variant="outline">View Study Plans</Button>
                    </Link>
                  </div>
                ) : (
                  todayTasks.map((task: any) => (
                    <div key={task.id} className={`flex items-center gap-3 rounded-lg border p-3 ${task.completed ? 'border-surface-border bg-surface-muted/50 opacity-70' : 'border-surface-border hover:border-brand-300'}`}>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${task.completed ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300'}`}>
                        {task.completed && <CheckCircle2 className="h-3 w-3" strokeWidth={3} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.completed ? 'text-ink-tertiary line-through' : 'text-navy-700'}`}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="navy" className="text-[0.625rem]">{task.system}</Badge>
                        </div>
                      </div>
                      <Link href="/study-plans"><Button variant="ghost" size="sm">Open</Button></Link>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Daily Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-secondary">Tasks Completed</span>
                    <span className="font-bold text-navy-700">{completedCount} / {todayTasks.length}</span>
                  </div>
                  <Progress value={progress} color="brand" size="sm" />
                </div>
                <div className="pt-3 border-t border-surface-border">
                  <Button variant="red" size="sm" className="w-full">Continue Studying <ArrowRight className="h-4 w-4 ml-1" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}