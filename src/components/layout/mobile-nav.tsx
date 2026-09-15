"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className={cn("fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={onClose} />
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-out lg:hidden", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="relative h-full">
          <button onClick={onClose} className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
          <AppSidebar />
        </div>
      </aside>
    </>
  );
}