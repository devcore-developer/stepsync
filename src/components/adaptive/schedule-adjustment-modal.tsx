"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal"; // Assuming standard shadcn dialog/modal
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdaptationStrategy, ScheduleDrift } from "@/lib/adaptive-engine";
import { X, ArrowRight, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  drift: ScheduleDrift;
  strategies: AdaptationStrategy[];
}

export function ScheduleAdjustmentModal({ isOpen, onClose, drift, strategies }: Props) {
  const [selectedStrategy, setSelectedStrategy] = useState<AdaptationStrategy | null>(null);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
  };

  const handleClose = () => {
    setIsApplied(false);
    setSelectedStrategy(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Schedule Adjustment" size="lg">
      <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        {!isApplied ? (
          <>
            <div className="bg-surface-subtle p-4 rounded-lg border border-surface-border">
              <h3 className="text-sm font-bold text-navy-700">Schedule Drift Detected</h3>
              <p className="text-xs text-ink-secondary mt-1">{drift.reason}</p>
              <div className="mt-2 flex gap-4 text-xs">
                <span className="text-ink-tertiary">Original: <span className="font-semibold text-navy-700">{drift.originalCompletionDate}</span></span>
                <span className="text-ink-tertiary">Projected: <span className="font-semibold text-accent-red">{drift.projectedCompletionDate}</span></span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-navy-700 mb-3">How would you like to recover?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategies.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => setSelectedStrategy(s)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${selectedStrategy?.id === s.id ? 'border-brand-500 ring-2 ring-brand-100' : 'border-surface-border hover:border-brand-300'}`}
                  >
                    <p className="text-xs font-bold text-navy-700">{s.name}</p>
                    <p className="text-[0.6875rem] text-ink-secondary mt-1">{s.description}</p>
                    <div className="mt-2 text-[0.6875rem]">
                      <p>Impact: <span className="font-semibold">{s.additionalMinutesPerDay > 0 ? `+${s.additionalMinutesPerDay}m` : 'None'}</span></p>
                      <p>Finish: <span className="font-semibold">{s.newCompletionDate}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedStrategy && (
              <div className="border-t border-surface-border pt-4">
                <h3 className="text-sm font-bold text-navy-700 mb-3">Schedule Preview</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-md bg-white border border-surface-border">
                    <p className="font-semibold text-ink-tertiary mb-2 uppercase">Before</p>
                    <div className="space-y-1">
                      <p>Mon: Pathology (30m)</p>
                      <p>Tue: Biochemistry (60m)</p>
                      <p>Wed: Microbiology (60m)</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-md bg-brand-50 border border-brand-100">
                    <p className="font-semibold text-brand-700 mb-2 uppercase">After</p>
                    <div className="space-y-1">
                      <p>Mon: Pathology (30m)</p>
                      <p>Tue: Biochemistry ({60 + (selectedStrategy.additionalMinutesPerDay > 0 ? selectedStrategy.additionalMinutesPerDay/2 : 0)}m)</p>
                      <p>Wed: Microbiology ({60 + (selectedStrategy.additionalMinutesPerDay > 0 ? selectedStrategy.additionalMinutesPerDay/2 : 0)}m)</p>
                      {selectedStrategy.recoveryDays > 0 && <p className="text-brand-600 font-semibold">+ Recovery Session</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-700">Schedule updated</h3>
            <p className="mt-1 text-sm text-ink-secondary max-w-sm">Your study plan has been adjusted successfully.</p>
            <div className="mt-6 w-full max-w-sm space-y-2 text-left">
              <div className="flex justify-between p-2 bg-surface-subtle rounded">
                <span className="text-xs text-ink-secondary">New completion date</span>
                <span className="text-xs font-bold text-navy-700">{selectedStrategy?.newCompletionDate}</span>
              </div>
              <div className="flex justify-between p-2 bg-surface-subtle rounded">
                <span className="text-xs text-ink-secondary">Additional workload</span>
                <span className="text-xs font-bold text-navy-700">{selectedStrategy?.additionalMinutesPerDay || 0} min/day</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        {!isApplied ? (
          <>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button variant="red" disabled={!selectedStrategy} onClick={handleApply}>
              Apply Adjustment
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleClose}>View Updated Plan</Button>
        )}
      </div>
    </Modal>
  );
}