import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
};

const SUPPORT_TIERS = [
  {
    name: "One-Time Support",
    description: "Send a one-time donation to support the stream. Every bit helps fuel the production.",
    options: [
      { amount: "$5", label: "Coffee" },
      { amount: "$10", label: "Snacks" },
      { amount: "$25", label: "Gear Fund" },
      { amount: "Custom", label: "Your Choice" },
    ],
    accent: "brand-gold",
  },
  {
    name: "Monthly Supporter",
    description: "Become a recurring supporter and unlock exclusive perks, early access, and community recognition.",
    tiers: [
      { name: "Supporter", price: "$5/mo", perks: ["Discord role", "Supporter badge on stream"] },
      { name: "VIP", price: "$15/mo", perks: ["All Supporter perks", "Early access to videos", "Monthly shoutout"] },
      { name: "Producer", price: "$50/mo", perks: ["All VIP perks", "Credits in productions", "Direct Discord access"] },
    ],
    accent: "brand-red",
  },
];

const DONATION_GOALS = [
  {
    title: "New Camera Lens",
    description: "Cinema-grade glass for higher production value on stream and short films.",
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
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-6 pt-20 pb-12 text-center">
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
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            SUPPORT <span className="text-brand-red">THE STREAM</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Every donation fuels better content, better gear, and a bigger community.
          </p>
        </div>
      </section>

      {/* Quick Donate */}
      <section className="border-b border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="glass-strong glow-border rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold tracking-wide text-white">
              Quick Donate
            </h2>
            <p className="mt-2 text-sm text-muted">
              Send a one-time tip to support the stream
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["$5", "$10", "$25", "$50", "$100"].map((amount) => (
                <button
                  key={amount}
                  className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:border-brand-gold hover:bg-brand-gold/20"
                >
                  {amount}
                </button>
              ))}
              <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10">
                Custom
              </button>
            </div>
            <button className="mt-6 rounded-sm bg-brand-red px-10 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow">
              Send Support
            </button>
            <p className="mt-4 text-xs text-muted">
              Secure payment via PayPal • Your name appears on stream alerts
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          Monthly Membership
        </h2>
        <p className="mb-10 text-center text-sm text-muted">
          Join the inner circle. Unlock perks and support ongoing production.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Supporter Tier */}
          <div className="glass glow-border rounded-xl p-8 text-center">
            <span className="inline-block rounded-full border border-brand-silver/30 bg-brand-silver/10 px-4 py-1 text-xs font-medium tracking-wider text-brand-silver">
              SUPPORTER
            </span>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">$5</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-left text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-silver" />
                Exclusive Discord role
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-silver" />
                Supporter badge on stream
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-silver" />
                Access to supporter chat
              </li>
            </ul>
            <button className="mt-8 w-full rounded-sm border border-brand-silver/30 py-3 text-sm font-medium tracking-wide text-brand-silver transition-all hover:bg-brand-silver/10">
              Join as Supporter
            </button>
          </div>

          {/* VIP Tier */}
          <div className="glass glow-border relative rounded-xl border-brand-red/30 p-8 text-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-4 py-1 text-xs font-bold tracking-wider text-white">
              POPULAR
            </span>
            <span className="inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1 text-xs font-medium tracking-wider text-brand-red">
              VIP
            </span>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">$15</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-left text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                All Supporter perks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                Early access to videos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                Monthly stream shoutout
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                Behind-the-scenes content
              </li>
            </ul>
            <button className="mt-8 w-full rounded-sm bg-brand-red py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow">
              Join as VIP
            </button>
          </div>

          {/* Producer Tier */}
          <div className="glass glow-border rounded-xl p-8 text-center">
            <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
              PRODUCER
            </span>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">$50</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <ul className="mt-6 space-y-3 text-left text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                All VIP perks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Credits in productions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Direct Discord access
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Input on future content
              </li>
            </ul>
            <button className="mt-8 w-full rounded-sm border border-brand-gold/30 py-3 text-sm font-medium tracking-wide text-brand-gold transition-all hover:bg-brand-gold/10">
              Join as Producer
            </button>
          </div>
        </div>
      </section>

      {/* Donation Goals */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Donation Goals
          </h2>
          <p className="mb-10 text-center text-sm text-muted">
            See where your support goes. Transparent goals, real impact.
          </p>
          <div className="space-y-6">
            {DONATION_GOALS.map((goal) => {
              const percentage = Math.round((goal.current / goal.goal) * 100);
              return (
                <div key={goal.title} className="glass rounded-lg p-6">
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
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Thank You
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          Whether you watch, share, subscribe, or donate — you are part of the Prozilli ecosystem.
          Every bit of support matters and goes directly into making better content.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/watch"
            className="rounded-sm border border-brand-red/30 px-6 py-3 text-sm font-medium tracking-wide text-brand-red transition-colors hover:bg-brand-red/10"
          >
            Watch Live
          </Link>
          <Link
            href="/shop"
            className="rounded-sm border border-brand-gold/30 px-6 py-3 text-sm font-medium tracking-wide text-brand-gold transition-colors hover:bg-brand-gold/10"
          >
            Visit Shop
          </Link>
        </div>
      </section>
    </>
  );
}
