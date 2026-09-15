"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestions } from "@/context/question-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { Check, Bookmark, ChevronLeft, ChevronRight, AlertCircle, Clock } from "lucide-react";

export function QuestionPlayer() {
  const router = useRouter();
  const { activeBlock, selectAnswer, toggleMark, nextQuestion, prevQuestion, submitBlock, clearActiveBlock } = useQuestions();
  const [showExit, setShowExit] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activeBlock?.remainingTime || 0);

  useEffect(() => {
    if (!activeBlock || activeBlock.mode !== 'Timed') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSumbitBlock();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeBlock]);

  if (!activeBlock) return null;

  const question = activeBlock.questions[activeBlock.currentQuestionIndex];
  const userAnswer = activeBlock.answers[question.id];
  const isAnswered = userAnswer?.selectedAnswer !== undefined && userAnswer?.selectedAnswer >= 0;
  const isCorrect = userAnswer?.isCorrect;
  const isMarked = userAnswer?.marked;

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;
  const answeredCount = Object.values(activeBlock.answers).filter(a => a.selectedAnswer >= 0).length;

  const handleExit = () => {
    clearActiveBlock();
    router.push('/questions');
  };

  const handleSumbitBlock = () => {
    const result = submitBlock();
    // We don't have a db, so we navigate to a generic results page passing the result via state or URL.
    // For this demo, we'll just route to a generic results page.
    router.push(`/questions/session/results`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-muted">
      {/* Top Bar */}
      <header className="sticky top-0 bg-white border-b border-surface-border z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowExit(true)} className="text-ink-secondary hover:text-navy-700">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-bold text-navy-700">Question {activeBlock.currentQuestionIndex + 1} of {activeBlock.questions.length}</p>
              <div className="w-32 mt-1"><Progress value={(activeBlock.currentQuestionIndex + 1) / activeBlock.questions.length * 100} size="sm" /></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeBlock.mode === 'Timed' && (
              <div className={cn("flex items-center gap-1.5 font-mono text-sm font-bold", timeLeft < 60 ? "text-accent-red" : "text-navy-700")}>
                <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setShowSubmit(true)}>Submit</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="navy">{question.system}</Badge>
            <Badge variant="default">{question.topic}</Badge>
            <Badge variant={question.difficulty === 'Easy' ? 'green' : question.difficulty === 'Medium' ? 'gold' : 'red'}>{question.difficulty}</Badge>
          </div>
          
          <div className="prose prose-sm max-w-none mb-8">
            <p className="text-ink leading-relaxed">{question.stem}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const isSelected = userAnswer?.selectedAnswer === i;
              const showCorrect = activeBlock.mode === 'Tutor' && isAnswered && i === question.correctAnswer;
              const showIncorrect = activeBlock.mode === 'Tutor' && isAnswered && isSelected && i !== question.correctAnswer;
              
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(question.id, i)}
                  disabled={activeBlock.mode === 'Tutor' && isAnswered}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border flex items-start gap-3 transition-all",
                    showCorrect ? "border-emerald-500 bg-emerald-50" : showIncorrect ? "border-accent-red bg-red-50" : isSelected ? "border-brand-500 bg-brand-50" : "border-surface-border hover:border-brand-300",
                    (activeBlock.mode === 'Tutor' && isAnswered) && "cursor-default"
                  )}
                >
                  <span className={cn("flex h-6 w-6 items-center justify-center rounded-full border shrink-0 text-xs font-bold", isSelected || showCorrect ? "border-transparent bg-brand-500 text-white" : "border-slate-300 text-ink-secondary")}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={cn("text-sm flex-1", isSelected || showCorrect ? "text-navy-700 font-medium" : "text-ink")}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Tutor Mode Explanation */}
          {activeBlock.mode === 'Tutor' && isAnswered && (
            <div className="mt-8 p-5 rounded-lg border border-surface-border bg-white shadow-card">
              <div className={cn("flex items-center gap-2 mb-3 pb-3 border-b", isCorrect ? "border-emerald-100" : "border-red-100")}>
                {isCorrect ? <Check className="h-5 w-5 text-emerald-600" /> : <AlertCircle className="h-5 w-5 text-accent-red" />}
                <h3 className={cn("text-sm font-bold", isCorrect ? "text-emerald-600" : "text-accent-red")}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </h3>
              </div>
              <p className="text-sm text-ink mb-4">{question.explanation}</p>
              <div className="bg-surface-muted p-3 rounded-md">
                <p className="text-xs font-semibold text-navy-700 mb-1">Key Learning Points</p>
                <ul className="list-disc list-inside text-xs text-ink-secondary space-y-1">
                  {question.learningPoints.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="outline" onClick={prevQuestion} disabled={activeBlock.currentQuestionIndex === 0}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => toggleMark(question.id)} className={cn(isMarked && "text-accent-gold")}>
              <Bookmark className={cn("h-4 w-4 mr-1", isMarked && "fill-current")} /> {isMarked ? "Marked" : "Mark"}
            </Button>
          </div>

          {activeBlock.currentQuestionIndex < activeBlock.questions.length - 1 ? (
            <Button variant="primary" onClick={nextQuestion}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="red" onClick={() => setShowSubmit(true)}>Finish Block</Button>
          )}
        </div>
      </footer>

      {/* Exit Modal */}
      <Modal isOpen={showExit} onClose={() => setShowExit(false)} title="Leave question block?">
        <div className="p-6 text-sm text-ink-secondary">Your progress in this session will be lost. Are you sure you want to exit?</div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowExit(false)}>Continue Session</Button>
          <Button variant="red" onClick={handleExit}>Exit Block</Button>
        </div>
      </Modal>

      {/* Submit Modal */}
      <Modal isOpen={showSubmit} onClose={() => setShowSubmit(false)} title="Submit Question Block?">
        <div className="p-6 space-y-4">
          <div className="bg-surface-muted p-4 rounded-md text-sm space-y-2">
            <div className="flex justify-between"><span className="text-ink-secondary">Answered</span><span className="font-bold text-navy-700">{answeredCount} / {activeBlock.questions.length}</span></div>
            <div className="flex justify-between"><span className="text-ink-secondary">Unanswered</span><span className="font-bold text-accent-red">{activeBlock.questions.length - answeredCount}</span></div>
            <div className="flex justify-between"><span className="text-ink-secondary">Marked for Review</span><span className="font-bold text-accent-gold">{Object.values(activeBlock.answers).filter(a => a.marked).length}</span></div>
          </div>
          {activeBlock.questions.length - answeredCount > 0 && (
            <div className="flex items-start gap-2 p-2 rounded-md bg-red-50 border border-red-100">
              <AlertCircle className="h-4 w-4 text-accent-red mt-0.5 shrink-0" />
              <p className="text-xs text-accent-red-dark">You have unanswered questions. Are you sure you want to submit?</p>
            </div>
          )}
        </div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowSubmit(false)}>Continue Reviewing</Button>
          <Button variant="primary" onClick={handleSumbitBlock}>Submit Block</Button>
        </div>
      </Modal>
    </div>
  );
}