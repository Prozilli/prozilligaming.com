import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giveaways",
  description:
    "Active giveaways from Prozilli Gaming. Win gaming peripherals, VIP subscriptions, merch bundles, and ZO Syndicate starter packs. Powered by PRISMAI.",
};

const ACTIVE_GIVEAWAYS = [
  {
    title: "HyperX Cloud III Wireless Headset",
    description:
      "Premium wireless gaming headset with DTS Headphone:X spatial audio, 120-hour battery life, and ultra-clear microphone. Perfect for marathon streams and FiveM sessions.",
    prize: "Gaming Peripheral",
    value: "$169.99",
    endsIn: "3 days, 14 hours",
    entries: "247",
    requirements: ["Follow on Twitch", "Join Discord", "Retweet pinned post"],
    accent: "red",
  },
  {
    title: "3-Month Elite VIP Subscription",
    description:
      "Three full months of Elite VIP status across the entire Prozilli ecosystem. Custom ZO Syndicate character, exclusive Discord channels, LISA priority, and quarterly merch surprise.",
    prize: "VIP Subscription",
    value: "$74.97",
    endsIn: "5 days, 8 hours",
    entries: "189",
    requirements: ["Join Discord", "Be active in chat", "Follow on 3+ platforms"],
    accent: "gold",
  },
  {
    title: "Prozilli Custom Merch Bundle",
    description:
      "Official Prozilli hoodie, t-shirt, and hat combo. Plus a signed print of the ZO Syndicate logo. One-of-a-kind bundle you can't buy in the store.",
    prize: "Merch Bundle",
    value: "$120.00",
    endsIn: "7 days, 22 hours",
    entries: "312",
    requirements: ["Follow on Twitch", "Join Discord", "Share on social media"],
    accent: "electric",
  },
  {
    title: "ZO Syndicate Starter Pack",
    description:
      "Skip the grind. Start your ZO Syndicate RP journey with $50,000 in-game cash, a starter vehicle, custom phone skin, and VIP inventory slots for one month.",
    prize: "In-Game Pack",
    value: "$25.00",
    endsIn: "10 days, 6 hours",
    entries: "156",
    requirements: ["Join ZO Syndicate Discord", "Create a character", "Complete the tutorial"],
    accent: "emerald",
  },
];

const PAST_WINNERS = [
  { name: "DragonSlayer_99", prize: "Razer Huntsman Mini Keyboard", date: "January 2026" },
  { name: "NightOwlGamer", prize: "1-Month VIP Subscription", date: "January 2026" },
  { name: "VibeCheck_Pro", prize: "Prozilli Hoodie + Hat", date: "December 2025" },
  { name: "SilentShadow", prize: "ZO Syndicate Starter Pack", date: "December 2025" },
  { name: "StreamQueen_X", prize: "Elgato Stream Deck Mini", date: "November 2025" },
  { name: "CasualChaos", prize: "3-Month Associate Membership", date: "November 2025" },
];

const RULES = [
  "Must be 18 years or older (or have parental consent) to enter.",
  "One entry per person per giveaway unless otherwise stated.",
  "Winners are selected randomly using PRISMAI's verified random selection system.",
  "Winners have 72 hours to claim their prize via Discord DM.",
  "Unclaimed prizes will be re-drawn to a new winner.",
  "Physical prizes ship to US and Canada only. International winners receive equivalent digital value.",
  "Prozilli Gaming reserves the right to disqualify entries suspected of botting or fraud.",
  "No purchase necessary. Follow/subscribe requirements are free actions.",
];

const HOW_TO_ENTER = [
  {
    step: "1",
    title: "Follow & Subscribe",
    description: "Follow Prozilli on at least one streaming platform. Twitch, YouTube, Kick — your choice. It's free.",
    icon: "M15 10l-4 3V7l4 3zm-3-8a10 10 0 100 20 10 10 0 000-20z",
  },
  {
    step: "2",
    title: "Join Discord",
    description: "Join the Prozilli HQ Discord server. This is where winners are announced and prizes are claimed.",
    icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  },
  {
    step: "3",
    title: "Be Active",
    description: "Chat during streams, participate in Discord events, and engage with the community. Active members get bonus entries.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    step: "4",
    title: "Complete Requirements",
    description: "Each giveaway has specific entry requirements listed on the card. Complete all of them to qualify for the drawing.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

function getAccentClasses(accent: string) {
  const map: Record<string, { badge: string; dot: string; glow: string }> = {
    red: { badge: "badge-red", dot: "bg-red-bright", glow: "card-glow-red" },
    gold: { badge: "badge-gold", dot: "bg-gold", glow: "card-glow-gold" },
    electric: { badge: "badge-electric", dot: "bg-electric", glow: "card-glow-electric" },
    emerald: { badge: "badge-emerald", dot: "bg-emerald", glow: "" },
  };
  return map[accent] || map.red;
}

export default function GiveawaysPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[70vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-live mb-6 animate-reveal">
              <span className="live-dot" />
              Active Giveaways
            </div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Win{" "}
              <span className="text-shimmer">Free Stuff</span>
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Gaming gear, VIP subscriptions, exclusive merch, and in-game items.
              We run giveaways regularly across all platforms. No purchase necessary
              — just be part of the community.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a href="#active" className="btn btn-primary btn-lg">
                View Active Giveaways
              </a>
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Join Discord to Enter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Giveaways", value: "4" },
              { label: "Total Entries", value: "904" },
              { label: "Past Winners", value: "24" },
              { label: "Total Value Given", value: "$2,400+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-label text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ACTIVE GIVEAWAYS ====== */}
      <section id="active" className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">Live Now</div>
            <h2 className="text-headline mb-4">Active Giveaways</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Enter now before time runs out. Complete the requirements and you&apos;re in the drawing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 stagger">
            {ACTIVE_GIVEAWAYS.map((giveaway) => {
              const classes = getAccentClasses(giveaway.accent);
              return (
                <div key={giveaway.title} className={`glass-raised p-8 ${classes.glow}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`badge ${classes.badge}`}>{giveaway.prize}</span>
                    <span className="text-data text-dim ml-auto">Value: {giveaway.value}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{giveaway.title}</h3>
                  <p className="text-body mb-6">{giveaway.description}</p>

                  {/* Countdown */}
                  <div className="card p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-warning">Ends in: {giveaway.endsIn}</span>
                      </div>
                      <span className="text-data text-dim">{giveaway.entries} entries</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-label text-dim mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {giveaway.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-3 text-sm text-muted">
                          <div className="w-5 h-5 rounded border border-glass-border-hover flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-dim" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn-primary w-full">
                    Enter Giveaway
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== HOW TO ENTER ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">How It Works</div>
            <h2 className="text-headline mb-4">How to Enter</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Four simple steps to enter any giveaway. No purchase required, no credit card needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {HOW_TO_ENTER.map((item) => (
              <div key={item.step} className="card p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-4">
                  <span className="text-lg font-extrabold text-electric">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PAST WINNERS ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">Hall of Fame</div>
            <h2 className="text-headline mb-4">Past Winners</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Real people, real prizes. Congratulations to all our winners.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 stagger">
              {PAST_WINNERS.map((winner) => (
                <div key={`${winner.name}-${winner.date}`} className="card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground">{winner.name}</div>
                    <div className="text-sm text-muted truncate">{winner.prize}</div>
                  </div>
                  <span className="text-data text-dim text-xs flex-shrink-0">{winner.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== RULES ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="badge badge-red mb-4">Official Rules</div>
              <h2 className="text-headline mb-4">Giveaway Rules</h2>
            </div>

            <div className="glass-raised p-8">
              <ol className="space-y-4">
                {RULES.map((rule, i) => (
                  <li key={i} className="flex gap-4 text-sm text-muted">
                    <span className="text-data text-dim flex-shrink-0 mt-0.5">{i + 1}.</span>
                    {rule}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-16 bg-grid border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="powered-by-prismai mx-auto w-fit mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Automated by PRISMAI
          </div>
          <p className="text-sm text-muted max-w-lg mx-auto">
            All giveaways are managed and drawn by PRISMAI, our backend engine.
            Winners are selected using cryptographically secure random selection.
            No human bias, no favoritism — pure randomness.
          </p>
        </div>
      </section>
    </>
  );
}
