"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { systems } from "@/lib/demo-data";

export function SystemProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Progress</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {systems.map((system) => (
          <div key={system.id} className="rounded-lg border border-surface-border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-navy-700">{system.name}</span>
              <span className="text-sm font-bold text-navy-700">{system.progress}%</span>
            </div>
            <Progress value={system.progress} color="brand" size="sm" />
            <p className="text-xs text-ink-tertiary mt-1">{system.completedTasks} / {system.totalTasks} tasks</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}