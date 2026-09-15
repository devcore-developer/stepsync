import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, AlertTriangle, ShieldAlert, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdaptiveStatus } from "@/lib/adaptive-engine";

const statusConfig: Record<AdaptiveStatus, { icon: any; color: string; bg: string; text: string }> = {
  'On Track': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700' },
  'Ahead': { icon: Flame, color: 'text-accent-gold', bg: 'bg-amber-50 border-amber-100', text: 'text-amber-700' },
  'Slightly Behind': { icon: TrendingUp, color: 'text-brand-600', bg: 'bg-brand-50 border-brand-100', text: 'text-brand-700' },
  'At Risk': { icon: AlertTriangle, color: 'text-accent-red', bg: 'bg-red-50 border-red-100', text: 'text-accent-red-dark' },
  'Critical': { icon: ShieldAlert, color: 'text-accent-red', bg: 'bg-red-50 border-red-100', text: 'text-accent-red-dark' },
};

export function AdaptiveStatus({ status, message }: { status: AdaptiveStatus; message: string }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className={cn("border-l-4", config.bg)}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-white", config.color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={cn("text-sm font-bold uppercase tracking-wide", config.text)}>{status}</h3>
          </div>
          <p className="text-sm text-ink-secondary mt-0.5">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}