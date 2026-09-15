import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { conversations, demoUser } from "@/lib/demo-data";
import { Search, MessageSquare, Send, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const active = conversations[0];

  return (
    <AppShell>
      <div className="animate-fade-in space-y-6">
        <PageHeader title="Messages" description="Stay accountable with your study community" />

        <div className="grid h-[600px] grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          {/* Conversation list */}
          <Card className="flex flex-col overflow-hidden">
            <div className="border-b border-surface-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
                <input
                  placeholder="Search conversations..."
                  className="h-9 w-full rounded-md border border-surface-border bg-surface-muted pl-9 pr-3 text-sm placeholder:text-ink-tertiary focus:border-brand-400 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c, i) => (
                <button
                  key={c.id}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-surface-border p-3 text-left transition-colors hover:bg-surface-muted",
                    i === 0 && "bg-surface-subtle"
                  )}
                >
                  <UserAvatar initials={c.initials} size="md" status={c.online ? "online" : "offline"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-[0.8125rem] font-semibold text-navy-500">{c.name}</p>
                      <span className="text-[0.625rem] text-ink-tertiary">{c.time}</span>
                    </div>
                    <p className="truncate text-[0.75rem] text-ink-secondary">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-red px-1.5 text-[0.625rem] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Chat panel */}
          <Card className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-border p-3">
              <div className="flex items-center gap-3">
                <UserAvatar initials={active.initials} size="md" status="online" />
                <div>
                  <p className="text-[0.875rem] font-semibold text-navy-500">{active.name}</p>
                  <p className="text-[0.6875rem] text-emerald-600">● Active now</p>
                </div>
              </div>
              <Badge variant="brand">Study Partner</Badge>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-surface-muted/50 p-4">
              <div className="flex justify-center">
                <span className="rounded-full bg-surface-muted px-3 py-1 text-[0.6875rem] text-ink-secondary">
                  Today
                </span>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-lg rounded-tl-sm bg-white p-3 shadow-card">
                  <p className="text-[0.8125rem] text-ink">Hey! How&apos;s the cardio review going?</p>
                  <p className="mt-1 text-[0.625rem] text-ink-tertiary">10:24 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-lg rounded-tr-sm bg-brand-500 p-3 text-white shadow-card">
                  <p className="text-[0.8125rem]">Going well! Just finished the heart failure section in First Aid.</p>
                  <p className="mt-1 text-[0.625rem] text-brand-100">10:26 AM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-lg rounded-tl-sm bg-white p-3 shadow-card">
                  <p className="text-[0.8125rem] text-ink">{active.lastMessage}</p>
                  <p className="mt-1 text-[0.625rem] text-ink-tertiary">10:32 AM</p>
                </div>
              </div>
            </div>

            <div className="border-t border-surface-border p-3">
              <div className="flex items-center gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  placeholder="Type a message..."
                  className="h-9 flex-1 rounded-md border border-surface-border bg-white px-3 text-sm placeholder:text-ink-tertiary focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <button className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted">
                  <Smile className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-white hover:bg-brand-600">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}