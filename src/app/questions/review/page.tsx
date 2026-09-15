"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockQuestions, Question } from "@/lib/question-data";
import { Check, X, Bookmark, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFlashcards } from "@/context/flashcard-context";
import { CardFormModal } from "@/components/review/card-form-modal";

export default function ReviewPage() {
  const { decks } = useFlashcards();
  const [activeTab, setActiveTab] = useState<'incorrect' | 'marked' | 'all'>('incorrect');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // Simulate user answers
  const reviewItems = mockQuestions.map((q, i) => ({
    ...q,
    yourAnswer: i % 2 === 0 ? q.correctAnswer : (q.correctAnswer + 1) % q.options.length,
    isCorrect: i % 2 === 0,
    marked: i === 1,
  }));

  const filteredItems = reviewItems.filter(item => {
    if (activeTab === 'incorrect') return !item.isCorrect;
    if (activeTab === 'marked') return item.marked;
    return true;
  });

  const handleCreateFlashcard = (q: Question) => {
    setActiveQuestion(q);
    setIsCardModalOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <PageHeader title="Question Review" description="Review your incorrect and marked questions." />

        <div className="flex gap-2 border-b border-surface-border">
          {(['incorrect', 'marked', 'all'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab ? "border-brand-500 text-brand-600" : "border-transparent text-ink-secondary hover:text-navy-700"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'incorrect' ? reviewItems.filter(i => !i.isCorrect).length : tab === 'marked' ? reviewItems.filter(i => i.marked).length : reviewItems.length})
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-sm text-ink-secondary">No questions in this category.</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="navy">{item.system}</Badge>
                        <Badge variant={item.isCorrect ? "green" : "red"}>{item.isCorrect ? "Correct" : "Incorrect"}</Badge>
                        {item.marked && <Bookmark className="h-3.5 w-3.5 text-accent-gold fill-current" />}
                      </div>
                      <p className="text-sm text-navy-700 font-medium line-clamp-2">{item.stem}</p>
                    </div>
                    {expandedId === item.id ? <ChevronUp className="h-5 w-5 text-ink-tertiary" /> : <ChevronDown className="h-5 w-5 text-ink-tertiary" />}
                  </div>

                  {expandedId === item.id && (
                    <div className="mt-4 pt-4 border-t border-surface-border space-y-4">
                      <div className="space-y-2">
                        {item.options.map((opt, i) => {
                          const isCorrect = i === item.correctAnswer;
                          const isYour = i === item.yourAnswer;
                          return (
                            <div key={i} className={cn("flex items-start gap-2 p-2 rounded-md text-sm", isCorrect ? "bg-emerald-50" : isYour ? "bg-red-50" : "bg-white")}>
                              <span className={cn("h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0", isCorrect ? "bg-emerald-500 text-white" : isYour ? "bg-accent-red text-white" : "bg-surface-muted text-ink-secondary")}>{String.fromCharCode(65+i)}</span>
                              <span className={cn("flex-1", isCorrect || isYour ? "text-navy-700 font-medium" : "text-ink")}>{opt}</span>
                              {isCorrect && <Check className="h-4 w-4 text-emerald-600" />}
                              {isYour && !isCorrect && <X className="h-4 w-4 text-accent-red" />}
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-surface-muted p-3 rounded-md">
                        <p className="text-xs font-semibold text-navy-700 mb-1">Explanation</p>
                        <p className="text-xs text-ink-secondary">{item.explanation}</p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCreateFlashcard(item)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" /> Create Flashcard
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {isCardModalOpen && activeQuestion && (
        <CardFormModal 
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          deckId={decks[0]?.id || 'deck-1'} // Default to first deck
          prefill={{ 
            front: activeQuestion.stem, 
            system: activeQuestion.system, 
            topic: activeQuestion.topic,
            sourceType: 'QUESTION',
            sourceId: activeQuestion.id
          }}
        />
      )}
    </AppShell>
  );
}