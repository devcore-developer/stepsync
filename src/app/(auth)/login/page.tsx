"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-navy-700">Welcome back</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push('/onboarding'); }}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <Input type="email" placeholder="alex.morgan@medstudent.edu" required />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-sm font-medium text-ink">Password</label>
            <Link href="/forgot-password" className="text-xs font-medium text-brand-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input type="password" placeholder="••••••••" required />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-surface-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface-page px-2 text-ink-tertiary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg">Google</Button>
        <Button variant="outline" size="lg">Apple</Button>
      </div>

      <p className="text-center text-sm text-ink-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-brand-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}