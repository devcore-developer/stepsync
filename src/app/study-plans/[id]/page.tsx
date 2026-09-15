"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useStudyPlans } from "@/context/study-plan-context";
import { Check, CalendarDays, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getPlan, toggleTask } = useStudyPlans();
  const plan = getPlan(id);

  if (!plan) {
    return (
      <AppShell>
        <Card><CardContent className="py-16 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-accent-red mb-4" />
          <h3 className="text-lg font-bold text-navy-700">Study Plan Not Found</h3>
          <p className="text-sm text-ink-secondary mt-1">The plan you are looking for does not exist or has been deleted.</p>
          <Button className="mt-6" onClick={() => router.push('/study-plans')}>Back to Plans</Button>
        </CardContent></Card>
      </AppShell>
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = plan.tasks.filter(t => t.date === todayStr);
  const completedToday = todayTasks.filter(t => t.completed).length;
  
  const upcomingDays = [...new Set(plan.tasks.filter(t => t.date > todayStr).map(t => t.date))].slice(0, 7);
  const currentSystem = plan.systems.find(s => s.status === 'Active') || plan.systems[0];

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-700">{plan.name}</h1>
            <p className="text-sm text-ink-secondary flex items-center gap-2 mt-1">
              <Badge variant={plan.status === 'Active' ? 'green' : 'default'}>{plan.status}</Badge>
              <span className="flex items-center"><CalendarDays className="h-3.5 w-3.5 mr-1" /> Exam: {new Date(plan.examDate).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Archive</Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Overall Progress</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{plan.progress}%</p>
            <Progress value={plan.progress} color="brand" size="sm" className="mt-2" />
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Tasks Completed</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{plan.tasks.filter(t => t.completed).length}<span className="text-sm font-normal text-ink-tertiary">/{plan.tasks.length}</span></p>
            <p className="text-xs text-ink-secondary mt-2">Keep going!</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Study Streak</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">7 days</p>
            <p className="text-xs text-ink-secondary mt-2">Don't break the chain</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Days Remaining</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{Math.ceil((new Date(plan.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}</p>
            <p className="text-xs text-ink-secondary mt-2">Until Step 1</p>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Today&apos;s Study</CardTitle>
                <Badge variant="brand">{completedToday}/{todayTasks.length} done</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.length === 0 ? (
                <div className="text-center py-8 text-sm text-ink-secondary">No tasks scheduled for today. Enjoy your rest day!</div>
              ) : (
                todayTasks.map(task => (
                  <div key={task.id} onClick={() => toggleTask(plan.id, task.id)} className={cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition", task.completed ? "border-surface-border bg-surface-muted/50" : "border-surface-border hover:border-brand-300 hover:bg-brand-50/50")}>
                    <div className={cn("h-5 w-5 rounded-md border flex items-center justify-center", task.completed ? "bg-brand-500 border-brand-500 text-white" : "border-slate-300 bg-white")}>
                      {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium", task.completed ? "text-ink-tertiary line-through" : "text-navy-700")}>{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" className="text-[0.625rem]">{task.systemName}</Badge>
                        <span className="text-xs text-ink-tertiary">{task.resource} · {task.duration} min</span>
                      </div>
                    </div>
                    {task.questions && <Badge variant="red" className="hidden sm:inline-flex">{task.questions} Qs</Badge>}
                  </div>
                ))
              )}
              <Button variant="red" size="lg" className="w-full mt-2">Continue Studying <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </CardContent>
          </Card>

          {/* Current System & Upcoming */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Current System</CardTitle></CardHeader>
              <CardContent>
                <h3 className="font-bold text-navy-700">{currentSystem?.name}</h3>
                <p className="text-xs text-ink-secondary mt-1">Estimated: {currentSystem?.estimatedDays} days</p>
                <div className="mt-3">
                  <Progress value={currentSystem?.progress || 0} color="brand" size="sm" />
                  <p className="text-xs text-right text-ink-tertiary mt-1">{currentSystem?.progress || 0}% Complete</p>
                </div>
                <Link href={`/study-plans/${plan.id}/systems/${currentSystem?.systemId}`}>
                  <Button variant="outline" size="sm" className="w-full mt-3">View System</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Upcoming</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingDays.map(date => {
                  const task = plan.tasks.find(t => t.date === date);
                  return (
                    <div key={date} className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-surface-subtle text-brand-600">
                        <span className="text-[0.625rem] font-bold uppercase">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-sm font-bold leading-none">{new Date(date).getDate()}</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-navy-700">{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        <p className="text-xs text-ink-tertiary">{task?.systemName || "Review"}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import Link from "next/link";