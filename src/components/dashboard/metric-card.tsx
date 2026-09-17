// @ts-nocheck
import { TrendingUp, TrendingDown, Minus, Flame, Clock, Target, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/demo-data";

const accentMap = {
  brand: { bg: "bg-brand-50", text: "text-brand-700", icon: "text-brand-500" },
  gold: { bg: "bg-amber-50", text: "text-[#9a6f12]", icon: "text-accent-gold" },
  navy: { bg: "bg-navy-50", text: "text-navy-500", icon: "text-navy-500" },
  red: { bg: "bg-red-50", text: "text-accent-red", icon: "text-accent-red" },
};

function MetricIcon({ type, className }: { type: Metric["icon"]; className?: string }) {
  switch (type) {
    case "progress":
      return <Target className={className} />;
    case "streak":
      return <Flame className={className} />;
    case "hours":
      return <Clock className={className} />;
    case "questions":
      return <ListChecks className={className} />;
  }
}

export function MetricCard({ metric }: { metric: Metric }) {
  const accent = accentMap[metric.accent];
  const TrendIcon = metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus;

  return (
    <div className="ss-card ss-card-hover group relative overflow-hidden p-5">
      {/* Subtle top accent line */}
      <div className={cn("absolute inset-x-0 top-0 h-[3px]", accent.bg)} />

      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", accent.bg)}>
          <MetricIcon type={metric.icon} className={cn("h-5 w-5", accent.icon)} />
        </div>
        <div className={cn("flex items-center gap-1 text-[0.75rem] font-semibold", accent.text)}>
          <TrendIcon className="h-3.5 w-3.5" />
          {metric.trendValue}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[1.625rem] font-bold leading-tight tracking-tight text-navy-500">
          {metric.value}
        </p>
        <p className="mt-0.5 text-[0.8125rem] font-medium text-ink-secondary">{metric.label}</p>
        <p className="mt-1 text-[0.6875rem] text-ink-tertiary">{metric.context}</p>
      </div>
    </div>
  );
}