import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Accounts",
  description:
    "Link your accounts across 9 platforms to unlock cross-platform rewards, unified identity, VIP sync, and LISA recognition. Powered by PRISMAI OAuth.",
};

const PLATFORMS = [
  {
    name: "Twitch",
    description: "Link your Twitch account for sub recognition, channel point rewards, and LISA interaction across platforms.",
    color: "#9146ff",
    connected: false,
    icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z",
  },
  {
    name: "YouTube",
    description: "Connect YouTube for membership sync, comment recognition, and cross-platform loyalty tracking.",
    color: "#ff0000",
    connected: false,
    icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Kick",
    description: "Link your Kick account for chat identity, subscriber perks, and LISA recognition on Kick streams.",
    color: "#53fc18",
    connected: false,
    icon: "M4 2h6l4 7-4 7H4l4-7-4-7zm10 0h6l-4 7 4 7h-6l-4-7 4-7z",
  },
  {
    name: "Discord",
    description: "Connect Discord for role sync, VIP status, server permissions, and LISA interaction in all channels.",
    color: "#5865f2",
    connected: false,
    icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  },
  {
    name: "TikTok",
    description: "Link TikTok for cross-platform content attribution and community recognition on short-form videos.",
    color: "#ff0050",
    connected: false,
    icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "X / Twitter",
    description: "Connect your X account for tweet recognition, cross-posting attribution, and social engagement tracking.",
    color: "#ffffff",
    connected: false,
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    description: "Link Instagram for story mentions, content collaboration tracking, and visual community engagement.",
    color: "#e4405f",
    connected: false,
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "Facebook",
    description: "Connect Facebook for page interaction sync, event RSVP tracking, and social cross-platform identity.",
    color: "#1877f2",
    connected: false,
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Trovo",
    description: "Link your Trovo account for livestream recognition, subscriber sync, and chat identity across platforms.",
    color: "#19d65c",
    connected: false,
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
];

const BENEFITS = [
  {
    title: "Unified Identity",
    description: "One profile across all 9 platforms. LISA recognizes you whether you're on Twitch, Discord, Kick, or anywhere else.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    accent: "electric",
  },
  {
    title: "Cross-Platform Rewards",
    description: "Earn loyalty points on any platform and spend them anywhere. Watch on YouTube, redeem on Discord. It all counts.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "gold",
  },
  {
    title: "VIP Sync",
    description: "Subscribe on any platform — Twitch, YouTube, Patreon, or Tebex — and your VIP status follows you everywhere automatically.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    accent: "emerald",
  },
  {
    title: "LISA Remembers You",
    description: "Connect your accounts and LISA builds a relationship with you across every platform. She remembers your name, your jokes, and your history.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    accent: "red",
  },
];

export default function ConnectPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[70vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-electric mb-6 animate-reveal">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Account Linking
            </div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Connect Your{" "}
              <span className="text-shimmer">Platforms</span>
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Link your accounts across all 9 platforms for a unified identity.
              LISA recognizes you everywhere, your VIP status syncs automatically,
              and your loyalty follows you across the entire ecosystem.
            </p>
            <div
              className="animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="powered-by-prismai w-fit">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" opacity="0.3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Secured by PRISMAI OAuth
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PLATFORM CONNECTIONS ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">9 Platforms</div>
            <h2 className="text-headline mb-4">Link Your Accounts</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Click any platform below to connect your account via secure OAuth.
              We never store your passwords — only authorized access tokens, encrypted at rest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {PLATFORMS.map((platform) => (
              <div key={platform.name} className="card-holo p-6 group">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: platform.color }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={platform.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{platform.name}</h3>
                      <span className="text-xs text-dim">Not connected</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-dim" />
                  </div>
                  <p className="text-sm text-muted mb-5">{platform.description}</p>
                  <button
                    className="btn btn-secondary w-full group-hover:border-glass-border-hover"
                    style={{
                      borderColor: `${platform.color}30`,
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Connect {platform.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ====== BENEFITS ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-emerald mb-4">Why Connect</div>
            <h2 className="text-headline mb-4">Benefits of Linking</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Connecting your accounts unlocks the full power of the PRISMAI ecosystem.
              Here&apos;s what you get.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 stagger">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="card p-8">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${benefit.accent}/10 flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-6 h-6 text-${benefit.accent}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-body">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECURITY ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-8 md:p-12 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="badge badge-emerald mb-4">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </div>
              <h2 className="text-headline mb-4">Your Data is Safe</h2>
            </div>

            <ul className="space-y-4">
              {[
                { title: "OAuth 2.0 Standard", desc: "We use industry-standard OAuth 2.0 with PKCE for all platforms. We never see or store your passwords." },
                { title: "AES-256-GCM Encryption", desc: "All tokens are encrypted at rest using AES-256-GCM with unique initialization vectors per encryption." },
                { title: "Auto-Refresh", desc: "Tokens refresh automatically 30 minutes before expiry. If a platform goes down, circuit breakers protect the flow." },
                { title: "Revoke Anytime", desc: "You can disconnect any platform at any time. We immediately delete all stored tokens for that connection." },
                { title: "No Third Parties", desc: "Your data stays between you and PRISMAI. We don't sell, share, or expose your information to anyone." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-emerald mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                    <p className="text-sm text-muted mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-16 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="powered-by-prismai mx-auto w-fit mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            OAuth Managed by PRISMAI
          </div>
          <p className="text-sm text-muted max-w-lg mx-auto">
            PRISMAI handles all OAuth flows, token management, encryption, and auto-refresh
            across 9 platforms. Your connections are secure, reliable, and always up to date.
          </p>
        </div>
      </section>
    </>
  );
}
