"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

const conversations = [
  { id: "c1", name: "Sara Chen", lastMessage: "Did you finish the Pathoma chapter?", time: "2m", unread: 2 },
];

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <PageHeader title="Messages" description="Stay accountable with your study community" />
        <Card><CardContent className="p-4">
          {conversations.map(c => (
            <div key={c.id} className="p-2 border-b border-surface-border last:border-0">
              <p className="text-sm font-semibold text-navy-700">{c.name}</p>
              <p className="text-xs text-ink-secondary">{c.lastMessage} · {c.time}</p>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </AppShell>
  );
}