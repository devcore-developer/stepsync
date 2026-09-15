import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  context?: string;
  trend?: number;
}

export function MetricCard({ label, value, context, trend }: Props) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">{label}</p>
        <p className="mt-1 text-2xl font-bold text-navy-700">{value}</p>
        <div className="mt-2 flex items-center gap-2">
          {trend !== undefined && (
            <span className={cn("flex items-center text-xs font-semibold", trend > 0 ? "text-emerald-600" : trend < 0 ? "text-accent-red" : "text-ink-tertiary")}>
              {trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : trend < 0 ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
              {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : "0%"}
            </span>
          )}
          {context && <span className="text-xs text-ink-tertiary">{context}</span>}
        </div>
      </CardContent>
    </Card>
  );
}