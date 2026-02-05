"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/schedule", label: "Schedule" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" },
  { href: "/zo-syndicate", label: "ZO Syndicate" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-brand-dark/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/ProzilliGaming_Logo.svg"
            alt="Prozilli Gaming"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-bold tracking-wider text-white">
            PROZILLI<span className="text-brand-red">GAMING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-brand-silver transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {/* Live badge placeholder */}
          <span className="flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red">
            <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
            LIVE
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-brand-dark/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-wide text-brand-silver transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
