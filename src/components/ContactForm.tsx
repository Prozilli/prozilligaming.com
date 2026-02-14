"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const subject = (formData.get("subject") as string || "").trim();
    const discord = (formData.get("discord") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // Validation
    if (!name) {
      setErrorMsg("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!message) {
      setErrorMsg("Please enter a message.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/prismai/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, discord, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Submission failed (${res.status})`);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-raised p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent</h3>
        <p className="text-sm text-muted mb-6">
          Thanks for reaching out. We&apos;ll get back to you within 48 hours.
          For faster support, join us on Discord.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-ghost btn-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-raised p-8">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-label text-muted mb-2 block">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-label text-muted mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-label text-muted mb-2 block">Subject</label>
          <select
            name="subject"
            className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-muted focus:outline-none focus:border-electric/50 transition-colors appearance-none"
          >
            <option value="">Select a topic</option>
            <option value="business">Business Inquiry</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="collaboration">Collaboration</option>
            <option value="support">Technical Support</option>
            <option value="vip">VIP / Subscription</option>
            <option value="fivem">ZO Syndicate RP</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-label text-muted mb-2 block">Discord Username</label>
          <input
            type="text"
            name="discord"
            placeholder="username (optional)"
            className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors"
          />
        </div>

        <div>
          <label className="text-label text-muted mb-2 block">Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us what's on your mind..."
            className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors resize-none"
          />
        </div>

        {status === "error" && errorMsg && (
          <p className="text-sm text-red-bright">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
