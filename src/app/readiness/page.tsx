"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getReadinessData } from "@/app/actions/analytics";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function ReadinessPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getReadinessData();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="h-10 w-10 border-4 border-surface-border border-t-brand-500 rounded-full animate-spin"></div>
        </div>
      </AppShell>
    );
  }

  const status = data.readinessScore >= 70 ? "On Track" : data.readinessScore > 0 ? "Needs Attention" : "Insufficient Data";

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <PageHeader title="Exam Readiness" description="Track your overall preparation and identify what needs attention." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Readiness Score */}
          <Card className="border-l-4 border-brand-500">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wide mb-4">StepSync Readiness Score</h3>
              <div className="relative h-32 w-32 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                  <circle 
                    cx="60" cy="60" r="52" fill="none" stroke="#0057A8" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - data.readinessScore / 100)}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-navy-700">{data.readinessScore}%</span>
                </div>
              </div>
              <p className={`mt-4 text-lg font-bold ${status === "On Track" ? "text-brand-600" : "text-accent-gold"}`}>{status}</p>
              <p className="mt-2 text-xs text-ink-secondary max-w-xs">Based on your current study activity and performance. This is a planning indicator, not a prediction of exam outcome.</p>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-ink-secondary">Study Plan Progress</p>
                    <Badge variant={data.planCompletion >= 70 ? "green" : "gold"}>{data.planCompletion >= 70 ? "On Track" : "In Progress"}</Badge>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-xl font-bold text-navy-700">{data.planCompletion}%</span>
                  </div>
                  <Progress value={data.planCompletion} size="sm" color="brand" />
                  <p className="text-xs text-ink-tertiary mt-1">{data.completedTasks} / {data.totalTasks} tasks completed</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-ink-secondary">Question Accuracy</p>
                    <Badge variant={data.questionAccuracy >= 70 ? "green" : "gold"}>{data.questionAccuracy >= 70 ? "Strong" : "Needs Review"}</Badge>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-xl font-bold text-navy-700">{data.questionAccuracy}%</span>
                  </div>
                  <Progress value={data.questionAccuracy} size="sm" color="brand" />
                  <p className="text-xs text-ink-tertiary mt-1">{data.totalQuestions} questions answered</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-ink-secondary">Review Retention</p>
                    <Badge variant={data.reviewRetention >= 80 ? "green" : "gold"}>{data.dueCards > 0 ? "Reviews Due" : "Up to date"}</Badge>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-xl font-bold text-navy-700">{data.reviewRetention}%</span>
                  </div>
                  <Progress value={data.reviewRetention} size="sm" color="brand" />
                  <p className="text-xs text-ink-tertiary mt-1">{data.dueCards} cards due for review</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-ink-secondary">Study Consistency</p>
                    <Badge variant={data.studyConsistency >= 80 ? "green" : "gold"}>{data.studyConsistency >= 80 ? "Consistent" : "Low"}</Badge>
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-xl font-bold text-navy-700">{data.studyConsistency}%</span>
                  </div>
                  <Progress value={data.studyConsistency} size="sm" color="brand" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}