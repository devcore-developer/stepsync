"use client";
import { Check, Play, Pause, Clock, FileQuestion, BookOpen, Layers, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DailyTask } from "@/lib/daily-study-data";

const typeIcons = {
  Study: BookOpen,
  UWorld: FileQuestion,
  Review: Layers,
  Flashcards: Layers,
  Practice: FileQuestion,
  Videos: Video,
};

interface TaskCardProps {
  task: DailyTask;
  onToggleComplete: (id: string) => void;
  onSetActive: (id: string) => void;
  onSelect: (task: DailyTask) => void;
}

export function TaskCard({ task, onToggleComplete, onSetActive, onSelect }: TaskCardProps) {
  const Icon = typeIcons[task.type];
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';

  return (
    <div className={cn(
      "rounded-lg border bg-white p-4 transition-all",
      isCompleted ? "border-surface-border opacity-70" : isInProgress ? "border-brand-500 shadow-card-hover" : "border-surface-border hover:border-brand-300"
    )}>
      <div className="flex items-start gap-4">
        <button 
          onClick={() => onToggleComplete(task.id)}
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all",
            isCompleted ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300 bg-white hover:border-brand-400"
          )}
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted && <Check className="h-4 w-4" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(task)}>
          <div className="flex items-center gap-2">
            <Badge variant="navy" className="uppercase tracking-wide">{task.system}</Badge>
            {task.priority === 'High' && !isCompleted && <Badge variant="red">High Priority</Badge>}
          </div>
          <h3 className={cn("mt-1 text-sm font-semibold text-navy-700", isCompleted && "line-through text-ink-tertiary")}>
            {task.title}
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">{task.topic}</p>
          
          <div className="mt-3 flex items-center gap-4 text-xs text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-brand-500" /> {task.resource}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {task.duration} min
            </span>
            {task.questions && (
              <span className="flex items-center gap-1.5">
                <FileQuestion className="h-3.5 w-3.5" /> {task.questions} Questions
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isCompleted ? (
            <Badge variant="green">Completed</Badge>
          ) : isInProgress ? (
            <Button size="sm" variant="outline" onClick={() => onToggleComplete(task.id)}>
              <Pause className="h-3.5 w-3.5 mr-1" /> Pause
            </Button>
          ) : (
            <Button size="sm" variant="primary" onClick={() => onSetActive(task.id)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Start
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}