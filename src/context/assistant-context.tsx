"use client";
import React, { createContext, useContext, useState } from 'react';
import { generateAssistantResponse } from '@/lib/assistant-engine';
import type { AssistantResponse, AssistantContext as TAssistantContext, AssistantState } from '@/lib/assistant-engine';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  response?: AssistantResponse;
}

interface AssistantContextType extends TAssistantContext {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  clearChat: () => void;
  setState: (state: AssistantState) => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

const initialContext: TAssistantContext = {
  state: 'On Track',
  weakestSystem: 'Renal',
  weakestAccuracy: 67,
  strongestSystem: 'Cardiovascular',
  strongestAccuracy: 84,
  dueCards: 42,
  overdueCards: 6,
  questionsCompleted: 1284,
  questionsTotal: 3645,
  readinessScore: 78,
  daysBehind: 0,
};

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<TAssistantContext>(initialContext);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      response: {
        id: 'welcome',
        text: "Hello! I'm your StepSync Study Assistant. I've analyzed your performance. What can I help you with today?",
        actions: [
          { label: 'What should I study today?', href: '#', variant: 'primary' }
        ]
      }
    }
  ]);

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text };
    const response = generateAssistantResponse(text, ctx);
    const assistantMsg: ChatMessage = { id: response.id, role: 'assistant', response };
    setMessages(prev => [...prev, userMsg, assistantMsg]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        response: {
          id: 'welcome',
          text: "Chat cleared. What would you like to know?",
          actions: [{ label: 'What should I study today?', href: '#', variant: 'primary' }]
        }
      }
    ]);
  };

  const setState = (state: AssistantState) => {
    setCtx(prev => {
      if (state === 'Behind Schedule') return { ...prev, state, daysBehind: 3, readinessScore: 62, weakestAccuracy: 58 };
      if (state === 'Heavy Review') return { ...prev, state, dueCards: 85, overdueCards: 22, readinessScore: 75 };
      if (state === 'Insufficient Data') return { ...prev, state, readinessScore: 0, questionsCompleted: 12, dueCards: 0, weakestSystem: 'N/A', weakestAccuracy: 0 };
      return { ...prev, state, daysBehind: 0, readinessScore: 78, dueCards: 42, overdueCards: 6, weakestAccuracy: 67 };
    });
  };

  return (
    <AssistantContext.Provider value={{ ...ctx, messages, sendMessage, clearChat, setState }}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
  return ctx;
}