"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Deck, Flashcard, Rating, processCard } from '@/lib/flashcard-data';
import { getDecks, createDeck } from '@/app/actions/data';
import { rateFlashcard } from '@/app/actions/analytics';

interface FlashcardContextType {
  decks: Deck[];
  cards: Flashcard[];
  loading: boolean;
  addDeck: (deck: Omit<Deck, 'id'>) => Promise<void>;
  deleteDeck: (id: string) => void;
  addCard: (card: Omit<Flashcard, 'id' | 'createdAt' | 'repetitions' | 'interval' | 'ease' | 'status' | 'dueDate'>) => void;
  updateCard: (id: string, updates: Partial<Flashcard>) => void;
  deleteCard: (id: string) => void;
  rateCard: (cardId: string, rating: Rating) => Promise<void>;
  getDeck: (id: string) => Deck | undefined;
  getCardsForDeck: (deckId: string) => Flashcard[];
  getDueCards: (deckId?: string) => Flashcard[];
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export function FlashcardProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [decks, setDecks] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDecks() {
      if (session?.user) {
        setLoading(true);
        try {
          const dbDecks: any[] = await getDecks() as any[];
          setDecks(dbDecks);
          const fetchedCards = dbDecks.flatMap((d: any) => d.cards || []);
          setCards(fetchedCards);
        } catch (error) {
          console.error("Failed to fetch decks", error);
        }
        setLoading(false);
      } else {
        setDecks([]);
        setCards([]);
        setLoading(false);
      }
    }
    fetchDecks();
  }, [session]);

  const addDeck = async (deck: Omit<Deck, 'id'>) => {
    await createDeck(deck.name);
    const dbDecks: any[] = await getDecks() as any[];
    setDecks(dbDecks);
  };

  const deleteDeck = (id: string) => {
    setDecks(prev => prev.filter(d => d.id !== id));
    setCards(prev => prev.filter(c => c.deckId !== id));
  };

  const addCard = (card: Omit<Flashcard, 'id' | 'createdAt' | 'repetitions' | 'interval' | 'ease' | 'status' | 'dueDate'>) => {
    const id = `card-${Date.now()}`;
    const newCard: Flashcard = {
      ...card,
      id,
      createdAt: new Date().toISOString(),
      repetitions: 0,
      interval: 0,
      ease: 2.5,
      status: 'NEW',
      dueDate: new Date().toISOString()
    };
    setCards(prev => [...prev, newCard]);
  };

  const updateCard = (id: string, updates: Partial<Flashcard>) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const rateCard = async (cardId: string, rating: Rating) => {
    setCards(prev => prev.map(c => c.id === cardId ? processCard(c, rating) : c));
    
    try {
      await rateFlashcard(cardId, rating);
    } catch (error) {
      console.error("Failed to save flashcard rating", error);
    }
  };

  const getDeck = (id: string) => decks.find(d => d.id === id);
  const getCardsForDeck = (deckId: string) => cards.filter(c => c.deckId === deckId);
  const getDueCards = (deckId?: string) => {
    const now = new Date().toISOString();
    return cards.filter(c => (!deckId || c.deckId === deckId) && c.dueDate <= now);
  };

  return (
    <FlashcardContext.Provider value={{ decks, cards, loading, addDeck, deleteDeck, addCard, updateCard, deleteCard, rateCard, getDeck, getCardsForDeck, getDueCards }}>
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcards() {
  const ctx = useContext(FlashcardContext);
  if (!ctx) throw new Error('useFlashcards must be used within FlashcardProvider');
  return ctx;
}