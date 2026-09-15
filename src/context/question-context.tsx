"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Question, QuestionBlockResult, mockQuestions, QuestionAnswer, calculateAccuracy } from '@/lib/question-data';

interface QuestionContextType {
  activeBlock: {
    questions: Question[];
    answers: Record<string, QuestionAnswer>;
    currentQuestionIndex: number;
    mode: 'Timed' | 'Tutor';
    remainingTime: number;
    startedAt: number;
  } | null;
  startBlock: (config: { count: number; mode: 'Timed' | 'Tutor'; }) => string;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  toggleMark: (questionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitBlock: () => QuestionBlockResult;
  clearActiveBlock: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [activeBlock, setActiveBlock] = useState<QuestionContextType['activeBlock']>(null);

  const startBlock = (config: { count: number; mode: 'Timed' | 'Tutor'; }) => {
    const blockId = `block-${Date.now()}`;
    const questions = [...mockQuestions, ...mockQuestions].slice(0, config.count);
    const newBlock = {
      questions,
      answers: {},
      currentQuestionIndex: 0,
      mode: config.mode,
      remainingTime: config.count * 90, // 90 sec/question
      startedAt: Date.now(),
    };
    setActiveBlock(newBlock);
    return blockId;
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setActiveBlock(prev => {
      if (!prev) return prev;
      const existing = prev.answers[questionId];
      const timeSpent = existing?.timeSpent || 0;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: { 
            questionId, 
            selectedAnswer: optionIndex, 
            isCorrect: optionIndex === prev.questions.find(q => q.id === questionId)?.correctAnswer,
            timeSpent,
            marked: existing?.marked || false,
            answeredAt: Date.now()
          }
        }
      };
    });
  };

  const toggleMark = (questionId: string) => {
    setActiveBlock(prev => {
      if (!prev) return prev;
      const existing = prev.answers[questionId] || { questionId, selectedAnswer: -1, isCorrect: false, timeSpent: 0, marked: false, answeredAt: 0 };
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: { ...existing, marked: !existing.marked }
        }
      };
    });
  };

  const nextQuestion = () => setActiveBlock(prev => prev ? { ...prev, currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1) } : prev);
  const prevQuestion = () => setActiveBlock(prev => prev ? { ...prev, currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0) } : prev);

  const submitBlock = (): QuestionBlockResult => {
    if (!activeBlock) throw new Error("No active block");
    
    const answered = Object.values(activeBlock.answers).filter(a => a.selectedAnswer !== undefined && a.selectedAnswer >= 0);
    const correct = answered.filter(a => a.isCorrect).length;
    const incorrect = answered.filter(a => !a.isCorrect).length;
    const unanswered = activeBlock.questions.length - answered.length;
    const accuracy = calculateAccuracy(correct, activeBlock.questions.length);

    const systemResultsMap: Record<string, { correct: number; total: number }> = {};
    activeBlock.questions.forEach(q => {
      if (!systemResultsMap[q.system]) systemResultsMap[q.system] = { correct: 0, total: 0 };
      systemResultsMap[q.system].total++;
      if (activeBlock.answers[q.id]?.isCorrect) systemResultsMap[q.system].correct++;
    });

    const result: QuestionBlockResult = {
      blockId: `block-${activeBlock.startedAt}`,
      totalQuestions: activeBlock.questions.length,
      answeredQuestions: answered.length,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unansweredQuestions: unanswered,
      accuracy,
      durationSeconds: Math.round((Date.now() - activeBlock.startedAt) / 1000),
      systemResults: Object.entries(systemResultsMap).map(([system, val]) => ({ system, ...val }))
    };
    
    setActiveBlock(null);
    return result;
  };

  const clearActiveBlock = () => setActiveBlock(null);

  return (
    <QuestionContext.Provider value={{ activeBlock, startBlock, selectAnswer, toggleMark, nextQuestion, prevQuestion, submitBlock, clearActiveBlock }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions() {
  const ctx = useContext(QuestionContext);
  if (!ctx) throw new Error('useQuestions must be used within QuestionProvider');
  return ctx;
}