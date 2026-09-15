"use client";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFlashcards } from "@/context/flashcard-context";
import { Flashcard } from "@/lib/flashcard-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deckId: string;
  editCard?: Flashcard | null;
  prefill?: Partial<Flashcard>;
}

export function CardFormModal({ isOpen, onClose, deckId, editCard, prefill }: Props) {
  const { addCard, updateCard } = useFlashcards();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [explanation, setExplanation] = useState('');
  const [system, setSystem] = useState('Cardiovascular');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (editCard) {
      setFront(editCard.front); setBack(editCard.back); setExplanation(editCard.explanation || ''); setSystem(editCard.system); setTopic(editCard.topic);
    } else if (prefill) {
      setFront(prefill.front || ''); setBack(prefill.back || ''); setSystem(prefill.system || 'General'); setTopic(prefill.topic || '');
    } else {
      setFront(''); setBack(''); setExplanation(''); setSystem('General'); setTopic('');
    }
  }, [editCard, prefill, isOpen]);

  const handleSave = () => {
    if (!front || !back) return;
    if (editCard) {
      updateCard(editCard.id, { front, back, explanation, system, topic });
    } else {
      addCard({ deckId, front, back, explanation, system, topic, difficulty: 'Medium' });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editCard ? "Edit Card" : "Add Flashcard"}>
      <div className="p-6 space-y-4">
        <div>
          <Label>Front (Question)</Label>
          <textarea value={front} onChange={e => setFront(e.target.value)} className="flex min-h-[80px] w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm" />
        </div>
        <div>
          <Label>Back (Answer)</Label>
          <textarea value={back} onChange={e => setBack(e.target.value)} className="flex min-h-[60px] w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm" />
        </div>
        <div>
          <Label>Explanation (Optional)</Label>
          <Input value={explanation} onChange={e => setExplanation(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>System</Label>
            <Input value={system} onChange={e => setSystem(e.target.value)} />
          </div>
          <div>
            <Label>Topic</Label>
            <Input value={topic} onChange={e => setTopic(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Card</Button>
      </div>
    </Modal>
  );
}