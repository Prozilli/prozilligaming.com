import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
};

const SUPPORT_PLATFORMS = [
  {
    name: "Ko-fi",
    href: "https://ko-fi.com/prozilli",
    description: "One-time donations and memberships. Quick, easy, and caffeine-fueled.",
    cta: "Buy Me a Coffee",
    accent: "brand-gold",
  },
  {
    name: "Patreon",
    href: "https://patreon.com/prozilli",
    description: "Tiered membership with exclusive perks, early access, and behind-the-scenes content.",
    cta: "Become a Patron",
    accent: "brand-red",
  },
  {
    name: "PayPal",
    href: "https://paypal.me/prozilli",
    description: "Direct support. No frills, no middleman. Just straight to the production fund.",
    cta: "Send via PayPal",
    accent: "brand-silver",
  },
  {
    name: "Fourthwall",
    href: "https://fourthwall.com/prozilligaming",
    description: "Support by repping the brand. Official merch and memberships.",
    cta: "Visit the Store",
    accent: "brand-gold",
  },
];

const DONATION_GOALS = [
  {
    title: "New Camera Lens",
    description: "Cinema-grade glass for higher production value on stream and short films.",
    progress: 35,
  },
  {
    title: "Studio Lighting Upgrade",
    description: "Professional lighting rig for the streaming studio setup.",
    progress: 20,
  },
  {
    title: "Community Server Costs",
    description: "Monthly hosting for ZO Syndicate FiveM server and PRISMAI infrastructure.",
    progress: 60,
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            SUPPORT <span className="text-brand-red">THE MISSION</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Every contribution fuels the stream, the studio, and the community. Choose your way to support.
          </p>
        </div>
      </section>

      {/* Support Platforms */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          Ways to Support
        </h2>
        <p className="mb-8 text-sm text-muted">
          Pick the platform that works best for you.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {SUPPORT_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glow-border group rounded-lg p-8 transition-all"
            >
              <h3 className="text-xl font-bold tracking-wide text-white transition-colors group-hover:text-brand-red">
                {platform.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {platform.description}
              </p>
              <span className={`mt-6 inline-block text-sm font-medium tracking-wide text-${platform.accent} transition-colors group-hover:text-white`}>
                {platform.cta} &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Donation Goals */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Donation Goals
          </h2>
          <p className="mb-10 text-center text-sm text-muted">
            See where your support goes. Transparent goals, real impact.
          </p>
          <div className="grid gap-6">
            {DONATION_GOALS.map((goal) => (
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
                  <span className="shrink-0 text-sm font-medium text-brand-gold">
                    {goal.progress}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-brand-red transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted">
            Goals are placeholder estimates and will be updated as campaigns launch.
          </p>
        </div>
      </section>

      {/* Thank You */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          Thank You
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Whether you watch, share, subscribe, or donate — you are part of the Prozilli ecosystem. Every bit of support matters.
        </p>
      </section>
    </>
  );
}
