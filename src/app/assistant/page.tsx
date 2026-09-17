"use client";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { getAssistantInsights } from "@/app/actions/analytics";

export default function AssistantPage() {
  const [insight, setInsight] = useState("Loading real-time insights...");

  useEffect(() => {
    async function fetchInsights() {
      const data = await getAssistantInsights();
      setInsight(data.message);
    }
    fetchInsights();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <PageHeader title="Study Assistant" description="Turn your StepSync data into your next best study action." />
        
        <Card className="border-l-4 border-brand-500">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wide mb-2">Next Best Action</h3>
              <p className="text-sm text-ink-secondary whitespace-pre-line">{insight}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}