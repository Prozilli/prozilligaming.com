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

// The password hash for "prozilli" — change via: hashPassword("your-password")
const VALID_HASH = hashPassword("prozilli2026!");

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
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117] px-6">
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
              className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-muted outline-none focus:border-brand-gold/40"
            />
            {error && (
              <p className="text-xs text-red-400">Invalid password.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-brand-red px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red/80"
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
