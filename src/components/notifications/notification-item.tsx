"use client";
import { AppNotification } from "@/lib/notification-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Bell, AlertTriangle, Target, Flame, Layers, FileQuestion, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/context/notification-context";

const typeIcons = {
  STUDY_TASK: Target, MISSED_TASK: AlertTriangle, REVIEW_DUE: Layers, REVIEW_OVERDUE: Layers,
  QUESTION_GOAL: FileQuestion, WEEKLY_GOAL: Target, STREAK: Flame, ACCOUNTABILITY: Target,
  READINESS: ShieldCheck, EXAM_COUNTDOWN: Bell, SYSTEM_ALERT: AlertTriangle
};

const priorityColors = {
  HIGH: 'border-l-accent-red',
  NORMAL: 'border-l-brand-500',
  LOW: 'border-l-surface-border'
};

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const { markAsRead, dismiss } = useNotifications();
  const Icon = typeIcons[notification.type] || Bell;
  const isUnread = !notification.readAt;

  const handleClick = () => {
    if (isUnread) markAsRead(notification.id);
  };

  return (
    <div className={cn("relative flex gap-3 p-3 border-l-4 border-b border-surface-border transition-colors", priorityColors[notification.priority], isUnread ? "bg-brand-50/30" : "bg-white")}>
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", isUnread ? "bg-brand-100 text-brand-600" : "bg-surface-muted text-ink-tertiary")}>
        <Icon className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={cn("text-sm font-medium", isUnread ? "text-navy-700" : "text-ink-secondary")}>{notification.title}</p>
          {isUnread && <span className="h-2 w-2 rounded-full bg-accent-red" />}
        </div>
        <p className="text-xs text-ink-secondary mb-2">{notification.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-[0.6875rem] text-ink-tertiary">{new Date(notification.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          <div className="flex gap-2">
            <Link href={notification.actionHref} onClick={handleClick}>
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">{notification.actionLabel}</Button>
            </Link>
            <button onClick={() => dismiss(notification.id)} className="text-ink-tertiary hover:text-navy-700 p-1">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}