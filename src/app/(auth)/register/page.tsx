"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/app/actions/auth";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await registerUser(name, email, password);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // تسجيل الدخول تلقائياً بعد التسجيل
      await signIn("credentials", { email, password, redirect: false });
      router.push("/onboarding");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-navy-700">Create your account</h2>
        <p className="mt-1 text-sm text-ink-secondary">Start your journey to a 260+ score today</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="p-3 bg-red-50 text-accent-red text-sm rounded-md">{error}</div>}
        <div>
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <Button type="submit" variant="red" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-ink-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}