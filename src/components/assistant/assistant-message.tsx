"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  response?: any;
}

export function AssistantMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-fade-in">
        <div className="bg-brand-500 text-white rounded-lg rounded-tr-sm p-3 max-w-[80%] shadow-sm">
          <p className="text-sm">{message.text}</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-secondary">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  const res = message.response;
  if (!res) return null;

  return (
    <div className="flex justify-start gap-3 animate-fade-in">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-700 text-accent-gold">
        <Sparkles className="h-4 w-4" />
      </div>
      <Card className="max-w-[85%] bg-white border-surface-border shadow-sm">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm text-ink leading-relaxed">{res.text}</p>
          
          {res.metrics && (
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-surface-border">
              {res.metrics.map((m: any) => (
                <div key={m.label} className="text-center">
                  <p className="text-xs text-ink-tertiary">{m.label}</p>
                  <p className="text-sm font-bold text-navy-700">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          {res.list && (
            <ul className="space-y-1.5 pl-1">
              {res.list.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <span className="flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-100 text-[0.625rem] font-bold text-brand-700">{i+1}</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {res.actions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {res.actions.map((action: any) => (
                <Link key={action.label} href={action.href}>
                  <Button size="sm" variant={action.variant || 'outline'}>{action.label}</Button>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}