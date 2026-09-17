"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getResources, createResource, deleteResource } from '@/app/actions/data';
import { unlinkedStudyTasks } from '@/lib/resource-data';

interface ResourceContextType {
  resources: any[];
  unlinkedTasks: typeof unlinkedStudyTasks;
  addResource: (name: string, type: string) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  assignTaskResource: (taskId: string, resourceId: string) => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [resources, setResources] = useState<any[]>([]);
  const [unlinked] = useState(unlinkedStudyTasks);

  useEffect(() => {
    async function fetchResources() {
      if (session?.user) {
        const dbResources = await getResources();
        setResources(dbResources);
      } else {
        setResources([]);
      }
    }
    fetchResources();
  }, [session]);

  const addResource = async (name: string, type: string) => {
    await createResource({name, type});
    const updated = await getResources();
    setResources(updated);
  };

  const deleteResource = async (id: string) => {
    await deleteResource(id);
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const assignTaskResource = (taskId: string, resourceId: string) => {
    // يمكن ربطها لاحقاً بجدول المهام، حالياً هي واجهة فقط
    console.log(`Assigned ${resourceId} to ${taskId}`);
  };

  return (
    <ResourceContext.Provider value={{ resources, unlinkedTasks: unlinked, addResource, deleteResource, assignTaskResource }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error('useResources must be used within ResourceProvider');
  return ctx;
}