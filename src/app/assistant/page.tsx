"use client";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAssistant } from "@/context/assistant-context";
import { AssistantMessage } from "@/components/assistant/assistant-message";
import { SessionBuilder } from "@/components/assistant/session-builder";
import { Send, Trash2, AlertTriangle, TrendingUp, Target, Flame } from "lucide-react";

const quickActions = [
  "What should I study today?",
  "Where am I weakest?",
  "Am I on track?",
  "Questions or review?"
];

export default function AssistantPage() {
  const { messages, sendMessage, clearChat, state, setState, readinessScore, dueCards, overdueCards } = useAssistant();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    sendMessage(msg);
    setInput("");
  };

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <PageHeader title="Study Assistant" description="Turn your StepSync data into your next best study action." />
          <select 
            value={state} 
            onChange={(e) => setState(e.target.value as any)}
            className="h-9 rounded-md border border-surface-border bg-surface-subtle px-3 text-sm font-medium text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="On Track">State: On Track</option>
            <option value="Behind Schedule">State: Behind Schedule</option>
            <option value="Heavy Review">State: Heavy Review</option>
            <option value="Insufficient Data">State: Insufficient Data</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Main Chat Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {quickActions.map(qa => (
                <Button key={qa} variant="outline" size="sm" onClick={() => handleSend(qa)}>{qa}</Button>
              ))}
            </div>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-surface-border">
                <h3 className="text-sm font-bold text-navy-700">Conversation</h3>
                <Button variant="ghost" size="sm" onClick={clearChat}><Trash2 className="h-3.5 w-3.5" /> Clear</Button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-muted/30">
                {messages.map(msg => <AssistantMessage key={msg.id} message={msg} />)}
              </div>
              <div className="p-3 border-t border-surface-border bg-white">
                <div className="flex gap-2">
                  <Input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask for study advice, performance insights, or plan adjustments..."
                  />
                  <Button variant="primary" onClick={() => handleSend()}><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6 overflow-y-auto pb-4">
            {/* Proactive Insights */}
            <Card>
              <CardHeader><CardTitle className="text-base">Proactive Insights</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {state === 'Insufficient Data' ? (
                  <div className="flex items-start gap-2 p-2 rounded-md bg-surface-muted">
                    <AlertTriangle className="h-4 w-4 text-ink-tertiary mt-0.5 shrink-0" />
                    <p className="text-xs text-ink-secondary">Keep studying to unlock personalized insights.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-2 p-2 rounded-md bg-emerald-50 border border-emerald-100">
                      <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-700">You're ahead of schedule</p>
                        <p className="text-[0.6875rem] text-ink-secondary">Completed 4 more tasks than planned this week.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-md bg-red-50 border border-red-100">
                      <AlertTriangle className="h-4 w-4 text-accent-red mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-accent-red-dark">{overdueCards} Overdue Review Cards</p>
                        <p className="text-[0.6875rem] text-ink-secondary">Clear these to maintain retention.</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Next Best Action */}
            <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-gold mb-2">Next Best Action</p>
                <h3 className="text-sm font-bold text-white">Complete today's Renal question block</h3>
                <p className="text-xs text-navy-100 mt-1">Your Renal accuracy is 67% and today's plan contains a Renal session.</p>
                <Button variant="red" size="sm" className="w-full mt-3">Start Now</Button>
              </CardContent>
            </Card>

            {/* Session Builder */}
            <SessionBuilder />
          </div>
        </div>
      </div>
    </AppShell>
  );
}