"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/performance/metric-card";
import { AccuracyChart } from "@/components/performance/accuracy-chart";
import { SystemTable } from "@/components/performance/system-table";
import { SystemDetailDrawer } from "@/components/performance/system-detail-drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { performanceScenarios } from "@/lib/performance-demo-data";
import { SystemPerformance } from "@/lib/performance-engine";
import { CheckCircle, AlertTriangle, Flame, CalendarDays, ChevronRight } from "lucide-react";

const timeRanges = ['7 Days', '30 Days', '90 Days', 'All Time'];

export default function PerformancePage() {
  const [scenarioId, setScenarioId] = useState('average');
  const [timeRange, setTimeRange] = useState('30 Days');
  const [selectedSystem, setSelectedSystem] = useState<SystemPerformance | null>(null);

  const scenario = performanceScenarios.find(s => s.id === scenarioId)!;
  const weakAreas = scenario.systems.filter(s => s.status === 'Weak' || s.status === 'Needs Review').slice(0, 3);
  const strongAreas = scenario.systems.filter(s => s.status === 'Strong').slice(0, 3);
  const isNewStudent = scenarioId === 'new';

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Performance" description="Understand your progress, identify weak areas, and make better study decisions." />
          <div className="flex gap-2">
            <select 
              value={scenarioId} 
              onChange={(e) => setScenarioId(e.target.value)}
              className="h-9 rounded-md border border-surface-border bg-surface-subtle px-3 text-sm font-medium text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {performanceScenarios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        {isNewStudent ? (
          <Card>
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-4">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-navy-700">No performance data yet.</h3>
              <p className="mt-1 text-sm text-ink-secondary max-w-sm">Complete your first study session or question block to start building your performance profile.</p>
              <Button variant="primary" className="mt-6">Go to Today's Study</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <MetricCard label="Plan Completion" value={`${scenario.summary.planCompletion}%`} />
              <MetricCard label="UWorld Completion" value={`${scenario.summary.uworldCompletion}%`} />
              <MetricCard label="Question Accuracy" value={`${scenario.summary.questionAccuracy}%`} trend={4} context="vs 30d" />
              <MetricCard label="Study Consistency" value={`${scenario.summary.studyConsistency}%`} />
              <MetricCard label="Avg Daily Study" value={scenario.summary.avgDailyStudyTime} />
              <MetricCard label="Current Streak" value={`${scenario.summary.currentStreak} days`} />
            </div>

            {/* Time Range Filter */}
            <div className="flex items-center gap-2 border-b border-surface-border pb-4">
              <span className="text-sm font-medium text-ink-secondary mr-2">Time Range:</span>
              {timeRanges.map(r => (
                <Button 
                  key={r} 
                  variant={timeRange === r ? 'primary' : 'ghost'} 
                  size="sm" 
                  onClick={() => setTimeRange(r)}
                >
                  {r}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <AccuracyChart data={scenario.weeklyAccuracy} />
                
                <Card>
                  <CardHeader><CardTitle className="text-base">System Performance</CardTitle></CardHeader>
                  <CardContent>
                    <SystemTable systems={scenario.systems} onSelect={setSelectedSystem} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Plan vs Actual</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 rounded-md bg-surface-muted">
                        <p className="text-xs text-ink-tertiary">Study Days</p>
                        <p className="font-bold text-navy-700">39 / 42 planned</p>
                      </div>
                      <div className="p-3 rounded-md bg-surface-muted">
                        <p className="text-xs text-ink-tertiary">Questions</p>
                        <p className="font-bold text-navy-700">280 / 300 planned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card className="border-brand-100 bg-gradient-to-br from-white to-brand-50">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-bold text-navy-700 mb-3">UWorld Performance</h3>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-2xl font-bold text-navy-700">{scenario.uworld.completed}</span>
                      <Badge variant="brand">{((scenario.uworld.completed / scenario.uworld.total) * 100).toFixed(0)}%</Badge>
                    </div>
                    <p className="text-xs text-ink-tertiary">of {scenario.uworld.total} total questions</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-white border border-surface-border">
                        <p className="text-ink-tertiary">Correct</p>
                        <p className="font-bold text-emerald-600">{scenario.uworld.correct}</p>
                      </div>
                      <div className="p-2 rounded bg-white border border-surface-border">
                        <p className="text-ink-tertiary">Incorrect</p>
                        <p className="font-bold text-accent-red">{scenario.uworld.incorrect}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Weak Areas</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {weakAreas.map(sys => (
                      <div key={sys.id} className="flex items-center justify-between p-2 rounded-md border border-red-100 bg-red-50/50">
                        <div>
                          <p className="text-sm font-semibold text-navy-700">{sys.name}</p>
                          <p className="text-xs text-ink-secondary">{sys.questionsCompleted} Questions</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-accent-red">{sys.accuracy}%</p>
                          <Badge variant="red" className="text-[0.625rem]">Review</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Strong Areas</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {strongAreas.map(sys => (
                      <div key={sys.id} className="flex items-center justify-between p-2 rounded-md border border-emerald-100 bg-emerald-50/50">
                        <div>
                          <p className="text-sm font-semibold text-navy-700">{sys.name}</p>
                          <p className="text-xs text-ink-secondary">{sys.questionsCompleted} Questions</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-600">{sys.accuracy}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Adaptive Insights</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {scenario.insights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                        <span className="text-ink-secondary">{insight}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      <SystemDetailDrawer system={selectedSystem} onClose={() => setSelectedSystem(null)} />
    </AppShell>
  );
}