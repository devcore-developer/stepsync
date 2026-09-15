import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ReadinessData } from "@/lib/readiness-engine";

interface Props {
  data: ReadinessData;
}

export function ReadinessBreakdown({ data }: Props) {
  const metrics = [
    { label: 'Question Performance', value: data.questionAccuracy, detail: `${data.questionsCompleted} questions completed`, status: data.questionAccuracy >= 75 ? 'Strong' : 'Needs Review' },
    { label: 'Study Plan Progress', value: data.planCompletion, detail: `${data.planDaysCompleted} / ${data.planDaysTotal} days`, status: data.planCompletion >= 70 ? 'On Track' : 'Behind' },
    { label: 'System Coverage', value: data.systemCoverage, detail: '18 USMLE systems', status: data.systemCoverage >= 70 ? 'On Track' : 'Needs Review' },
    { label: 'Review Retention', value: data.reviewRetention, detail: `${data.reviewCardsDue} cards due`, status: data.reviewRetention >= 80 ? 'Strong' : 'Needs Review' },
    { label: 'Study Consistency', value: data.studyConsistency, detail: `${data.studyStreak} day streak`, status: data.studyConsistency >= 80 ? 'Strong' : 'Low' },
    { label: 'UWorld Progress', value: data.uworldProgress, detail: `${data.questionsCompleted} / ${data.questionsTotal}`, status: data.uworldProgress >= 70 ? 'On Track' : 'Behind' },
  ];

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Readiness Breakdown</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-ink-secondary">{m.label}</p>
              <Badge variant={m.status === 'Strong' || m.status === 'On Track' ? 'green' : m.status === 'Behind' ? 'red' : 'gold'}>{m.status}</Badge>
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-xl font-bold text-navy-700">{m.value}%</span>
            </div>
            <Progress value={m.value} size="sm" color="brand" />
            <p className="text-xs text-ink-tertiary mt-1">{m.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}