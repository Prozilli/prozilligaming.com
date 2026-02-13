"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "prozilli_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-fade-in-up"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="hud-panel p-5">
        <p className="text-sm text-foreground">
          We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={accept} className="btn-primary text-xs">
            Accept
          </button>
          <button onClick={decline} className="btn-ghost text-xs">
            Decline
          </button>
          <Link href="/privacy" className="ml-auto text-xs text-muted hover:text-gold transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
