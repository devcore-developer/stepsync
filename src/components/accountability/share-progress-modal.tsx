"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAccountability } from "@/context/accountability-context";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareProgressModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { sharePrefs, updateSharePrefs } = useAccountability();

  const toggle = (key: keyof typeof sharePrefs) => {
    updateSharePrefs({ [key]: !sharePrefs[key] });
  };

  const Toggle = ({ label, k }: { label: string, k: keyof typeof sharePrefs }) => (
    <div className="flex items-center justify-between p-2 rounded-md border border-surface-border">
      <span className="text-sm">{label}</span>
      <button onClick={() => toggle(k)} className={cn("h-5 w-5 rounded-md border flex items-center justify-center", sharePrefs[k] ? "bg-brand-500 border-brand-500 text-white" : "bg-white")}>
        {sharePrefs[k] && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share My Progress" size="lg">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privacy Settings */}
        <div className="space-y-2">
          <Label>What to include?</Label>
          <Toggle label="Study Hours" k="studyHours" />
          <Toggle label="Questions Completed" k="questions" />
          <Toggle label="Accuracy" k="accuracy" />
          <Toggle label="Study Streak" k="streak" />
          <Toggle label="Readiness Score" k="readiness" />
          <Toggle label="Exam Countdown" k="examCountdown" />
        </div>

        {/* Card Preview */}
        <div className="flex flex-col">
          <Label>Preview</Label>
          <div className="mt-2 border border-surface-border rounded-lg p-4 bg-gradient-to-br from-navy-600 to-navy-700 text-white flex-1 flex flex-col justify-center items-center text-center">
            <div className="flex items-center gap-2 mb-3">
               <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-navy-500">
                 <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M16 8.5C16 7 14.5 6 12 6C9.5 6 8 7.2 8 9C8 10.5 9.3 11.3 12 12C14.7 12.7 16 13.5 16 15C16 16.8 14.5 18 12 18C9.5 18 8 17 8 15.5" stroke="white" strokeWidth="2.2" /><rect x="11" y="3" width="2" height="2.5" rx="0.5" fill="#F0B758" /><rect x="11" y="18.5" width="2" height="2.5" rx="0.5" fill="#F0B758" /></svg>
               </div>
               <span className="font-bold text-lg">StepSync Progress</span>
            </div>
            <p className="text-xs text-navy-100 uppercase tracking-wide">USMLE Step 1</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {sharePrefs.streak && <div><p className="font-bold text-2xl text-accent-gold">12</p><p className="text-[0.625rem] uppercase text-navy-200">Day Streak</p></div>}
              {sharePrefs.studyHours && <div><p className="font-bold text-2xl">18h 42m</p><p className="text-[0.625rem] uppercase text-navy-200">This Week</p></div>}
              {sharePrefs.questions && <div><p className="font-bold text-2xl">1,284</p><p className="text-[0.625rem] uppercase text-navy-200">Questions</p></div>}
              {sharePrefs.readiness && <div><p className="font-bold text-2xl text-accent-gold">78%</p><p className="text-[0.625rem] uppercase text-navy-200">Readiness</p></div>}
            </div>
            <p className="mt-6 text-[0.625rem] text-navy-300">Generated with StepSync</p>
          </div>
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Close</Button>
        <Button variant="outline"><Copy className="h-4 w-4 mr-2" /> Copy Summary</Button>
        <Button variant="primary"><Download className="h-4 w-4 mr-2" /> Download Card</Button>
      </div>
    </Modal>
  );
}