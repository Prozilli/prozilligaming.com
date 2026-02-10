import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prozilli Gaming. Find us on YouTube, Twitch, Kick, Discord, and more. Business inquiries, collaborations, and community support.",
  keywords: [
    "contact Prozilli Gaming",
    "Prozilli social media",
    "Prozilli Discord",
    "gaming collaboration",
    "streamer contact",
  ],
  openGraph: {
    title: "Contact | Prozilli Gaming",
    description:
      "Connect with Prozilli Gaming across all platforms. Join the community on Discord.",
    type: "website",
    url: "https://prozilligaming.com/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact | Prozilli Gaming",
    description: "Connect with Prozilli Gaming across all platforms.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/contact",
  },
};

const SOCIAL_PLATFORMS = [
  {
    name: "YouTube",
    href: "https://youtube.com/@ProzilliGaming",
    handle: "@ProzilliGaming",
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/ProzilliGaming",
    handle: "ProzilliGaming",
  },
  {
    name: "Kick",
    href: "https://kick.com/ProzilliGaming",
    handle: "ProzilliGaming",
  },
  {
    name: "Trovo",
    href: "https://trovo.live/ProzilliGaming",
    handle: "ProzilliGaming",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/ProzilliGaming",
    handle: "ProzilliGaming",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@ProzilliGaming",
    handle: "@ProzilliGaming",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ProzilliGaming",
    handle: "@ProzilliGaming",
  },
  {
    name: "X",
    href: "https://x.com/ProzilliGaming",
    handle: "@ProzilliGaming",
  },
];

export default function ContactPage() {
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
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-contact.webp")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            GET IN <span className="text-brand-red">TOUCH</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Community, business, or just to say what&apos;s up. Here&apos;s how to reach us.
          </p>
        </div>
      </section>

      {/* Main Contact */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column: Quick Links */}
          <div className="flex flex-col gap-6">
            {/* Discord */}
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glow-border group rounded-lg p-8 transition-all"
            >
              <h2 className="text-xl font-bold tracking-wide text-white transition-colors group-hover:text-brand-red">
                Discord Community
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The home base. Join the community, get stream notifications, participate in events, and connect with other viewers.
              </p>
              <span className="mt-6 inline-block text-sm font-medium tracking-wide text-brand-gold transition-colors group-hover:text-white">
                discord.gg/prozillihq &rarr;
              </span>
            </a>

            {/* Direct Email */}
            <div className="glass glow-border rounded-lg p-8">
              <h2 className="text-xl font-bold tracking-wide text-white">
                Direct Email
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                For sponsorships, collaborations, partnerships, and professional inquiries.
              </p>
              <a
                href="mailto:business@prozilli.com"
                className="mt-6 inline-block text-sm font-medium tracking-wide text-brand-gold transition-colors hover:text-white"
              >
                business@prozilli.com &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* Social Platforms */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Everywhere You Are
          </h2>
          <p className="mb-10 text-center text-sm text-muted">
            Follow Prozilli Gaming across every platform.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIAL_PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glow-border group rounded-lg p-5 text-center transition-all"
                aria-label={`Follow us on ${platform.name}`}
              >
                <h3 className="font-semibold tracking-wide text-white transition-colors group-hover:text-brand-red">
                  {platform.name}
                </h3>
                <p className="mt-1 text-xs text-brand-silver">
                  {platform.handle}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-sm leading-relaxed text-muted">
          Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc. For corporate inquiries, visit{" "}
          <a
            href="https://prozilli.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold transition-colors hover:text-white"
          >
            prozilli.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
