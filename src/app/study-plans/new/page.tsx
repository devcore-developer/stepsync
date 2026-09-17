"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useStudyPlans } from "@/context/study-plan-context";
import { curriculumBlocks, validateCurriculum } from "@/lib/curriculum-data";

export default function NewStudyPlanPage() {
  const router = useRouter();
  const { addPlan } = useStudyPlans();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("USMLE Step 1 Study Plan");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [examDate, setExamDate] = useState(new Date(Date.now() + 230 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const totals = validateCurriculum();
  const progress = ((step + 1) / 2) * 100;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await addPlan({ name, startDate, examDate });
      router.push('/study-plans');
      router.refresh(); 
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-surface-border"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-brand-500 animate-spin"></div>
          </div>
          <h2 className="mt-6 text-xl font-bold text-navy-700">Generating 230-Day Schedule...</h2>
          <p className="text-sm text-ink-secondary mt-2">Creating your 18-block USMLE curriculum.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Create Your Study Plan</h1>
          <p className="text-sm text-ink-secondary">Generate a personalized 230-day USMLE Step 1 schedule.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-ink-secondary mb-2">
            <span>Step {step + 1} of 2</span>
            <span>{step === 0 ? "Plan Basics" : "Review & Generate"}</span>
          </div>
          <Progress value={progress} color="brand" />
        </div>

        <Card className="shadow-card-hover">
          <CardContent className="p-8">
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Plan Name</label>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Start Date</label>
                    <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Target Exam Date</label>
                    <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-surface-muted border border-surface-border">
                  <p className="text-sm font-semibold text-navy-700 mb-2">USMLE Curriculum Structure</p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-ink-secondary">
                    <div><span className="font-bold text-navy-700">{totals.totalStudy}</span> Study Days</div>
                    <div><span className="font-bold text-navy-700">{totals.totalReview}</span> Review Days</div>
                    <div><span className="font-bold text-navy-700">{totals.totalDays}</span> Total Days</div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-700">Curriculum Blocks (18 Systems)</h3>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-2 border border-surface-border rounded-md">
                  {curriculumBlocks.map((block, i) => (
                    <div key={block.id} className="flex items-center gap-2 text-xs p-2 bg-surface-muted rounded">
                      <span className="font-bold text-brand-600">{i + 1}.</span> {block.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep(prev => Math.max(0, prev - 1))} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              {step === 0 ? (
                <Button variant="primary" onClick={() => setStep(1)}>Continue <ChevronRight className="h-4 w-4" /></Button>
              ) : (
                <Button variant="red" onClick={handleGenerate}>Generate My Study Plan <Sparkles className="h-4 w-4" /></Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}