import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserAvatar } from "@/components/shared/user-avatar";
import { EmptyState } from "@/components/shared/empty-state";
import { studyPartners } from "@/lib/demo-data";
import { UserPlus, Users, MessageSquare } from "lucide-react";

const statusMap = {
  online: { label: "Online", variant: "green" as const },
  offline: { label: "Offline", variant: "default" as const },
  away: { label: "Away", variant: "gold" as const },
};

export default function PartnersPage() {
  return (
    <AppShell>
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Study Partners" description="Connect with peers on the same journey">
          <Button size="sm">
            <UserPlus className="h-4 w-4" /> Find Partners
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-500">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Active Partners</p>
                <p className="text-[1.375rem] font-bold text-navy-500">4</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Unread Messages</p>
                <p className="text-[1.375rem] font-bold text-navy-500">7</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-accent-gold">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-wide text-ink-tertiary">Pending Requests</p>
                <p className="text-[1.375rem] font-bold text-navy-500">2</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studyPartners.map((p) => {
            const status = statusMap[p.status as keyof typeof statusMap];
            return (
              <Card key={p.id} className="ss-card-hover p-5">
                <div className="flex items-start gap-3">
                  <UserAvatar initials={p.initials} size="lg" status={p.status as "online" | "offline" | "away"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate text-[0.9375rem] font-semibold text-navy-500">{p.name}</h3>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <p className="mt-0.5 text-[0.75rem] text-ink-secondary">
                      Studying: <span className="font-medium text-ink">{p.system}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[0.6875rem] text-ink-tertiary">Progress</span>
                    <span className="text-[0.75rem] font-bold text-navy-500">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} size="sm" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.6875rem] text-ink-secondary">Match</span>
                    <span className="text-[0.8125rem] font-bold text-accent-gold">{p.match}%</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="primary" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Suggestions */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="mb-1 text-[0.9375rem] font-semibold text-navy-500">Suggested Partners</h3>
            <p className="mb-4 text-[0.75rem] text-ink-secondary">
              Based on your study focus and schedule compatibility
            </p>
            <EmptyState
              icon={<UserPlus className="h-6 w-6" />}
              title="No new suggestions right now"
              description="Check back later as more students join the platform."
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}