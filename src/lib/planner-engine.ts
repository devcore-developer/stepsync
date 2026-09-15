// src/lib/planner-engine.ts
import { StudyPlan, StudyPlanSystem, StudyTask, USMLESystem } from './types';

interface PlanConfig {
  name: string;
  startDate: string;
  examDate: string;
  studyDaysPerWeek: number;
  dailyHours: string; // Ensure this is string
  selectedSystems: USMLESystem[];
  resources: string[];
  questionTarget: number;
  strategy: string;
}

export function generateStudyPlan(config: PlanConfig): StudyPlan {
  const { startDate, examDate, studyDaysPerWeek, selectedSystems, resources, questionTarget, name } = config;
  
  const start = new Date(startDate);
  const end = new Date(examDate);
  
  let currentSystemStartDate = new Date(start);
  const planSystems: StudyPlanSystem[] = [];
  const tasks: StudyTask[] = [];
  
  let totalEstimatedDays = selectedSystems.reduce((sum, s) => sum + s.defaultEstimatedDays, 0);
  let availableDays = 0;
  let cursor = new Date(start);
  
  while(cursor <= end) {
      const day = cursor.getDay();
      const isStudyDay = studyDaysPerWeek === 7 || (studyDaysPerWeek === 6 && day !== 0) || (studyDaysPerWeek === 5 && day !== 0 && day !== 6);
      if (isStudyDay) availableDays++;
      cursor.setDate(cursor.getDate() + 1);
  }
  
  const compressionFactor = availableDays > 0 && totalEstimatedDays > availableDays ? availableDays / totalEstimatedDays : 1;
  let taskIdCounter = 1;
  const planId = `plan-${Date.now()}`;
  
  selectedSystems.forEach((sys) => {
    const adjustedDays = Math.max(1, Math.round(sys.defaultEstimatedDays * compressionFactor));
    const systemEndDate = new Date(currentSystemStartDate);
    let daysAdded = 0;
    
    while(daysAdded < adjustedDays && currentSystemStartDate <= end) {
        const dayOfWeek = currentSystemStartDate.getDay();
        const isStudyDay = studyDaysPerWeek === 7 || (studyDaysPerWeek === 6 && dayOfWeek !== 0) || (studyDaysPerWeek === 5 && dayOfWeek !== 0 && dayOfWeek !== 6);
        
        if (isStudyDay) {
            const dateStr = currentSystemStartDate.toISOString().split('T')[0];
            
            tasks.push({
                id: `task-${taskIdCounter++}`,
                planId,
                systemId: sys.id,
                systemName: sys.name,
                date: dateStr,
                title: `Review ${sys.name} - First Aid`,
                resource: 'First Aid',
                duration: 45,
                completed: false,
                type: 'Reading',
                priority: 'High'
            });
            
            if (resources.includes('UWorld')) {
                tasks.push({
                    id: `task-${taskIdCounter++}`,
                    planId,
                    systemId: sys.id,
                    systemName: sys.name,
                    date: dateStr,
                    title: `UWorld ${sys.name} Block`,
                    resource: 'UWorld',
                    duration: 60,
                    questions: Math.floor(questionTarget / 2),
                    completed: false,
                    type: 'Questions',
                    priority: 'High'
                });
            }
            if (resources.includes('Pathoma')) {
                tasks.push({
                    id: `task-${taskIdCounter++}`,
                    planId,
                    systemId: sys.id,
                    systemName: sys.name,
                    date: dateStr,
                    title: `Watch Pathoma - ${sys.name}`,
                    resource: 'Pathoma',
                    duration: 45,
                    completed: false,
                    type: 'Videos',
                    priority: 'Medium'
                });
            }
            daysAdded++;
        }
        currentSystemStartDate.setDate(currentSystemStartDate.getDate() + 1);
    }
    
    planSystems.push({
        id: `psys-${sys.id}`,
        systemId: sys.id,
        name: sys.name,
        startDate: systemEndDate.toISOString().split('T')[0],
        endDate: currentSystemStartDate.toISOString().split('T')[0],
        estimatedDays: adjustedDays,
        progress: 0,
        status: 'Upcoming'
    });
  });
  
  return {
    id: planId,
    name,
    examDate,
    startDate,
    studyDaysPerWeek: config.studyDaysPerWeek,
    dailyHours: config.dailyHours,
    status: 'Active',
    progress: 0,
    systems: planSystems,
    tasks: tasks,
    resources,
    questionTarget,
    strategy: config.strategy,
    createdAt: new Date().toISOString()
  };
}