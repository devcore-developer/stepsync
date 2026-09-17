"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "@/context/account-context";
import { ProfileEditModal } from "@/components/account/profile-edit-modal";
import { Mail, CalendarClock, Clock, Target, Flame, Edit, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { profile } = useAccount();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const examDate = profile.examDate ? new Date(profile.examDate) : null;
  const daysRemaining = examDate ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <AppShell>
      <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
        <PageHeader title="Profile" description="Your study identity and preferences">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </PageHeader>

        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-navy-700 to-brand-500" />
          <CardContent className="-mt-10 pb-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="rounded-full ring-4 ring-white">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-bold text-white ring-4 ring-white">
                    {profile.avatarInitials || "NU"}
                  </div>
                </div>
                <div className="pb-2">
                  <h2 className="text-xl font-bold text-navy-700">{profile.fullName || "New User"}</h2>
                  <p className="text-sm text-ink-secondary">{profile.usmleStep || "USMLE Candidate"}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md border border-surface-border p-3">
                <div className="flex items-center gap-2 text-ink-secondary"><Mail className="h-3.5 w-3.5" /><span className="text-xs uppercase">Email</span></div>
                <p className="mt-1 truncate text-sm font-medium text-navy-700">{profile.email || "No email added yet."}</p>
              </div>
              <div className="rounded-md border border-surface-border p-3">
                <div className="flex items-center gap-2 text-ink-secondary"><CalendarClock className="h-3.5 w-3.5" /><span className="text-xs uppercase">Exam Date</span></div>
                <p className="mt-1 text-sm font-medium text-navy-700">{examDate ? examDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "No exam date set."}</p>
              </div>
              <div className="rounded-md border border-surface-border p-3">
                <div className="flex items-center gap-2 text-ink-secondary"><Target className="h-3.5 w-3.5" /><span className="text-xs uppercase">Weekly Goal</span></div>
                <p className="mt-1 text-sm font-medium text-navy-700">{profile.weeklyGoal ? `${profile.weeklyGoal} hours/week` : "No goal set."}</p>
              </div>
              <div className="rounded-md border border-surface-border p-3">
                <div className="flex items-center gap-2 text-ink-secondary"><Clock className="h-3.5 w-3.5" /><span className="text-xs uppercase">Session Length</span></div>
                <p className="mt-1 text-sm font-medium text-navy-700">{profile.preferredSessionLength ? `${profile.preferredSessionLength} min` : "Not set"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Exam Countdown</p>
            <p className="text-3xl font-bold text-navy-700 mt-2">{daysRemaining} <span className="text-base font-normal text-ink-secondary">days</span></p>
            <p className="text-xs text-ink-secondary mt-1">Until {profile.usmleStep}</p>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Current Readiness</p>
            <p className="text-3xl font-bold text-brand-600 mt-2">0%</p>
            <Badge variant="default" className="mt-2">Insufficient Data</Badge>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-ink-tertiary">Study Streak</p>
            <p className="text-3xl font-bold text-accent-gold mt-2 flex items-center gap-1"><Flame className="h-6 w-6" /> 0</p>
            <p className="text-xs text-ink-secondary mt-1">days</p>
          </CardContent></Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-8 text-sm text-ink-secondary">
              No achievements unlocked yet. Complete study tasks to earn badges!
            </div>
          </CardContent>
        </Card>
      </div>

      <ProfileEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </AppShell>
  );
}