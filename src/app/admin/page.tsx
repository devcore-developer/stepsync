"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminMetrics } from "@/app/actions/admin";
import { Users, CalendarDays, FileQuestion, Layers } from "lucide-react";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function fetchMetrics() {
      const data = await getAdminMetrics();
      setMetrics(data);
    }
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Admin Dashboard" description="System metrics and overview" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><Users className="h-4 w-4 text-brand-500" /><p className="text-xs text-ink-tertiary uppercase">Total Users</p></div>
          <p className="text-2xl font-bold text-navy-700">{metrics?.users || 0}</p>
        </CardContent></Card>
        
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><CalendarDays className="h-4 w-4 text-accent-red" /><p className="text-xs text-ink-tertiary uppercase">Study Plans</p></div>
          <p className="text-2xl font-bold text-navy-700">{metrics?.studyPlans || 0}</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><FileQuestion className="h-4 w-4 text-brand-500" /><p className="text-xs text-ink-tertiary uppercase">Question Sessions</p></div>
          <p className="text-2xl font-bold text-navy-700">{metrics?.questions || 0}</p>
        </CardContent></Card>

        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><Layers className="h-4 w-4 text-accent-gold" /><p className="text-xs text-ink-tertiary uppercase">Flashcards</p></div>
          <p className="text-2xl font-bold text-navy-700">{metrics?.flashcards || 0}</p>
        </CardContent></Card>
      </div>
    </div>
  );
}