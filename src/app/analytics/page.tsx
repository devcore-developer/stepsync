import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analyticsSummary, weeklyActivity, systemProgress } from "@/lib/demo-data";
import { Download, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <AppShell>
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Analytics" description="Track your study performance and progress trends">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </PageHeader>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {analyticsSummary.map((item) => (
            <Card key={item.label} className="p-5">
              <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">{item.label}</p>
              <p className="mt-1 text-[1.5rem] font-bold text-navy-500">{item.value}</p>
              <p className="mt-0.5 text-[0.6875rem] text-ink-secondary">{item.sub}</p>
            </Card>
          ))}
        </div>

        {/* Weekly hours chart */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Weekly Study Hours</CardTitle>
              <p className="mt-0.5 flex items-center gap-1 text-[0.75rem] text-ink-secondary">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-semibold text-emerald-600">+13.2%</span> vs last week
              </p>
            </div>
            <Badge variant="green">On track</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-end justify-between gap-3">
              {weeklyActivity.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[0.6875rem] font-semibold text-ink-secondary">{d.hours}h</span>
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={cn(
                        "w-full rounded-t-md transition-all",
                        d.isToday ? "bg-accent-gold" : "bg-brand-300 hover:bg-brand-400"
                      )}
                      style={{ height: `${(d.hours / maxHours) * 100}%` }}
                    />
                  </div>
                  <span className="text-[0.6875rem] text-ink-tertiary">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Question completion */}
          <Card>
            <CardHeader>
              <CardTitle>Question Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" stroke="#005DAA" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.401)}`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[1.125rem] font-bold text-navy-500">40%</span>
                    <span className="text-[0.5625rem] text-ink-tertiary">complete</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8125rem] text-ink-secondary">Completed</span>
                    <span className="text-[0.8125rem] font-bold text-navy-500">1,284</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8125rem] text-ink-secondary">Remaining</span>
                    <span className="text-[0.8125rem] font-bold text-navy-500">1,916</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8125rem] text-ink-secondary">Avg accuracy</span>
                    <span className="text-[0.8125rem] font-bold text-emerald-600">72%</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-surface-border pt-2">
                    <span className="text-[0.8125rem] text-ink-secondary">Total target</span>
                    <span className="text-[0.8125rem] font-bold text-navy-500">3,200</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System progress */}
          <Card>
            <CardHeader>
              <CardTitle>System Progress Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemProgress.slice(0, 6).map((s) => (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[0.8125rem] font-medium text-navy-500">{s.name}</span>
                      <span className="text-[0.8125rem] font-bold text-navy-500">{s.progress}%</span>
                    </div>
                    <Progress value={s.progress} color={s.color} size="sm" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}