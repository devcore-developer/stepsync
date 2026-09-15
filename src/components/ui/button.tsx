import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700",
        navy: "bg-navy-500 text-white hover:bg-navy-600 active:bg-navy-700",
        red: "bg-accent-red text-white hover:bg-accent-red-dark active:bg-[#820E1F]",
        outline: "border border-surface-border bg-white text-ink hover:bg-surface-muted hover:text-navy-500",
        ghost: "text-ink-secondary hover:bg-surface-muted hover:text-navy-500",
        gold: "bg-accent-gold text-navy-700 hover:bg-accent-gold-dark",
        subtle: "bg-surface-subtle text-brand-700 hover:bg-brand-100",
      },
      size: {
        sm: "h-8 px-3 text-[0.8125rem]",
        md: "h-9 px-4",
        lg: "h-11 px-5 text-[0.9375rem]",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
export { buttonVariants };