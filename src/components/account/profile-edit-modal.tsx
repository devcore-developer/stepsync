"use client";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "@/context/account-context";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileEditModal({ isOpen, onClose }: Props) {
  const { profile, updateProfile } = useAccount();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(profile);
      setErrors({});
      setSaved(false);
    }
  }, [isOpen, profile]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Please enter a valid email address';
    if (!form.examDate) e.examDate = 'Please select your planned exam date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateProfile({
      ...form,
      avatarInitials: form.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    });
    setSaved(true);
    setTimeout(() => onClose(), 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
      <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} />
              {errors.fullName && <p className="text-xs text-accent-red mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <Label>Email</Label>
              <Input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label>Timezone</Label>
              <select value={form.timezone} onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                <option>America/New_York</option><option>America/Chicago</option><option>America/Los_Angeles</option><option>Europe/London</option>
              </select>
            </div>
            <div>
              <Label>USMLE Step</Label>
              <select value={form.usmleStep} onChange={e => setForm(p => ({ ...p, usmleStep: e.target.value }))} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                <option>Step 1</option><option>Step 2 CK</option><option>Step 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-surface-border">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">Study Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Exam Date</Label>
              <Input type="date" value={form.examDate} onChange={e => setForm(p => ({ ...p, examDate: e.target.value }))} />
              {errors.examDate && <p className="text-xs text-accent-red mt-1">{errors.examDate}</p>}
            </div>
            <div>
              <Label>Target Score</Label>
              <Input value={form.targetScore} onChange={e => setForm(p => ({ ...p, targetScore: e.target.value }))} placeholder="e.g., 250+" />
            </div>
            <div>
              <Label>Weekly Study Goal (hours)</Label>
              <Input type="number" value={form.weeklyStudyGoal} onChange={e => setForm(p => ({ ...p, weeklyStudyGoal: Number(e.target.value) }))} />
            </div>
            <div>
              <Label>Preferred Session Length (min)</Label>
              <select value={form.preferredSessionLength} onChange={e => setForm(p => ({ ...p, preferredSessionLength: Number(e.target.value) }))} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                <option value={25}>25 min</option><option value={45}>45 min</option><option value={60}>60 min</option><option value={90}>90 min</option><option value={120}>120 min</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        {saved && <span className="text-sm text-emerald-600 self-center">Saved!</span>}
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </div>
    </Modal>
  );
}