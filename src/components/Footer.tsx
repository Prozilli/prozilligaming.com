import Link from "next/link";

const PLATFORMS = [
  { name: "YouTube", href: "https://youtube.com/@prozilligaming" },
  { name: "Twitch", href: "https://twitch.tv/ProzilliGaming" },
  { name: "Kick", href: "https://kick.com/ProzilliGaming" },
  { name: "Trovo", href: "https://trovo.live/ProzilliGaming" },
  { name: "Facebook", href: "https://facebook.com/ProzilliGaming" },
  { name: "TikTok", href: "https://tiktok.com/@ProzilliGaming" },
  { name: "Instagram", href: "https://instagram.com/ProzilliGaming" },
  { name: "X", href: "https://x.com/ProzilliGaming" },
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
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "https://prozilli.com", label: "Prozilli Inc." },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-darker">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold tracking-wider text-white">
              PROZILLI<span className="text-brand-red">GAMING</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Live. Create. Dominate.
            </p>

            {/* Platform links */}
            <div className="mt-6 flex flex-wrap gap-3">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted transition-colors hover:text-white"
                  title={p.name}
                >
                  {p.name}
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted">
              A division of Prozilli Entertainment.
              <br />
              Prozilli Inc. &copy; {new Date().getFullYear()}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-silver">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
