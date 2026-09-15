"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <Link href="/login" className="inline-flex items-center text-sm text-ink-secondary hover:text-navy-500">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
      </Link>
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-navy-700">Reset password</h2>
        <p className="mt-1 text-sm text-ink-secondary">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <Input type="email" placeholder="alex.morgan@medstudent.edu" required />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}