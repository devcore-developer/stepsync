import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { systemProgress } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SystemProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Progress</CardTitle>
        <Link href="/study-plan">
          <Button variant="ghost" size="sm">
            All systems <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemProgress.map((system) => (
            <div key={system.id} className="group">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[0.8125rem] font-semibold text-navy-500">{system.name}</span>
                  <span className="text-[0.6875rem] text-ink-tertiary">
                    {system.tasksCompleted}/{system.tasksTotal} tasks
                  </span>
                </div>
                <span className="text-[0.8125rem] font-bold text-navy-500">{system.progress}%</span>
              </div>
              <Progress value={system.progress} color={system.color} size="sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}