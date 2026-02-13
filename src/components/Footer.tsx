import Link from "next/link";

const PLATFORMS = [
  { name: "Twitch", href: "https://twitch.tv/ProzilliGaming" },
  { name: "YouTube", href: "https://youtube.com/@prozilligaming" },
  { name: "Kick", href: "https://kick.com/ProzilliGaming" },
  { name: "Facebook", href: "https://facebook.com/ProzilliGaming" },
  { name: "TikTok", href: "https://tiktok.com/@ProzilliGaming" },
  { name: "Instagram", href: "https://instagram.com/ProzilliGaming" },
  { name: "X", href: "https://x.com/ProzilliGaming" },
  { name: "Trovo", href: "https://trovo.live/ProzilliGaming" },
  { name: "Discord", href: "https://discord.gg/prozillihq" },
];

const FOOTER_LINKS = [
  {
    title: "Watch",
    links: [
      { href: "/watch", label: "Live Stream" },
      { href: "/schedule", label: "Schedule" },
      { href: "/news", label: "News" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/zo-syndicate", label: "ZO Syndicate" },
      { href: "/lisa", label: "LISA" },
      { href: "/community", label: "Community" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/shop", label: "Merch" },
      { href: "/support", label: "Donate" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "https://prozilli.com", label: "Prozilli Inc." },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-base">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div>
            <span className="text-lg font-bold tracking-wider text-foreground">
              PROZILLI<span className="text-red">GAMING</span>
            </span>
            <p className="text-body mt-3">Live. Create. Dominate.</p>

            {/* Platform links */}
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-dim transition-colors hover:text-foreground"
                  aria-label={`Follow on ${p.name}`}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-label mb-4 text-muted">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-dim transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <p className="text-xs text-dim">
            Prozilli Inc. &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="text-data text-xs text-dim">
            Powered by PRISMAI
          </p>
        </div>
      </div>
    </footer>
  );
}
