"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const studyPartners = [
  { id: "p1", name: "Sara Chen", system: "Cardiovascular", progress: 84, status: "online", match: 94 },
];

export default function PartnersPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <PageHeader title="Study Partners" description="Connect with peers on the same journey" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyPartners.map(p => (
            <Card key={p.id}><CardContent className="p-4">
              <h3 className="text-sm font-bold text-navy-700">{p.name}</h3>
              <p className="text-xs text-ink-secondary">{p.system} · {p.progress}% progress</p>
              <Badge variant="green" className="mt-2">{p.status}</Badge>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}