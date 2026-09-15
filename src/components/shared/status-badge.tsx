import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "completed" | "in-progress" | "upcoming" | "locked" | "high" | "medium" | "low";
  className?: string;
}

const labelMap: Record<StatusBadgeProps["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
  locked: "Locked",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const variantMap: Record<StatusBadgeProps["status"], React.ComponentProps<typeof Badge>["variant"]> = {
  completed: "green",
  "in-progress": "brand",
  upcoming: "navy",
  locked: "default",
  high: "red",
  medium: "gold",
  low: "default",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={variantMap[status]} className={cn(className)}>
      {labelMap[status]}
    </Badge>
  );
}