"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyPlans } from "@/context/study-plan-context";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { getPlan, toggleTask } = useStudyPlans();
  const plan = getPlan(id);

  if (!plan) {
    return (
      <AppShell>
        <Card><CardContent className="py-16 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-accent-red mb-4" />
          <h3 className="text-lg font-bold text-navy-700">Study Plan Not Found</h3>
          <Button className="mt-6" onClick={() => router.push('/study-plans')}>Back to Plans</Button>
        </CardContent></Card>
      </AppShell>
    );
  }

  const tasks = plan.tasks || [];
  const completedTasks = tasks.filter((t: any) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Group tasks by System
  const systemsMap = new Map<string, any[]>();
  tasks.forEach((task: any) => {
    if (!systemsMap.has(task.system)) {
      systemsMap.set(task.system, []);
    }
    systemsMap.get(task.system)!.push(task);
  });

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-700">{plan.name}</h1>
            <p className="text-sm text-ink-secondary mt-1">
              {new Date(plan.startDate).toLocaleDateString()} → {new Date(plan.examDate).toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline">Edit Plan</Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Overall Progress</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{progress}%</p>
            <Progress value={progress} color="brand" size="sm" className="mt-2" />
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Tasks Completed</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{completedTasks}<span className="text-sm font-normal text-ink-tertiary">/{tasks.length}</span></p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Total Systems</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{systemsMap.size}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase tracking-wide">Days Remaining</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{tasks.length - completedTasks}</p>
          </CardContent></Card>
        </div>

        {/* Systems List */}
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Systems</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from(systemsMap.entries()).map(([systemName, sysTasks]) => {
              const sysCompleted = sysTasks.filter((t: any) => t.completed).length;
              const sysProgress = sysTasks.length > 0 ? Math.round((sysCompleted / sysTasks.length) * 100) : 0;
              
              return (
                <div key={systemName} className="p-4 rounded-lg border border-surface-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-navy-700">{systemName}</h3>
                    <Badge variant={sysProgress === 100 ? "green" : sysProgress > 0 ? "brand" : "default"}>
                      {sysProgress}%
                    </Badge>
                  </div>
                  <Progress value={sysProgress} size="sm" color="brand" className="mb-2" />
                  <p className="text-xs text-ink-tertiary">{sysCompleted} / {sysTasks.length} days completed</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}