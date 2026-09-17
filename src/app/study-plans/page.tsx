"use client";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyPlans } from "@/context/study-plan-context";
import { Plus, CalendarClock, Layers, CheckCircle, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export default function StudyPlansPage() {
  const { plans, loading } = useStudyPlans();

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        <PageHeader title="Study Plans" description="Build, manage, and track your USMLE Step 1 preparation.">
          <Link href="/study-plans/new">
            <Button variant="red"><Plus className="h-4 w-4" /> Create Study Plan</Button>
          </Link>
        </PageHeader>

        {loading ? (
          <Card><CardContent className="py-16 text-center text-sm text-ink-secondary">Loading your study plans...</CardContent></Card>
        ) : plans.length === 0 ? (
          <Card>
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-4">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-navy-700">Your Step 1 journey starts here.</h3>
              <p className="mt-1 text-sm text-ink-secondary max-w-sm">Create your first study plan and let StepSync organize your preparation.</p>
              <Link href="/study-plans/new" className="mt-6">
                <Button variant="primary">Create Study Plan</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan) => {
              const tasks = plan.tasks || [];
              const completedTasks = tasks.filter((t: any) => t.completed).length;
              const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
              
              return (
                <Card key={plan.id} className="hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-navy-700">{plan.name}</h3>
                        <p className="text-sm text-ink-secondary mt-1 flex items-center gap-1">
                          <CalendarClock className="h-3.5 w-3.5" /> Start: {new Date(plan.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={plan.status === 'Active' ? 'green' : 'default'}>{plan.status}</Badge>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-ink-secondary mb-1">
                        <span>Overall Progress</span>
                        <span className="font-bold text-navy-700">{progress}%</span>
                      </div>
                      <Progress value={progress} color="brand" size="sm" />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t border-surface-border pt-4">
                      <div>
                        <p className="text-xs text-ink-tertiary">Total Days</p>
                        <p className="text-sm font-bold text-navy-700 flex items-center justify-center gap-1 mt-1"><Layers className="h-3 w-3" /> {tasks.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-ink-tertiary">Tasks Done</p>
                        <p className="text-sm font-bold text-navy-700 flex items-center justify-center gap-1 mt-1"><CheckCircle className="h-3 w-3" /> {completedTasks}/{tasks.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-ink-tertiary">Exam Date</p>
                        <p className="text-sm font-bold text-navy-700 flex items-center justify-center gap-1 mt-1"><CalendarClock className="h-3 w-3" /> {new Date(plan.examDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <Link href={`/study-plans/${plan.id}`} className="mt-6 block">
                      <Button variant="outline" className="w-full">Open Plan <ArrowRight className="h-4 w-4 ml-1" /></Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}