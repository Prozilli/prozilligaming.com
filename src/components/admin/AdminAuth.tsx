"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "pzm_admin_token";
const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24 hours

function hashPassword(pw: string): string {
  // Simple hash for client-side gate — not meant to replace server auth.
  // The real security is that admin pages only show UI; sensitive ops go through
  // the API Worker which has its own INTERNAL_API_KEY.
  let h = 0;
  for (let i = 0; i < pw.length; i++) {
    h = ((h << 5) - h + pw.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

// TODO: Replace client-side auth with Cloudflare Access or server-side authentication
// This is NOT secure - only a UI gate. Real security is in the API (INTERNAL_API_KEY)
// For now, password must be set via env var during build: NEXT_PUBLIC_ADMIN_PASSWORD
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
const VALID_HASH = ADMIN_PASSWORD ? hashPassword(ADMIN_PASSWORD) : "";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { hash, ts } = JSON.parse(stored);
        if (hash === VALID_HASH && Date.now() - ts < TOKEN_TTL) {
          setAuthed(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // ignore
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = hashPassword(password);
    if (h === VALID_HASH) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ hash: h, ts: Date.now() }));
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </div>
    );
  }

  if (!ADMIN_PASSWORD) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base px-6">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-xl font-bold text-red-400">Admin Not Configured</h1>
          <p className="mt-4 text-sm text-muted">
            NEXT_PUBLIC_ADMIN_PASSWORD environment variable is not set.
          </p>
          <p className="mt-2 text-xs text-muted/60">
            Configure this via Cloudflare Pages environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
            <p className="mt-2 text-sm text-muted">Enter the admin password to continue.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              autoFocus
              className="w-full rounded-md border border-[var(--color-border)] bg-surface px-4 py-3 text-sm text-white placeholder-muted outline-none focus:border-gold/40"
            />
            {error && (
              <p className="text-xs text-red-400">Invalid password.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-red px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red/80"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
