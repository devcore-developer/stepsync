"use client";
import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DailyTask } from "@/lib/daily-study-data";

interface StudySessionTimerProps {
  activeTask: DailyTask | null;
  onClearActive: () => void;
}

export function StudySessionTimer({ activeTask, onClearActive }: StudySessionTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (activeTask) {
      setSeconds(0);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [activeTask]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!activeTask) {
    return (
      <Card className="bg-surface-muted border-dashed">
        <CardContent className="py-6 flex flex-col items-center justify-center text-center">
          <Play className="h-8 w-8 text-ink-tertiary mb-2" />
          <p className="text-sm font-medium text-ink-secondary">No active study session</p>
          <p className="text-xs text-ink-tertiary mt-1">Click "Start" on a task to begin tracking time.</p>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    setIsRunning(false);
    onClearActive();
  };

  return (
    <Card className="bg-gradient-to-br from-navy-600 to-navy-700 text-white border-navy-700">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-navy-200">Study Session</p>
            <h3 className="text-sm font-bold mt-1">{activeTask.system} — {activeTask.topic}</h3>
          </div>
          <Button size="icon-sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="text-center my-4">
          <p className="text-4xl font-mono font-bold tracking-wider">{formatTime(seconds)}</p>
        </div>

        <Button variant="red" size="sm" className="w-full" onClick={handleFinish}>
          <Square className="h-3.5 w-3.5 mr-1" /> Finish Session
        </Button>
      </CardContent>
    </Card>
  );
}