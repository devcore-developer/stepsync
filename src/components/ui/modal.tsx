import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl", // Making 'lg' slightly wider for the schedule preview
  xl: "max-w-4xl",
};

export function Modal({ isOpen, onClose, title, children, className, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full bg-white rounded-lg shadow-xl", sizeMap[size], className)}>
        {title && (
          <div className="flex items-center justify-between border-b border-surface-border p-4">
            <h2 className="text-lg font-bold text-navy-700">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-md text-ink-secondary hover:bg-surface-muted">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}