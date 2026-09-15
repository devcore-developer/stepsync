import { cn } from "@/lib/utils";

interface UserAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
  className?: string;
}

const sizeMap = {
  sm: "h-7 w-7 text-[0.6875rem]",
  md: "h-9 w-9 text-[0.75rem]",
  lg: "h-11 w-11 text-[0.875rem]",
};

const statusColor = {
  online: "bg-emerald-500",
  offline: "bg-slate-300",
  away: "bg-amber-400",
};

export function UserAvatar({ initials, size = "md", status, className }: UserAvatarProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-navy-400 to-brand-500 font-semibold text-white ring-2 ring-white",
          sizeMap[size]
        )}
      >
        {initials}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white",
            statusColor[status]
          )}
        />
      )}
    </div>
  );
}