"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview", href: "/admin" },
  { label: "Analytics", href: "/admin/analytics" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const active = tab.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  "border-b-2 py-3 text-xs font-medium uppercase tracking-wider transition-colors " +
                  (active
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-muted hover:text-white")
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
