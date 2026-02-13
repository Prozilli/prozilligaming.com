"use client";

import { useState } from "react";

const SUBJECTS: Record<string, string> = {
  collaboration: "Collaboration",
  sponsorship: "Sponsorship",
  business: "Business Inquiry",
  community: "Community / Events",
  support: "Support",
  other: "Other",
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    const subjectLabel = SUBJECTS[subject] || subject || "Contact Form";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:business@prozilli.com?subject=${encodeURIComponent(`[ProzilliGaming] ${subjectLabel}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const isValid = name.trim() && email.trim() && subject && message.trim();

  if (sent) {
    return (
      <div className="panel rounded-lg p-8 text-center">
        <div className="mb-4 text-4xl">&#9993;</div>
        <h3 className="text-xl font-bold text-white">Email Client Opened</h3>
        <p className="mt-3 text-sm text-muted">
          Your email client should have opened with a pre-filled message.
          If it didn&apos;t, you can email us directly at{" "}
          <a
            href="mailto:business@prozilli.com"
            className="text-gold transition-colors hover:text-white"
          >
            business@prozilli.com
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-gold transition-colors hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="panel rounded-lg p-8">
      <h2 className="text-xl font-bold tracking-wide text-white">
        Send a Message
      </h2>
      <p className="mt-2 text-sm text-muted">
        Fill out the form and your email client will open with the details pre-filled.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-md border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-red/50"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-md border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-red/50"
          />
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Topic
          </label>
          <select
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-muted outline-none transition-colors focus:border-red/50"
          >
            <option value="">Select a topic</option>
            {Object.entries(SUBJECTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full resize-none rounded-md border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-red/50"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full rounded-md bg-red px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-red/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send Message
        </button>
        <p className="text-center text-xs text-dim">
          Opens your email client with the message pre-filled
        </p>
      </div>
    </div>
  );
}
