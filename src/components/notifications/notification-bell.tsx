"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/notification-context";
import { NotificationItem } from "./notification-item";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead, isQuietHours } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setOpen(!open)} 
        className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted hover:text-navy-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-100"
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        <Bell className="h-[1.125rem] w-[1.125rem]" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[0.5625rem] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-card-hover border border-surface-border z-50 animate-fade-in">
          <div className="flex items-center justify-between p-3 border-b border-surface-border">
            <h3 className="text-sm font-bold text-navy-700">Notifications</h3>
            <button onClick={markAllAsRead} className="text-xs text-brand-600 hover:underline flex items-center gap-1">
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center px-4">
                <Bell className="h-8 w-8 text-ink-tertiary mx-auto mb-2" />
                <p className="text-sm font-semibold text-navy-700">You're all caught up</p>
                <p className="text-xs text-ink-tertiary mt-1">No new notifications.</p>
              </div>
            ) : (
              notifications.slice(0, 5).map(n => <NotificationItem key={n.id} notification={n} />)
            )}
          </div>
          
          <div className="p-2 border-t border-surface-border bg-surface-muted/50">
            <Link href="/notifications" onClick={() => setOpen(false)} className="block">
              <Button variant="ghost" size="sm" className="w-full">View All Notifications <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}