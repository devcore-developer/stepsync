import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskItem } from "./task-item";
import { todaysTasks } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export function TodaysPlan() {
  const completed = todaysTasks.filter((t) => t.status === "completed").length;
  const total = todaysTasks.length;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Today&apos;s Study Plan</CardTitle>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-brand-700">
            {completed}/{total} done
          </span>
        </div>
        <Link href="/study-plan">
          <Button variant="ghost" size="sm">
            Full plan <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {todaysTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        {/* Progress summary */}
        <div className="mt-4 flex items-center justify-between rounded-md bg-surface-subtle px-4 py-3">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-brand-700">
              Daily Goal
            </p>
            <p className="text-[0.8125rem] font-semibold text-navy-500">
              {completed} of {total} tasks · {Math.round((completed / total) * 100)}% complete
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-brand-700">
              Remaining
            </p>
            <p className="text-[0.8125rem] font-semibold text-navy-500">2h 30m</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}