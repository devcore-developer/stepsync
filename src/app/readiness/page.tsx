"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readinessScenarios } from "@/lib/readiness-demo-data";
import { ReadinessHero } from "@/components/readiness/readiness-hero";
import { ReadinessScore } from "@/components/readiness/readiness-score";
import { ReadinessBreakdown } from "@/components/readiness/readiness-breakdown";
import { SystemReadinessMatrix } from "@/components/readiness/system-readiness-matrix";
import { AlertTriangle, CheckCircle, Target, ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function ReadinessPage() {
  const [scenarioId, setScenarioId] = useState('on-track');
  const [examDate, setExamDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const scenario = readinessScenarios.find(s => s.id === scenarioId)!;
  const currentExamDate = examDate || scenario.examDate;

  const topRisks = scenario.systems.filter(s => s.readiness === 'At Risk' || s.readiness === 'Needs Attention').slice(0, 3);
  const strengths = scenario.systems.filter(s => s.readiness === 'Strong').slice(0, 3);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Exam Readiness" description="Track your overall preparation and identify what needs attention." />
          <select 
            value={scenarioId} 
            onChange={(e) => { setScenarioId(e.target.value); setExamDate(''); }}
            className="h-9 rounded-md border border-surface-border bg-surface-subtle px-3 text-sm font-medium text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            {readinessScenarios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <ReadinessHero examDate={currentExamDate} onEdit={() => setIsModalOpen(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ReadinessScore data={scenario} />
              <ReadinessBreakdown data={scenario} />
            </div>

            {scenario.id !== 'insufficient' && (
              <Card>
                <CardHeader><CardTitle className="text-base">System Readiness Matrix</CardTitle></CardHeader>
                <CardContent>
                  <SystemReadinessMatrix systems={scenario.systems} />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4" /> Goal Tracking</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {scenario.goals.map(g => (
                  <div key={g.id} className="flex items-center justify-between p-3 rounded-md border border-surface-border">
                    <div>
                      <p className="text-sm font-semibold text-navy-700">{g.title}</p>
                      <p className="text-xs text-ink-secondary mt-0.5">Progress: {g.progress} / {g.target} {g.unit}</p>
                    </div>
                    <Badge variant={g.status === 'Completed' ? 'green' : 'brand'}>{g.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="border-red-100 bg-red-50/50">
              <CardHeader><CardTitle className="text-base flex items-center gap-2 text-accent-red-dark"><AlertTriangle className="h-4 w-4" /> Top Risks</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {topRisks.length > 0 ? topRisks.map(r => (
                  <div key={r.id} className="p-3 rounded-md bg-white border border-surface-border">
                    <p className="text-sm font-semibold text-navy-700">{r.name}</p>
                    <p className="text-xs text-ink-secondary mt-1">{r.accuracy}% accuracy · {r.coverage}% coverage</p>
                    <Button variant="ghost" size="sm" className="px-0 mt-2 text-accent-red hover:text-accent-red-dark">Review {r.name} <ArrowRight className="h-3 w-3 ml-1" /></Button>
                  </div>
                )) : <p className="text-sm text-ink-secondary">No major risks detected.</p>}
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardHeader><CardTitle className="text-base flex items-center gap-2 text-emerald-700"><CheckCircle className="h-4 w-4" /> Strengths</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {strengths.length > 0 ? strengths.map(s => (
                  <div key={s.id} className="p-3 rounded-md bg-white border border-surface-border">
                    <p className="text-sm font-semibold text-navy-700">{s.name}</p>
                    <p className="text-xs text-ink-secondary mt-1">{s.accuracy}% accuracy · {s.questions} questions</p>
                  </div>
                )) : <p className="text-sm text-ink-secondary">No strengths identified yet.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Readiness Timeline</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {scenario.timeline.map((t, i) => (
                  <div key={t.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full ${t.status === 'Completed' ? 'bg-emerald-500' : t.status === 'Active' ? 'bg-brand-500' : 'bg-surface-border'}`} />
                      {i < scenario.timeline.length - 1 && <div className="w-px h-full bg-surface-border flex-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-navy-700">{t.title}</p>
                      <Badge variant="outline" className="mt-1">{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Exam Date Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Exam Date">
        <div className="p-6 space-y-4">
          <div>
            <Label>Exam Date</Label>
            <Input type="date" value={currentExamDate || ''} onChange={(e) => setExamDate(e.target.value)} />
          </div>
          <div className="p-3 rounded-md bg-amber-50 border border-amber-100 text-xs text-amber-700">
            If you change your exam date significantly, you may need to recalculate your study plan in the Adaptive Planning section.
          </div>
        </div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>Save Changes</Button>
        </div>
      </Modal>
    </AppShell>
  );
}