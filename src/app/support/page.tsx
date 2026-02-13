import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Tips",
  description:
    "Support Prozilli Gaming. Donate via StreamElements, PayPal, CashApp, or Venmo. Subscribe for VIP perks. Every contribution fuels the ecosystem.",
};

const DONATION_METHODS = [
  {
    name: "StreamElements",
    description: "Tip directly during streams with on-screen alerts and LISA shoutouts. The preferred method for live support.",
    href: "https://streamelements.com/prozilligaming/tip",
    color: "#f59e0b",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "PayPal",
    description: "Send a one-time donation or set up a recurring contribution via PayPal. Secure and instant.",
    href: "https://paypal.me/prozilli",
    color: "#0070ba",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.72a.77.77 0 01.757-.65h6.803c2.252 0 3.913.642 4.775 1.853.405.57.65 1.222.74 1.937.096.756.038 1.657-.177 2.752l-.012.07v.617c.525.268.953.607 1.275 1.017.548.698.84 1.594.84 2.59 0 1.08-.29 2.033-.864 2.84-.514.723-1.224 1.29-2.11 1.69-.854.385-1.868.58-3.015.58h-.72a.958.958 0 00-.946.804l-.037.218-.498 3.157-.03.145a.958.958 0 01-.946.804H7.076z" />
      </svg>
    ),
  },
  {
    name: "CashApp",
    description: "Quick and easy mobile payments. Send any amount to $Prozilli. No account fees, instant transfer.",
    href: "https://cash.app/$Prozilli",
    color: "#00d632",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-1.05c-1.1-.13-2.15-.55-2.85-1.1l.85-1.6c.8.55 1.65.9 2.55.9.85 0 1.35-.35 1.35-.95 0-.6-.5-.85-1.65-1.2-1.6-.5-2.85-1.1-2.85-2.85 0-1.35.95-2.35 2.6-2.6V5.5h2v1.05c.85.1 1.7.4 2.4.85l-.75 1.6c-.7-.4-1.4-.7-2.15-.7-.85 0-1.2.4-1.2.85 0 .55.5.75 1.75 1.15 1.65.55 2.75 1.2 2.75 2.9 0 1.4-1 2.4-2.8 2.7V17z" />
      </svg>
    ),
  },
  {
    name: "Venmo",
    description: "Another fast mobile payment option. Find @Prozilli on Venmo and send any amount with a note.",
    href: "https://venmo.com/Prozilli",
    color: "#008cff",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5 3.5c.8 1.3 1.15 2.65 1.15 4.35 0 5.4-4.6 12.4-8.35 17.15H5.15L2.5 3.95l5.8-.55 1.45 11.65c1.35-2.2 3-5.65 3-8.05 0-1.6-.25-2.7-.7-3.6l4.45-1.9z" />
      </svg>
    ),
  },
];

const VIP_TIERS = [
  {
    name: "Supporter",
    price: "$4.99",
    period: "/month",
    color: "emerald",
    badge: "badge-emerald",
    features: [
      "Supporter role in Discord",
      "Custom name color in chat",
      "Priority queue in ZO Syndicate",
      "Supporter badge on stream overlays",
      "Access to supporter-only Discord channels",
      "Monthly supporter shoutout",
    ],
  },
  {
    name: "VIP",
    price: "$9.99",
    period: "/month",
    color: "electric",
    badge: "badge-electric",
    popular: true,
    features: [
      "Everything in Supporter, plus:",
      "VIP role with exclusive Discord channels",
      "Custom vehicle plate in ZO Syndicate",
      "VIP inventory slots (+10 extra)",
      "LISA remembers you with priority",
      "Early access to new features",
      "Monthly VIP-only giveaways",
      "Vote on stream game choices",
    ],
  },
  {
    name: "Elite",
    price: "$24.99",
    period: "/month",
    color: "gold",
    badge: "badge-gold",
    features: [
      "Everything in VIP, plus:",
      "Elite role — top of the hierarchy",
      "Custom character in ZO Syndicate",
      "Exclusive Elite Discord lounge",
      "Direct line to Pro for suggestions",
      "Name in stream credits",
      "Custom LISA greeting message",
      "Priority bug fixes & feature requests",
      "Quarterly merch surprise package",
    ],
  },
];

const TRANSPARENCY = [
  {
    label: "Server Hosting",
    description: "FiveM server (RocketNode), PRISMAI bot hosting (Cybrancee), Cloudflare Workers, domain names",
    percentage: 35,
  },
  {
    label: "Equipment & Software",
    description: "Streaming hardware, capture cards, microphones, cameras, software licenses, AI API costs",
    percentage: 25,
  },
  {
    label: "Content Creation",
    description: "Graphics, video editing tools, music licensing, overlay designs, thumbnail creation",
    percentage: 20,
  },
  {
    label: "Community & Giveaways",
    description: "Prizes for giveaways, community events, game keys, merchandise for winners",
    percentage: 15,
  },
  {
    label: "Growth & Marketing",
    description: "Platform promotions, collaborations, community outreach",
    percentage: 5,
  },
];

export default function SupportPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[70vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-red mb-6 animate-reveal">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support & Tips
            </div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Fuel the{" "}
              <span className="text-shimmer-red">Ecosystem</span>
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Every tip, donation, and subscription keeps the servers running, the content
              flowing, and the community growing. This is an independent operation — your
              support is what makes it all possible.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://streamelements.com/prozilligaming/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Send a Tip
              </a>
              <Link href="/shop" className="btn btn-secondary btn-lg">
                Browse Merch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DONATION METHODS ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">Donate</div>
            <h2 className="text-headline mb-4">Ways to Support</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Choose your preferred method. Every dollar goes directly into making the Prozilli
              ecosystem better for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger">
            {DONATION_METHODS.map((method) => (
              <a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-holo p-6 group block"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${method.color}15`, color: method.color }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-foreground transition-colors">
                        {method.name}
                      </h3>
                    </div>
                    <svg className="w-5 h-5 text-dim ml-auto group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted">{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-red" />

      {/* ====== VIP TIERS ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">VIP Memberships</div>
            <h2 className="text-headline mb-4">
              Unlock <span className="text-shimmer">VIP Perks</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Monthly memberships that give you exclusive access, custom perks in ZO Syndicate,
              priority LISA interactions, and a direct line to shape the ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger">
            {VIP_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`glass-raised p-8 relative ${
                  tier.popular ? "ring-2 ring-electric/30" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-electric">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <span className={`badge ${tier.badge} mb-4`}>{tier.name}</span>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted">{tier.period}</span>
                  </div>
                </div>
                <div className="divider mb-6" />
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 text-${tier.color}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn w-full ${tier.popular ? "btn-primary" : "btn-secondary"}`}>
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TWITCH & YOUTUBE ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Twitch Subs */}
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#9146ff20", color: "#9146ff" }}>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Twitch Subscription</h3>
                  <p className="text-sm text-muted">Subscribe on Twitch</p>
                </div>
              </div>
              <p className="text-body mb-6">
                Subscribe on Twitch for ad-free viewing, custom emotes, subscriber badge,
                and access to subscriber-only chat mode. Use your free Prime sub if you have
                Amazon Prime.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Ad-free viewing experience",
                  "Custom Prozilli emotes",
                  "Subscriber chat badge",
                  "Sub-only chat access",
                  "Free with Amazon Prime",
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#9146ff" }} />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="https://twitch.tv/prozilligaming"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                Subscribe on Twitch
              </a>
            </div>

            {/* YouTube Memberships */}
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#ff000020", color: "#ff0000" }}>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">YouTube Membership</h3>
                  <p className="text-sm text-muted">Become a Member</p>
                </div>
              </div>
              <p className="text-body mb-6">
                Join as a YouTube member for custom badges, loyalty emojis, members-only
                community posts, and early access to uploaded content. Support through
                the platform you already use.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Custom loyalty badges",
                  "Members-only emojis",
                  "Exclusive community posts",
                  "Early access to uploads",
                  "Members-only live chats",
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#ff0000" }} />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="https://youtube.com/@prozilligaming"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                Join on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHERE YOUR MONEY GOES ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-emerald mb-4">Transparency</div>
            <h2 className="text-headline mb-4">Where Your Money Goes</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Full transparency. Every dollar you contribute is reinvested into the ecosystem.
              No salaries, no overhead — just pure content and community investment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {TRANSPARENCY.map((item) => (
              <div key={item.label} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted mt-1">{item.description}</p>
                  </div>
                  <span className="text-2xl font-extrabold text-gold ml-4 flex-shrink-0">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-raised rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== MERCH CTA ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-raised p-8 md:p-12">
            <div className="badge badge-red mb-6">Official Merch</div>
            <h2 className="text-headline mb-4">
              Rep the <span className="text-shimmer-red">Brand</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-10">
              Another way to support — grab some official Prozilli merch. Hoodies, tees,
              hats, and more. Every purchase directly supports the ecosystem and you get
              to look good doing it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="btn btn-primary btn-lg">
                Visit the Shop
              </Link>
              <a
                href="https://streamelements.com/prozilligaming/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Or Just Tip
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
