import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";
import { aiRecommendation } from "@/lib/demo-data";

export function AIRecommendation() {
  return (
    <Card className="bg-gradient-to-br from-white to-brand-50 border-brand-100">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-700 text-accent-gold">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-navy-700">{aiRecommendation.title}</h3>
            <p className="text-[0.6875rem] text-ink-tertiary">{aiRecommendation.confidence}</p>
          </div>
        </div>

        <p className="text-sm text-ink mb-4 leading-relaxed">
          {aiRecommendation.message}
        </p>

        <div className="flex flex-col gap-2">
          <Button variant="primary" size="sm">
            {aiRecommendation.actionLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-3.5 w-3.5" /> {aiRecommendation.secondaryAction}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}