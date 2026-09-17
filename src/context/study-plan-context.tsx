"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getStudyPlans, createStudyPlan, toggleStudyTask } from '@/app/actions/data';

interface StudyPlanContextType {
  plans: any[];
  loading: boolean;
  addPlan: (planData: any) => Promise<void>;
  toggleTask: (planId: string, taskId: string) => Promise<void>;
  getPlan: (id: string) => any | undefined;
}

const StudyPlanContext = createContext<StudyPlanContextType | undefined>(undefined);

export function StudyPlanProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      if (session?.user) {
        setLoading(true);
        const userPlans = await getStudyPlans();
        setPlans(userPlans);
        setLoading(false);
      } else {
        setPlans([]);
        setLoading(false);
      }
    }
    fetchPlans();
  }, [session]);

  const addPlan = async (planData: any) => {
    await createStudyPlan(planData);
    const updatedPlans = await getStudyPlans();
    setPlans(updatedPlans);
  };

  const toggleTask = async (planId: string, taskId: string) => {
    // Optimistic update
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      const updatedTasks = p.tasks.map((t: any) => t.id === taskId ? { ...t, completed: !t.completed } : t);
      return { ...p, tasks: updatedTasks };
    }));

    // DB update
    const task = plans.find(p => p.id === planId)?.tasks.find((t: any) => t.id === taskId);
    if (task) {
      await toggleStudyTask(taskId, !task.completed);
    }
  };

  const getPlan = (id: string) => plans.find(p => p.id === id);

  return (
    <StudyPlanContext.Provider value={{ plans, loading, addPlan, toggleTask, getPlan }}>
      {children}
    </StudyPlanContext.Provider>
  );
}

export function useStudyPlans() {
  const ctx = useContext(StudyPlanContext);
  if (!ctx) throw new Error('useStudyPlans must be used within StudyPlanProvider');
  return ctx;
}