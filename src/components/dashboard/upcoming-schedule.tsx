import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { upcoming } from "@/lib/demo-data";
import { formatHours } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function UpcomingSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {upcoming.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-surface-border p-3 transition-colors hover:border-brand-200 hover:bg-surface-subtle/50"
            >
              <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-md bg-navy-50 text-navy-500">
                {item.day && (
                  <span className="text-[0.625rem] font-medium uppercase leading-none text-navy-300">
                    {item.day.slice(0, 3)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] font-semibold text-navy-500">
                  {item.system || item.title}
                </p>
                <p className="text-[0.6875rem] text-ink-secondary">
                  {item.taskCount && item.duration
                    ? `${item.taskCount} tasks · ${formatHours(item.duration)}`
                    : item.detail}
                </p>
              </div>
              <span className="text-[0.6875rem] font-medium text-ink-tertiary">
                {item.label || item.when}
              </span>
              <ChevronRight className="h-4 w-4 text-ink-tertiary" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}