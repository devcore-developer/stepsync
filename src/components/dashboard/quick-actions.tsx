import Link from "next/link";
import { Play, CalendarDays, BarChart3, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { quickActions } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

const iconMap = {
  play: Play,
  calendar: CalendarDays,
  chart: BarChart3,
  users: Users,
};

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {quickActions.map((action) => {
        const Icon = iconMap[action.icon];
        const isPrimary = action.variant === "primary";

        return (
          <Link key={action.id} href={action.href}>
            <div
              className={cn(
                "group flex h-full flex-col justify-between rounded-lg border p-4 transition-all duration-200",
                isPrimary
                  ? "border-brand-500 bg-brand-500 text-white hover:bg-brand-600 hover:shadow-card-hover"
                  : "border-surface-border bg-white hover:border-brand-200 hover:shadow-card-hover"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md",
                    isPrimary ? "bg-white/15 text-white" : "bg-surface-subtle text-brand-500"
                  )}
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </div>
                <ArrowRight
                  className={cn(
                    "h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100",
                    isPrimary ? "text-white" : "text-brand-500"
                  )}
                />
              </div>
              <div className="mt-3">
                <p className={cn("text-[0.8125rem] font-semibold", isPrimary ? "text-white" : "text-navy-500")}>
                  {action.label}
                </p>
                <p className={cn("mt-0.5 text-[0.6875rem]", isPrimary ? "text-navy-100" : "text-ink-secondary")}>
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}