"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddResourceModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (name: string, type: string) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Book');

  const handleSubmit = () => {
    if (!name) return;
    onAdd(name, type);
    onClose();
    setName('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Custom Resource">
      <div className="p-6 space-y-4">
        <div>
          <Label>Resource Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Personal Biochemistry Notes" />
        </div>
        <div>
          <Label>Type</Label>
          <select value={type} onChange={e => setType(e.target.value)} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
            <option>Book</option><option>Video</option><option>Question Bank</option><option>Flashcards</option><option>Notes</option>
          </select>
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Resource</Button>
      </div>
    </Modal>
  );
}