"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { usmleSystems } from "@/lib/usmle-systems";
import { generateStudyPlan } from "@/lib/planner-engine";
import { useStudyPlans } from "@/context/study-plan-context";

const resourcesList = ["First Aid", "UWorld", "Boards & Beyond", "Pathoma", "Sketchy", "AnKing / Anki", "Other"];
const strategies = ["Balanced", "Question-focused", "Content-focused", "Review-heavy"];
const questionTargets = [10, 20, 30, 40, 60, 80];

export default function NewStudyPlanPage() {
  const router = useRouter();
  const { addPlan } = useStudyPlans();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("USMLE Step 1 Study Plan");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [examDate, setExamDate] = useState(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState(6);
  const [dailyHours, setDailyHours] = useState("5-6 hours");
  const [selectedSystems, setSelectedSystems] = useState<string[]>(usmleSystems.slice(0, 5).map(s => s.id));
  const [selectedResources, setSelectedResources] = useState<string[]>(["First Aid", "UWorld", "Pathoma"]);
  const [strategy, setStrategy] = useState("Balanced");
  const [questionTarget, setQuestionTarget] = useState(40);

  const steps = ["Plan Basics", "Select Systems", "Resources", "Study Strategy", "Review & Generate"];
  const progress = ((step + 1) / steps.length) * 100;

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const plan = generateStudyPlan({
        name, startDate, examDate, studyDaysPerWeek, dailyHours,
        selectedSystems: usmleSystems.filter(s => selectedSystems.includes(s.id)),
        resources: selectedResources, questionTarget, strategy
      });
      addPlan(plan);
      router.push(`/study-plans/${plan.id}`);
    }, 1500);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-surface-border"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-brand-500 animate-spin"></div>
          </div>
          <h2 className="mt-6 text-xl font-bold text-navy-700">Building your personalized schedule...</h2>
          <p className="text-sm text-ink-secondary mt-2">StepSync AI is optimizing your study days.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Create Your Study Plan</h1>
          <p className="text-sm text-ink-secondary">Build a schedule around your exam date, available time, and study resources.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-ink-secondary mb-2">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{steps[step]}</span>
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
                    <label className="block text-sm font-medium text-ink mb-1">Exam Date</label>
                    <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Study Days Per Week</label>
                  <div className="flex gap-2">
                    {[5, 6, 7].map(d => (
                      <button key={d} onClick={() => setStudyDaysPerWeek(d)} className={cn("flex-1 py-2 rounded-md border text-sm font-medium transition", studyDaysPerWeek === d ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>{d} days</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Daily Study Capacity</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1-2 hours", "3-4 hours", "5-6 hours", "7+ hours"].map(h => (
                      <button key={h} onClick={() => setDailyHours(h)} className={cn("py-2 rounded-md border text-sm font-medium transition", dailyHours === h ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>{h}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-ink-secondary">{selectedSystems.length} of {usmleSystems.length} systems selected</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSystems(usmleSystems.map(s => s.id))}>Select All</Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSystems([])}>Clear</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {usmleSystems.map(sys => {
                    const isSelected = selectedSystems.includes(sys.id);
                    return (
                      <div key={sys.id} onClick={() => {
                        setSelectedSystems(prev => prev.includes(sys.id) ? prev.filter(id => id !== sys.id) : [...prev, sys.id]);
                      }} className={cn("p-4 rounded-lg border cursor-pointer transition flex items-start gap-3", isSelected ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300")}>
                        <div className={cn("h-5 w-5 rounded-md border flex items-center justify-center mt-0.5", isSelected ? "bg-brand-500 border-brand-500 text-white" : "border-slate-300")}>
                          {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-700">{sys.name}</p>
                          <p className="text-xs text-ink-tertiary mt-0.5">{sys.description}</p>
                          <p className="text-xs text-brand-600 mt-1 font-medium">~{sys.defaultEstimatedDays} days</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-4">
                {resourcesList.map(res => {
                  const isSelected = selectedResources.includes(res);
                  return (
                    <div key={res} onClick={() => {
                      setSelectedResources(prev => prev.includes(res) ? prev.filter(r => r !== res) : [...prev, res]);
                    }} className={cn("p-4 rounded-lg border cursor-pointer transition flex items-center justify-between", isSelected ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300")}>
                      <span className="flex items-center gap-2 text-sm font-medium"><BookOpen className="h-4 w-4 text-ink-tertiary" /> {res}</span>
                      <div className={cn("h-5 w-5 rounded-md border flex items-center justify-center", isSelected ? "bg-brand-500 border-brand-500 text-white" : "border-slate-300")}>
                        {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Study Strategy</label>
                  <div className="grid grid-cols-2 gap-3">
                    {strategies.map(s => (
                      <button key={s} onClick={() => setStrategy(s)} className={cn("py-3 rounded-md border text-sm font-medium transition", strategy === s ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Daily Question Target</label>
                  <div className="grid grid-cols-6 gap-2">
                    {questionTargets.map(q => (
                      <button key={q} onClick={() => setQuestionTarget(q)} className={cn("py-2 rounded-md border text-sm font-medium transition", questionTarget === q ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>{q}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-surface-border divide-y divide-surface-border">
                  <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Plan Name</span><span className="text-sm font-semibold text-navy-700">{name}</span></div>
                  <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Duration</span><span className="text-sm font-semibold text-navy-700">{startDate} to {examDate}</span></div>
                  <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Selected Systems</span><span className="text-sm font-semibold text-navy-700">{selectedSystems.length} systems</span></div>
                  <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Resources</span><span className="text-sm font-semibold text-navy-700">{selectedResources.length} resources</span></div>
                  <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Strategy</span><span className="text-sm font-semibold text-navy-700">{strategy} · {questionTarget} Qs/day</span></div>
                </div>
                <div className="flex flex-col items-center justify-center bg-navy-50 p-6 rounded-lg text-center">
                  <Sparkles className="h-8 w-8 text-accent-gold mb-2" />
                  <p className="text-sm font-semibold text-navy-700">Ready to generate your schedule.</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep(prev => Math.max(0, prev - 1))} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              {step < steps.length - 1 ? (
                <Button variant="primary" onClick={() => setStep(prev => prev + 1)}>Continue <ChevronRight className="h-4 w-4" /></Button>
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