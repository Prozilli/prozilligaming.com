import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/ui/PageHero";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prozilli Gaming. Find us on YouTube, Twitch, Kick, Discord, and more. Business inquiries, collaborations, and community support.",
  keywords: ["contact Prozilli Gaming", "Prozilli social media", "Prozilli Discord", "gaming collaboration", "streamer contact"],
  openGraph: {
    title: "Contact | Prozilli Gaming",
    description: "Connect with Prozilli Gaming across all platforms. Join the community on Discord.",
    type: "website",
    url: "https://prozilligaming.com/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact | Prozilli Gaming",
    description: "Connect with Prozilli Gaming across all platforms.",
  },
  alternates: { canonical: "https://prozilligaming.com/contact" },
};

const SOCIAL_PLATFORMS = [
  { name: "YouTube", href: "https://youtube.com/@ProzilliGaming", handle: "@ProzilliGaming" },
  { name: "Twitch", href: "https://twitch.tv/ProzilliGaming", handle: "ProzilliGaming" },
  { name: "Kick", href: "https://kick.com/ProzilliGaming", handle: "ProzilliGaming" },
  { name: "Trovo", href: "https://trovo.live/ProzilliGaming", handle: "ProzilliGaming" },
  { name: "Facebook", href: "https://facebook.com/ProzilliGaming", handle: "ProzilliGaming" },
  { name: "TikTok", href: "https://tiktok.com/@ProzilliGaming", handle: "@ProzilliGaming" },
  { name: "Instagram", href: "https://instagram.com/ProzilliGaming", handle: "@ProzilliGaming" },
  { name: "X", href: "https://x.com/ProzilliGaming", handle: "@ProzilliGaming" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Connect"
        title="GET IN TOUCH"
        subtitle="Community, business, or just to say what's up. Here's how to reach us."
        accent="red"
      />

      {/* Main Contact */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            {/* Discord */}
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="panel-interactive p-8"
            >
              <h2 className="text-xl font-bold text-foreground">Discord Community</h2>
              <p className="text-body mt-3 text-base">
                The home base. Join the community, get stream notifications, participate in events, and connect with other viewers.
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-gold transition-colors hover:text-foreground">
                discord.gg/prozillihq &rarr;
              </span>
            </a>

            {/* Email */}
            <div className="panel p-8">
              <h2 className="text-xl font-bold text-foreground">Direct Email</h2>
              <p className="text-body mt-3 text-base">
                For sponsorships, collaborations, partnerships, and professional inquiries.
              </p>
              <a
                href="mailto:business@prozilli.com"
                className="mt-6 inline-block text-sm font-medium text-gold transition-colors hover:text-foreground"
              >
                business@prozilli.com &rarr;
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Social Platforms */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <SectionLabel color="red">Everywhere You Are</SectionLabel>
            <p className="text-body mt-2">Follow Prozilli Gaming across every platform.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIAL_PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-interactive p-5 text-center"
                aria-label={`Follow on ${p.name}`}
              >
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-xs text-dim">{p.handle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-body text-base">
          Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc. For corporate inquiries, visit{" "}
          <a href="https://prozilli.com" target="_blank" rel="noopener noreferrer" className="text-gold transition-colors hover:text-foreground">
            prozilli.com
          </a>.
        </p>
      </section>
    </>
  );
}
