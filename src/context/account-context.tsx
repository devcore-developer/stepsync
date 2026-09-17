"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { getUserProfile, updateUserProfile } from '@/app/actions/data';

export interface UserProfile {
  fullName: string;
  email: string;
  avatarInitials: string;
  usmleStep: string;
  examDate: string;
  targetScore: string;
  weeklyGoal: number;
  preferredStudyDays: string[];
  preferredSessionLength: number;
  timezone: string;
  defaultStudyMode: string;
  questionPracticeMode: string;
  reviewPreference: string;
}

interface AccountContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const defaultProfile: UserProfile = {
  fullName: 'Guest',
  email: '',
  avatarInitials: 'GU',
  usmleStep: 'Step 1',
  examDate: '',
  targetScore: 'Pass',
  weeklyGoal: 20,
  preferredStudyDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  preferredSessionLength: 45,
  timezone: 'America/New_York',
  defaultStudyMode: 'Balanced',
  questionPracticeMode: 'Mixed',
  reviewPreference: 'Mixed',
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    async function fetchProfile() {
      if (session?.user) {
        try {
          const dbProfile = await getUserProfile();
          setProfile({
            ...defaultProfile,
            fullName: session.user.name || "User",
            email: session.user.email || "",
            avatarInitials: (session.user.name || "U").split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            examDate: dbProfile.examDate || "",
            weeklyGoal: dbProfile.weeklyGoal || 20,
            preferredStudyDays: dbProfile.studyDays ? dbProfile.studyDays.split(',') : defaultProfile.preferredStudyDays,
            preferredSessionLength: dbProfile.sessionLength || 45,
          });
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      } else {
        setProfile(defaultProfile);
      }
    }
    fetchProfile();
  }, [session]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    await updateUserProfile({
      examDate: updates.examDate,
      weeklyGoal: updates.weeklyGoal,
      studyDays: updates.preferredStudyDays?.join(','),
      sessionLength: updates.preferredSessionLength,
    });
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