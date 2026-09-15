"use client";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockRecentBlocks } from "@/lib/question-data";
import Link from "next/link";
import { CheckCircle, TrendingUp, Clock, Target, ArrowRight } from "lucide-react";

export default function ResultsPage() {
  // For demo purposes, we'll just show the first mock block result
  const block = mockRecentBlocks[0];

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center py-6">
          <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 mx-auto">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-navy-700">Block Complete</h1>
          <p className="text-sm text-ink-secondary">You finished the question block.</p>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-navy-100">Your Score</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-bold">{block.correctAnswers}</span>
                <span className="text-xl text-navy-200">/ {block.totalQuestions}</span>
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent-gold" /> {Math.floor(block.durationSeconds/60)}m {block.durationSeconds%60}s</div>
                <div className="flex items-center gap-1.5"><Target className="h-4 w-4 text-accent-gold" /> {block.accuracy}% Accuracy</div>
              </div>
            </div>
            <div className="w-full md:w-64">
              <Progress value={block.accuracy} color="gold" size="md" />
              <p className="mt-2 text-xs text-navy-200 text-center">Performance Updated: Overall 71% → 72%</p>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown & System Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader><CardTitle>Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-ink-secondary">Correct</span><span className="font-bold text-emerald-600">{block.correctAnswers}</span></div>
              <div className="flex justify-between text-sm"><span className="text-ink-secondary">Incorrect</span><span className="font-bold text-accent-red">{block.incorrectAnswers}</span></div>
              <div className="flex justify-between text-sm"><span className="text-ink-secondary">Unanswered</span><span className="font-bold text-ink-tertiary">{block.unansweredQuestions}</span></div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>System Performance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {block.systemResults.map(sys => (
                <div key={sys.system}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-navy-700">{sys.system}</span>
                    <span className="font-bold text-navy-700">{Math.round((sys.correct/sys.total)*100)}% <span className="text-ink-tertiary font-normal">({sys.correct}/{sys.total})</span></span>
                  </div>
                  <Progress value={(sys.correct/sys.total)*100} color="brand" size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Link href="/questions/review"><Button variant="outline">Review Incorrect</Button></Link>
          <Link href="/performance"><Button variant="primary">View Performance <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
        </div>
      </div>
    </AppShell>
  );
}