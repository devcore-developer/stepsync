"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useFlashcards } from "@/context/flashcard-context";
import { DeckFormModal } from "@/components/review/deck-form-modal";
import { Plus, Play, Layers, Clock, Flame, Target, ChevronRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReviewDashboard() {
  const { decks, cards, getDueCards } = useFlashcards();
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  const dueToday = getDueCards();
  const newToday = cards.filter(c => c.status === 'NEW').length;
  const learningToday = cards.filter(c => c.status === 'LEARNING').length;
  
  const reviewedToday = 28; // Mock
  const retention = 84; // Mock
  const streak = 12; // Mock

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Review" description="Strengthen what you've learned with spaced repetition." />
          <Button variant="red" onClick={() => setIsDeckModalOpen(true)}><Plus className="h-4 w-4" /> Create Deck</Button>
        </div>

        {/* Today's Review Hero */}
        <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><Layers className="h-5 w-5 text-accent-gold" /> Today's Review</h2>
              <div className="grid grid-cols-3 gap-6 mt-4">
                <div><p className="text-2xl font-bold">{dueToday.length + newToday}</p><p className="text-xs text-navy-200 uppercase">Due Today</p></div>
                <div><p className="text-2xl font-bold">{learningToday}</p><p className="text-xs text-navy-200 uppercase">Learning</p></div>
                <div><p className="text-2xl font-bold">{newToday}</p><p className="text-xs text-navy-200 uppercase">New</p></div>
              </div>
              <p className="text-sm text-navy-100 mt-4 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Estimated time: ~{Math.ceil((dueToday.length + newToday) * 0.5)} min</p>
            </div>
            <Link href={`/review/session/all`}>
              <Button variant="red" size="lg" disabled={dueToday.length === 0 && newToday === 0}>
                <Play className="h-4 w-4 mr-1" /> Start Today's Review
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-ink-tertiary uppercase">Due Today</p><p className="text-2xl font-bold text-navy-700 mt-1">{dueToday.length}</p></div><Layers className="h-8 w-8 text-brand-100" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-ink-tertiary uppercase">Reviewed Today</p><p className="text-2xl font-bold text-navy-700 mt-1">{reviewedToday}</p></div><Clock className="h-8 w-8 text-brand-100" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-ink-tertiary uppercase">Retention</p><p className="text-2xl font-bold text-emerald-600 mt-1">{retention}%</p></div><Target className="h-8 w-8 text-emerald-100" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-ink-tertiary uppercase">Streak</p><p className="text-2xl font-bold text-accent-gold mt-1">{streak}d</p></div><Flame className="h-8 w-8 text-amber-100" /></CardContent></Card>
        </div>

        {/* Decks */}
        <div>
          <h2 className="text-lg font-bold text-navy-700 mb-4">Your Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map(deck => {
              const deckCards = cards.filter(c => c.deckId === deck.id);
              const dueCount = deckCards.filter(c => c.dueDate <= new Date().toISOString()).length;
              const mastered = deckCards.filter(c => c.status === 'MASTERED').length;
              const progress = deckCards.length > 0 ? Math.round((mastered / deckCards.length) * 100) : 0;
              
              return (
                <Card key={deck.id} className="hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base font-bold text-navy-700">{deck.name}</h3>
                        <p className="text-xs text-ink-tertiary">{deckCards.length} cards</p>
                      </div>
                      <Badge variant={dueCount > 0 ? "red" : "default"}>{dueCount} Due</Badge>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-ink-secondary">Mastered</span>
                        <span className="font-bold text-navy-700">{progress}%</span>
                      </div>
                      <Progress value={progress} color="brand" size="sm" />
                    </div>
                    <Link href={`/review/session/${deck.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Review Deck <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Reviews Mock */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Upcoming Reviews</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-center">
              {[{d:'Today', c:dueToday.length}, {d:'Tomorrow', c:18}, {d:'Wed', c:26}, {d:'Thu', c:31}, {d:'Fri', c:14}, {d:'Sat', c:22}, {d:'Sun', c:17}].map(day => (
                <div key={day.d} className="p-3 rounded-md border border-surface-border">
                  <p className="text-xs text-ink-tertiary">{day.d}</p>
                  <p className={cn("text-xl font-bold mt-1", day.c > 20 ? "text-accent-red" : "text-navy-700")}>{day.c}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <DeckFormModal isOpen={isDeckModalOpen} onClose={() => setIsDeckModalOpen(false)} />
    </AppShell>
  );
}