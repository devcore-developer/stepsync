"use client";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const studyGroups = [
  { id: "g1", name: "Cardio Masters", members: 8, system: "Cardiovascular", activity: "High", lastActive: "2m ago" },
  { id: "g2", name: "Microbiology Sprint", members: 12, system: "Microbiology", activity: "Medium", lastActive: "1h ago" },
];

export default function GroupsPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <PageHeader title="Study Groups" description="Collaborate with focused study cohorts" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyGroups.map(g => (
            <Card key={g.id}><CardContent className="p-4">
              <h3 className="text-sm font-bold text-navy-700">{g.name}</h3>
              <p className="text-xs text-ink-secondary mt-1">{g.members} members · {g.system}</p>
              <Badge variant="green" className="mt-2">{g.activity} activity</Badge>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}