"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AppNotification, NotificationPreferences, defaultPreferences, notificationService } from '@/lib/notification-data';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismiss: (id: string) => void;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
  isQuietHours: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Simulate service running on load
    const generated = notificationService.generate(preferences);
    setNotifications(generated);
  }, [preferences]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, readAt: new Date().toISOString() } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, readAt: n.readAt || new Date().toISOString() })));
  };

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updatePreferences = (prefs: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const isQuietHours = useMemo(() => {
    if (!preferences.quietHours.enabled) return false;
    const now = new Date();
    const currentHour = now.getHours();
    const start = parseInt(preferences.quietHours.start.split(':')[0]);
    const end = parseInt(preferences.quietHours.end.split(':')[0]);
    // Simple check for overnight range (e.g., 22 to 7)
    if (start > end) return currentHour >= start || currentHour < end;
    return currentHour >= start && currentHour < end;
  }, [preferences.quietHours]);

  const unreadCount = notifications.filter(n => !n.readAt).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, preferences, markAsRead, markAllAsRead, dismiss, updatePreferences, isQuietHours }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}