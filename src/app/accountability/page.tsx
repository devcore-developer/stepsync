"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAccountability } from "@/context/accountability-context";
import { InvitePartnerModal } from "@/components/accountability/invite-partner-modal";
import { ShareProgressModal } from "@/components/accountability/share-progress-modal";
import { milestones, accountabilityActivity } from "@/lib/accountability-engine";
import { Flame, Target, CalendarClock, UserPlus, Share2, CheckCircle, AlertTriangle, Trophy, FileQuestion, Layers } from "lucide-react";
import Link from "next/link";

export default function AccountabilityPage() {
  const { goals, partner, lastCheckIn, checkIn } = useAccountability();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState<'Completed' | 'Partially Completed' | 'Missed'>('Completed');

  const handleCheckIn = () => {
    checkIn(checkInStatus, "");
  };

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Accountability" description="Stay consistent, track your commitments, and keep moving toward Step 1." />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsShareOpen(true)}><Share2 className="h-4 w-4" /> Share Progress</Button>
            <Button variant="red" onClick={() => setIsInviteOpen(true)}><UserPlus className="h-4 w-4" /> Invite Partner</Button>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="h-8 w-8 text-accent-gold" />
              <div><p className="text-xs uppercase tracking-wide text-navy-200">Streak</p><p className="text-2xl font-bold">12 days</p></div>
            </CardContent>
          </Card>
          <Card><CardContent className="p-4 flex items-center gap-3">
            <Target className="h-8 w-8 text-brand-500" />
            <div><p className="text-xs uppercase tracking-wide text-ink-tertiary">Weekly Goal</p><p className="text-2xl font-bold text-navy-700">94%</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
            <div><p className="text-xs uppercase tracking-wide text-ink-tertiary">Completion</p><p className="text-2xl font-bold text-navy-700">94%</p></div>
          </CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3">
            <CalendarClock className="h-8 w-8 text-accent-red" />
            <div><p className="text-xs uppercase tracking-wide text-ink-tertiary">Exam Countdown</p><p className="text-2xl font-bold text-navy-700">276 days</p></div>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Goals */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-4 w-4" /> Weekly Goals</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {goals.map(g => (
                  <div key={g.id} className="p-3 rounded-md border border-surface-border">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-navy-700">{g.type}</span>
                      <Badge variant={g.status === 'Completed' ? 'green' : g.status === 'Almost Complete' ? 'brand' : 'gold'}>{g.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Progress value={(g.current / g.target) * 100} size="sm" />
                      <span className="text-xs font-bold text-navy-700 w-16 text-right">{g.current} / {g.target}</span>
                    </div>
                    <p className="text-xs text-ink-tertiary">{g.unit} · Deadline: {g.deadline}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Commitment */}
            <Card className="border-l-4 border-brand-500">
              <CardHeader><CardTitle>Today&apos;s Commitment</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-ink-secondary">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> 40 Questions
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-secondary">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> 2 Study Tasks
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-secondary">
                  <AlertTriangle className="h-4 w-4 text-accent-gold" /> 20 Review Cards
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-secondary">
                  <AlertTriangle className="h-4 w-4 text-accent-gold" /> 2h 30m Study Time
                </div>
                <div className="pt-2 border-t border-surface-border flex justify-between items-center">
                  <span className="text-sm font-medium text-navy-700">3 / 4 completed</span>
                  <Link href="/study/today"><Button variant="primary" size="sm">Continue Studying</Button></Link>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {accountabilityActivity.map(item => {
                  const Icon = item.icon === 'FileQuestion' ? FileQuestion : item.icon === 'Layers' ? Layers : item.icon === 'Trophy' ? Trophy : CheckCircle;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-brand-600"><Icon className="h-4 w-4" /></div>
                        <div className="w-px h-full bg-surface-border" />
                      </div>
                      <div className="pb-2">
                        <p className="text-xs text-ink-tertiary">{item.time}</p>
                        <p className="text-sm font-medium text-navy-700">{item.action}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Study Partner */}
            <Card>
              <CardHeader><CardTitle>Study Partner</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {partner ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-navy-700">{partner.name}</p>
                        <p className="text-xs text-ink-tertiary">Last active: {partner.lastActive}</p>
                      </div>
                      <Badge variant={partner.status === 'Active' ? 'green' : 'gold'}>{partner.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-border">
                      <div><p className="text-xs text-ink-tertiary">Streak</p><p className="text-sm font-bold text-navy-700 flex items-center gap-1"><Flame className="h-3 w-3 text-accent-gold" /> {partner.currentStreak} days</p></div>
                      <div><p className="text-xs text-ink-tertiary">Goal Progress</p><p className="text-sm font-bold text-navy-700">{partner.weeklyGoalProgress}%</p></div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">View Partner Progress</Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <UserPlus className="h-8 w-8 text-ink-tertiary mx-auto mb-2" />
                    <p className="text-sm text-ink-secondary">Stay accountable with a study partner.</p>
                    <Button variant="primary" size="sm" className="mt-3" onClick={() => setIsInviteOpen(true)}>Invite Partner</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Check-in */}
            <Card>
              <CardHeader><CardTitle className="text-base">Daily Check-in</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {lastCheckIn ? (
                  <div className="p-3 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> {lastCheckIn}
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-ink-secondary">How did your study session go?</p>
                    <select 
                      value={checkInStatus}
                      onChange={e => setCheckInStatus(e.target.value as any)}
                      className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm"
                    >
                      <option>Completed</option>
                      <option>Partially Completed</option>
                      <option>Missed</option>
                    </select>
                    <Button variant="primary" size="sm" className="w-full" onClick={handleCheckIn}>Save Check-in</Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader><CardTitle className="text-base">Milestones</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {milestones.map(m => (
                  <div key={m.id} className={`flex items-center justify-between p-2 rounded-md ${m.unlocked ? 'bg-emerald-50' : 'bg-surface-muted'}`}>
                    <span className={`text-sm ${m.unlocked ? 'text-navy-700 font-medium' : 'text-ink-tertiary'}`}>{m.title}</span>
                    {m.unlocked ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <span className="text-xs text-ink-tertiary">{m.progress}/{m.target}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <InvitePartnerModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
      <ShareProgressModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </AppShell>
  );
}