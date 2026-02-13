import type { Metadata } from "next";
import ScheduleGrid from "@/components/ScheduleGrid";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionLabel from "@/components/ui/SectionLabel";
import PlatformBadge from "@/components/ui/PlatformBadge";

export const metadata: Metadata = {
  title: "Stream Schedule | Prozilli Gaming",
  description:
    "Catch Prozilli Gaming live on Twitch, YouTube, Kick, and more. Check the weekly stream schedule for gaming sessions, creative streams, and special events. All times in EST.",
  keywords: ["Prozilli Gaming", "stream schedule", "Twitch schedule", "live stream times", "gaming schedule"],
  openGraph: {
    title: "Stream Schedule | Prozilli Gaming",
    description: "Weekly streaming schedule for Prozilli Gaming across all platforms.",
    type: "website",
    url: "https://prozilligaming.com/schedule",
    images: [{ url: "/images/heroes/hero-schedule.png", width: 1200, height: 630, alt: "Prozilli Gaming Stream Schedule" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream Schedule | Prozilli Gaming",
    description: "Weekly streaming schedule for Prozilli Gaming across all platforms.",
    images: ["/images/heroes/hero-schedule.png"],
  },
  alternates: { canonical: "https://prozilligaming.com/schedule" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Prozilli Gaming Stream Schedule",
  description: "Weekly streaming schedule for Prozilli Gaming on Twitch, YouTube, Kick, and more.",
  url: "https://prozilligaming.com/schedule",
  publisher: {
    "@type": "Organization",
    name: "Prozilli Gaming",
    url: "https://prozilligaming.com",
  },
};

const STREAM_PLATFORMS = ["Twitch", "YouTube", "Kick", "Trovo", "Facebook"];

export default function SchedulePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label="Multiplatform"
        labelColor="gold"
        title="STREAM SCHEDULE"
        subtitle="Live on Twitch, YouTube, Kick, Trovo, and Facebook. Catch every broadcast."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {STREAM_PLATFORMS.map((p) => (
            <PlatformBadge key={p} name={p} connected />
          ))}
        </div>
      </PageHero>

      {/* Schedule Grid */}
      <ScheduleGrid />

      {/* Timezone & Calendar */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="panel p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Never Miss a Stream</h3>
              <p className="text-body mt-1">All times shown in Eastern Time (ET). Schedule updates automatically from Twitch.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="https://twitch.tv/ProzilliGaming" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#9146FF] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">
                Follow on Twitch
              </a>
              <a href="https://discord.gg/prozillihq" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <SectionLabel color="gold">Frequently Asked Questions</SectionLabel>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { q: "When does Prozilli stream?", a: "Gaming streams are Monday, Wednesday, and Friday at 7 PM ET. Creative and Just Chatting streams are Tuesday and Thursday at 8 PM ET. Special events happen Saturday at 3 PM ET." },
              { q: "What platforms can I watch on?", a: "Prozilli Gaming streams simultaneously on Twitch, YouTube, Kick, Trovo, and Facebook Gaming. Pick your preferred platform." },
              { q: "How do I get notified?", a: "Follow on Twitch for go-live notifications, or join the Discord server for announcements and schedule changes." },
              { q: "What games does Prozilli play?", a: "Competitive multiplayer games, story-driven single-player, and community favorites. Check the schedule for specific game announcements." },
            ].map((faq) => (
              <div key={faq.q} className="panel p-6">
                <h3 className="text-sm font-semibold text-foreground">{faq.q}</h3>
                <p className="text-body mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
          <h2 className="text-headline text-foreground">Ready to Watch?</h2>
          <p className="text-body mt-3 max-w-md text-base">Head to the Watch page to catch the current stream or browse past VODs.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/watch" className="btn-primary">Watch Now</Link>
            <Link href="/support" className="btn-secondary">Support the Stream</Link>
          </div>
        </div>
      </section>
    </>
  );
}
