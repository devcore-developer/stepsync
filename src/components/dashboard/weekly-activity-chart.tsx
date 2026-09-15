import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { weeklyActivity } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function WeeklyActivityChart() {
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));
  const totalHours = weeklyActivity.reduce((sum, d) => sum + d.hours, 0);
  const avgHours = (totalHours / weeklyActivity.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Weekly Study Activity</CardTitle>
          <p className="mt-0.5 text-[0.75rem] text-ink-secondary">
            {totalHours.toFixed(1)}h total · {avgHours}h/day avg
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[180px] items-end justify-between gap-2 sm:gap-3">
          {weeklyActivity.map((d) => {
            const heightPct = (d.hours / maxHours) * 100;
            const isMax = d.hours === maxHours;
            return (
              <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-[0.6875rem] font-semibold text-ink-secondary transition-colors group-hover:text-navy-500">
                  {d.hours}h
                </span>
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-all duration-300",
                      d.isToday
                        ? "bg-accent-gold"
                        : isMax
                        ? "bg-brand-500"
                        : "bg-brand-200 group-hover:bg-brand-300"
                    )}
                    style={{ height: `${Math.max(heightPct, 6)}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[0.6875rem] font-medium",
                    d.isToday ? "text-accent-gold" : "text-ink-tertiary"
                  )}
                >
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 border-t border-surface-border pt-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-brand-500" />
            <span className="text-[0.6875rem] text-ink-secondary">Peak day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent-gold" />
            <span className="text-[0.6875rem] text-ink-secondary">Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-brand-200" />
            <span className="text-[0.6875rem] text-ink-secondary">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}