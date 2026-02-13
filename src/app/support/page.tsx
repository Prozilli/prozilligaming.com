"use client";

import { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const SUPPORT_LINKS = {
  memberships: "https://prozilli-shop.fourthwall.com/supporters",
  paypal: "https://paypal.me/prozilli",
  twitch: "https://twitch.tv/prozilligaming/subscribe",
  youtube: "https://www.youtube.com/@prozilligaming/join",
};

const QUICK_TIP_AMOUNTS = [5, 10, 25, 50, 100];

const MEMBERSHIP_TIERS = [
  {
    name: "Supporter", price: 5, color: "muted" as const,
    perks: ["Exclusive Discord role", "Supporter badge on stream", "Access to supporter chat"],
    popular: false,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_adDN4Vwoqkn5TeKnl3vYXWmP",
  },
  {
    name: "VIP", price: 15, color: "red" as const,
    perks: ["All Supporter perks", "Early access to videos", "Monthly stream shoutout", "Behind-the-scenes content"],
    popular: true,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_E0Y6P4jOZwV5tExK2oKXMrmn",
  },
  {
    name: "Producer", price: 50, color: "gold" as const,
    perks: ["All VIP perks", "Credits in productions", "Direct Discord access", "Input on future content"],
    popular: false,
    checkoutUrl: "https://prozilli-shop.fourthwall.com/supporters/payments/checkout?plan=plan_Yp0JoMBV2xW5sjoOqKbvLemE",
  },
];

const DONATION_GOALS = [
  { title: "New Camera Lens", description: "Cinema-grade glass for higher production value on stream and short films.", current: 350, goal: 1000 },
  { title: "Studio Lighting Upgrade", description: "Professional lighting rig for the streaming studio setup.", current: 200, goal: 800 },
  { title: "Monthly Server Costs", description: "ZO Syndicate FiveM server and PRISMAI infrastructure hosting.", current: 120, goal: 200 },
];

const tierColors = {
  muted: { border: "border-dim", dot: "bg-dim", btn: "btn-ghost" },
  red: { border: "border-red", dot: "bg-red", btn: "btn-primary" },
  gold: { border: "border-gold", dot: "bg-gold", btn: "btn-secondary" },
};

export default function SupportPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [tipMessage, setTipMessage] = useState("");
  const [tipName, setTipName] = useState("");
  const [sending, setSending] = useState(false);

  const tipValue = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const handleSendTip = async () => {
    if (tipValue <= 0) return;
    if (tipMessage.trim()) {
      setSending(true);
      try {
        await fetch("/api/prismai/tips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tipName.trim() || "Anonymous", amount: tipValue, message: tipMessage.trim() }),
        });
      } catch { /* Don't block PayPal redirect */ }
      setSending(false);
    }
    window.open(`https://paypal.me/prozilli/${tipValue}USD`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Hero */}
      <section
        className="flex flex-col items-center px-6 pb-12 pt-24 text-center sm:pb-16 sm:pt-32"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(145,0,0,0.15) 0%, transparent 60%)" }}
      >
        <SectionLabel color="red">Support</SectionLabel>
        <h1 className="text-display mt-4 text-foreground">
          SUPPORT THE STREAM
        </h1>
        <p className="text-body mt-4 max-w-xl text-base">
          Every tip fuels better content, better gear, and a bigger community.
        </p>
      </section>

      {/* Quick Tip */}
      <section className="border-y border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="panel-raised p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">Send a Tip</h2>
            <p className="text-body mt-2">Show your support with a one-time tip</p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {QUICK_TIP_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                  className={`rounded-lg border px-5 py-3 text-sm font-bold transition-all ${
                    selectedAmount === amount && !customAmount
                      ? "border-gold bg-gold/20 text-gold"
                      : "border-[var(--color-border)] bg-surface text-gold hover:border-gold/50"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gold">$</span>
                <input
                  type="number" min="1" step="1" placeholder="Custom" value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-surface py-2.5 pl-7 pr-3 text-center text-sm font-bold text-gold placeholder-dim outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
              <input
                type="text" placeholder="Your name (optional)" value={tipName}
                onChange={(e) => setTipName(e.target.value)} maxLength={50}
                className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-foreground placeholder-dim outline-none focus:border-red"
              />
              <textarea
                placeholder="Leave a message (optional)" value={tipMessage}
                onChange={(e) => setTipMessage(e.target.value)} maxLength={280} rows={3}
                className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-foreground placeholder-dim outline-none focus:border-red"
              />
              {tipMessage.length > 0 && (
                <p className="text-right text-xs text-dim">{tipMessage.length}/280</p>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSendTip} disabled={tipValue <= 0 || sending}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Sending..." : tipValue > 0 ? `Send $${tipValue} Tip` : "Select an Amount"}
              </button>
            </div>
            <p className="mt-6 text-xs text-dim">Secure payments processed by PayPal</p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <SectionLabel color="red">Monthly Membership</SectionLabel>
          <p className="text-body mt-2">Join the inner circle. Unlock perks and support ongoing production.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => {
            const colors = tierColors[tier.color];
            return (
              <div
                key={tier.name}
                className={`panel relative p-8 text-center ${tier.popular ? "border-red/30" : ""}`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red px-4 py-1 text-xs font-bold tracking-wider text-white">
                    POPULAR
                  </span>
                )}
                <span className="text-label text-muted">{tier.name.toUpperCase()}</span>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-sm text-muted">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-left text-sm text-muted">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.checkoutUrl} target="_blank" rel="noopener noreferrer"
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-medium transition-all ${colors.btn}`}
                >
                  Join as {tier.name}
                </a>
              </div>
            );
          })}
        </div>

        {/* Platform subscriptions */}
        <div className="mt-12 text-center">
          <p className="text-label text-dim">Or Subscribe on Your Favorite Platform</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href={SUPPORT_LINKS.twitch} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#9146FF] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              Subscribe on Twitch
            </a>
            <a href={SUPPORT_LINKS.youtube} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              Join on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Donation Goals */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <SectionLabel color="gold">Support Goals</SectionLabel>
            <p className="text-body mt-2">See where your support goes. Transparent goals, real impact.</p>
          </div>
          <div className="mt-10 space-y-6">
            {DONATION_GOALS.map((goal) => {
              const pct = Math.round((goal.current / goal.goal) * 100);
              return (
                <div key={goal.title} className="panel p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{goal.title}</h3>
                      <p className="text-body mt-1">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-data text-lg font-bold text-gold">${goal.current}</span>
                      <span className="text-sm text-muted"> / ${goal.goal}</span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-raised">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red to-gold transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-right text-xs text-dim">{pct}% funded</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thank You */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-headline text-foreground">Thank You</h2>
        <p className="text-body mx-auto mt-4 max-w-md text-base">
          Whether you watch, share, subscribe, or tip — you are part of the
          Prozilli ecosystem. Every bit of support matters.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/watch" className="btn-ghost">Watch Live</Link>
          <Link href="/shop" className="btn-secondary">Visit Shop</Link>
        </div>
      </section>
    </>
  );
}
