import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-ink-secondary",
        brand: "bg-brand-50 text-brand-700",
        navy: "bg-navy-50 text-navy-500",
        red: "bg-red-50 text-accent-red",
        gold: "bg-amber-50 text-[#9a6f12]",
        green: "bg-emerald-50 text-emerald-700",
        outline: "border border-surface-border text-ink-secondary",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}