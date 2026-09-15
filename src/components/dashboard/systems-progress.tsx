import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { systems } from "@/lib/demo-data";

export function SystemsProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Systems</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {systems.map((sys) => (
          <div key={sys.id} className="rounded-lg border border-surface-border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-navy-700">{sys.name}</span>
              <Badge variant={sys.status === "Active" ? "brand" : sys.status === "Upcoming" ? "gold" : "default"}>
                {sys.status}
              </Badge>
            </div>
            <Progress value={sys.progress} size="sm" color={sys.progress > 50 ? "brand" : "gold"} />
            <div className="mt-2 flex items-center justify-between text-xs text-ink-secondary">
              <span>{sys.completedTasks} / {sys.totalTasks} tasks</span>
              <span className="font-bold text-navy-700">{sys.progress}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}