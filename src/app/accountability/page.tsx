"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Clock } from "lucide-react";
import { getAccountabilityData } from "@/app/actions/analytics";

export default function AccountabilityPage() {
  const [data, setData] = useState({ streak: 0, weeklyHours: 0 });

  useEffect(() => {
    async function fetchData() {
      const result = await getAccountabilityData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <PageHeader title="Accountability" description="Stay consistent, track your commitments." />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="h-8 w-8 text-accent-gold" />
              <div>
                <p className="text-xs uppercase tracking-wide text-navy-200">Streak</p>
                <p className="text-2xl font-bold">{data.streak} days</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-brand-500" />
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-tertiary">This Week</p>
                <p className="text-2xl font-bold text-navy-700">{data.weeklyHours}h</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}