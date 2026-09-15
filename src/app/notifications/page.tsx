"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/context/notification-context";
import { NotificationItem } from "@/components/notifications/notification-item";
import { CheckCheck, Target, Layers, FileQuestion, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = ['All', 'Unread', 'Study', 'Review', 'Questions', 'Goals', 'Accountability', 'Readiness'] as const;

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>('All');

  const filtered = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.readAt;
    return n.category === activeFilter;
  });

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Notifications" description="Stay on top of your study plan, reviews, goals, and exam preparation." />
          <Button variant="outline" onClick={markAllAsRead}><CheckCheck className="h-4 w-4 mr-1" /> Mark all as read</Button>
        </div>

        {/* Today's Summary */}
        <Card className="bg-surface-subtle border-surface-border">
          <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2"><Target className="h-5 w-5 text-brand-500" /><div><p className="text-xs text-ink-tertiary">Tasks</p><p className="font-bold text-navy-700">4</p></div></div>
            <div className="flex items-center gap-2"><FileQuestion className="h-5 w-5 text-accent-red" /><div><p className="text-xs text-ink-tertiary">Questions</p><p className="font-bold text-navy-700">40</p></div></div>
            <div className="flex items-center gap-2"><Layers className="h-5 w-5 text-accent-gold" /><div><p className="text-xs text-ink-tertiary">Reviews</p><p className="font-bold text-navy-700">22</p></div></div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500" /><div><p className="text-xs text-ink-tertiary">Weekly Goal</p><p className="font-bold text-navy-700">86%</p></div></div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 border-b border-surface-border pb-4">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                activeFilter === f ? "bg-brand-500 border-brand-500 text-white" : "bg-white border-surface-border text-ink-secondary hover:border-brand-300"
              )}
            >
              {f} {f === 'Unread' && `(${unreadCount})`}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="rounded-lg border border-surface-border overflow-hidden bg-white shadow-card">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Bell className="h-10 w-10 text-ink-tertiary mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-navy-700">No notifications in this category</h3>
              <p className="text-xs text-ink-secondary mt-1">You're all caught up.</p>
            </div>
          ) : (
            filtered.map(n => <NotificationItem key={n.id} notification={n} />)
          )}
        </div>
      </div>
    </AppShell>
  );
}

import { Bell } from "lucide-react";