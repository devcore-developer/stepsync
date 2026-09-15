"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccountability } from "@/context/accountability-context";

export function InvitePartnerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { sendInvite } = useAccountability();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) return;
    sendInvite(email);
    setSent(true);
    setTimeout(() => {
      onClose();
      setSent(false);
      setEmail('');
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Study Partner">
      {sent ? (
        <div className="p-6 text-center text-emerald-600 font-medium">Invite Sent!</div>
      ) : (
        <>
          <div className="p-6 space-y-4">
            <p className="text-sm text-ink-secondary">Stay accountable with a study partner. Enter their email to send an invite.</p>
            <div>
              <Label>Partner Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="partner@medstudent.edu" />
            </div>
            <div>
              <Label>Message (Optional)</Label>
              <textarea className="flex min-h-[60px] w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm" defaultValue="Let's keep each other accountable while preparing for Step 1." />
            </div>
          </div>
          <div className="border-t border-surface-border p-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSend}>Send Invite</Button>
          </div>
        </>
      )}
    </Modal>
  );
}