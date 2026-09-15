"use client";
import { DailyTask } from "@/lib/daily-study-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check, Play, Clock, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDetailDrawerProps {
  task: DailyTask | null;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
  onSetActive: (id: string) => void;
}

export function TaskDetailDrawer({ task, onClose, onToggleComplete, onSetActive }: TaskDetailDrawerProps) {
  if (!task) return null;

  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-md bg-white shadow-xl animate-slide-in overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-surface-border bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{task.system}</p>
            <h2 className="text-lg font-bold text-navy-700">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-ink-secondary hover:bg-surface-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-ink-tertiary uppercase mb-1">Topic</p>
              <p className="text-sm font-medium text-navy-700">{task.topic}</p>
            </div>
            <div>
              <p className="text-xs text-ink-tertiary uppercase mb-1">Type</p>
              <p className="text-sm font-medium text-navy-700">{task.type}</p>
            </div>
            <div>
              <p className="text-xs text-ink-tertiary uppercase mb-1">Resource</p>
              <p className="text-sm font-medium text-navy-700">{task.resource}</p>
            </div>
            <div>
              <p className="text-xs text-ink-tertiary uppercase mb-1">Estimated Time</p>
              <p className="text-sm font-medium text-navy-700">{task.duration} minutes</p>
            </div>
          </div>

          {task.questions && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-100">
              <FileQuestion className="h-5 w-5 text-accent-red" />
              <span className="text-sm font-semibold text-accent-red-dark">{task.questions} Questions Planned</span>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-navy-700 mb-2">Description</h3>
            <p className="text-sm text-ink-secondary">{task.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-700 mb-2">Learning Objectives</h3>
            <ul className="space-y-2">
              {task.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <Check className="h-4 w-4 mt-0.5 text-brand-500 shrink-0" /> {obj}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-surface-border">
            <p className="text-xs text-ink-tertiary uppercase mb-2">Status</p>
            <Badge variant={isCompleted ? 'green' : isInProgress ? 'brand' : 'default'}>
              {task.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-surface-border bg-white p-4 flex gap-2">
          {isCompleted ? (
            <Button variant="outline" className="w-full" onClick={() => onToggleComplete(task.id)}>
              Mark Incomplete
            </Button>
          ) : isInProgress ? (
            <Button variant="red" className="w-full" onClick={() => onToggleComplete(task.id)}>
              <Check className="h-4 w-4 mr-2" /> Mark Complete
            </Button>
          ) : (
            <>
              <Button variant="primary" className="flex-1" onClick={() => onSetActive(task.id)}>
                <Play className="h-4 w-4 mr-2" /> Start Task
              </Button>
              <Button variant="outline" onClick={() => onToggleComplete(task.id)}>
                <Check className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}