// @ts-nocheck
"use client";

import { useState } from "react";
import { Clock, BookOpen, Video, FileQuestion, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatHours } from "@/lib/utils";
import type { StudyTask } from "@/lib/demo-data";

const resourceIcon = {
  "First Aid": BookOpen,
  Pathoma: Video,
  UWorld: FileQuestion,
  Anki: Layers,
  "Boards & Beyond": Video,
  Sketchy: Video,
};

const resourceColor: Record<StudyTask["resourceType"], string> = {
  "First Aid": "bg-brand-50 text-brand-700",
  Pathoma: "bg-navy-50 text-navy-500",
  UWorld: "bg-red-50 text-accent-red",
  Anki: "bg-amber-50 text-[#9a6f12]",
  "Boards & Beyond": "bg-navy-50 text-navy-500",
  Sketchy: "bg-amber-50 text-[#9a6f12]",
};

export function TaskItem({ task }: { task: StudyTask }) {
  const [checked, setChecked] = useState(task.status === "completed");
  const Icon = resourceIcon[task.resourceType];

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-md border border-surface-border bg-white p-3.5 transition-all hover:border-brand-200 hover:shadow-card-hover",
        checked && "opacity-70"
      )}
    >
      <Checkbox
        checked={checked}
        onToggle={() => setChecked(!checked)}
        className="mt-0.5"
        aria-label={`Mark ${task.title} as ${checked ? "incomplete" : "complete"}`}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={cn("text-[0.875rem] font-semibold text-navy-500", checked && "line-through text-ink-secondary")}>
              {task.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-0.5 text-[0.6875rem] font-medium text-ink-secondary">
                {task.system}
              </span>
              {task.detail && (
                <span className="text-[0.6875rem] text-ink-tertiary">{task.detail}</span>
              )}
            </div>
          </div>
          <StatusBadge
            status={checked ? "completed" : task.status === "completed" ? "completed" : task.status}
          />
        </div>

        <div className="mt-2.5 flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.6875rem] font-semibold",
              resourceColor[task.resourceType]
            )}
          >
            <Icon className="h-3 w-3" />
            {task.resource}
          </span>
          <span className="flex items-center gap-1 text-[0.6875rem] text-ink-secondary">
            <Clock className="h-3 w-3" />
            {formatHours(task.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}