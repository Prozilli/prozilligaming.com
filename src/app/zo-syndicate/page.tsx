import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCounter from "@/components/ui/StatCounter";

export const metadata: Metadata = {
  title: "ZO Syndicate RP",
  description:
    "ZO Syndicate RP - Cinematic FiveM roleplay on Qbox framework. 48 players, 10 gangs, full economy, and immersive storylines. Join the Los Santos underground.",
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
      "Cinematic FiveM roleplay on Qbox. 48 players, 10 gangs, full economy. Where stories are born.",
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
    description: "Join ZO Syndicate - cinematic FiveM roleplay with 10 gangs and full economy.",
    images: ["/images/heroes/hero-zo.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/zo-syndicate",
  },
};

const GANGS = [
  { name: "Syndicate", color: "#a30000", ranks: ["Associate", "Lieutenant", "Underboss", "Boss"] },
  { name: "Cartel", color: "#8B4513", ranks: ["Soldado", "Sicario", "Capo", "Jefe"] },
  { name: "The Lost MC", color: "#666666", ranks: ["Prospect", "Patched", "Sgt-at-Arms", "President"] },
  { name: "Ballas", color: "#9B30FF", ranks: ["Youngster", "Soldier", "Shot Caller", "OG"] },
  { name: "Vagos", color: "#FFD700", ranks: ["Youngster", "Soldier", "Shot Caller", "OG"] },
  { name: "Aztecas", color: "#00CED1", ranks: ["Youngster", "Soldier", "Shot Caller", "OG"] },
  { name: "Triads", color: "#FF4500", ranks: ["49er", "Red Pole", "Vanguard", "Dragon Head"] },
  { name: "Cosa Nostra", color: "#2F4F4F", ranks: ["Associate", "Soldier", "Caporegime", "Don"] },
  { name: "Yakuza", color: "#DC143C", ranks: ["Kobun", "Shatei", "Wakagashira", "Oyabun"] },
  { name: "Bratva", color: "#4169E1", ranks: ["Shestyorka", "Bratok", "Avtoritet", "Pakhan"] },
];

const DEPARTMENTS = [
  { name: "LSPD", fullName: "Los Santos Police Dept.", color: "#3B82F6", ranks: ["Cadet", "Officer", "Sergeant", "Lieutenant", "Captain"] },
  { name: "BCSO", fullName: "Blaine County Sheriff", color: "#A16207", ranks: ["Cadet", "Deputy", "Sergeant", "Lieutenant", "Sheriff"] },
  { name: "SASP", fullName: "San Andreas State Police", color: "#16A34A", ranks: ["Cadet", "Trooper", "Sergeant", "Lieutenant", "Colonel"] },
  { name: "EMS", fullName: "Emergency Medical Services", color: "#DC2626", ranks: ["Trainee", "EMT", "Paramedic", "Doctor", "Chief"] },
  { name: "DOJ", fullName: "Department of Justice", color: "#7C3AED", ranks: ["Judge", "Chief Justice"] },
];

const FEATURES = [
  { title: "Narrative-Driven", description: "Long-form character arcs. Every action has consequences that ripple through evolving storylines." },
  { title: "Qbox Framework", description: "Modern framework with custom mechanics, phone interface, and progression designed for continuity." },
  { title: "Full Economy", description: "Banking system, job market, businesses, property, and criminal enterprise. Real economic mobility." },
  { title: "Serious RP", description: "Story-first gameplay. Every system supports believable, immersive roleplay." },
  { title: "Creator Friendly", description: "Stream-friendly rules, cinematic tools, and collaborative storytelling for content creators." },
  { title: "Active Staff", description: "Dedicated admin team ensuring fair play, resolving issues, and maintaining server quality." },
];

export default function ZOSyndicatePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(145,0,0,0.2) 0%, transparent 60%), var(--color-base)",
        }}
      >
        <div className="relative z-10">
          <SectionLabel color="red">FiveM Roleplay Server</SectionLabel>
          <h1 className="text-display mt-6 text-foreground">
            ZO <span className="text-red">SYNDICATE</span>
          </h1>
          <p className="text-data mt-4 text-lg uppercase tracking-[0.15em] text-muted">
            Cinematic Roleplay
          </p>
          <p className="text-body mx-auto mt-6 max-w-xl text-base">
            A narrative-driven FiveM world built on Qbox. 48 slots, 10 gangs,
            5 departments, and a full economy. Your story starts here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/HjpsGpC4R6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join the Discord
            </a>
            <Link href="/watch" className="btn-secondary">
              Watch RP Streams
            </Link>
          </div>
        </div>
      </section>

      {/* Server Stats */}
      <section className="border-y border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter value={48} label="Max Players" />
            <StatCounter value={10} label="Gangs" />
            <StatCounter value={5} label="Departments" />
            <StatCounter value={17} label="Custom Resources" suffix="+" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <SectionLabel color="red">The ZO Experience</SectionLabel>
          <p className="text-body mt-3">Story-first roleplay. Consequence and continuity.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="panel p-6">
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-body mt-3">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gangs */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <SectionLabel color="red">Street Factions</SectionLabel>
            <h2 className="text-headline mt-3 text-foreground">Choose Your Gang</h2>
            <p className="text-body mx-auto mt-3 max-w-xl text-base">
              Ten criminal organizations run the streets. Each with a unique 4-rank hierarchy and dedicated radio channel.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {GANGS.map((gang) => (
              <div
                key={gang.name}
                className="panel p-5"
                style={{ borderLeft: `3px solid ${gang.color}` }}
              >
                <h4 className="font-semibold text-foreground">{gang.name}</h4>
                <div className="mt-3 flex flex-wrap gap-1">
                  {gang.ranks.map((rank) => (
                    <span key={rank} className="rounded-full bg-raised px-2 py-0.5 text-[10px] text-muted">
                      {rank}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <SectionLabel color="gold">Government Jobs</SectionLabel>
            <h2 className="text-headline mt-3 text-foreground">Law Enforcement & Services</h2>
            <p className="text-body mx-auto mt-3 max-w-xl text-base">
              Whitelisted positions for serious roleplayers. Apply through Discord.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.name}
                className="panel p-5"
                style={{ borderTop: `3px solid ${dept.color}` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-foreground">{dept.name}</h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                  >
                    Whitelist
                  </span>
                </div>
                <p className="text-xs text-muted">{dept.fullName}</p>
                <div className="mt-3">
                  <p className="text-label mb-1 text-dim">Ranks</p>
                  <p className="text-xs text-muted">{dept.ranks.join(" → ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy Tiers */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <SectionLabel color="gold">Economy</SectionLabel>
            <h2 className="text-headline mt-3 text-foreground">Multiple Paths to Prosperity</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="panel p-6">
              <h4 className="font-semibold text-foreground">Entry-Level Jobs</h4>
              <p className="text-data mt-1 text-xs text-gold">$150 — $185 / paycheck</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Trucker", "Taxi", "Bus", "Tow", "Garbage", "Hotdog", "Vineyard"].map((j) => (
                  <span key={j} className="rounded bg-raised px-2.5 py-1 text-xs text-muted">{j}</span>
                ))}
              </div>
            </div>
            <div className="panel p-6">
              <h4 className="font-semibold text-foreground">Skilled Careers</h4>
              <p className="text-data mt-1 text-xs text-gold">$175 — $400 / paycheck</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Mechanic", "Car Dealer", "Real Estate", "Weazel News", "Lawyer"].map((j) => (
                  <span key={j} className="rounded bg-raised px-2.5 py-1 text-xs text-muted">{j}</span>
                ))}
              </div>
            </div>
            <div className="panel p-6">
              <h4 className="font-semibold text-foreground">Criminal Enterprise</h4>
              <p className="text-data mt-1 text-xs text-red">$300 — $15,000+ / day</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Drug Dealing", "Territories", "Businesses", "Casino", "Heists"].map((j) => (
                  <span key={j} className="rounded bg-raised px-2.5 py-1 text-xs text-muted">{j}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section
        className="border-t border-[var(--color-border)]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(145,0,0,0.1) 0%, transparent 70%), var(--color-base)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-headline text-foreground">Ready to Join?</h2>
          <p className="text-body mx-auto mt-4 max-w-lg text-base">
            ZO Syndicate is a whitelisted server. Apply through Discord to become
            part of our cinematic roleplay community.
          </p>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
            {[
              { step: "1", title: "Join Discord", desc: "Enter our community server" },
              { step: "2", title: "Read Rules", desc: "Learn the server guidelines" },
              { step: "3", title: "Apply", desc: "Submit your whitelist app" },
              { step: "4", title: "Get Approved", desc: "Wait for staff review" },
            ].map((item) => (
              <div key={item.step} className="panel p-5 text-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red/20 text-sm font-bold text-red">
                  {item.step}
                </span>
                <h4 className="mt-2 text-sm font-semibold text-foreground">{item.title}</h4>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="https://discord.gg/HjpsGpC4R6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex"
          >
            Join ZO Syndicate Discord
          </a>
        </div>
      </section>
    </>
  );
}
