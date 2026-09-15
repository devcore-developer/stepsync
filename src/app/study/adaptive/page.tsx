"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioSelector } from "@/components/adaptive/scenario-selector";
import { AdaptiveStatus } from "@/components/adaptive/adaptive-status";
import { ScheduleImpact } from "@/components/adaptive/schedule-impact";
import { AdaptationStrategyCard } from "@/components/adaptive/adaptation-strategy-card";
import { ScheduleAdjustmentModal } from "@/components/adaptive/schedule-adjustment-modal";
import { adaptiveScenarios, changeHistory } from "@/lib/adaptive-demo-data";
import { Sparkles, History, ChevronRight, ShieldCheck } from "lucide-react";

export default function AdaptivePlanningPage() {
  const [scenarioId, setScenarioId] = useState("behind-2-days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const scenario = adaptiveScenarios.find(s => s.id === scenarioId)!;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Adaptive Planning" description="Intelligent schedule recovery and pacing insights." />
          <ScenarioSelector value={scenarioId} onChange={(v) => { setScenarioId(v); setSelectedStrategy(null); }} />
        </div>

        <AdaptiveStatus status={scenario.drift.status} message={scenario.drift.reason} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScheduleImpact drift={scenario.drift} />

            {scenario.strategies.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recovery Strategies</CardTitle>
                    <Button variant="red" size="sm" onClick={() => setIsModalOpen(true)}>Review Adjustment</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scenario.strategies.map(s => (
                      <AdaptationStrategyCard 
                        key={s.id} 
                        strategy={s} 
                        isSelected={selectedStrategy === s.id}
                        onSelect={() => setSelectedStrategy(s.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Workload Protection Banner */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-navy-50 text-navy-700 border border-navy-100">
              <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0" />
              <p className="text-sm font-medium">Workload Protection Active: StepSync will not allow daily study time to exceed 6 hours.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Adaptive Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-gold" />
                  <CardTitle className="text-base">Adaptive Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {scenario.insights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-ink-secondary">{insight}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Change History */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-ink-tertiary" />
                  <CardTitle className="text-base">Change History</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {changeHistory.map(ch => (
                  <div key={ch.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-ink-tertiary mt-1.5" />
                      <div className="w-px h-full bg-surface-border" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink-tertiary">{ch.date}</p>
                      <p className="text-sm font-semibold text-navy-700">{ch.reason}</p>
                      <p className="text-xs text-ink-secondary mt-1">{ch.adjustment}</p>
                      <Badge variant="green" className="mt-1">{ch.result}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ScheduleAdjustmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        drift={scenario.drift}
        strategies={scenario.strategies}
      />
    </AppShell>
  );
}