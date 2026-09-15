"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Video, BookOpen, FileQuestion, Layers, FileText, Clock, MoreHorizontal } from "lucide-react";
import { Resource, calculateProgress } from "@/lib/resource-data";
import { cn } from "@/lib/utils";

const typeIcons = {
  'Video': Video,
  'Question Bank': FileQuestion,
  'Book': BookOpen,
  'Flashcards': Layers,
  'Notes': FileText,
  'Review': FileText,
  'Practice': FileQuestion,
  'Other': FileText,
};

interface Props {
  resource: Resource;
  onSelect: (res: Resource) => void;
}

export function ResourceCard({ resource, onSelect }: Props) {
  const Icon = typeIcons[resource.type];
  const progress = calculateProgress(resource.unitsCompleted, resource.unitsTotal);

  return (
    <Card className="hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => onSelect(resource)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-subtle text-brand-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-700">{resource.name}</h3>
              <p className="text-xs text-ink-tertiary">{resource.provider}</p>
            </div>
          </div>
          <Badge variant={
            resource.status === 'Completed' ? 'green' :
            resource.status === 'In Progress' ? 'brand' :
            resource.status === 'Paused' ? 'gold' : 'default'
          }>{resource.status}</Badge>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.systems.slice(0, 3).map(s => <Badge key={s} variant="navy" className="text-[0.625rem]">{s}</Badge>)}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-ink-secondary font-medium">{resource.unitsCompleted} / {resource.unitsTotal} {resource.unitType}</span>
            <span className="font-bold text-navy-700">{progress}%</span>
          </div>
          <Progress value={progress} color="brand" size="sm" />
        </div>

        <div className="flex items-center justify-between border-t border-surface-border pt-3">
          <span className="flex items-center gap-1 text-xs text-ink-tertiary">
            <Clock className="h-3 w-3" /> Last used: {resource.lastUsedAt || 'Never'}
          </span>
          <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); onSelect(resource); }}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}