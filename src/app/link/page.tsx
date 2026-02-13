import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All Prozilli Gaming links in one place. Twitch, YouTube, Kick, TikTok, X, Instagram, Facebook, Discord, Trovo, merch, tips, and more.",
};

const PLATFORM_LINKS = [
  {
    name: "Twitch",
    handle: "ProzilliGaming",
    href: "https://twitch.tv/prozilligaming",
    color: "#9146ff",
    icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z",
  },
  {
    name: "YouTube",
    handle: "@ProzilliGaming",
    href: "https://youtube.com/@prozilligaming",
    color: "#ff0000",
    icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Kick",
    handle: "ProzilliGaming",
    href: "https://kick.com/prozilligaming",
    color: "#53fc18",
    icon: "M4 2h6l4 7-4 7H4l4-7-4-7zm10 0h6l-4 7 4 7h-6l-4-7 4-7z",
  },
  {
    name: "TikTok",
    handle: "@ProzilliGaming",
    href: "https://tiktok.com/@prozilligaming",
    color: "#ff0050",
    icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "X / Twitter",
    handle: "@ProzilliGaming",
    href: "https://x.com/ProzilliGaming",
    color: "#ffffff",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    handle: "@ProzilliGaming",
    href: "https://instagram.com/prozilligaming",
    color: "#e4405f",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "Facebook",
    handle: "Prozilli Gaming",
    href: "https://facebook.com/ProzilliGaming",
    color: "#1877f2",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Discord",
    handle: "Prozilli HQ",
    href: "https://discord.gg/prozillihq",
    color: "#5865f2",
    icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  },
  {
    name: "Trovo",
    handle: "ProzilliGaming",
    href: "https://trovo.live/s/ProzilliGaming",
    color: "#19d65c",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
];

const EXTRA_LINKS = [
  {
    name: "Merch Store",
    description: "Official Prozilli merchandise",
    href: "https://prozilli-shop.fourthwall.com",
    color: "#dc2626",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    stroke: true,
  },
  {
    name: "ZO Syndicate RP",
    description: "FiveM roleplay community",
    href: "https://discord.gg/tF698jBb3k",
    color: "#c4a265",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    stroke: true,
  },
  {
    name: "Support / Tips",
    description: "Help fuel the ecosystem",
    href: "https://streamelements.com/prozilligaming/tip",
    color: "#f59e0b",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    stroke: true,
  },
  {
    name: "Prozilli.com",
    description: "Corporate & brand site",
    href: "https://prozilli.com",
    color: "#38bdf8",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    stroke: true,
  },
];

export default function LinkPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[50vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red/20 to-gold/20 border border-glass-border flex items-center justify-center animate-reveal">
            <span className="text-2xl font-extrabold text-shimmer-red">P</span>
          </div>
          <h1 className="text-headline mb-3 animate-reveal" style={{ animationDelay: "0.1s" }}>
            Prozilli Gaming
          </h1>
          <p
            className="text-body-lg mb-2 animate-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            Multi-platform streamer, content creator, and game developer.
          </p>
          <p
            className="text-sm text-dim animate-reveal"
            style={{ animationDelay: "0.25s" }}
          >
            9 Platforms &bull; AI Co-Host &bull; FiveM Roleplay
          </p>
        </div>
      </section>

      {/* ====== PLATFORM LINKS ====== */}
      <section className="py-12 bg-base">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="space-y-3 stagger">
            {PLATFORM_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex items-center gap-4 group block"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${link.color}15` }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: link.color }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={link.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm group-hover:text-white transition-colors">
                    {link.name}
                  </div>
                  <div className="text-xs text-dim truncate">{link.handle}</div>
                </div>
                <svg className="w-4 h-4 text-dim group-hover:text-foreground transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DIVIDER ====== */}
      <div className="divider mx-auto max-w-xl" />

      {/* ====== EXTRA LINKS ====== */}
      <section className="py-12 bg-base">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="space-y-3 stagger">
            {EXTRA_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex items-center gap-4 group block"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${link.color}15` }}
                >
                  {link.stroke ? (
                    <svg
                      className="w-5 h-5"
                      style={{ color: link.color }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      style={{ color: link.color }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={link.icon} />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm group-hover:text-white transition-colors">
                    {link.name}
                  </div>
                  <div className="text-xs text-dim truncate">{link.description}</div>
                </div>
                <svg className="w-4 h-4 text-dim group-hover:text-foreground transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FOOTER BADGE ====== */}
      <section className="py-12 bg-base">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="powered-by-prismai mx-auto w-fit mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Powered by PRISMAI
          </div>
          <p className="text-xs text-dim">
            prozilligaming.com
          </p>
        </div>
      </section>
    </>
  );
}
