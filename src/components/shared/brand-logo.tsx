import { cn } from "@/lib/utils";

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-navy-500 to-brand-500 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          {/* Stylized "S" mark with medical cross accent */}
          <path
            d="M16 8.5C16 7 14.5 6 12 6C9.5 6 8 7.2 8 9C8 10.5 9.3 11.3 12 12C14.7 12.7 16 13.5 16 15C16 16.8 14.5 18 12 18C9.5 18 8 17 8 15.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="11" y="3" width="2" height="2.5" rx="0.5" fill="#E5B338" />
          <rect x="11" y="18.5" width="2" height="2.5" rx="0.5" fill="#E5B338" />
        </svg>
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