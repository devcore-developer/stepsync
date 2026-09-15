"use client";
import { SystemPerformance } from "@/lib/performance-engine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  system: SystemPerformance | null;
  onClose: () => void;
}

export function SystemDetailDrawer({ system, onClose }: Props) {
  if (!system) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-md bg-white shadow-xl animate-slide-in overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-surface-border bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">System Detail</p>
            <h2 className="text-lg font-bold text-navy-700">{system.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-ink-secondary hover:bg-surface-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-surface-muted">
              <p className="text-xs text-ink-tertiary">Questions Completed</p>
              <p className="text-lg font-bold text-navy-700">{system.questionsCompleted}</p>
            </div>
            <div className="p-3 rounded-md bg-surface-muted">
              <p className="text-xs text-ink-tertiary">Accuracy</p>
              <p className="text-lg font-bold text-navy-700">{system.accuracy}%</p>
            </div>
            <div className="p-3 rounded-md bg-surface-muted">
              <p className="text-xs text-ink-tertiary">Correct</p>
              <p className="text-lg font-bold text-emerald-600">{system.questionsCorrect}</p>
            </div>
            <div className="p-3 rounded-md bg-surface-muted">
              <p className="text-xs text-ink-tertiary">Incorrect</p>
              <p className="text-lg font-bold text-accent-red">{system.questionsCompleted - system.questionsCorrect}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy-700 mb-2">Topic Performance</h3>
            {system.topics.length > 0 ? (
              <div className="space-y-2">
                {system.topics.map(t => (
                  <div key={t.name} className="flex items-center justify-between p-3 border border-surface-border rounded-md">
                    <div>
                      <p className="text-sm font-medium text-navy-700">{t.name}</p>
                      <p className="text-xs text-ink-tertiary">{t.questions} Questions</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", t.accuracy >= 75 ? "text-emerald-600" : t.accuracy >= 65 ? "text-brand-600" : "text-accent-red")}>{t.accuracy}%</p>
                      {t.accuracy < 65 && <Badge variant="red" className="mt-1">Review Priority</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-secondary">No topic data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}