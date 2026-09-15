import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { studyGroups } from "@/lib/demo-data";
import { Plus, Users, Network, Activity } from "lucide-react";

const activityColor = {
  High: "green" as const,
  Medium: "gold" as const,
  Low: "default" as const,
};

export default function GroupsPage() {
  return (
    <AppShell>
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Study Groups" description="Collaborate with focused study cohorts">
          <Button size="sm">
            <Plus className="h-4 w-4" /> Create Group
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-500">
                <Network className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Your Groups</p>
                <p className="text-[1.375rem] font-bold text-navy-500">4</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-500">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Total Members</p>
                <p className="text-[1.375rem] font-bold text-navy-500">36</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Active Today</p>
                <p className="text-[1.375rem] font-bold text-navy-500">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Groups grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studyGroups.map((g) => (
            <Card key={g.id} className="ss-card-hover p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-navy-500 to-brand-500 text-white">
                  <Network className="h-5 w-5" />
                </div>
                <Badge variant={activityColor[g.activity as keyof typeof activityColor]}>
                  {g.activity} activity
                </Badge>
              </div>
              <h3 className="mt-3 text-[0.9375rem] font-semibold text-navy-500">{g.name}</h3>
              <p className="mt-0.5 text-[0.75rem] text-ink-secondary">Focus: {g.system}</p>

              <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-3">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-ink-tertiary" />
                  <span className="text-[0.75rem] text-ink-secondary">{g.members} members</span>
                </div>
                <span className="text-[0.6875rem] text-ink-tertiary">Active {g.lastActive}</span>
              </div>

              <Button variant="outline" size="sm" className="mt-3 w-full">
                Open Group
              </Button>
            </Card>
          ))}
        </div>

        {/* Discover */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="mb-1 text-[0.9375rem] font-semibold text-navy-500">Discover Groups</h3>
            <p className="mb-4 text-[0.75rem] text-ink-secondary">Find public study groups matching your focus</p>
            <EmptyState
              icon={<Plus className="h-6 w-6" />}
              title="No new groups to discover"
              description="New groups appear here as they're created."
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}