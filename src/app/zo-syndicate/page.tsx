import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZO Syndicate RP — FiveM Roleplay Server",
  description:
    "Join ZO Syndicate RP — a 48-slot FiveM roleplay server with 51 custom resources, 10 gangs, 5 law enforcement departments, 200+ items, AI NPCs, and a player-driven economy. Built by Prozilli Entertainment.",
};

const STATS = [
  { value: "48", label: "Player Slots" },
  { value: "51", label: "Custom Resources" },
  { value: "10", label: "Gangs" },
  { value: "5", label: "LEO Departments" },
  { value: "200+", label: "Custom Items" },
  { value: "24", label: "Jobs" },
];

const FEATURES = [
  {
    title: "Custom Economy",
    desc: "A meticulously balanced economy with legal and illegal income paths. Entry-level jobs start at $300/hour, while ambitious players can earn $15,000+ daily through businesses, drugs, and heists.",
    accent: "gold",
  },
  {
    title: "AI NPCs",
    desc: "LISA and her crew of 5 AI characters exist as living entities within the city. They have conversations, remember players, and add unpredictable life to every corner of Los Santos.",
    accent: "electric",
  },
  {
    title: "Territory System",
    desc: "10 capturable zones across Los Santos, each generating passive income for the controlling gang. Defend your turf, launch raids, and watch the map shift in real-time.",
    accent: "red",
  },
  {
    title: "Drug Empire",
    desc: "A deep, multi-layered drug operation system. Grow, cook, package, and distribute across the city. Street selling, police heat mechanics, and gang-controlled supply chains.",
    accent: "emerald",
  },
  {
    title: "Business Empire",
    desc: "Own car dealerships, restaurants, nightclubs, gun shops, and more. 10 business types with passive income generation, employee management, and supply chain mechanics.",
    accent: "gold",
  },
  {
    title: "Heists & Crime",
    desc: "Rob banks (4 locations), jewelry stores, convenience stores (8 locations), houses, and cargo trucks (5 routes). Each heist type has unique mechanics and police response levels.",
    accent: "red",
  },
];

const GANGS = [
  { name: "The Syndicate", key: "the_syndicate", color: "#C4A55A", territory: "Vinewood Hills", desc: "The shadow government of Los Santos. Old money, old power, new methods.", ranks: "Associate > Soldier > Capo > Underboss" },
  { name: "Corvo Nero", key: "corvo_nero", color: "#C4A265", territory: "Little Italy", desc: "Italian crime family. Ancient traditions, modern ruthlessness.", ranks: "Picciotto > Sgarrista > Capodecina > Don" },
  { name: "Volkov Bratva", key: "volkov_bratva", color: "#C41E3A", territory: "Chumash / Paleto Bay", desc: "Russian brotherhood. Cold, calculating, connected.", ranks: "Shestyorka > Bratok > Brigadir > Pakhan" },
  { name: "Jin Hu Triad", key: "jin_h_triad", color: "#E8C876", territory: "Little Seoul", desc: "Ancient order, modern methods. Silent and deadly.", ranks: "Blue Lantern > Red Pole > Vanguard > Dragon Head" },
  { name: "Los Fantasmas", key: "los_fantasmas", color: "#C41E3A", territory: "Rancho / El Burro Heights", desc: "Ghosts of the south side. They move in shadows and strike without warning.", ranks: "Soldado > Sicario > Teniente > Jefe" },
  { name: "The Reapers", key: "the_reapers", color: "#8B5CF6", territory: "Cemetery / Davis", desc: "Death rides with them. They own the night.", ranks: "Prospect > Reaper > Harbinger > Death Dealer" },
  { name: "Iron Wolves MC", key: "iron_wolves_mc", color: "#94A3B8", territory: "Sandy Shores", desc: "Outlaw bikers. The desert belongs to them.", ranks: "Prospect > Patched > Road Captain > President" },
  { name: "Road Devils MC", key: "road_devils_mc", color: "#EF4444", territory: "Grapeseed / Route 68", desc: "Hell on wheels. Red leather and no mercy.", ranks: "Prospect > Full Patch > Sergeant at Arms > President" },
  { name: "Viper Kings", key: "viper_kings", color: "#22C55E", territory: "Strawberry / Forum Drive", desc: "Green runs deep. Street kings with a venomous bite.", ranks: "Runner > Enforcer > Lieutenant > King" },
  { name: "Ballas", key: "ballas", color: "#9B59B6", territory: "Chamberlain Hills", desc: "Purple kings of the south side. OGs of the street game.", ranks: "Youngster > Gangster > Shot Caller > OG" },
];

const DEPARTMENTS = [
  { name: "LSPD", fullName: "Los Santos Police Department", key: "lspd", desc: "City patrol, detective work, SWAT operations. The front line of law enforcement in downtown Los Santos.", color: "#3B82F6" },
  { name: "BCSO", fullName: "Blaine County Sheriff's Office", key: "bcso", desc: "Rural patrol, county jurisdiction. Covering Sandy Shores, Grapeseed, Paleto Bay, and everything in between.", color: "#C4A55A" },
  { name: "SASP", fullName: "San Andreas State Police", key: "sasp", desc: "Highway patrol, state-level investigations, high-speed pursuits. Jurisdiction everywhere.", color: "#1B2845" },
  { name: "EMS", fullName: "Emergency Medical Services", key: "ems", desc: "Paramedics and doctors keeping the city alive. First on the scene, last to leave.", color: "#3B82F6" },
  { name: "DOJ", fullName: "Department of Justice", key: "doj", desc: "Judges, lawyers, legal proceedings. They decide who walks free and who stays locked up.", color: "#7C3AED" },
];

export default function ZoSyndicatePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[90vh] bg-grid relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/heroes/hero-zo.webp" alt="" fill className="object-cover opacity-12" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 animate-reveal">
              <Image
                src="/logos/ZO_Logo.webp"
                alt="ZO Syndicate RP"
                width={180}
                height={180}
                className="drop-shadow-2xl animate-float-slow"
                priority
              />
            </div>
            <div className="badge badge-gold mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              FiveM Roleplay
            </div>
            <h1
              className="text-display mb-6 animate-reveal"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="text-shimmer">ZO Syndicate</span>{" "}
              RP
            </h1>
            <p
              className="text-body-lg max-w-2xl mx-auto mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              A 48-slot FiveM server built from the ground up by Prozilli Entertainment. 51 custom
              resources. 10 gangs. 5 law enforcement departments. 200+ items. AI NPCs that remember
              your name. A living, breathing Los Santos where every choice matters.
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://discord.gg/tF698jBb3k"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                Join ZO Syndicate Discord
              </a>
              <Link href="/lisa" className="btn btn-secondary btn-lg">
                Meet the AI NPCs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-gold">{stat.value}</div>
                <div className="text-label text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">Custom Built</div>
            <h2 className="text-headline mb-4">51 Custom Resources</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Every system on ZO Syndicate is custom-built. No off-the-shelf scripts. 51 resources
              designed, coded, and deployed specifically for this server.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card-holo p-6">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Systems list */}
          <div className="mt-16 glass-raised p-8">
            <h3 className="text-subhead mb-6 text-center">Every System, Custom Built</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "Inventory (200+ items)", "Vehicle Keys & Lockpick", "Customs & Paint Shop",
                "Fuel System (3 types)", "Phone (13 apps)", "Dispatch / CAD",
                "Garage & Impound", "Radio Communications", "Spawn Selector",
                "Street Racing & Betting", "Lap Racing & Leaderboards", "Admin Menu (7 tabs)",
                "City Hall & Licenses", "ID Cards (6 types)", "Seatbelt & Ejection",
                "Radial Menu", "Door Locks & Keycodes", "Chat Theme",
                "Speedometer HUD", "Minimap Toggle", "Loading Screen",
                "Dive Gear & Shipwrecks", "Fireworks", "Binoculars",
              ].map((sys) => (
                <div key={sys} className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {sys}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== GANGS ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">Criminal Underworld</div>
            <h2 className="text-headline mb-4">10 Gangs</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              The streets of Los Santos are carved up between 10 gangs, each with their own territory,
              culture, and rank structure. Choose your allegiance carefully — loyalty is everything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 stagger">
            {GANGS.map((gang) => (
              <div
                key={gang.name}
                className="card p-5 text-center group hover:scale-[1.02] transition-transform"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-black/50 flex items-center justify-center border border-glass-border">
                  <Image
                    src={`/zo/gangs/logos/${gang.key}.png`}
                    alt={gang.name}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: gang.color }}
                >
                  {gang.name}
                </h3>
                <p className="text-xs text-dim mb-2">{gang.territory}</p>
                <p className="text-xs text-muted mb-2">{gang.desc}</p>
                <p className="text-[10px] text-dim font-mono">{gang.ranks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DEPARTMENTS ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">Law Enforcement</div>
            <h2 className="text-headline mb-4">5 Departments</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Law and order in San Andreas is maintained by 5 distinct departments. Each has its own
              jurisdiction, chain of command, and standard operating procedures.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 stagger">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="card p-5 text-center hover:scale-[1.02] transition-transform">
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                  <Image
                    src={`/zo/departments/${dept.key}_badge.png`}
                    alt={dept.fullName}
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <h3 className="font-bold mb-1" style={{ color: dept.color }}>{dept.name}</h3>
                <p className="text-xs text-dim mb-2">{dept.fullName}</p>
                <p className="text-xs text-muted">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ECONOMY ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge badge-gold mb-4">Economy</div>
              <h2 className="text-headline mb-6">
                Built for a{" "}
                <span className="text-shimmer">Middle Class</span>
              </h2>
              <p className="text-body-lg mb-6">
                Most RP servers have two types of players: broke civilians and rich criminals. ZO
                Syndicate was designed to create a middle class. Legal jobs, businesses, and legitimate
                enterprises provide real income. Crime pays more, but the risk matches the reward.
              </p>
              <div className="space-y-4">
                {[
                  { tier: "Entry Level", range: "$300 - $800 / day", example: "Mining, Fishing, Delivery", color: "text-muted" },
                  { tier: "Skilled Labor", range: "$800 - $2,000 / day", example: "Mechanic, EMS, Hunting", color: "text-foreground" },
                  { tier: "Business Owner", range: "$2,000 - $8,000 / day", example: "Dealership, Restaurant, Nightclub", color: "text-gold" },
                  { tier: "Criminal Empire", range: "$5,000 - $15,000+ / day", example: "Drugs, Heists, Territory Control", color: "text-red-bright" },
                ].map((tier) => (
                  <div key={tier.tier} className="glass p-4 flex items-center justify-between">
                    <div>
                      <span className={`font-bold text-sm ${tier.color}`}>{tier.tier}</span>
                      <p className="text-xs text-muted">{tier.example}</p>
                    </div>
                    <span className="text-data text-gold">{tier.range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-raised p-8">
              <h3 className="text-subhead mb-6">24 Available Jobs</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Police Officer", "EMS / Paramedic", "Mechanic", "Taxi Driver",
                  "Bus Driver", "Trucker", "Miner", "Lumberjack",
                  "Fisher", "Farmer", "Hunter", "Electrician",
                  "Garbage Collector", "Tow Truck", "News Reporter", "Lawyer",
                  "Judge", "Real Estate", "Car Dealer", "Nightclub Owner",
                  "Restaurant Owner", "Gun Shop Owner", "Weed Grower", "Cook",
                ].map((job) => (
                  <div key={job} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald flex-shrink-0" />
                    {job}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== HOW TO JOIN ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-10 md:p-16 text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src="/logos/ZO_Logo.webp"
                alt="ZO Syndicate RP"
                width={80}
                height={80}
                className="mx-auto drop-shadow-lg animate-float"
              />
            </div>
            <div className="badge badge-gold mb-6">Get Started</div>
            <h2 className="text-headline mb-6">How to Join ZO Syndicate</h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-12">
              Getting into the city takes just a few steps. No whitelisting required for civilians.
              Gang and LEO applications are handled through Discord.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "01",
                  title: "Join Discord",
                  desc: "Join the ZO Syndicate Discord server. Read the rules, grab your roles, and introduce yourself.",
                },
                {
                  step: "02",
                  title: "Install FiveM",
                  desc: "Download and install FiveM from fivem.net. It's free. You'll need a legit copy of GTA V.",
                },
                {
                  step: "03",
                  title: "Connect & Play",
                  desc: "Search for 'ZO Syndicate' in the FiveM server browser, or use the direct connect link from Discord.",
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <span className="text-xl font-extrabold text-gold">{step.step}</span>
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/tF698jBb3k"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                Join ZO Syndicate Discord
              </a>
              <a
                href="https://fivem.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Download FiveM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="powered-by-prismai mx-auto mb-6 w-fit">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Powered by PRISMAI
          </div>
          <h2 className="text-headline mb-4">Built by Prozilli Entertainment</h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-10">
            ZO Syndicate RP is developed and maintained by Prozilli Entertainment. Every resource
            is custom-coded, every system is interconnected through PRISMAI, and the AI NPCs are
            powered by the same engine that runs LISA across 9 streaming platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lisa" className="btn btn-secondary">
              Meet the AI NPCs
            </Link>
            <Link href="/watch" className="btn btn-primary">
              Watch Us Play
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
