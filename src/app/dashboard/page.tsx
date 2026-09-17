"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyPlans } from "@/context/study-plan-context";
import { useAccount } from "@/context/account-context";
import { getReadinessData, getWeeklyStudyTime } from "@/app/actions/analytics";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { CheckCircle2, CalendarClock, Target, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { plans, loading } = useStudyPlans();
  const { profile } = useAccount();
  const [metrics, setMetrics] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMetrics() {
      const data = await getReadinessData();
      setMetrics(data);
      const weekly = await getWeeklyStudyTime();
      setWeeklyData(weekly);
    }
    fetchMetrics();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = plans.flatMap(p => p.tasks.filter((t: any) => t.date === todayStr));
  const completedToday = todayTasks.filter((t: any) => t.completed).length;
  const progress = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-navy-600 p-6 text-white shadow-nav">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-navy-100">Welcome back,</p>
              <h1 className="mt-0.5 text-3xl font-bold tracking-tight">{profile.fullName || "User"}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
                <CalendarClock className="h-4 w-4 text-accent-gold" />
                <p className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              {metrics && (
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium">{metrics.readinessScore}% Readiness</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Today's Tasks</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{completedToday} / {todayTasks.length}</p>
            <Progress value={progress} color="brand" size="sm" className="mt-2" />
          </CardContent></Card>
          
          <Card><CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Overall Progress</p>
            <p className="text-2xl font-bold text-brand-600 mt-1">{metrics?.planCompletion || 0}%</p>
            <p className="text-xs text-ink-secondary mt-1">{metrics?.completedTasks || 0} tasks done</p>
          </CardContent></Card>

          <Card><CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Questions Done</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{metrics?.totalQuestions || 0}</p>
            <p className="text-xs text-ink-secondary mt-1">{metrics?.questionAccuracy || 0}% accuracy</p>
          </CardContent></Card>

          <Card><CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Reviews Due</p>
            <p className="text-2xl font-bold text-accent-gold mt-1">{metrics?.dueCards || 0}</p>
            <p className="text-xs text-ink-secondary mt-1">Flashcards</p>
          </CardContent></Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Plan & Weekly Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-navy-700 mb-4">Today's Study Plan</h2>
                {loading ? (
                  <p className="text-sm text-ink-secondary">Loading tasks...</p>
                ) : todayTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-navy-700">You're all caught up!</p>
                    <p className="text-xs text-ink-secondary mt-1">No tasks scheduled for today.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todayTasks.map((task: any) => (
                      <div key={task.id} className={`flex items-center gap-3 rounded-lg border p-3 ${task.completed ? 'border-surface-border bg-surface-muted/50 opacity-70' : 'border-surface-border'}`}>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${task.completed ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300'}`}>
                          {task.completed && <CheckCircle2 className="h-3 w-3" strokeWidth={3} />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${task.completed ? 'text-ink-tertiary line-through' : 'text-navy-700'}`}>{task.title}</p>
                          <Badge variant="navy" className="mt-1">{task.system}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/study/today" className="mt-6 block">
                  <Button variant="red" className="w-full">Continue Studying <ArrowRight className="h-4 w-4 ml-1" /></Button>
                </Link>
              </CardContent>
            </Card>

            {/* Weekly Activity Chart (Real Data) */}
            <WeeklyActivity data={weeklyData} />
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-gold mb-2">Next Best Action</p>
                <h3 className="text-sm font-bold text-white">
                  {todayTasks.length > 0 ? "Complete today's study tasks" : "Review your schedule"}
                </h3>
                <p className="text-xs text-navy-100 mt-1">
                  {todayTasks.length > 0 ? `You have ${todayTasks.length} tasks scheduled for today.` : "No tasks today. Enjoy your rest or study ahead."}
                </p>
                <Link href="/study/today" className="mt-3 block">
                  <Button variant="red" size="sm" className="w-full">Start Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-bold text-navy-700 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/questions" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Target className="h-3.5 w-3.5 mr-2 text-brand-500" /> Practice Questions
                    </Button>
                  </Link>
                  <Link href="/review" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Flame className="h-3.5 w-3.5 mr-2 text-accent-gold" /> Review Flashcards ({metrics?.dueCards || 0})
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}