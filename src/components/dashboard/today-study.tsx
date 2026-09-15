"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, BookOpen, Video, FileQuestion, Layers, ArrowRight } from "lucide-react";
import { todayStudy } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const typeIcon = {
  Reading: BookOpen,
  Videos: Video,
  Questions: FileQuestion,
  Review: Layers,
};

export function TodayStudy() {
  const [tasks, setTasks] = useState(todayStudy.tasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Today&apos;s Study</CardTitle>
          <p className="mt-1 text-sm text-ink-secondary">{todayStudy.system} System</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-navy-700">{Math.round(progress)}%</span>
          <p className="text-xs text-ink-tertiary">{completedCount} of {tasks.length} tasks</p>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} color="brand" className="mb-4" />
        
        <div className="space-y-2">
          {tasks.map((task) => {
            // Fallback to Layers icon if task.type is undefined
            const Icon = task.type ? typeIcon[task.type] : Layers;
            return (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all",
                  task.completed ? "border-surface-border bg-surface-muted/50" : "border-surface-border hover:border-brand-300 hover:bg-brand-50/50"
                )}
              >
                <div className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                  task.completed ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300 bg-white"
                )}>
                  {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-subtle text-brand-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", task.completed ? "text-ink-tertiary line-through" : "text-navy-700")}>
                    {task.title}
                  </p>
                  <p className="text-xs text-ink-tertiary">{task.resource} · {task.duration} min</p>
                </div>
              </div>
            );
          })}
        </div>

        <Button variant="red" size="lg" className="w-full mt-5">
          Continue Studying <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}