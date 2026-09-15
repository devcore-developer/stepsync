import { AppShell } from "@/components/layout/app-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TodayStudy } from "@/components/dashboard/today-study";
import { SystemsProgress } from "@/components/dashboard/systems-progress";
import { AIRecommendation } from "@/components/dashboard/ai-recommendation";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { Upcoming } from "@/components/dashboard/upcoming";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TodayStudy />
          <div className="space-y-6">
            <AIRecommendation />
            <Upcoming />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WeeklyActivity />
          <SystemsProgress />
        </div>
      </div>
    </AppShell>
  );
}