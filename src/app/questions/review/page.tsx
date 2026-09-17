"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getIncorrectQuestions } from "@/app/actions/analytics";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getIncorrectQuestions();
      setQuestions(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <AppShell><div className="p-8 text-center text-ink-secondary">Loading incorrect questions...</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <PageHeader title="Question Review" description="Review your incorrect questions from past sessions." />

        {questions.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-sm text-ink-secondary">
            No incorrect questions yet. Keep practicing!
          </CardContent></Card>
        ) : (
          <div className="space-y-3">
            {questions.map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="navy">{item.question.system}</Badge>
                    <Badge variant="red">Incorrect</Badge>
                  </div>
                  <p className="text-sm text-navy-700 font-medium mb-3">{item.question.stem}</p>
                  
                  <div className="space-y-2">
                    {item.question.options.map((opt: string, idx: number) => {
                      const isCorrect = idx === item.question.correctAnswer;
                      const isYour = idx === item.selectedAnswer;
                      return (
                        <div key={idx} className={cn("flex items-start gap-2 p-2 rounded-md text-sm", isCorrect ? "bg-emerald-50" : isYour ? "bg-red-50" : "bg-white")}>
                          <span className={cn("h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0", isCorrect ? "bg-emerald-500 text-white" : isYour ? "bg-accent-red text-white" : "bg-surface-muted text-ink-secondary")}>
                            {String.fromCharCode(65+idx)}
                          </span>
                          <span className={cn("flex-1", isCorrect || isYour ? "text-navy-700 font-medium" : "text-ink")}>{opt}</span>
                          {isCorrect && <Check className="h-4 w-4 text-emerald-600" />}
                          {isYour && !isCorrect && <X className="h-4 w-4 text-accent-red" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}