"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        <PageHeader title="Analytics" description="Track your study performance and progress trends" />
        
        <Card>
          <CardContent className="py-16 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-4">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-navy-700">No Analytics Data Yet</h3>
            <p className="mt-1 text-sm text-ink-secondary max-w-sm">
              Complete study sessions and question blocks to start building your performance analytics.
            </p>
            <Link href="/study/today" className="mt-6">
              <Button variant="primary">Start Studying</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}