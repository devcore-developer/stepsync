import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  color?: "brand" | "navy" | "red" | "gold";
  size?: "sm" | "md";
}

const colorMap = {
  brand: "bg-brand-500",
  navy: "bg-navy-500",
  red: "bg-accent-red",
  gold: "bg-accent-gold",
};

export function Progress({ value, color = "brand", size = "md", className, ...props }: ProgressProps) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-surface-muted",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorMap[color])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}