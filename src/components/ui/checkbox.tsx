"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onToggle?: () => void;
  className?: string;
  "aria-label"?: string;
}

export function Checkbox({ checked, onToggle, className, ...props }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.375rem] border transition-all duration-150",
        checked
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-slate-300 bg-white text-transparent hover:border-brand-400",
        className
      )}
      {...props}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </button>
  );
}