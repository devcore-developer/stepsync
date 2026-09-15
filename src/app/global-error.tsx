"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-surface-page p-4 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-navy-700">Something went wrong!</h1>
            <p className="mt-2 text-sm text-ink-secondary">
              An unexpected error occurred. Please try again. If the problem persists, contact support.
            </p>
            <Button variant="primary" className="mt-6" onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}