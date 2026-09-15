"use client";
import { useQuestions } from "@/context/question-context";
import { QuestionPlayer } from "@/components/questions/question-player";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SessionPage({ params }: { params: { id: string } }) {
  const { activeBlock } = useQuestions();

  if (!activeBlock) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-muted p-4">
        <AlertCircle className="h-12 w-12 text-accent-red mb-4" />
        <h1 className="text-xl font-bold text-navy-700">No Active Session</h1>
        <p className="text-sm text-ink-secondary mt-1">Your session may have expired or been submitted.</p>
        <Link href="/questions"><Button variant="primary" className="mt-6">Back to Questions</Button></Link>
      </div>
    );
  }

  return <QuestionPlayer />;
}