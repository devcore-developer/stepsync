import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm">
        <Image
          src="/logo.png"
          alt="StepSync Logo"
          width={24}
          height={24}
          className="object-contain"
          priority
        />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="text-[1.0625rem] font-bold tracking-tight text-white">
            Step<span className="text-accent-gold">Sync</span>
          </span>
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-navy-200">
            USMLE Step 1
          </span>
        </div>
      )}
    </div>
  );
}