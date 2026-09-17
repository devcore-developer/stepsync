"use client";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyPlans } from "@/context/study-plan-context";
import { ChevronLeft, Check, BookOpen, FileQuestion, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemDetailPage({ params }: { params: { id: string; systemId: string } }) {
  const { id, systemId } = params;
  const { getPlan, toggleTask } = useStudyPlans();
  const plan = getPlan(id);
  
  if (!plan) return <AppShell><div>Plan not found</div></AppShell>;

  const system = plan.systems.find((s: any) => s.systemId === systemId);
  if (!system) return <AppShell><div>System not found</div></AppShell>;

  const tasks = plan.tasks.filter((t: any) => t.systemId === systemId);
  const completedTasks = tasks.filter((t: any) => t.completed).length;
  const questions = tasks.filter((t: any) => t.questions).reduce((sum: number, t: any) => sum + (t.questions || 0), 0);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <Link href={`/study-plans/${id}`} className="inline-flex items-center text-sm text-ink-secondary hover:text-navy-700">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Plan
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-700">{system.name}</h1>
            <p className="text-sm text-ink-secondary mt-1">{system.estimatedDays} planned days · {new Date(system.startDate).toLocaleDateString()} → {new Date(system.endDate).toLocaleDateString()}</p>
          </div>
          <Badge variant={system.status === 'Active' ? 'green' : 'default'}>{system.status}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">Progress</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{system.progress}%</p>
            <Progress value={system.progress} color="brand" size="sm" className="mt-2" />
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">Tasks</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{completedTasks}/{tasks.length}</p>
            <p className="text-xs text-ink-secondary mt-2">Completed</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">Questions</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{questions}</p>
            <p className="text-xs text-ink-secondary mt-2">Planned</p>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Tasks</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task: any) => (
              <div key={task.id} onClick={() => toggleTask(plan.id, task.id)} className={cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition", task.completed ? "border-surface-border bg-surface-muted/50" : "border-surface-border hover:border-brand-300 hover:bg-brand-50/50")}>
                <div className={cn("h-5 w-5 rounded-md border flex items-center justify-center", task.completed ? "bg-brand-500 border-brand-500 text-white" : "border-slate-300 bg-white")}>
                  {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", task.completed ? "text-ink-tertiary line-through" : "text-navy-700")}>{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-ink-tertiary">{new Date(task.date).toLocaleDateString()}</span>
                    <Badge variant="default" className="text-[0.625rem]">{task.resource}</Badge>
                  </div>
                </div>
                {task.questions && <Badge variant="red" className="hidden sm:inline-flex">{task.questions} Qs</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}