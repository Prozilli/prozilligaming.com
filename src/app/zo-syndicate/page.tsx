import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ZO Syndicate",
};

const FEATURES = [
  {
    title: "Cinematic Roleplay",
    description:
      "Every scene is a production. Custom scripts, camera work, and narrative arcs that rival short films.",
  },
  {
    title: "Custom Framework",
    description:
      "Built from the ground up with custom resources, mechanics, and systems designed for immersive RP.",
  },
  {
    title: "Whitelisted Community",
    description:
      "Application-only access ensures a serious, dedicated playerbase committed to quality roleplay.",
  },
  {
    title: "Active Staff Team",
    description:
      "Experienced admins and moderators maintaining a fair, drama-free environment around the clock.",
  },
  {
    title: "Regular Events",
    description:
      "Server-wide story arcs, faction wars, community events, and streamed showcases.",
  },
  {
    title: "Creator Friendly",
    description:
      "Built for content creators. Stream-friendly rules, cinematic tools, and collaborative storytelling.",
  },
];

export default function ZOSyndicatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        {/* Red/Navy gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, rgba(145, 0, 0, 0.35) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, rgba(0, 28, 63, 0.5) 0%, transparent 50%), #050505",
          }}
        />
        <div className="scanlines absolute inset-0" />
        <div className="relative z-10">
          <span className="animate-fade-in-up mb-6 inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-red">
            FiveM Roleplay Server
          </span>
          <h1 className="animate-fade-in-up animate-delay-100 text-glow-red text-5xl font-bold tracking-tight md:text-7xl">
            ZO <span className="text-brand-red">SYNDICATE</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mt-4 text-lg tracking-[0.15em] uppercase text-brand-silver">
            Cinematic Roleplay
          </p>
          <p className="animate-fade-in-up animate-delay-300 mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Where every scene is a production. ZO Syndicate is a whitelisted FiveM roleplay server built for immersive, story-driven experiences with cinema-grade quality.
          </p>
          <div className="animate-fade-in-up animate-delay-400 mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/HjpsGpC4R6"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-brand-red px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
            >
              Join the Discord
            </a>
            <Link
              href="/watch"
              className="rounded-sm border border-brand-navy bg-brand-navy/30 px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-navy/50"
            >
              Watch RP Streams
            </Link>
          </div>
        </div>
      </section>

      {/* Server Status */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="glass-strong rounded-lg p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
                  Server Status
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Real-time status coming soon via PRISMAI integration.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-brand-gold" />
                <span className="text-sm font-medium text-brand-gold">
                  Status: Pending
                </span>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-md bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-white">--</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  Players Online
                </p>
              </div>
              <div className="rounded-md bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-white">--</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  Max Players
                </p>
              </div>
              <div className="rounded-md bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-white">--</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  Uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          What Sets Us Apart
        </h2>
        <p className="mb-12 text-center text-sm text-muted">
          Not just another RP server. A cinematic experience.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="glass glow-border rounded-lg p-6 transition-all"
            >
              <h3 className="font-semibold tracking-wide text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Whitelist Application */}
      <section
        className="relative border-t border-white/5"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 28, 63, 0.3) 0%, transparent 70%), #050505",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Apply for Whitelist
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            ZO Syndicate is a whitelisted server. To apply, join our Discord and submit an application through the designated channel. We review every application to maintain the quality and integrity of our roleplay community.
          </p>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>
              <span className="font-medium text-brand-silver">Step 1:</span>{" "}
              Join the ZO Syndicate Discord server.
            </p>
            <p>
              <span className="font-medium text-brand-silver">Step 2:</span>{" "}
              Read the rules and server lore.
            </p>
            <p>
              <span className="font-medium text-brand-silver">Step 3:</span>{" "}
              Submit your whitelist application.
            </p>
            <p>
              <span className="font-medium text-brand-silver">Step 4:</span>{" "}
              Wait for review and approval by our team.
            </p>
          </div>
          <a
            href="https://discord.gg/HjpsGpC4R6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-brand-red px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
          >
            Join ZO Syndicate Discord
          </a>
        </div>
      </section>
    </>
  );
}
