"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Clock, CalendarDays } from "lucide-react";
import { AdaptationStrategy } from "@/lib/adaptive-engine";
import { cn } from "@/lib/utils";

interface Props {
  strategy: AdaptationStrategy;
  isSelected: boolean;
  onSelect: () => void;
}

export function AdaptationStrategyCard({ strategy, isSelected, onSelect }: Props) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all", 
        isSelected ? "border-brand-500 ring-2 ring-brand-100 shadow-card-hover" : "hover:border-brand-300"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-bold text-navy-700">{strategy.name}</h3>
          {isSelected && <div className="h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center"><Check className="h-3 w-3 text-white" strokeWidth={3} /></div>}
        </div>
        
        <p className="text-xs text-ink-secondary mb-4">{strategy.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-tertiary flex items-center gap-1"><Clock className="h-3 w-3" /> Daily Impact</span>
            <span className={strategy.workloadExceedsMax ? "font-bold text-accent-red" : "font-semibold text-navy-700"}>
              {strategy.additionalMinutesPerDay > 0 ? `+${strategy.additionalMinutesPerDay} min` : strategy.additionalMinutesPerDay < 0 ? `${strategy.additionalMinutesPerDay} min` : 'No change'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-tertiary flex items-center gap-1"><CalendarDays className="h-3 w-3" /> New Completion</span>
            <span className="font-semibold text-navy-700">{strategy.newCompletionDate}</span>
          </div>
        </div>

        {strategy.workloadExceedsMax && (
          <div className="flex items-start gap-2 p-2 rounded-md bg-red-50 border border-red-100 mb-3">
            <AlertCircle className="h-3.5 w-3.5 text-accent-red mt-0.5 shrink-0" />
            <p className="text-xs text-accent-red-dark">Exceeds recommended daily workload (max 6h).</p>
          </div>
        )}

        {strategy.affectsReviewCheckpoint && (
           <div className="flex items-start gap-2 p-2 rounded-md bg-amber-50 border border-amber-100 mb-3">
           <AlertCircle className="h-3.5 w-3.5 text-accent-gold mt-0.5 shrink-0" />
           <p className="text-xs text-amber-700">Review checkpoint affected.</p>
         </div>
        )}

        <div className="pt-3 border-t border-surface-border">
          <p className="text-[0.6875rem] text-ink-tertiary mb-1">Pros</p>
          <p className="text-xs text-ink mb-2">{strategy.pros}</p>
          <p className="text-[0.6875rem] text-ink-tertiary mb-1">Cons</p>
          <p className="text-xs text-ink">{strategy.cons}</p>
        </div>

        <Button 
          variant={isSelected ? "primary" : "outline"} 
          size="sm" 
          className="w-full mt-4"
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
        >
          {isSelected ? "Selected" : "Select Strategy"}
        </Button>
      </CardContent>
    </Card>
  );
}