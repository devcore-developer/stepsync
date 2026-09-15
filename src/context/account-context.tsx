"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  fullName: string;
  email: string;
  avatarInitials: string;
  timezone: string;
  usmleStep: string;
  examDate: string;
  targetScore: string;
  weeklyStudyGoal: number;
  preferredStudyDays: string[];
  preferredSessionLength: number;
  preferredStudyStartTime: string;
  defaultStudyMode: 'Focus' | 'Balanced' | 'Intensive';
  questionPracticeMode: 'Timed' | 'Tutor' | 'Mixed';
  reviewPreference: 'Flashcards' | 'Incorrect' | 'Weak Topics' | 'Mixed';
  joinedAt: string;
}

interface AccountContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  fullName: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  avatarInitials: 'AM',
  timezone: 'America/New_York',
  usmleStep: 'Step 1',
  examDate: '2027-03-18',
  targetScore: 'Pass',
  weeklyStudyGoal: 32,
  preferredStudyDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  preferredSessionLength: 60,
  preferredStudyStartTime: '08:00',
  defaultStudyMode: 'Balanced',
  questionPracticeMode: 'Mixed',
  reviewPreference: 'Mixed',
  joinedAt: '2024-06-15'
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('stepsync_account');
      if (stored) {
        const data = JSON.parse(stored);
        if (data.profile) setProfile(data.profile);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('stepsync_account', JSON.stringify({ profile }));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AccountContext.Provider value={{ profile, updateProfile }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
}