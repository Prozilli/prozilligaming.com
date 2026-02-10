import type { Metadata } from "next";
import ScheduleGrid from "@/components/ScheduleGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stream Schedule | Prozilli Gaming",
  description:
    "Catch Prozilli Gaming live on Twitch, YouTube, Kick, and more. Check the weekly stream schedule for gaming sessions, creative streams, and special events. All times in EST.",
  keywords: [
    "Prozilli Gaming",
    "stream schedule",
    "Twitch schedule",
    "live stream times",
    "gaming schedule",
    "when does Prozilli stream",
  ],
  openGraph: {
    title: "Stream Schedule | Prozilli Gaming",
    description:
      "Weekly streaming schedule for Prozilli Gaming. Gaming, creative streams, and special events across all platforms.",
    type: "website",
    url: "https://prozilligaming.com/schedule",
    images: [
      {
        url: "/images/heroes/hero-schedule.png",
        width: 1200,
        height: 630,
        alt: "Prozilli Gaming Stream Schedule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream Schedule | Prozilli Gaming",
    description: "Weekly streaming schedule for Prozilli Gaming across all platforms.",
    images: ["/images/heroes/hero-schedule.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/schedule",
  },
};

// JSON-LD structured data for the schedule page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Prozilli Gaming Stream Schedule",
  description:
    "Weekly streaming schedule for Prozilli Gaming on Twitch, YouTube, Kick, and more.",
  url: "https://prozilligaming.com/schedule",
  mainEntity: {
    "@type": "Schedule",
    name: "Prozilli Gaming Weekly Stream Schedule",
    scheduleTimezone: "America/New_York",
    eventSchedule: [
      {
        "@type": "ScheduleAction",
        scheduledTime: "19:00:00",
        byDay: ["Monday", "Wednesday", "Friday"],
        description: "Gaming streams - Competitive and story-driven gameplay",
      },
      {
        "@type": "ScheduleAction",
        scheduledTime: "20:00:00",
        byDay: ["Tuesday", "Thursday"],
        description: "Creative / Just Chatting - Behind the scenes and community vibes",
      },
      {
        "@type": "ScheduleAction",
        scheduledTime: "15:00:00",
        byDay: ["Saturday"],
        description: "Special Events - Collabs, tournaments, and premieres",
      },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "Prozilli Gaming",
    url: "https://prozilligaming.com",
    logo: {
      "@type": "ImageObject",
      url: "https://prozilligaming.com/logos/ProzilliGaming_Logo.svg",
    },
  },
};

export default function SchedulePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
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
            backgroundImage: `url("/images/heroes/hero-schedule.webp")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1.5 sm:px-4 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
            Multiplatform
          </span>
          <h1 className="animate-fade-in-up text-glow-red text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            STREAM <span className="text-brand-red">SCHEDULE</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted">
            Live on Twitch, YouTube, Kick, Trovo, and Facebook. Catch every broadcast.
          </p>

          {/* Platform badges */}
          <div className="animate-fade-in-up animate-delay-200 mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
            {[
              { name: "Twitch", color: "#9146FF" },
              { name: "YouTube", color: "#FF0000" },
              { name: "Kick", color: "#53FC18" },
              { name: "Trovo", color: "#19D66B" },
              { name: "Facebook", color: "#1877F2" },
            ].map((platform) => (
              <span
                key={platform.name}
                className="rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium"
                style={{
                  backgroundColor: `${platform.color}20`,
                  color: platform.color,
                }}
              >
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Live Schedule Grid (Client Component) */}
      <ScheduleGrid />

      {/* Timezone & Calendar Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="rounded-xl border border-white/5 bg-brand-darker p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Never Miss a Stream</h3>
              <p className="mt-1 text-xs text-muted">
                All times shown in Eastern Time (ET). Schedule updates automatically from Twitch.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://twitch.tv/ProzilliGaming"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#9146FF] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
                Follow on Twitch
              </a>
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-white">When does Prozilli stream?</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Gaming streams are Monday, Wednesday, and Friday at 7 PM ET. Creative and Just Chatting streams are Tuesday and Thursday at 8 PM ET. Special events happen Saturday at 3 PM ET.
              </p>
            </div>
            <div className="glass rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-white">What platforms can I watch on?</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Prozilli Gaming streams simultaneously on Twitch, YouTube, Kick, Trovo, and Facebook Gaming. Pick your preferred platform — same content everywhere.
              </p>
            </div>
            <div className="glass rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-white">How do I get notified?</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Follow on Twitch for go-live notifications, or join the Discord server for announcements, schedule changes, and community updates.
              </p>
            </div>
            <div className="glass rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-white">What games does Prozilli play?</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                The stream features competitive multiplayer games, story-driven single-player experiences, and community favorites. Check the schedule for specific game announcements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">
            Ready to Watch?
          </h2>
          <p className="mt-3 max-w-md text-xs sm:text-sm text-muted">
            Head to the Watch page to catch the current stream or browse past VODs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/watch"
              className="rounded-sm bg-brand-red px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
            >
              Watch Now
            </Link>
            <Link
              href="/support"
              className="rounded-sm border border-brand-gold/30 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium tracking-wide text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              Support the Stream
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
