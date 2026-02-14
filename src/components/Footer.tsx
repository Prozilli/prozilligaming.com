import Link from "next/link";

const PLATFORMS = [
  { label: "Twitch", href: "https://twitch.tv/ProzilliGaming", color: "#9146ff" },
  { label: "YouTube", href: "https://youtube.com/@ProzilliGaming", color: "#ff0000" },
  { label: "Kick", href: "https://kick.com/ProzilliGaming", color: "#53fc18" },
  { label: "TikTok", href: "https://tiktok.com/@ProzilliGaming", color: "#ff0050" },
  { label: "X", href: "https://x.com/ProzilliGaming", color: "#ffffff" },
  { label: "Instagram", href: "https://instagram.com/ProzilliGaming", color: "#e4405f" },
  { label: "Facebook", href: "https://facebook.com/ProzilliGaming", color: "#1877f2" },
  { label: "Discord", href: "https://discord.gg/prozillihq", color: "#5865f2" },
  { label: "Trovo", href: "https://trovo.live/s/ProzilliGaming", color: "#19d65c" },
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
    { label: "VIP Store", href: "https://zo-syndicate.tebex.io" },
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
    <footer className="relative overflow-hidden">
      {/* Subtle gradient top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold-dim)] to-transparent opacity-40" />

      <div className="bg-[#050a12]">
        {/* Platform Social Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="flex flex-wrap justify-center gap-5">
            {PLATFORMS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:border-glass-border transition-all"
              >
                <span
                  className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-sm font-medium text-dim group-hover:text-foreground transition-colors">
                  {p.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>

        {/* Link Columns */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-brushed-gold text-xs font-bold uppercase tracking-widest mb-5">
                  {section}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left — Brand */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-extrabold tracking-tight">
                PROZILLI<span className="text-red">GAMING</span>
              </span>
              <span className="hidden sm:inline text-dim text-[10px]">|</span>
              <span className="text-dim text-[10px]">
                &copy; {new Date().getFullYear()} Prozilli Entertainment
              </span>
            </div>

            {/* Right — Badges + Admin */}
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
                className="text-[10px] text-dim hover:text-muted transition-colors"
              >
                prozilli.com
              </Link>
              <Link
                href="/admin"
                className="text-[10px] text-dim hover:text-muted transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
