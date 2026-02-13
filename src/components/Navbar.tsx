"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import CartButton from "./shop/CartButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/zo-syndicate", label: "ZO Syndicate" },
  { href: "/lisa", label: "LISA" },
  { href: "/shop", label: "Shop" },
  { href: "/community", label: "Community" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLive, totalViewers } = useLiveStatus(60000);

  useEffect(() => {
    setMounted(true);

    function onScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-base/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logos/ProzilliGaming_Logo.svg"
            alt="Prozilli Gaming"
            width={32}
            height={32}
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          <span className="text-sm font-bold tracking-wider text-foreground sm:text-base">
            PROZILLI<span className="text-red">GAMING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* Live badge */}
          {mounted && isLive && (
            <Link
              href="/watch"
              className="flex items-center gap-1.5 rounded-full border border-red/30 bg-red/10 px-3 py-1 text-xs font-semibold text-red-bright transition-colors hover:bg-red/20"
            >
              <span className="animate-pulse-live h-2 w-2 rounded-full bg-red-bright" />
              LIVE
              {totalViewers > 0 && (
                <span className="text-data text-muted ml-1">
                  {totalViewers.toLocaleString()}
                </span>
              )}
            </Link>
          )}

          {mounted && <CartButton />}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {mounted && isLive && (
            <Link
              href="/watch"
              className="flex items-center gap-1.5 rounded-full border border-red/30 bg-red/10 px-2.5 py-1 text-[10px] font-semibold text-red-bright"
            >
              <span className="animate-pulse-live h-1.5 w-1.5 rounded-full bg-red-bright" />
              LIVE
            </Link>
          )}
          {mounted && <CartButton />}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[var(--color-border)] bg-base/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--color-border)] py-3 text-sm text-muted transition-colors last:border-0 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
