import { Card, CardContent } from "@/components/ui/card";
import { ReadinessData, calculateReadinessScore, getReadinessStatus } from "@/lib/readiness-engine";
import { cn } from "@/lib/utils";

const statusColors = {
  'Excellent': 'text-emerald-600',
  'On Track': 'text-brand-600',
  'Needs Attention': 'text-accent-gold',
  'At Risk': 'text-accent-red',
  'Insufficient Data': 'text-ink-tertiary'
};

export function ReadinessScore({ data }: { data: ReadinessData }) {
  const score = calculateReadinessScore(data);
  const status = getReadinessStatus(score, data.id);

  return (
    <Card className="border-l-4 border-brand-500">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wide mb-4">StepSync Readiness Score</h3>
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#F1F5F9" strokeWidth="8" />
            <circle 
              cx="60" cy="60" r="52" fill="none" stroke="#0057A8" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - score / 100)}`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-navy-700">{score}%</span>
          </div>
        </div>
        <p className={cn("mt-4 text-lg font-bold", statusColors[status])}>{status}</p>
        {status === 'Insufficient Data' ? (
          <p className="mt-2 text-xs text-ink-secondary max-w-xs">Complete more study tasks, practice questions, and reviews to generate a readiness score.</p>
        ) : (
          <p className="mt-2 text-xs text-ink-secondary max-w-xs">Based on your current study activity and performance. This is a planning indicator, not a prediction of exam outcome.</p>
        )}
      </CardContent>
    </Card>
  );
}