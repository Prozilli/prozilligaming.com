import Link from "next/link";

const PLATFORMS = [
  { label: "Twitch", href: "https://twitch.tv/ProzilliGaming", icon: "twitch" },
  { label: "YouTube", href: "https://youtube.com/@ProzilliGaming", icon: "youtube" },
  { label: "Kick", href: "https://kick.com/ProzilliGaming", icon: "kick" },
  { label: "TikTok", href: "https://tiktok.com/@ProzilliGaming", icon: "tiktok" },
  { label: "X", href: "https://x.com/ProzilliGaming", icon: "x" },
  { label: "Instagram", href: "https://instagram.com/ProzilliGaming", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/ProzilliGaming", icon: "facebook" },
  { label: "Discord", href: "https://discord.gg/prozillihq", icon: "discord" },
  { label: "Trovo", href: "https://trovo.live/s/ProzilliGaming", icon: "trovo" },
];

const FOOTER_LINKS = {
  Watch: [
    { label: "Live Stream", href: "/watch" },
    { label: "Schedule", href: "/schedule" },
    { label: "Clips & VODs", href: "/watch#clips" },
    { label: "Blog", href: "/blog" },
    { label: "News", href: "/news" },
  ],
  Explore: [
    { label: "LISA AI", href: "/lisa" },
    { label: "ZO Syndicate RP", href: "/zo-syndicate" },
    { label: "Community", href: "/community" },
    { label: "Giveaways", href: "/giveaways" },
    { label: "Support / Tips", href: "/support" },
  ],
  Shop: [
    { label: "Merch Store", href: "/shop" },
    { label: "VIP Tiers", href: "/support#vip" },
    { label: "Connect Accounts", href: "/connect" },
    { label: "Link Platforms", href: "/link" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "DMCA Policy", href: "/dmca" },
    { label: "Acceptable Use", href: "/acceptable-use" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-base/50">
      {/* Platform Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {PLATFORMS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-foreground transition-colors text-sm font-medium"
              aria-label={p.label}
            >
              {p.label}
            </a>
          ))}
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-label text-dim mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight">
              PROZILLI<span className="text-red">GAMING</span>
            </span>
            <span className="text-dim text-xs">
              &copy; {new Date().getFullYear()} Prozilli Entertainment. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="powered-by-prismai">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Powered by PRISMAI
            </span>
            <Link
              href="https://prozilli.com"
              className="text-xs text-dim hover:text-muted transition-colors"
            >
              prozilli.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
