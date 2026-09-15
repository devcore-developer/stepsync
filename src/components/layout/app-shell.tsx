"use client";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./top-bar";
import { MobileNav } from "./mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-page">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">
        <AppSidebar />
      </aside>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="lg:pl-[264px]">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}