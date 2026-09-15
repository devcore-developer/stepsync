"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockBuilder } from "@/components/questions/block-builder";
import { mockRecentBlocks, questionStats } from "@/lib/question-data";
import { Play, FileQuestion, Bookmark, History, Clock, Target, TrendingUp } from "lucide-react";

export default function QuestionsPage() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Question Practice" description="Practice, review, and understand your performance." />
          <Button variant="red" size="lg" onClick={() => setIsBuilderOpen(true)}><Play className="h-4 w-4" /> Start Question Block</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><FileQuestion className="h-4 w-4 text-brand-500" /><p className="text-xs text-ink-tertiary uppercase">Total</p></div><p className="text-xl font-bold text-navy-700">{questionStats.totalQuestions}</p></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Clock className="h-4 w-4 text-brand-500" /><p className="text-xs text-ink-tertiary uppercase">This Week</p></div><p className="text-xl font-bold text-navy-700">{questionStats.completedThisWeek}</p></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-emerald-500" /><p className="text-xs text-ink-tertiary uppercase">Accuracy</p></div><p className="text-xl font-bold text-navy-700">{questionStats.overallAccuracy}%</p></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-amber-500" /><p className="text-xs text-ink-tertiary uppercase">Avg Time</p></div><p className="text-xl font-bold text-navy-700">{questionStats.averageTime}s</p></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Bookmark className="h-4 w-4 text-accent-red" /><p className="text-xs text-ink-tertiary uppercase">Marked</p></div><p className="text-xl font-bold text-navy-700">{questionStats.marked}</p></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-4 w-4" /> Recent Blocks</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockRecentBlocks.map(block => (
                <div key={block.blockId} className="flex items-center justify-between p-3 border border-surface-border rounded-md hover:bg-surface-muted/50">
                  <div>
                    <p className="text-sm font-semibold text-navy-700">Mixed System Block</p>
                    <p className="text-xs text-ink-tertiary">{block.totalQuestions} Questions · {Math.floor(block.durationSeconds/60)}m {block.durationSeconds%60}s</p>
                  </div>
                  <Badge variant={block.accuracy > 75 ? "green" : block.accuracy > 65 ? "brand" : "red"}>{block.accuracy}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><Bookmark className="h-4 w-4 mr-2" /> Review Marked (32)</Button>
              <Button variant="outline" className="w-full justify-start"><AlertCircle className="h-4 w-4 mr-2" /> Review Incorrect (359)</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BlockBuilder isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
    </AppShell>
  );
}

import { AlertCircle } from "lucide-react";