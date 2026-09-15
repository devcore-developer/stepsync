"use client";
import { use, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStudyPlans } from "@/context/study-plan-context";
import { ChevronLeft, ChevronRight, CalendarDays, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getPlan } = useStudyPlans();
  const plan = getPlan(id);
  const [view, setView] = useState<"week" | "timeline">("week");
  
  if (!plan) return <AppShell><div>Plan not found</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-navy-700">Schedule</h1>
          <div className="flex gap-2 bg-surface-muted p-1 rounded-md">
            <Button size="sm" variant={view === 'week' ? 'primary' : 'ghost'} onClick={() => setView('week')}><CalendarDays className="h-4 w-4 mr-1" /> Weekly</Button>
            <Button size="sm" variant={view === 'timeline' ? 'primary' : 'ghost'} onClick={() => setView('timeline')}><ListTree className="h-4 w-4 mr-1" /> Timeline</Button>
          </div>
        </div>

        {view === 'week' ? (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + i + 1);
              const dateStr = date.toISOString().split('T')[0];
              const dayTasks = plan.tasks.filter(t => t.date === dateStr);
              return (
                <Card key={day} className="min-h-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{day} <span className="text-ink-tertiary font-normal">{date.getDate()}</span></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {dayTasks.map(t => (
                      <div key={t.id} className="text-xs p-2 rounded bg-surface-subtle border-l-2 border-brand-500">
                        <p className="font-semibold text-navy-700">{t.title}</p>
                        <p className="text-ink-tertiary">{t.duration} min</p>
                      </div>
                    ))}
                    {dayTasks.length === 0 && <p className="text-xs text-ink-tertiary text-center py-4">No tasks</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardHeader><CardTitle>System Timeline</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {plan.systems.map(sys => (
                <div key={sys.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 text-sm font-semibold text-navy-700">{sys.name}</div>
                  <div className="col-span-6">
                    <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${sys.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="col-span-3 text-xs text-ink-secondary text-right">
                    {new Date(sys.startDate).toLocaleDateString()} → {new Date(sys.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}