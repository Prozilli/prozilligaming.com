"use client";

import { useState, useEffect, FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("prozilli_newsletter_subscribed") === "true") {
        setAlreadySubscribed(true);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  function isValidEmail(val: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/prismai/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Subscription failed (${res.status})`);
      }

      setStatus("success");
      try {
        localStorage.setItem("prozilli_newsletter_subscribed", "true");
      } catch {
        // localStorage not available
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (alreadySubscribed) {
    return (
      <div className="glass-raised p-8 md:p-12 max-w-2xl mx-auto text-center">
        <div className="badge badge-electric mb-6">Newsletter</div>
        <h2 className="text-headline mb-4">You&apos;re Subscribed</h2>
        <p className="text-body-lg">
          You&apos;re already on the list. We&apos;ll keep you updated with the latest
          from the Prozilli ecosystem.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-emerald">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Subscribed
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass-raised p-8 md:p-12 max-w-2xl mx-auto text-center">
        <div className="badge badge-emerald mb-6">Success</div>
        <h2 className="text-headline mb-4">You&apos;re In</h2>
        <p className="text-body-lg">
          Welcome to the Prozilli newsletter. You&apos;ll receive the latest updates,
          behind-the-scenes content, and early access announcements straight to your inbox.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-emerald">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Subscribed successfully
        </div>
      </div>
    );
  }

  return (
    <div className="glass-raised p-8 md:p-12 max-w-2xl mx-auto text-center">
      <div className="badge badge-electric mb-6">Newsletter</div>
      <h2 className="text-headline mb-4">Stay in the Loop</h2>
      <p className="text-body-lg mb-8">
        Get the latest updates, exclusive behind-the-scenes content, and early
        access announcements delivered straight to your inbox. No spam, ever.
      </p>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary btn-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className="text-xs text-red-bright mt-3">{errorMsg}</p>
      )}
      {status !== "error" && (
        <p className="text-xs text-dim mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
