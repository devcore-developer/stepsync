import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-page p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-navy-700">404</h1>
        <h2 className="mt-4 text-xl font-bold text-navy-700">Page Not Found</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard" className="mt-6 inline-block">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}