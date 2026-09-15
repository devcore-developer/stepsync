"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { navSections, supportItem } from "./nav-config";
import { demoUser } from "@/lib/demo-data";
import { ChevronRight } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-navy-700 text-white">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <BrandLogo />
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="ss-section-label px-3 pb-2">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "ss-nav-item group relative",
                      isActive
                        ? "bg-brand-500 text-white shadow-sm"
                        : "text-navy-100 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent-gold" />
                    )}
                    <Icon className="h-[1.0625rem] w-[1.0625rem] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Support */}
        <div className="mb-2">
          <p className="ss-section-label px-3 pb-2">Support</p>
          <Link
            href={supportItem.href}
            className={cn(
              "ss-nav-item group relative",
              pathname === supportItem.href
                ? "bg-brand-500 text-white shadow-sm"
                : "text-navy-100 hover:bg-white/5 hover:text-white"
            )}
          >
            <supportItem.icon className="h-[1.0625rem] w-[1.0625rem]" />
            <span>{supportItem.label}</span>
          </Link>
        </div>
      </nav>

      {/* User mini-card */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors hover:bg-white/5"
        >
          <UserAvatar initials={demoUser.avatarInitials} size="md" status="online" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.8125rem] font-semibold text-white">{demoUser.name}</p>
            <p className="truncate text-[0.6875rem] text-navy-200">{demoUser.role}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-navy-300" />
        </Link>
      </div>
    </div>
  );
}