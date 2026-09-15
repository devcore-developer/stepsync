"use client";
import React, { createContext, useContext, useState } from 'react';
import { AccountabilityGoal, StudyPartner, initialGoals, mockPartner, getGoalStatus } from '@/lib/accountability-engine';

interface SharePreferences {
  studyHours: boolean;
  questions: boolean;
  accuracy: boolean;
  streak: boolean;
  readiness: boolean;
  examCountdown: boolean;
}

interface AccountabilityContextType {
  goals: AccountabilityGoal[];
  partner: StudyPartner | null;
  sharePrefs: SharePreferences;
  updateSharePrefs: (prefs: Partial<SharePreferences>) => void;
  sendInvite: (email: string) => void;
  resetPartner: () => void;
  checkIn: (status: 'Completed' | 'Partially Completed' | 'Missed', note: string) => void;
  lastCheckIn: string | null;
}

const AccountabilityContext = createContext<AccountabilityContextType | undefined>(undefined);

export function AccountabilityProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<AccountabilityGoal[]>(initialGoals);
  const [partner, setPartner] = useState<StudyPartner | null>(mockPartner);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [sharePrefs, setSharePrefs] = useState<SharePreferences>({
    studyHours: true, questions: true, accuracy: true, streak: true, readiness: true, examCountdown: false,
  });

  const updateSharePrefs = (prefs: Partial<SharePreferences>) => {
    setSharePrefs(prev => ({ ...prev, ...prefs }));
  };

  const sendInvite = (email: string) => {
    // Simulate invite sent
    setPartner({ name: 'Pending Invite', status: 'Pending', currentStreak: 0, weeklyGoalProgress: 0, lastActive: 'Just now' });
  };

  const resetPartner = () => {
    setPartner(null);
  };

  const checkIn = (status: string, note: string) => {
    setLastCheckIn(`Check-in saved: ${status}`);
  };

  return (
    <AccountabilityContext.Provider value={{ goals, partner, sharePrefs, updateSharePrefs, sendInvite, resetPartner, checkIn, lastCheckIn }}>
      {children}
    </AccountabilityContext.Provider>
  );
}

export function useAccountability() {
  const ctx = useContext(AccountabilityContext);
  if (!ctx) throw new Error('useAccountability must be used within AccountabilityProvider');
  return ctx;
}