"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DayActivity {
  day: string;
  minutes: number;
  isToday?: boolean;
}

export function WeeklyActivity({ data }: { data: DayActivity[] }) {
  const maxMins = Math.max(...data.map(d => d.minutes), 60); // Minimum 60 to avoid huge bars for small times

  return (
    <Card>
      <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
      <CardContent>
        <div className="flex h-[160px] items-end justify-between gap-2">
          {data.map((d) => {
            const heightPct = (d.minutes / maxMins) * 100;
            return (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2 group">
                <span className="text-[0.6875rem] font-semibold text-ink-secondary opacity-0 group-hover:opacity-100 transition">
                  {d.minutes}m
                </span>
                <div className="flex w-full flex-1 items-end">
                  <div 
                    className={cn(
                      "w-full rounded-t-md transition-all duration-300",
                      d.isToday ? "bg-accent-gold" : "bg-brand-200 group-hover:bg-brand-300"
                    )} 
                    style={{ height: `${Math.max(heightPct, 4)}%` }} 
                  />
                </div>
                <span className={cn("text-[0.6875rem] font-medium", d.isToday ? "text-accent-gold" : "text-ink-tertiary")}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}