"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getPerformanceData } from "@/app/actions/questions";
import { LineChart, ArrowRight, Target } from "lucide-react";
import Link from "next/link";

export default function PerformancePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getPerformanceData();
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

  if (!data || data.totalQuestions === 0) {
    return (
      <AppShell>
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
          <PageHeader title="Performance" description="Understand your progress, identify weak areas, and make better study decisions." />
          
          <Card>
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-4">
                <LineChart className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-navy-700">No Performance Data Yet</h3>
              <p className="mt-1 text-sm text-ink-secondary max-w-sm">
                Complete your first question block to start building your performance profile.
              </p>
              <Link href="/questions" className="mt-6">
                <Button variant="primary">Start Question Block</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <PageHeader title="Performance" description="Understand your progress, identify weak areas, and make better study decisions." />

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">Total Questions</p>
            <p className="mt-1 text-2xl font-bold text-navy-700">{data.totalQuestions}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">Overall Accuracy</p>
            <p className="mt-1 text-2xl font-bold text-brand-600">{data.accuracy}%</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">Systems Covered</p>
            <p className="mt-1 text-2xl font-bold text-navy-700">{data.systems.length}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">Recent Sessions</p>
            <p className="mt-1 text-2xl font-bold text-navy-700">{data.recentSessions.length}</p>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Performance */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">System Performance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {data.systems.map((sys: any) => (
                  <div key={sys.name}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-ink-secondary">{sys.name}</p>
                      <Badge variant={sys.accuracy >= 75 ? "green" : sys.accuracy >= 65 ? "brand" : "red"}>
                        {sys.accuracy}%
                      </Badge>
                    </div>
                    <Progress value={sys.accuracy} color="brand" size="sm" />
                    <p className="text-xs text-ink-tertiary mt-1">{sys.total} Questions</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {data.recentSessions.map((s: any) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-md border border-surface-border">
                    <div>
                      <p className="text-sm font-semibold text-navy-700">{s.total} Questions</p>
                      <p className="text-xs text-ink-tertiary">{new Date(s.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={s.accuracy >= 75 ? "green" : s.accuracy >= 65 ? "brand" : "red"}>
                      {s.accuracy}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Link href="/questions">
              <Button variant="red" className="w-full"><Target className="h-4 w-4 mr-2" /> Practice More Questions</Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}