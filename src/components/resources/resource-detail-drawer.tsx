"use client";
import { Resource } from "@/lib/resource-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ExternalLink, CheckCircle, Edit, Trash2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  resource: Resource | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function ResourceDetailDrawer({ resource, onClose, onDelete }: Props) {
  if (!resource) return null;

  const progress = Math.round((resource.unitsCompleted / resource.unitsTotal) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-md bg-white shadow-xl animate-slide-in overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-surface-border bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{resource.type}</p>
            <h2 className="text-lg font-bold text-navy-700">{resource.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-ink-secondary hover:bg-surface-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-xs text-ink-tertiary uppercase mb-1">Provider</p>
            <p className="text-sm font-medium text-navy-700">{resource.provider}</p>
          </div>

          <div>
            <p className="text-xs text-ink-tertiary uppercase mb-1">Description</p>
            <p className="text-sm text-ink-secondary">{resource.description}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface-subtle border border-surface-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-navy-700">Progress</span>
              <span className="text-sm font-bold text-brand-600">{progress}%</span>
            </div>
            <Progress value={progress} color="brand" size="sm" />
            <p className="text-xs text-ink-tertiary mt-2">
              {resource.unitsCompleted} / {resource.unitsTotal} {resource.unitType} completed
            </p>
          </div>

          <div>
            <p className="text-xs text-ink-tertiary uppercase mb-2">Associated Systems</p>
            <div className="flex flex-wrap gap-2">
              {resource.systems.map(s => <Badge key={s} variant="navy">{s}</Badge>)}
            </div>
          </div>

          {/* Mock connection to tasks */}
          <div className="border-t border-surface-border pt-4">
            <h3 className="text-sm font-bold text-navy-700 mb-2">Used in Study Plan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-ink-secondary"><BookOpen className="h-4 w-4 text-brand-500" /> Today: Cell Injury</div>
              <div className="flex items-center gap-2 text-ink-secondary"><BookOpen className="h-4 w-4 text-brand-500" /> Tomorrow: Inflammation</div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-surface-border bg-white p-4 flex gap-2">
          <Button variant="red" className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" /> Mark Complete
          </Button>
          {resource.isCustom && (
            <>
              <Button variant="outline"><Edit className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={() => { onDelete(resource.id); onClose(); }}><Trash2 className="h-4 w-4 text-accent-red" /></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}