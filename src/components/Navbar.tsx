"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/schedule", label: "Schedule" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" },
  { href: "/zo-syndicate", label: "ZO Syndicate" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function checkLiveStatus() {
      try {
        const response = await fetch("https://api.prozilli.com/twitch/schedule");
        if (response.ok) {
          const data = await response.json();
          setIsLive(data.isLive);
        }
      } catch {
        // Silently fail - just show no live badge
      }
    }

    checkLiveStatus();
    // Check every 60 seconds
    const interval = setInterval(checkLiveStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-navy/30 bg-brand-dark/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logos/ProzilliGaming_Logo.svg"
            alt="Prozilli Gaming"
            width={32}
            height={32}
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          <span className="text-sm sm:text-lg font-bold tracking-wider text-white">
            PROZILLI<span className="text-brand-red">GAMING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-brand-silver transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {/* Live badge - only show when actually live */}
          {mounted && isLive && (
            <Link
              href="/watch"
              className="flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red transition-colors hover:bg-brand-red/20"
            >
              <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
              LIVE
            </Link>
          )}
        </div>

        {/* Mobile: Live badge + Menu toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {mounted && isLive && (
            <Link
              href="/watch"
              className="flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-2.5 py-1 text-[10px] font-medium text-brand-red"
            >
              <span className="animate-live-pulse h-1.5 w-1.5 rounded-full bg-brand-red" />
              LIVE
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`border-t border-white/5 bg-brand-dark/95 backdrop-blur-xl lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 sm:px-6 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm tracking-wide text-brand-silver transition-colors hover:text-white border-b border-white/5 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          {/* News link in mobile menu */}
          <Link
            href="/news"
            onClick={() => setOpen(false)}
            className="py-3 text-sm tracking-wide text-brand-silver transition-colors hover:text-white"
          >
            News & Updates
          </Link>
        </div>
      </div>
    </nav>
  );
}
