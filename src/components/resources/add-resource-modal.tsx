"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Resource, ResourceType, resourceTypes } from "@/lib/resource-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (res: Omit<Resource, 'id' | 'isCustom'>) => void;
}

export function AddResourceModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [type, setType] = useState<ResourceType>('Notes');
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitType, setUnitType] = useState('pages');

  const handleSubmit = () => {
    onAdd({
      name, provider, type, description: 'Custom user resource.', systems: ['Custom'], status: 'Not Started', unitsCompleted: 0, unitsTotal: totalUnits, unitType
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Custom Resource">
      <div className="p-6 space-y-4">
        <div>
          <Label>Resource Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Personal Biochemistry Notes" />
        </div>
        <div>
          <Label>Provider</Label>
          <Input value={provider} onChange={e => setProvider(e.target.value)} placeholder="e.g., My Notes" />
        </div>
        <div>
          <Label>Type</Label>
          <select value={type} onChange={e => setType(e.target.value as ResourceType)} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
            {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Units</Label>
            <Input type="number" value={totalUnits} onChange={e => setTotalUnits(Number(e.target.value))} />
          </div>
          <div>
            <Label>Unit Type</Label>
            <Input value={unitType} onChange={e => setUnitType(e.target.value)} placeholder="e.g., pages" />
          </div>
        </div>
      </div>
      <div className="border-t border-surface-border p-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Resource</Button>
      </div>
    </Modal>
  );
}