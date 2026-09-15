"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <AlertTriangle className="h-12 w-12 text-accent-red mb-4" />
      <h1 className="text-xl font-bold text-navy-700">Application Error</h1>
      <p className="mt-2 text-sm text-ink-secondary max-w-sm">
        We encountered an error while loading this section. Please try again.
      </p>
      <Button variant="primary" className="mt-6" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}