"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdaptiveState } from "@/app/actions/analytics";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdaptivePlanningPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getAdaptiveState();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <AppShell><div className="p-8 text-center text-ink-secondary">Loading adaptive state...</div></AppShell>;

  const isBehind = data.daysBehind > 0;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        <PageHeader title="Adaptive Planning" description="Intelligent schedule recovery and pacing insights." />

        <Card className={`border-l-4 ${isBehind ? 'border-l-accent-red bg-red-50/50' : 'border-l-emerald-500 bg-emerald-50/50'}`}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white ${isBehind ? 'text-accent-red' : 'text-emerald-600'}`}>
              {isBehind ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-sm font-bold uppercase tracking-wide ${isBehind ? 'text-accent-red-dark' : 'text-emerald-700'}`}>
                  {data.status}
                </h3>
              </div>
              <p className="text-sm text-ink-secondary mt-0.5">{data.reason}</p>
            </div>
          </CardContent>
        </Card>

        {isBehind && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-navy-700 mb-4">Recovery Strategy</h3>
              <div className="p-4 rounded-lg border-2 border-brand-500 bg-brand-50">
                <p className="text-sm font-semibold text-navy-700">Spread the missed work</p>
                <p className="text-xs text-ink-secondary mt-1">Add 20 minutes to your next few study days to catch up without overwhelming yourself today.</p>
                <div className="mt-4">
                  <Link href="/study/today">
                    <button className="text-xs font-semibold text-brand-700 flex items-center gap-1">
                      Go to Today's Plan <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}