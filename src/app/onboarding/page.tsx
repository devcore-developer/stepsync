"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight, Sparkles, Target, CalendarDays, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingResources } from "@/lib/demo-data";

const steps = [
  { title: "Let's build your USMLE Step 1 plan.", description: "Tell us a little about your preparation so StepSync can organize your study journey." },
  { title: "When are you planning to take Step 1?", description: "We'll build your schedule backward from this date." },
  { title: "Where are you in your Step 1 preparation?", description: "Be honest! This helps us calibrate your daily workload." },
  { title: "How much time can you study each day?", description: "Consistency beats cramming. Pick a realistic daily target." },
  { title: "Which resources are you using?", description: "Select all that apply. We'll integrate them into your daily tasks." },
  { title: "How would you like your plan to feel?", description: "Your study style determines how we balance videos, reading, and questions." },
  { title: "Your StepSync plan is ready.", description: "Here's a summary of your preferences. Let's start studying!" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [examDate, setExamDate] = useState("");
  const [prepStage, setPrepStage] = useState("");
  const [studyHours, setStudyHours] = useState("4-5 hours");
  const [studyDays, setStudyDays] = useState("6");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [studyStyle, setStudyStyle] = useState("");

  const progress = ((step + 1) / steps.length) * 100;

  const toggleResource = (id: string) => {
    setSelectedResources(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <header className="flex h-16 items-center border-b border-surface-border bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-700">
            <Sparkles className="h-5 w-5 text-accent-gold" />
          </div>
          <span className="font-bold text-navy-700">StepSync Onboarding</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-navy-700">Step {step + 1} of {steps.length}</span>
              <span className="text-ink-secondary">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} color="brand" />
          </div>

          <div className="rounded-xl border border-surface-border bg-white p-8 shadow-card-hover">
            <h1 className="text-2xl font-bold text-navy-700">{steps[step].title}</h1>
            <p className="mt-1 text-ink-secondary">{steps[step].description}</p>

            <div className="mt-6 min-h-[220px]">
              {step === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-4">
                    <Target className="h-10 w-10" />
                  </div>
                  <p className="text-sm text-ink max-w-sm">Welcome to StepSync! We&apos;re going to ask you a few questions to build the perfect study schedule for your USMLE Step 1 preparation.</p>
                </div>
              )}
              
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {["I have an exam date", "I am targeting a date", "I haven't decided yet"].map((opt) => (
                      <button key={opt} className={cn("rounded-lg border p-4 text-sm font-medium transition", examDate === opt ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-lg bg-surface-subtle p-4 border border-brand-100">
                    <p className="text-xs font-semibold text-brand-700">Why this matters?</p>
                    <p className="mt-1 text-sm text-ink-secondary">Your exam date determines the intensity and distribution of your study systems.</p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Target Date</label>
                    <Input type="date" className="w-full" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {["Just getting started", "Building my foundation", "Reviewing high-yield material", "Doing mostly question banks", "Dedicated / final review"].map((l) => (
                    <div key={l} onClick={() => setPrepStage(l)} className={cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition", prepStage === l ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300")}>
                      <div className={cn("flex h-5 w-5 items-center justify-center rounded-full border", prepStage === l ? "border-brand-500 bg-brand-500" : "border-surface-border")}>
                        {prepStage === l && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium">{l}</span>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {["2-3 hours", "4-5 hours", "6-8 hours", "8+ hours"].map((h) => (
                      <button key={h} onClick={() => setStudyHours(h)} className={cn("rounded-lg border py-4 text-sm font-medium transition", studyHours === h ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border hover:border-brand-300")}>
                        {h}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Study days per week</label>
                    <div className="flex gap-2">
                      {["5", "6", "7"].map((d) => (
                        <button key={d} onClick={() => setStudyDays(d)} className={cn("flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition", studyDays === d ? "border-brand-500 bg-brand-500 text-white" : "border-surface-border hover:border-brand-300")}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {onboardingResources.map((r) => {
                    const isSelected = selectedResources.includes(r.id);
                    return (
                      <div key={r.id} onClick={() => toggleResource(r.id)} className={cn("flex items-center justify-between rounded-lg border p-3 cursor-pointer transition", isSelected ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300")}>
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <BookOpen className="h-4 w-4 text-ink-tertiary" /> {r.name}
                        </span>
                        <div className={cn("flex h-5 w-5 items-center justify-center rounded-md border", isSelected ? "border-brand-500 bg-brand-500 text-white" : "border-surface-border")}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  {[
                    { title: "Balanced", desc: "Even mix of reading, videos, and questions" },
                    { title: "Intensive", desc: "Higher daily volume with less review time" },
                    { title: "Flexible", desc: "Lighter weekdays, heavier weekends" },
                    { title: "Question-focused", desc: "Prioritize UWorld and practice blocks" },
                    { title: "Review-focused", desc: "Emphasis on Anki and spaced repetition" },
                  ].map((s) => (
                    <div key={s.title} onClick={() => setStudyStyle(s.title)} className={cn("flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition", studyStyle === s.title ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300")}>
                      <div className={cn("mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border", studyStyle === s.title ? "border-brand-500 bg-brand-500" : "border-surface-border")}>
                        {studyStyle === s.title && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{s.title}</p>
                        <p className="text-xs text-ink-secondary">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-surface-border divide-y divide-surface-border">
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Exam Goal</span><span className="text-sm font-semibold text-navy-700">March 15, 2025</span></div>
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Preparation Stage</span><span className="text-sm font-semibold text-navy-700">{prepStage || "Not specified"}</span></div>
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Daily Study</span><span className="text-sm font-semibold text-navy-700">{studyHours}</span></div>
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Study Days</span><span className="text-sm font-semibold text-navy-700">{studyDays} days/week</span></div>
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Resources</span><span className="text-sm font-semibold text-navy-700">{selectedResources.length} selected</span></div>
                    <div className="flex justify-between p-3"><span className="text-sm text-ink-secondary">Study Style</span><span className="text-sm font-semibold text-navy-700">{studyStyle || "Not specified"}</span></div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-navy-50 p-6 text-center">
                    <Sparkles className="h-8 w-8 text-accent-gold mb-2" />
                    <p className="text-sm font-semibold text-navy-700">Your AI-optimized schedule is ready to be generated.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              
              {step < steps.length - 1 ? (
                <Button variant="primary" onClick={() => setStep((prev) => prev + 1)}>
                  Continue <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="red" onClick={() => router.push('/dashboard')}>
                  Create My Study Plan <Sparkles className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}