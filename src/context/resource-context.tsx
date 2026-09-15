"use client";
import React, { createContext, useContext, useState } from 'react';
import { Resource, resourceScenarios, unlinkedStudyTasks } from '@/lib/resource-data';

interface ResourceContextType {
  resources: Resource[];
  unlinkedTasks: typeof unlinkedStudyTasks;
  addResource: (res: Omit<Resource, 'id' | 'isCustom'>) => void;
  deleteResource: (id: string) => void;
  assignTaskResource: (taskId: string, resourceId: string) => void;
  setScenario: (id: string) => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const [scenarioId, setScenarioId] = useState('active');
  const [extraResources, setExtraResources] = useState<Resource[]>([]);
  const [unlinked, setUnlinked] = useState(unlinkedStudyTasks);

  const currentScenario = resourceScenarios.find(s => s.id === scenarioId)!;
  const resources = [...currentScenario.resources, ...extraResources];

  const addResource = (res: Omit<Resource, 'id' | 'isCustom'>) => {
    const newRes: Resource = { ...res, id: `custom-${Date.now()}`, isCustom: true };
    setExtraResources(prev => [...prev, newRes]);
  };

  const deleteResource = (id: string) => {
    setExtraResources(prev => prev.filter(r => r.id !== id));
  };

  const assignTaskResource = (taskId: string, resourceId: string) => {
    setUnlinked(prev => prev.filter(t => t.id !== taskId));
  };

  const setScenario = (id: string) => {
    setScenarioId(id);
    setExtraResources([]);
    setUnlinked(unlinkedStudyTasks);
  };

  return (
    <ResourceContext.Provider value={{ resources, unlinkedTasks: unlinked, addResource, deleteResource, assignTaskResource, setScenario }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error('useResources must be used within ResourceProvider');
  return ctx;
}