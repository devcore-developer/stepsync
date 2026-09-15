"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuestions } from "@/context/question-context";
import { cn } from "@/lib/utils";

export function BlockBuilder({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const { startBlock } = useQuestions();
  const [count, setCount] = useState(40);
  const [mode, setMode] = useState<'Timed' | 'Tutor'>('Timed');

  const handleStart = () => {
    const id = startBlock({ count, mode });
    onClose();
    router.push(`/questions/session/${id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start Question Block">
      <div className="p-6 space-y-6">
        <div>
          <Label>Number of Questions</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[10, 20, 40, 60].map(c => (
              <button key={c} onClick={() => setCount(c)} className={cn("py-2 rounded-md border text-sm font-medium", count === c ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border")}>{c}</button>
            ))}
          </div>
        </div>
        <div>
          <Label>Mode</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {(['Timed', 'Tutor'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={cn("py-3 rounded-md border text-left p-3", mode === m ? "border-brand-500 bg-brand-50" : "border-surface-border")}>
                <p className="text-sm font-semibold text-navy-700">{m}</p>
                <p className="text-xs text-ink-tertiary">{m === 'Timed' ? 'Answer all, then review.' : 'Immediate feedback.'}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="red" onClick={handleStart}>Start Block</Button>
      </div>
    </Modal>
  );
}