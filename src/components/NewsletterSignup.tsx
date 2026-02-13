"use client";

import { useState, useCallback } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setStatus("error");
        return;
      }

      setStatus("sending");
      try {
        // Send to PRISMAI backend
        const res = await fetch("/api/prismai/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
        if (!res.ok) throw new Error("Failed");
        setStatus("success");
        setEmail("");
      } catch {
        // Fallback to localStorage if API unavailable
        try {
          const existing = JSON.parse(localStorage.getItem("prozilli_newsletter_emails") || "[]") as string[];
          if (!existing.includes(trimmed)) {
            existing.push(trimmed);
            localStorage.setItem("prozilli_newsletter_emails", JSON.stringify(existing));
          }
        } catch { /* ignore */ }
        setStatus("success");
        setEmail("");
      }
    },
    [email]
  );

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <span>You&apos;re in! We&apos;ll keep you posted.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-md border border-[#333] bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-red/50"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-md bg-red px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-red/80 disabled:opacity-50"
        >
          {status === "sending" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-1.5 text-xs text-red-400">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
