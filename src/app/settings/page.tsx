"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Modal } from "@/components/ui/modal";
import { useNotifications } from "@/context/notification-context";
import { useAccount } from "@/context/account-context";
import { cn } from "@/lib/utils";
import { User, Bell, Palette, Shield, Download, Trash2, Monitor, Smartphone, Lock, HelpCircle } from "lucide-react";

type SettingsSection = 'account' | 'preferences' | 'notifications' | 'privacy' | 'security' | 'appearance' | 'help';

export default function SettingsPage() {
  const [section, setSection] = useState<SettingsSection>('account');
  const { preferences, updatePreferences, isQuietHours } = useNotifications();
  const { profile, updateProfile } = useAccount();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [exportModal, setExportModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0);
  const [pwdModal, setPwdModal] = useState(false);

  const navItems: { id: SettingsSection; label: string; icon: any }[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Study Preferences', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleExport = () => {
    const data = {
      profile,
      notificationPreferences: preferences
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stepsync_data.json';
    a.click();
    setExportModal(false);
  };

  return (
    <AppShell>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <PageHeader title="Settings" description="Manage your account, preferences, and configuration" />

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          {/* Settings Nav */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                    section === item.id ? "bg-surface-subtle text-brand-700" : "text-ink-secondary hover:bg-surface-muted"
                  )}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="space-y-6">
            {section === 'account' && (
              <Card>
                <CardHeader><CardTitle>Account Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input value={profile.fullName} onChange={e => updateProfile({ fullName: e.target.value })} /></div>
                    <div><Label>Email</Label><Input value={profile.email} onChange={e => updateProfile({ email: e.target.value })} /></div>
                    <div><Label>Timezone</Label>
                      <select value={profile.timezone} onChange={e => updateProfile({ timezone: e.target.value })} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                        <option>America/New_York</option><option>America/Chicago</option><option>America/Los_Angeles</option><option>Europe/London</option>
                      </select>
                    </div>
                    <div><Label>USMLE Step</Label>
                      <select value={profile.usmleStep} onChange={e => updateProfile({ usmleStep: e.target.value })} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                        <option>Step 1</option><option>Step 2 CK</option><option>Step 3</option>
                      </select>
                    </div>
                    <div><Label>Exam Date</Label><Input type="date" value={profile.examDate} onChange={e => updateProfile({ examDate: e.target.value })} /></div>
                    <div><Label>Target Score</Label><Input value={profile.targetScore} onChange={e => updateProfile({ targetScore: e.target.value })} /></div>
                  </div>
                  <div className="flex justify-end"><Button variant="primary" size="sm">Save Changes</Button></div>
                </CardContent>
              </Card>
            )}

            {section === 'preferences' && (
              <Card>
                <CardHeader><CardTitle>Study Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <Label className="mb-2 block">Study Days</Label>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                        const active = profile.preferredStudyDays.includes(day);
                        return (
                          <button key={day} onClick={() => {
                            const days = active ? profile.preferredStudyDays.filter(d => d !== day) : [...profile.preferredStudyDays, day];
                            updateProfile({ preferredStudyDays: days });
                          }} className={cn("py-2 rounded-md border text-xs font-medium transition", active ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border")}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Session Length</Label>
                      <select value={profile.preferredSessionLength} onChange={e => updateProfile({ preferredSessionLength: Number(e.target.value) })} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                        <option value={25}>25 min</option><option value={45}>45 min</option><option value={60}>60 min</option><option value={90}>90 min</option><option value={120}>120 min</option>
                      </select>
                    </div>
                    <div><Label>Weekly Goal (hours)</Label><Input type="number" value={profile.weeklyStudyGoal} onChange={e => updateProfile({ weeklyStudyGoal: Number(e.target.value) })} /></div>
                    <div><Label>Default Study Mode</Label>
                      <select value={profile.defaultStudyMode} onChange={e => updateProfile({ defaultStudyMode: e.target.value as any })} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                        <option>Focus</option><option>Balanced</option><option>Intensive</option>
                      </select>
                    </div>
                    <div><Label>Question Practice Mode</Label>
                      <select value={profile.questionPracticeMode} onChange={e => updateProfile({ questionPracticeMode: e.target.value as any })} className="flex h-9 w-full rounded-md border border-surface-border bg-white px-3 text-sm">
                        <option>Timed</option><option>Tutor</option><option>Mixed</option>
                      </select>
                    </div>
                  </div>
                  <div className="rounded-md bg-amber-50 border border-amber-100 p-3 text-xs text-amber-700">
                    Changing preferences may affect future planning. Review your study plan after saving.
                  </div>
                  <div className="flex justify-end"><Button variant="primary" size="sm">Save Preferences</Button></div>
                </CardContent>
              </Card>
            )}

            {section === 'notifications' && (
              <Card>
                <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <div className="p-4 rounded-md border border-surface-border bg-surface-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div><p className="text-sm font-medium text-navy-700">Quiet Hours</p><p className="text-xs text-ink-secondary">Reduce interruptions during this period.</p></div>
                      <button onClick={() => updatePreferences({ quietHours: { ...preferences.quietHours, enabled: !preferences.quietHours.enabled } })} className={cn("relative h-6 w-11 rounded-full transition-colors", preferences.quietHours.enabled ? "bg-brand-500" : "bg-slate-300")}>
                        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform", preferences.quietHours.enabled ? "translate-x-[22px]" : "translate-x-0.5")} />
                      </button>
                    </div>
                    {preferences.quietHours.enabled && (
                      <div className="flex items-center gap-2 mt-3">
                        <Input type="time" value={preferences.quietHours.start} onChange={e => updatePreferences({ quietHours: { ...preferences.quietHours, start: e.target.value }})} className="w-32" />
                        <span className="text-sm">to</span>
                        <Input type="time" value={preferences.quietHours.end} onChange={e => updatePreferences({ quietHours: { ...preferences.quietHours, end: e.target.value }})} className="w-32" />
                        {isQuietHours && <Badge variant="gold">Active now</Badge>}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block">Frequency</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Minimal', 'Standard', 'Frequent'] as const).map(f => (
                        <button key={f} onClick={() => updatePreferences({ frequency: f })} className={cn("py-2 rounded-md border text-sm font-medium", preferences.frequency === f ? "border-brand-500 bg-brand-50 text-brand-700" : "border-surface-border")}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    {Object.entries(preferences.categories).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                        <span className="text-sm">{key}</span>
                        <button onClick={() => updatePreferences({ categories: { ...preferences.categories, [key]: !enabled } })} className={cn("relative h-6 w-11 rounded-full transition-colors", enabled ? "bg-brand-500" : "bg-slate-300")}>
                          <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform", enabled ? "translate-x-[22px]" : "translate-x-0.5")} />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {section === 'privacy' && (
              <>
                <Card>
                  <CardHeader><CardTitle>Data Export</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-ink-secondary mb-4">Download a copy of your StepSync data.</p>
                    <Button variant="outline" onClick={() => setExportModal(true)}><Download className="h-4 w-4 mr-2" /> Export My Data</Button>
                  </CardContent>
                </Card>
                <Card className="border-accent-red/30">
                  <CardHeader><CardTitle className="text-accent-red-dark">Danger Zone</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-ink-secondary mb-4">Permanently delete your account and all associated data.</p>
                    {deleteStep === 0 ? (
                      <Button variant="red" onClick={() => setDeleteStep(1)}><Trash2 className="h-4 w-4 mr-2" /> Delete Account</Button>
                    ) : deleteStep === 1 ? (
                      <div className="space-y-3">
                        <div className="p-3 rounded-md bg-red-50 border border-red-100 text-sm text-accent-red-dark">
                          This action will permanently remove your profile, study activity, goals, and preferences. This cannot be undone.
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" onClick={() => setDeleteStep(0)}>Cancel</Button>
                          <Button variant="red" onClick={() => setDeleteStep(2)}>Continue</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-navy-700">Type DELETE to confirm:</p>
                        <Input placeholder="DELETE" />
                        <div className="flex gap-2">
                          <Button variant="ghost" onClick={() => setDeleteStep(0)}>Cancel</Button>
                          <Button variant="red" onClick={() => { setDeleteStep(0); alert('Demo: Account deletion simulated.'); }}>Delete Forever</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {section === 'security' && (
              <>
                <Card>
                  <CardHeader><CardTitle>Password</CardTitle></CardHeader>
                  <CardContent>
                    <Button variant="outline" onClick={() => setPwdModal(true)}><Lock className="h-4 w-4 mr-2" /> Change Password</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { device: 'Windows • Chrome', location: 'Alexandria', time: 'Active now', current: true, icon: Monitor },
                      { device: 'iPhone • Safari', location: 'Alexandria', time: '2 hours ago', current: false, icon: Smartphone },
                      { device: 'Windows • Edge', location: 'New York', time: '3 days ago', current: false, icon: Monitor },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className="flex items-center justify-between p-3 rounded-md border border-surface-border">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-ink-tertiary" />
                            <div><p className="text-sm font-medium text-navy-700">{s.device}</p><p className="text-xs text-ink-tertiary">{s.location} • {s.time}</p></div>
                          </div>
                          {s.current ? <Badge variant="green">Current</Badge> : <Button variant="ghost" size="sm">Sign out</Button>}
                        </div>
                      );
                    })}
                    <Button variant="outline" size="sm" className="w-full">Sign out all other sessions</Button>
                  </CardContent>
                </Card>
              </>
            )}

            {section === 'appearance' && (
              <Card>
                <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                <CardContent>
                  <Label className="mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'system'] as const).map(t => (
                      <button key={t} onClick={() => setTheme(t)} className={cn("p-4 rounded-md border text-center capitalize", theme === t ? "border-brand-500 bg-brand-50" : "border-surface-border")}>
                        <div className={cn("h-12 rounded mb-2", t === 'light' ? 'bg-white border' : t === 'dark' ? 'bg-navy-800' : 'bg-gradient-to-r from-white to-navy-800')} />
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-ink-tertiary mt-3">Theme preference saved locally. Dark mode is coming soon.</p>
                </CardContent>
              </Card>
            )}

            {section === 'help' && (
              <Card>
                <CardHeader><CardTitle>Help & Support</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Frequently Asked Questions</Label>
                    <div className="space-y-2">
                      {['How does StepSync calculate readiness?', 'How does adaptive planning work?', 'What happens if I miss a study day?'].map(q => (
                        <div key={q} className="p-3 rounded-md border border-surface-border hover:bg-surface-muted/50 cursor-pointer text-sm text-navy-700">{q}</div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="mb-2 block">Contact Support</Label>
                    <Input placeholder="Subject" className="mb-2" />
                    <textarea placeholder="Message" className="flex min-h-[80px] w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm" />
                    <Button variant="primary" size="sm" className="mt-2">Submit</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={exportModal} onClose={() => setExportModal(false)} title="Export Your Data">
        <div className="p-6 space-y-3">
          <p className="text-sm text-ink-secondary">Select categories to include in your export:</p>
          {['Profile', 'Study Plan', 'Study Activity', 'Questions', 'Flashcards', 'Goals', 'Notifications', 'Preferences'].map(c => (
            <div key={c} className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> <span className="text-sm">{c}</span></div>
          ))}
        </div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setExportModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleExport}><Download className="h-4 w-4 mr-2" /> Download JSON</Button>
        </div>
      </Modal>

      <Modal isOpen={pwdModal} onClose={() => setPwdModal(false)} title="Change Password">
        <div className="p-6 space-y-3">
          <div><Label>Current Password</Label><Input type="password" /></div>
          <div><Label>New Password</Label><Input type="password" /></div>
          <div><Label>Confirm New Password</Label><Input type="password" /></div>
        </div>
        <div className="border-t border-surface-border p-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setPwdModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setPwdModal(false)}>Update Password</Button>
        </div>
      </Modal>
    </AppShell>
  );
}