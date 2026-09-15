"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFlashcards } from "@/context/flashcard-context";

export function DeckFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addDeck } = useFlashcards();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!name) return;
    addDeck({ name, description, system: 'General', color: '#0057A8', tags: [] });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Deck">
      <div className="p-6 space-y-4">
        <div>
          <Label>Deck Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Weak Areas - Cardiovascular" />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" />
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Create Deck</Button>
      </div>
    </Modal>
  );
}