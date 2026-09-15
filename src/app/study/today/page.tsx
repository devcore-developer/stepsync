"use client";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DailyHeader } from "@/components/study/daily-header";
import { TaskCard } from "@/components/study/task-card";
import { TaskDetailDrawer } from "@/components/study/task-detail-drawer";
import { StudySessionTimer } from "@/components/study/study-session-timer";
import { dailyTasks, upcomingTasks, recentActivity, uworldStats, weeklyStats, DailyTask } from "@/lib/daily-study-data";
import { CheckCircle2, CalendarClock, TrendingUp, AlertTriangle, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

export default function StudyTodayPage() {
  const [tasks, setTasks] = useState<DailyTask[]>(dailyTasks);
  const [activeTask, setActiveTask] = useState<DailyTask | null>(null);
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'not-started' : 'completed' } : t
    ));
    if (activeTask?.id === id) setActiveTask(null);
  };

  const handleSetActive = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'in-progress' } : t
    ));
    const task = tasks.find(t => t.id === id);
    if (task) setActiveTask(task);
  };

  const { completedCount, progress, totalDuration, completedDuration, totalQuestions, completedQuestions } = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed');
    const progress = Math.round((completed.length / tasks.length) * 100);
    const totalDur = tasks.reduce((s, t) => s + t.duration, 0);
    const compDur = completed.reduce((s, t) => s + t.duration, 0);
    const totalQ = tasks.reduce((s, t) => s + (t.questions || 0), 0);
    const compQ = completed.reduce((s, t) => s + (t.questions || 0), 0);
    return { completedCount: completed.length, progress, totalDuration: totalDur, completedDuration: compDur, totalQuestions: totalQ, completedQuestions: compQ };
  }, [tasks]);

  const isAllCompleted = completedCount === tasks.length;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
        <DailyHeader progress={progress} tasksCompleted={completedCount} totalTasks={tasks.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="lg:hidden">
              <StudySessionTimer activeTask={activeTask} onClearActive={() => setActiveTask(null)} />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today&apos;s Tasks</CardTitle>
                  <Badge variant={isAllCompleted ? "green" : "brand"}>{completedCount}/{tasks.length} done</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {isAllCompleted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-700">Today&apos;s plan is complete.</h3>
                    <p className="mt-1 text-sm text-ink-secondary">Excellent work. You&apos;ve completed everything scheduled for today.</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      View Tomorrow <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                ) : (
                  tasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={handleToggleComplete}
                      onSetActive={handleSetActive}
                      onSelect={setSelectedTask}
                    />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming</CardTitle>
                  <Link href="/study-plans">
                    <Button variant="ghost" size="sm">View Full Plan</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-md border border-surface-border hover:bg-surface-muted/50">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-md bg-surface-subtle text-brand-600">
                      <span className="text-[0.625rem] font-bold uppercase">{task.day.slice(0, 3)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-700">{task.system}</p>
                      <p className="text-xs text-ink-secondary">{task.topic} · {task.type}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-ink-tertiary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <StudySessionTimer activeTask={activeTask} onClearActive={() => setActiveTask(null)} />
            </div>

            {/* Daily Progress */}
            <Card>
              <CardHeader><CardTitle>Daily Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-secondary">Tasks Completed</span>
                    <span className="font-bold text-navy-700">{completedCount} / {tasks.length}</span>
                  </div>
                  <Progress value={progress} color="brand" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-secondary">Study Time</span>
                    <span className="font-bold text-navy-700">{Math.floor(completedDuration/60)}h {completedDuration%60}m / {Math.floor(totalDuration/60)}h {totalDuration%60}m</span>
                  </div>
                  <Progress value={(completedDuration/totalDuration)*100} color="navy" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-secondary">UWorld Questions</span>
                    <span className="font-bold text-navy-700">{completedQuestions} / {totalQuestions} questions</span>
                  </div>
                  <Progress value={(completedQuestions/totalQuestions)*100 || 0} color="red" size="sm" />
                </div>
              </CardContent>
            </Card>

            {/* Plan Status */}
            <Card className="border-brand-100 bg-gradient-to-br from-white to-brand-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-brand-600" />
                  <h3 className="text-sm font-bold text-navy-700">Plan Status</h3>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                  <p className="text-xs font-medium">You&apos;re on track today.</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[0.6875rem] text-ink-tertiary uppercase">Your Pace</p>
                    <p className="text-sm font-bold text-navy-700">18 tasks/wk</p>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] text-ink-tertiary uppercase">Target</p>
                    <p className="text-sm font-bold text-navy-700">19 tasks/wk</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UWorld Progress */}
            <Card>
              <CardHeader><CardTitle>UWorld Progress</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-2xl font-bold text-navy-700">{uworldStats.completed}</p>
                    <p className="text-xs text-ink-tertiary">Completed</p>
                  </div>
                  <Badge variant="brand">{((uworldStats.completed / uworldStats.total) * 100).toFixed(0)}%</Badge>
                </div>
                <Progress value={(uworldStats.completed / uworldStats.total) * 100} color="brand" size="sm" />
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-surface-muted">
                    <p className="text-ink-tertiary">This Week</p>
                    <p className="font-bold text-navy-700">{uworldStats.thisWeek}</p>
                  </div>
                  <div className="p-2 rounded bg-surface-muted">
                    <p className="text-ink-tertiary">Accuracy</p>
                    <p className="font-bold text-navy-700">{uworldStats.accuracy}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Execution */}
            <Card>
              <CardHeader><CardTitle>Weekly Execution</CardTitle></CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  {weeklyStats.map(day => (
                    <div key={day.day} className="flex flex-col items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${day.completion === 100 ? 'bg-emerald-500' : day.completion > 0 ? 'bg-brand-500' : 'bg-surface-border'}`} />
                      <span className="text-[0.6875rem] text-ink-tertiary">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-surface-border space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-secondary">Weekly Completion</span>
                    <span className="font-bold text-navy-700">84%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-secondary">Study Time</span>
                    <span className="font-bold text-navy-700">21h 40m</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-secondary">Avg Daily Completion</span>
                    <span className="font-bold text-navy-700">84%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-brand-500 mt-1.5" />
                        <div className="w-px h-full bg-surface-border" />
                      </div>
                      <div>
                        <p className="text-[0.6875rem] font-medium uppercase text-ink-tertiary">{item.time}</p>
                        <p className="text-sm text-navy-700">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <TaskDetailDrawer 
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onToggleComplete={handleToggleComplete}
        onSetActive={handleSetActive}
      />
    </AppShell>
  );
}