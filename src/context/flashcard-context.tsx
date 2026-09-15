"use client";
import React, { createContext, useContext, useState } from 'react';
import { Deck, Flashcard, Rating, processCard, demoDecks, demoCards } from '@/lib/flashcard-data';

interface FlashcardContextType {
  decks: Deck[];
  cards: Flashcard[];
  addDeck: (deck: Omit<Deck, 'id'>) => string;
  deleteDeck: (id: string) => void;
  addCard: (card: Omit<Flashcard, 'id' | 'createdAt' | 'repetitions' | 'interval' | 'ease' | 'status' | 'dueDate'>) => void;
  updateCard: (id: string, updates: Partial<Flashcard>) => void;
  deleteCard: (id: string) => void;
  rateCard: (cardId: string, rating: Rating) => void;
  getDeck: (id: string) => Deck | undefined;
  getCardsForDeck: (deckId: string) => Flashcard[];
  getDueCards: (deckId?: string) => Flashcard[];
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export function FlashcardProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>(demoDecks);
  const [cards, setCards] = useState<Flashcard[]>(demoCards);

  const addDeck = (deck: Omit<Deck, 'id'>) => {
    const id = `deck-${Date.now()}`;
    setDecks(prev => [...prev, { ...deck, id }]);
    return id;
  };

  const deleteDeck = (id: string) => {
    setDecks(prev => prev.filter(d => d.id !== id));
    setCards(prev => prev.filter(c => c.deckId !== id));
  };

  const addCard = (card: Omit<Flashcard, 'id' | 'createdAt' | 'repetitions' | 'interval' | 'ease' | 'status' | 'dueDate'>) => {
    const id = `card-${Date.now()}`;
    setCards(prev => [...prev, {
      ...card,
      id,
      createdAt: new Date().toISOString(),
      repetitions: 0,
      interval: 0,
      ease: 2.5,
      status: 'NEW',
      dueDate: new Date().toISOString()
    }]);
  };

  const updateCard = (id: string, updates: Partial<Flashcard>) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const rateCard = (cardId: string, rating: Rating) => {
    setCards(prev => prev.map(c => c.id === cardId ? processCard(c, rating) : c));
  };

  const getDeck = (id: string) => decks.find(d => d.id === id);
  const getCardsForDeck = (deckId: string) => cards.filter(c => c.deckId === deckId);
  const getDueCards = (deckId?: string) => {
    const now = new Date().toISOString();
    return cards.filter(c => (!deckId || c.deckId === deckId) && c.dueDate <= now);
  };

  return (
    <FlashcardContext.Provider value={{ decks, cards, addDeck, deleteDeck, addCard, updateCard, deleteCard, rateCard, getDeck, getCardsForDeck, getDueCards }}>
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcards() {
  const ctx = useContext(FlashcardContext);
  if (!ctx) throw new Error('useFlashcards must be used within FlashcardProvider');
  return ctx;
}