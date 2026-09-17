"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { todayStudy } from "@/lib/demo-data";

export function TodaysPlan() {
  const completed = todayStudy.tasks.filter((t) => t.completed).length;
  const progress = Math.round((completed / todayStudy.tasks.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Plan (Demo)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-ink-secondary">{todayStudy.system} System</p>
        <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        {todayStudy.tasks.map((task) => (
          <div key={task.id} className={`p-2 rounded-md border ${task.completed ? 'opacity-50' : ''}`}>
            <p className="text-sm font-medium text-navy-700">{task.title}</p>
            <p className="text-xs text-ink-tertiary">{task.resource} - {task.duration} min</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}