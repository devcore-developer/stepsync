"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAssistant } from "@/context/assistant-context";
import { generateSessionPlan } from "@/lib/assistant-engine";
import { AssistantMessage } from "./assistant-message";
import { Clock } from "lucide-react";

export function SessionBuilder() {
  const ctx = useAssistant();
  const [sessionPlan, setSessionPlan] = useState<any | null>(null);

  const handleBuild = (mins: number) => {
    const plan = generateSessionPlan(mins, ctx);
    setSessionPlan({ id: 'session', role: 'assistant', response: plan });
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Session Builder</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-ink-secondary">How much time do you have?</p>
        <div className="grid grid-cols-4 gap-2">
          {[30, 60, 90, 120].map(m => (
            <Button key={m} variant="outline" size="sm" onClick={() => handleBuild(m)}>{m} min</Button>
          ))}
        </div>
        {sessionPlan && <div className="pt-3 mt-3 border-t border-surface-border"><AssistantMessage message={sessionPlan} /></div>}
      </CardContent>
    </Card>
  );
}