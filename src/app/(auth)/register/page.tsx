"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-navy-700">Create your account</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Start your journey to a 260+ score today
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">First Name</label>
            <Input placeholder="Alex" required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Last Name</label>
            <Input placeholder="Morgan" required />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <Input type="email" placeholder="alex.morgan@medstudent.edu" required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <Input type="password" placeholder="Create a strong password" required />
          <p className="mt-1 text-xs text-ink-tertiary">Must be at least 8 characters</p>
        </div>

        <Button type="submit" variant="red" size="lg" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs text-ink-tertiary">
        By signing up, you agree to our{" "}
        <span className="underline cursor-pointer">Terms</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>

      <p className="text-center text-sm text-ink-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}