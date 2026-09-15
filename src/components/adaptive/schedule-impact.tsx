import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScheduleDrift } from "@/lib/adaptive-engine";

export function ScheduleImpact({ drift }: { drift: ScheduleDrift }) {
  if (drift.daysBehind === 0 && drift.status === 'On Track') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Schedule Impact Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-ink-tertiary mb-1">What happened?</p>
          <p className="text-ink">{drift.reason}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-border">
          <div>
            <p className="text-xs text-ink-tertiary">Original Completion</p>
            <p className="font-semibold text-navy-700">{drift.originalCompletionDate}</p>
          </div>
          <div>
            <p className="text-xs text-ink-tertiary">Projected Completion</p>
            <p className={drift.daysBehind > 0 ? "font-semibold text-accent-red" : "font-semibold text-emerald-600"}>
              {drift.projectedCompletionDate}
            </p>
          </div>
        </div>

        {drift.affectedSystems.length > 0 && (
          <div className="pt-2 border-t border-surface-border">
            <p className="text-xs font-semibold uppercase text-ink-tertiary mb-2">Affected Systems</p>
            <div className="flex flex-wrap gap-2">
              {drift.affectedSystems.map(s => <Badge key={s} variant="navy">{s}</Badge>)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}