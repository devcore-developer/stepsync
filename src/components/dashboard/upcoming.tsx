import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upcoming } from "@/lib/demo-data";
import { Clock } from "lucide-react";

export function Upcoming() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coming Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcoming.map((item, i) => (
          <div key={item.id} className="relative pl-6 pb-4 border-l border-surface-border last:border-l-0 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 flex h-3 w-3 items-center justify-center rounded-full bg-brand-500 ring-2 ring-white" />
            <div className="absolute left-0 top-0 h-full"></div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-brand-600">{item.when}</p>
            <p className="text-sm font-semibold text-navy-700">{item.title}</p>
            <p className="text-xs text-ink-secondary">{item.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}