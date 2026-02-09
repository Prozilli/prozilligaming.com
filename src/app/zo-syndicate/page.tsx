import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ZO Syndicate RP",
  description:
    "ZO Syndicate RP - Cinematic FiveM roleplay on Qbox framework. 48 players, 6 gangs, full economy, and immersive storylines. Join the Los Santos underground.",
  keywords: [
    "ZO Syndicate",
    "FiveM roleplay",
    "GTA RP server",
    "Qbox server",
    "cinematic roleplay",
    "FiveM server",
    "GTA V RP",
  ],
  openGraph: {
    title: "ZO Syndicate RP | Cinematic FiveM Roleplay",
    description:
      "Cinematic FiveM roleplay on Qbox. 48 players, 6 gangs, full economy. Where stories are born.",
    type: "website",
    url: "https://prozilligaming.com/zo-syndicate",
    images: [
      {
        url: "/images/heroes/hero-zo.png",
        width: 1200,
        height: 630,
        alt: "ZO Syndicate RP - Cinematic FiveM Roleplay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZO Syndicate RP | Cinematic FiveM Roleplay",
    description: "Join ZO Syndicate - cinematic FiveM roleplay with 6 gangs and full economy.",
    images: ["/images/heroes/hero-zo.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/zo-syndicate",
  },
};

const SERVER_INFO = {
  name: "ZO Syndicate RP",
  framework: "Qbox (QBX)",
  maxPlayers: 48,
  discord: "discord.gg/HjpsGpC4R6",
};

const GANGS = [
  { key: "lostmc", name: "The Lost MC", color: "#666666", icon: "🏍️" },
  { key: "ballas", name: "Ballas", color: "#9B30FF", icon: "💜" },
  { key: "vagos", name: "Vagos", color: "#FFD700", icon: "💛" },
  { key: "cartel", name: "Cartel", color: "#8B4513", icon: "🔥" },
  { key: "families", name: "Families", color: "#228B22", icon: "💚" },
  { key: "triads", name: "Triads", color: "#FF4500", icon: "🐉" },
];

const GANG_RANKS = ["Recruit", "Enforcer", "Shot Caller", "Boss"];

const JOBS = {
  tier1: {
    title: "Entry-Level",
    emoji: "🚛",
    subtitle: "$150 - $185",
    jobs: ["Trucker", "Taxi", "Bus", "Tow", "Garbage", "Hotdog", "Vineyard"],
  },
  tier2: {
    title: "Skilled Jobs",
    emoji: "💼",
    subtitle: "$175 - $400",
    jobs: ["Mechanic", "Car Dealer", "Real Estate", "Weazel News", "Lawyer"],
  },
};

const DEPARTMENTS = [
  {
    name: "LSPD",
    fullName: "Los Santos Police Dept.",
    color: "#3B82F6",
    ranks: ["Cadet", "Officer", "Sergeant", "Lieutenant", "Captain"],
    stations: ["Mission Row"],
  },
  {
    name: "BCSO",
    fullName: "Blaine County Sheriff",
    color: "#A16207",
    ranks: ["Cadet", "Deputy", "Sergeant", "Lieutenant", "Sheriff"],
    stations: ["Sandy Shores", "Paleto Bay"],
  },
  {
    name: "SASP",
    fullName: "San Andreas State Police",
    color: "#16A34A",
    ranks: ["Cadet", "Trooper", "Sergeant", "Lieutenant", "Colonel"],
    stations: ["Vespucci Beach"],
  },
  {
    name: "EMS",
    fullName: "Emergency Medical Services",
    color: "#DC2626",
    ranks: ["Trainee", "EMT", "Paramedic", "Doctor", "Chief"],
    stations: ["Pillbox Hospital"],
  },
  {
    name: "DOJ",
    fullName: "Department of Justice",
    color: "#7C3AED",
    ranks: ["Judge", "Chief Justice"],
    stations: ["Courthouse"],
  },
];

const KEY_SYSTEMS = [
  { category: "Communication", items: ["NPWD Phone", "PMA Voice", "mm_radio"] },
  { category: "Law Enforcement", items: ["ps-mdt", "ps-dispatch (911)"] },
  { category: "Economy", items: ["Renewed-Banking", "ox_inventory (50 slots, 85kg)"] },
  { category: "Criminal", items: ["md-drugs (5 types)", "DOJ-Casino (5 games)"] },
  { category: "Other", items: ["xt-prison", "illenium-appearance"] },
];

const FEATURES = [
  {
    title: "Narrative-Driven",
    description:
      "Long-form character arcs. Every action has consequences that ripple through evolving story arcs.",
  },
  {
    title: "Qbox Framework",
    description:
      "Built on Qbox with custom mechanics, modern phone interface, and progression designed for continuity.",
  },
  {
    title: "Full Economy",
    description:
      "Pacific Standard + 6 Fleeca + Paleto banking. Complete job system with fair progression.",
  },
  {
    title: "Serious RP",
    description:
      "Story-first gameplay. Every system exists to support believable, immersive roleplay.",
  },
  {
    title: "Creator Friendly",
    description:
      "Stream-friendly rules, cinematic tools, and collaborative storytelling for content creators.",
  },
  {
    title: "Active Staff",
    description:
      "Dedicated admin team ensuring fair play, resolving issues, and maintaining server quality.",
  },
];

export default function ZOSyndicatePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Fireflies */}
        <div className="fireflies">
          <span className="f1" />
          <span className="f2" />
          <span className="f3" />
          <span className="f4" />
          <span className="f5" />
          <span className="f6" />
        </div>
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-zo.webp")`,
            opacity: 0.4,
          }}
        />

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
            A narrative-driven FiveM world built on Qbox. {SERVER_INFO.maxPlayers} slots, {GANGS.length} gangs,
            5 departments, and a full economy. Your story starts here.
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

      {/* Server Stats */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="glass-strong rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-red">{SERVER_INFO.maxPlayers}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">Max Players</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-gold">Qbox</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">Framework</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{GANGS.length}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">Gangs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">Departments</p>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <p className="text-3xl font-bold text-green-400">LIVE</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">Status</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          The ZO Experience
        </h2>
        <p className="mb-12 text-center text-sm text-muted">
          Story-first roleplay. Consequence and continuity.
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

      {/* Gangs Section */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Street Factions
          </h2>
          <h3 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
            Choose Your Gang
          </h3>
          <p className="mx-auto mb-12 max-w-xl text-center text-sm text-muted">
            Six criminal organizations run the streets. Each gang has 4 ranks:
            <span className="block mt-2 text-brand-silver">
              {GANG_RANKS.join(" → ")}
            </span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GANGS.map((gang) => (
              <div
                key={gang.key}
                className="glass rounded-lg p-5 transition-all hover:scale-[1.02]"
                style={{ borderLeft: `4px solid ${gang.color}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{gang.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white">{gang.name}</h4>
                    <p className="text-xs text-muted">4 Rank Hierarchy</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Government Jobs
          </h2>
          <h3 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
            Law Enforcement & Services
          </h3>
          <p className="mx-auto mb-12 max-w-xl text-center text-sm text-muted">
            Whitelisted positions for serious roleplayers. Apply through Discord.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.name}
                className="glass rounded-lg p-5"
                style={{ borderTop: `3px solid ${dept.color}` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">{dept.name}</h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                  >
                    Whitelist
                  </span>
                </div>
                <p className="mb-3 text-xs text-muted">{dept.fullName}</p>
                <div className="mb-3">
                  <p className="mb-1 text-xs font-medium text-brand-silver">Ranks:</p>
                  <p className="text-xs text-muted">{dept.ranks.join(" → ")}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-brand-silver">Stations:</p>
                  <p className="text-xs text-muted">{dept.stations.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Civilian Jobs */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Civilian Careers
          </h2>
          <h3 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            Jobs & Economy
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tier 1 */}
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{JOBS.tier1.emoji}</span>
                <div>
                  <h4 className="font-semibold text-white">{JOBS.tier1.title}</h4>
                  <p className="text-xs text-brand-gold">{JOBS.tier1.subtitle} base pay</p>
                </div>
                <span className="ml-auto rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                  Open
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {JOBS.tier1.jobs.map((job) => (
                  <span
                    key={job}
                    className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-muted"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>

            {/* Tier 2 */}
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{JOBS.tier2.emoji}</span>
                <div>
                  <h4 className="font-semibold text-white">{JOBS.tier2.title}</h4>
                  <p className="text-xs text-brand-gold">{JOBS.tier2.subtitle} base pay</p>
                </div>
                <span className="ml-auto rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                  Apply
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {JOBS.tier2.jobs.map((job) => (
                  <span
                    key={job}
                    className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-muted"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Systems */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-navy">
            Server Tech
          </h2>
          <h3 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            Key Systems
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {KEY_SYSTEMS.map((system) => (
              <div
                key={system.category}
                className="glass rounded-lg p-4"
              >
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  {system.category}
                </h4>
                <ul className="space-y-1">
                  {system.items.map((item) => (
                    <li key={item} className="text-xs text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section
        className="relative border-t border-white/5"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(145, 0, 0, 0.15) 0%, transparent 70%), #050505",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to Join?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            ZO Syndicate is a whitelisted server. Apply through Discord to become
            part of our cinematic roleplay community.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
            {[
              { step: "1", title: "Join Discord", desc: "Enter our community server" },
              { step: "2", title: "Read Rules", desc: "Learn the server guidelines" },
              { step: "3", title: "Apply", desc: "Submit your whitelist app" },
              { step: "4", title: "Get Approved", desc: "Wait for staff review" },
            ].map((item) => (
              <div key={item.step} className="glass rounded-lg p-4 text-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-sm font-bold text-brand-red">
                  {item.step}
                </span>
                <h4 className="mt-2 text-sm font-semibold text-white">{item.title}</h4>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="https://discord.gg/HjpsGpC4R6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-brand-red px-10 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join ZO Syndicate Discord
          </a>
        </div>
      </section>
    </>
  );
}
