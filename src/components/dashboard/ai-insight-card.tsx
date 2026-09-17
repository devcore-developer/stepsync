// @ts-nocheck
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { aiInsight } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AIInsightCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-brand-200 bg-gradient-to-br from-white to-brand-50 p-5 shadow-card">
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/50 blur-2xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-navy-500 text-white">
              <Sparkles className="h-[1.125rem] w-[1.125rem]" />
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-semibold text-navy-500">{aiInsight.title}</h3>
              <Badge variant="gold" className="mt-0.5">Confidence: {aiInsight.confidence}</Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-md border-l-[3px] border-accent-red bg-red-50/50 px-3.5 py-2.5">
            <p className="text-[0.8125rem] text-ink">{aiInsight.message}</p>
          </div>

          <div className="rounded-md border-l-[3px] border-accent-gold bg-amber-50/50 px-3.5 py-2.5">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
              <p className="text-[0.8125rem] text-ink">{aiInsight.recommendation}</p>
            </div>
          </div>
        </div>

        <Button variant="navy" size="sm" className="mt-4 w-full sm:w-auto">
          {aiInsight.actionLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}