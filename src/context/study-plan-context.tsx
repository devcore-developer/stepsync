// src/context/study-plan-context.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudyPlan } from '@/lib/types';
import { generateStudyPlan } from '@/lib/planner-engine';
import { usmleSystems } from '@/lib/usmle-systems';

interface StudyPlanContextType {
  plans: StudyPlan[];
  addPlan: (plan: StudyPlan) => void;
  toggleTask: (planId: string, taskId: string) => void;
  getPlan: (id: string) => StudyPlan | undefined;
}

const StudyPlanContext = createContext<StudyPlanContextType | undefined>(undefined);

export function StudyPlanProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('stepsync_plans');
    if (stored) {
      setPlans(JSON.parse(stored));
    } else {
      const demoPlan = generateStudyPlan({
        name: "USMLE Step 1 — 8 Month Marathon",
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        examDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        studyDaysPerWeek: 6,
        dailyHours: "5-6 hours", // Changed from 5 to "5-6 hours"
        selectedSystems: usmleSystems.slice(0, 5),
        resources: ["First Aid", "UWorld", "Pathoma"],
        questionTarget: 40,
        strategy: "Balanced"
      });
      demoPlan.tasks.slice(0, 15).forEach(t => t.completed = true);
      demoPlan.progress = Math.round((15 / demoPlan.tasks.length) * 100);
      setPlans([demoPlan]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('stepsync_plans', JSON.stringify(plans));
    }
  }, [plans, loaded]);

  const addPlan = (plan: StudyPlan) => setPlans(prev => [...prev, plan]);
  
  const toggleTask = (planId: string, taskId: string) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      const updatedTasks = p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      const completedCount = updatedTasks.filter(t => t.completed).length;
      const progress = Math.round((completedCount / updatedTasks.length) * 100);
      return { ...p, tasks: updatedTasks, progress };
    }));
  };

  const getPlan = (id: string) => plans.find(p => p.id === id);

  return (
    <StudyPlanContext.Provider value={{ plans, addPlan, toggleTask, getPlan }}>
      {children}
    </StudyPlanContext.Provider>
  );
}

export function useStudyPlans() {
  const ctx = useContext(StudyPlanContext);
  if (!ctx) throw new Error('useStudyPlans must be used within StudyPlanProvider');
  return ctx;
}