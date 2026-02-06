"use client";

import { useState } from "react";
import Link from "next/link";

// Payment/support links
const SUPPORT_LINKS = {
  // Fourthwall memberships page
  memberships: "https://prozilli-shop.fourthwall.com/supporters",
  // PayPal for direct tips (primary tip method)
  paypal: "https://paypal.me/prozilli",
  // Platform subscriptions
  twitch: "https://twitch.tv/prozilligaming/subscribe",
  youtube: "https://www.youtube.com/@prozilligaming/join",
};

// Quick tip amounts (for display)
const QUICK_TIP_AMOUNTS = [5, 10, 25, 50, 100];

// Membership tiers with direct checkout URLs
const MEMBERSHIP_TIERS = [
  {
    name: "Supporter",
    price: 5,
    color: "silver",
    perks: [
      "Exclusive Discord role",
      "Supporter badge on stream",
      "Access to supporter chat",
    ],
    popular: false,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_adDN4Vwoqkn5TeKnl3vYXWmP",
  },
  {
    name: "VIP",
    price: 15,
    color: "red",
    perks: [
      "All Supporter perks",
      "Early access to videos",
      "Monthly stream shoutout",
      "Behind-the-scenes content",
    ],
    popular: true,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_E0Y6P4jOZwV5tExK2oKXMrmn",
  },
  {
    name: "Producer",
    price: 50,
    color: "gold",
    perks: [
      "All VIP perks",
      "Credits in productions",
      "Direct Discord access",
      "Input on future content",
    ],
    popular: false,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_Yp0JoMBV2xW5sjoOqKbvLemE",
  },
];

const DONATION_GOALS = [
  {
    title: "New Camera Lens",
    description:
      "Cinema-grade glass for higher production value on stream and short films.",
    current: 350,
    goal: 1000,
  },
  {
    title: "Studio Lighting Upgrade",
    description: "Professional lighting rig for the streaming studio setup.",
    current: 200,
    goal: 800,
  },
  {
    title: "Monthly Server Costs",
    description: "ZO Syndicate FiveM server and PRISMAI infrastructure hosting.",
    current: 120,
    goal: 200,
  },
];

export default function SupportPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [tipMessage, setTipMessage] = useState("");
  const [tipName, setTipName] = useState("");
  const [sending, setSending] = useState(false);

  const tipValue = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const handleSendTip = async () => {
    if (tipValue <= 0) return;

    // Save tip message to PRISMAI if there's a message
    if (tipMessage.trim()) {
      setSending(true);
      try {
        await fetch("/api/prismai/tips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tipName.trim() || "Anonymous",
            amount: tipValue,
            message: tipMessage.trim(),
          }),
        });
      } catch {
        // Don't block the PayPal redirect on API failure
      }
      setSending(false);
    }

    // Open PayPal with the amount
    window.open(
      `https://paypal.me/prozilli/${tipValue}USD`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "silver":
        return {
          badge: "border-brand-silver/30 bg-brand-silver/10 text-brand-silver",
          dot: "bg-brand-silver",
          button:
            "border border-brand-silver/30 text-brand-silver hover:bg-brand-silver/10",
        };
      case "red":
        return {
          badge: "border-brand-red/30 bg-brand-red/10 text-brand-red",
          dot: "bg-brand-red",
          button: "bg-brand-red text-white hover:bg-brand-red-glow",
        };
      case "gold":
        return {
          badge: "border-brand-gold/30 bg-brand-gold/10 text-brand-gold",
          dot: "bg-brand-gold",
          button:
            "border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10",
        };
      default:
        return {
          badge: "border-white/30 bg-white/10 text-white",
          dot: "bg-white",
          button: "border border-white/30 text-white hover:bg-white/10",
        };
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Fireflies */}
        <div className="fireflies">
          <span className="f1" />
          <span className="f2" />
          <span className="f3" />
          <span className="f4" />
          <span className="f5" />
          <span className="f6" />
        </div>
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-support.png")`,
            opacity: 0.35,
          }}
        />

        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl">
            SUPPORT <span className="text-brand-red">THE STREAM</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted">
            Every tip fuels better content, better gear, and a bigger community.
          </p>
        </div>
      </section>

      {/* Quick Tip */}
      <section className="border-b border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="glass-strong glow-border rounded-xl p-5 sm:p-8 text-center">
            <h2 className="text-xl font-bold tracking-wide text-white">
              Send a Tip
            </h2>
            <p className="mt-2 text-sm text-muted">
              Show your support with a one-time tip
            </p>

            {/* Quick amounts */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {QUICK_TIP_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`rounded-lg border px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-bold transition-all touch-manipulation ${
                    selectedAmount === amount && !customAmount
                      ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                      : "border-brand-gold/30 bg-brand-gold/5 text-brand-gold hover:bg-brand-gold/20 hover:border-brand-gold/50"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mt-4 flex justify-center">
              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-gold">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Custom"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full rounded-lg border border-brand-gold/30 bg-brand-gold/5 py-2.5 pl-7 pr-3 text-center text-sm font-bold text-brand-gold placeholder-brand-gold/40 outline-none transition-all focus:border-brand-gold focus:bg-brand-gold/10"
                />
              </div>
            </div>

            {/* Name + Message */}
            <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={tipName}
                onChange={(e) => setTipName(e.target.value)}
                maxLength={50}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-all focus:border-brand-red/50 focus:bg-white/10"
              />
              <textarea
                placeholder="Leave a message (optional)"
                value={tipMessage}
                onChange={(e) => setTipMessage(e.target.value)}
                maxLength={280}
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-all focus:border-brand-red/50 focus:bg-white/10"
              />
              {tipMessage.length > 0 && (
                <p className="text-right text-xs text-muted">
                  {tipMessage.length}/280
                </p>
              )}
            </div>

            {/* Send button */}
            <div className="mt-6">
              <button
                onClick={handleSendTip}
                disabled={tipValue <= 0 || sending}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-red px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-red/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {sending
                  ? "Sending..."
                  : tipValue > 0
                    ? "Send $" + tipValue + " Tip"
                    : "Select an Amount"}
              </button>
            </div>

            <p className="mt-6 text-xs text-muted">
              Secure payments processed by PayPal
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brand-red">
          Monthly Membership
        </h2>
        <p className="mb-8 sm:mb-10 text-center text-sm text-muted">
          Join the inner circle. Unlock perks and support ongoing production.
        </p>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => {
            const colors = getColorClasses(tier.color);
            return (
              <div
                key={tier.name}
                className={`glass glow-border relative rounded-xl p-5 sm:p-8 text-center ${
                  tier.popular ? "border-brand-red/30" : ""
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-4 py-1 text-xs font-bold tracking-wider text-white">
                    POPULAR
                  </span>
                )}
                <span
                  className={`inline-block rounded-full border px-4 py-1 text-xs font-medium tracking-wider ${colors.badge}`}
                >
                  {tier.name.toUpperCase()}
                </span>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    ${tier.price}
                  </span>
                  <span className="text-sm text-muted">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-left text-sm text-muted">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${colors.dot}`}
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block w-full rounded-sm py-3 text-sm font-medium tracking-wide transition-all ${colors.button}`}
                >
                  Join as {tier.name}
                </a>
              </div>
            );
          })}
        </div>

        {/* Platform Support */}
        <div className="mt-10 sm:mt-12">
          <h3 className="mb-5 sm:mb-6 text-center text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-muted">
            Or Subscribe on Your Favorite Platform
          </h3>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={SUPPORT_LINKS.twitch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#9146FF] px-6 py-3 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
              Subscribe on Twitch
            </a>
            <a
              href={SUPPORT_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF0000] px-6 py-3 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Join on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Donation Goals */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brand-gold">
            Support Goals
          </h2>
          <p className="mb-8 sm:mb-10 text-center text-sm text-muted">
            See where your support goes. Transparent goals, real impact.
          </p>
          <div className="space-y-4 sm:space-y-6">
            {DONATION_GOALS.map((goal) => {
              const percentage = Math.round((goal.current / goal.goal) * 100);
              return (
                <div key={goal.title} className="glass rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold tracking-wide text-white">
                        {goal.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {goal.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-brand-gold">
                        ${goal.current}
                      </span>
                      <span className="text-sm text-muted"> / ${goal.goal}</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-gold transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="mt-2 text-right text-xs text-muted">
                    {percentage}% funded
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thank You */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white md:text-3xl">
          Thank You
        </h2>
        <p className="mx-auto mt-3 sm:mt-4 max-w-md text-sm leading-relaxed text-muted">
          Whether you watch, share, subscribe, or tip — you are part of the
          Prozilli ecosystem. Every bit of support matters and goes directly
          into making better content.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            href="/watch"
            className="rounded-sm border border-brand-red/30 px-6 py-3 text-sm font-medium tracking-wide text-brand-red transition-colors hover:bg-brand-red/10 active:scale-[0.98]"
          >
            Watch Live
          </Link>
          <Link
            href="/shop"
            className="rounded-sm border border-brand-gold/30 px-6 py-3 text-sm font-medium tracking-wide text-brand-gold transition-colors hover:bg-brand-gold/10 active:scale-[0.98]"
          >
            Visit Shop
          </Link>
        </div>
      </section>
    </>
  );
}
