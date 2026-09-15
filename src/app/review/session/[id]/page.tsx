"use client";
import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { useFlashcards } from "@/context/flashcard-context";
import { Rating } from "@/lib/flashcard-data";
import { ChevronLeft, Eye, CheckCircle, RotateCw } from "lucide-react";
import Link from "next/link";

export default function ReviewSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getDeck, getDueCards, rateCard, cards } = useFlashcards();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0, startTime: Date.now() });

  const queue = useMemo(() => {
    if (id === 'all') {
      return getDueCards();
    }
    const deck = getDeck(id);
    if (!deck) return [];
    // For a specific deck, include both due cards and new cards
    return cards.filter(c => c.deckId === id && (c.status === 'NEW' || c.dueDate <= new Date().toISOString()));
  }, [id, cards, getDeck, getDueCards]);

  const deckName = id === 'all' ? 'All Due Cards' : getDeck(id)?.name || 'Review Session';
  const currentCard = queue[currentIndex];

  const handleRate = (rating: Rating) => {
    if (!currentCard) return;
    rateCard(currentCard.id, rating);
    
    const ratingKey = rating.toLowerCase() as 'again' | 'hard' | 'good' | 'easy';
    setSessionStats(prev => ({ 
      ...prev, 
      reviewed: prev.reviewed + 1, 
      [ratingKey]: prev[ratingKey] + 1 
    }));
    
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsComplete(true);
    }
  };

  if (queue.length === 0 && !isComplete) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold text-navy-700">You&apos;re all caught up!</h1>
          <p className="text-sm text-ink-secondary mt-1">No cards are due for review right now.</p>
          <Link href="/review"><Button variant="primary" className="mt-6">Back to Review</Button></Link>
        </div>
      </AppShell>
    );
  }

  if (isComplete) {
    const timeSpent = Math.round((Date.now() - sessionStats.startTime) / 1000);
    const correctRecalls = sessionStats.good + sessionStats.easy;
    const retention = sessionStats.reviewed > 0 ? Math.round((correctRecalls / sessionStats.reviewed) * 100) : 0;

    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-navy-700">Review Complete</h1>
          <p className="text-sm text-ink-secondary mt-1">Excellent work. You&apos;ve finished the session.</p>
          
          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-surface-border">
              <p className="text-xs text-ink-tertiary uppercase">Reviewed</p>
              <p className="text-2xl font-bold text-navy-700 mt-1">{sessionStats.reviewed}</p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-surface-border">
              <p className="text-xs text-ink-tertiary uppercase">Retention</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{retention}%</p>
            </div>
          </div>

          <div className="w-full mt-4 grid grid-cols-4 gap-2 text-sm">
            <div className="p-2 rounded bg-red-50 text-center"><p className="text-xs text-accent-red">Again</p><p className="font-bold text-accent-red-dark">{sessionStats.again}</p></div>
            <div className="p-2 rounded bg-amber-50 text-center"><p className="text-xs text-accent-gold">Hard</p><p className="font-bold text-amber-700">{sessionStats.hard}</p></div>
            <div className="p-2 rounded bg-brand-50 text-center"><p className="text-xs text-brand-600">Good</p><p className="font-bold text-brand-700">{sessionStats.good}</p></div>
            <div className="p-2 rounded bg-emerald-50 text-center"><p className="text-xs text-emerald-600">Easy</p><p className="font-bold text-emerald-700">{sessionStats.easy}</p></div>
          </div>

          <p className="text-sm text-ink-secondary mt-4">Time spent: {Math.floor(timeSpent/60)}m {timeSpent%60}s</p>
          
          <Link href="/review" className="mt-6 w-full"><Button variant="primary" className="w-full">Back to Review</Button></Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="min-h-[80vh] flex flex-col max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 border-b border-surface-border">
          <Button variant="ghost" size="sm" onClick={() => setIsExitOpen(true)}><ChevronLeft className="h-4 w-4" /> Exit</Button>
          <div className="flex-1 px-4">
            <p className="text-sm font-medium text-navy-700 text-center">{deckName}</p>
            <Progress value={(currentIndex / queue.length) * 100} size="sm" className="mt-2" />
          </div>
          <p className="text-sm text-ink-secondary">{currentIndex + 1} / {queue.length}</p>
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex items-center justify-center py-8">
          {currentCard && (
            <div className="w-full bg-white rounded-lg shadow-card-hover border border-surface-border p-8 min-h-[300px] flex flex-col">
              <div className="flex justify-between mb-4">
                <Badge variant="navy">{currentCard.system}</Badge>
                <Badge variant={currentCard.status === 'NEW' ? 'gold' : currentCard.status === 'LEARNING' ? 'red' : currentCard.status === 'REVIEW' ? 'brand' : 'green'}>
                  {currentCard.status}
                </Badge>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-navy-700 mb-4">{currentCard.front}</p>
                {showAnswer ? (
                  <div className="mt-4 pt-4 border-t border-surface-border w-full">
                    <p className="text-base text-emerald-600 font-bold mb-2">Answer: {currentCard.back}</p>
                    {currentCard.explanation && <p className="text-sm text-ink-secondary mt-2">{currentCard.explanation}</p>}
                  </div>
                ) : (
                  <Button variant="outline" className="mt-4" onClick={() => setShowAnswer(true)}>
                    <Eye className="h-4 w-4 mr-2" /> Show Answer
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {showAnswer && currentCard && (
          <div className="grid grid-cols-4 gap-2 pb-8 animate-fade-in">
            <Button variant="red" onClick={() => handleRate('Again')}>
              <RotateCw className="h-4 w-4 mr-1" /> Again
              <span className="block text-[0.625rem] opacity-80">10 min</span>
            </Button>
            <Button variant="gold" onClick={() => handleRate('Hard')}>
              Hard
              <span className="block text-[0.625rem] opacity-80">1 day</span>
            </Button>
            <Button variant="primary" onClick={() => handleRate('Good')}>
              Good
              <span className="block text-[0.625rem] opacity-80">4 days</span>
            </Button>
            <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50" onClick={() => handleRate('Easy')}>
              Easy
              <span className="block text-[0.625rem] opacity-80">10 days</span>
            </Button>
          </div>
        )}
      </div>

      <Modal isOpen={isExitOpen} onClose={() => setIsExitOpen(false)} title="Exit Review Session?">
        <div className="p-6 text-sm text-ink-secondary">Your progress is saved. You can resume later.</div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsExitOpen(false)}>Continue Review</Button>
          <Link href="/review"><Button variant="red">Exit Session</Button></Link>
        </div>
      </Modal>
    </AppShell>
  );
}