"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import CartButton from "./shop/CartButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/schedule", label: "Schedule" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" },
  { href: "/zo-syndicate", label: "ZO Syndicate" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-brand-silver transition-colors hover:bg-white/10 hover:text-white"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

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
          {/* Theme Toggle */}
          {mounted && <ThemeToggle />}
          {/* Cart Button */}
          {mounted && <CartButton />}
        </div>

        {/* Mobile: Live badge + Theme toggle + Cart + Menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {mounted && isLive && (
            <Link
              href="/watch"
              className="flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-2.5 py-1 text-[10px] font-medium text-brand-red"
            >
              <span className="animate-live-pulse h-1.5 w-1.5 rounded-full bg-brand-red" />
              LIVE
            </Link>
          )}
          {mounted && <ThemeToggle />}
          {mounted && <CartButton />}
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
