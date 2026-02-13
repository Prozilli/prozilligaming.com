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
    desc: "A meticulously balanced economy with legal and illegal income paths. Entry-level jobs start at $300/hour, while ambitious players can earn $15,000+ daily through businesses, drugs, and heists. Housing, vehicles, and luxury items all priced to create meaningful progression.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    accent: "gold",
  },
  {
    title: "AI NPCs",
    desc: "LISA and her crew of 5 AI characters exist as living entities within the city. They have conversations, remember players, and add unpredictable life to every corner of Los Santos. Powered by Groq AI with unique personality profiles.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
    accent: "electric",
  },
  {
    title: "Territory System",
    desc: "10 capturable zones across Los Santos, each generating passive income for the controlling gang. Defend your turf, launch raids, and watch the map shift in real-time. Territory control unlocks exclusive perks and drug distribution routes.",
    icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
    accent: "red",
  },
  {
    title: "Drug System",
    desc: "A deep, multi-layered drug operation system. Grow, cook, package, and distribute across the city. Street selling, territory-based distribution, police heat mechanics, and gang-controlled supply chains. Risk vs. reward at every level.",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    accent: "emerald",
  },
  {
    title: "Business Empire",
    desc: "Own and operate car dealerships, restaurants, nightclubs, gun shops, fishing stores, hardware stores, electronics shops, and more. 10 business types with passive income generation, employee management, and supply chain mechanics.",
    icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21",
    accent: "gold",
  },
  {
    title: "Heists & Crime",
    desc: "Rob banks (4 locations), jewelry stores, convenience stores (8 locations), houses, and cargo trucks (5 routes). Each heist type has unique mechanics, difficulty scaling, cooldowns, and police response levels. Scrapyard for converting stolen goods.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    accent: "red",
  },
];

const GANGS = [
  { name: "Ballas", color: "#9b59b6", territory: "Davis / Chamberlain Hills", desc: "Purple kings of the south side. OGs of the street game." },
  { name: "Vagos", color: "#f1c40f", territory: "Rancho / Cypress Flats", desc: "Yellow-flagging warriors. Los Santos is their birthright." },
  { name: "Families", color: "#27ae60", territory: "Strawberry / Forum Drive", desc: "Grove Street legends. Green runs deep in these blocks." },
  { name: "Marabunta Grande", color: "#3498db", territory: "El Burro Heights", desc: "Salvadoran pride. Blue ink and no mercy." },
  { name: "Lost MC", color: "#e74c3c", territory: "Sandy Shores", desc: "Outlaw bikers. The desert belongs to them." },
  { name: "Triads", color: "#e67e22", territory: "Little Seoul", desc: "Ancient order, modern methods. Silent and deadly." },
  { name: "Aztecas", color: "#1abc9c", territory: "Vespucci", desc: "Heritage and honor. The coast is their kingdom." },
  { name: "Russian Mafia", color: "#95a5a6", territory: "Chumash / Paleto Bay", desc: "Cold, calculating, connected. Money flows through them." },
  { name: "Yakuza", color: "#c0392b", territory: "Rockford Hills", desc: "Discipline and tradition. Luxury with a blade underneath." },
  { name: "Cartel del Sol", color: "#d4ac0d", territory: "Grapeseed / Mount Chiliad", desc: "International supply chain. The mountains hide their empire." },
];

const DEPARTMENTS = [
  {
    name: "LSPD",
    fullName: "Los Santos Police Department",
    desc: "City patrol, detective work, SWAT operations. The front line of law enforcement in downtown Los Santos.",
    color: "text-electric",
    bgColor: "bg-electric/10",
    borderColor: "border-electric/20",
  },
  {
    name: "BCSO",
    fullName: "Blaine County Sheriff's Office",
    desc: "Rural patrol, county jurisdiction. Covering Sandy Shores, Grapeseed, Paleto Bay, and everything in between.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
  },
  {
    name: "SASP",
    fullName: "San Andreas State Police",
    desc: "Highway patrol, state-level investigations, high-speed pursuits. Jurisdiction everywhere.",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
    borderColor: "border-emerald/20",
  },
  {
    name: "SAHP",
    fullName: "San Andreas Highway Patrol",
    desc: "Traffic enforcement, DUI checkpoints, highway safety. They own the roads.",
    color: "text-red-bright",
    bgColor: "bg-red/10",
    borderColor: "border-red/20",
  },
  {
    name: "DOJ",
    fullName: "Department of Justice",
    desc: "Judges, lawyers, legal proceedings. They decide who walks free and who stays locked up.",
    color: "text-foreground",
    bgColor: "bg-white/5",
    borderColor: "border-white/10",
  },
];

export default function ZoSyndicatePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[90vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 animate-reveal">
              <Image
                src="/logos/ZO_Logo.webp"
                alt="ZO Syndicate Logo"
                width={120}
                height={120}
                className="rounded-2xl"
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
              your name. A living, breathing Los Santos where every choice matters and every player
              shapes the story.
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
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
              Every system on ZO Syndicate is custom-built. No off-the-shelf scripts. No copy-paste
              frameworks. 51 resources designed, coded, and deployed specifically for this server.
              Here&apos;s what makes it different.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card-holo p-6">
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-${feature.accent}/10`}
                  >
                    <svg
                      className={`w-5 h-5 text-${feature.accent}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional systems list */}
          <div className="mt-16 glass-raised p-8">
            <h3 className="text-subhead mb-6 text-center">Every System, Custom Built</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "Inventory (200+ items)", "Vehicle Keys & Lockpick", "Customs & Paint Shop",
                "Fuel System (3 types)", "Phone (10 apps)", "Dispatch / CAD",
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
              culture, and operations. Choose your allegiance carefully — loyalty is everything, and
              betrayal has consequences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger">
            {GANGS.map((gang) => (
              <div
                key={gang.name}
                className="card p-5 text-center group"
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center border"
                  style={{
                    background: `${gang.color}20`,
                    borderColor: `${gang.color}40`,
                  }}
                >
                  <span
                    className="text-lg font-extrabold"
                    style={{ color: gang.color }}
                  >
                    {gang.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: gang.color }}>
                  {gang.name}
                </h3>
                <p className="text-xs text-dim mb-2">{gang.territory}</p>
                <p className="text-xs text-muted">{gang.desc}</p>
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
              jurisdiction, chain of command, SOPs, and patrol routes. From city cops to highway
              troopers to federal judges — justice takes many forms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="card p-5 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-3 rounded-full ${dept.bgColor} border ${dept.borderColor} flex items-center justify-center`}
                >
                  <span className={`text-lg font-extrabold ${dept.color}`}>
                    {dept.name.charAt(0)}
                  </span>
                </div>
                <h3 className={`font-bold mb-1 ${dept.color}`}>{dept.name}</h3>
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
                  icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z",
                },
                {
                  step: "02",
                  title: "Install FiveM",
                  desc: "Download and install FiveM from fivem.net. It's free. You'll need a legit copy of GTA V.",
                  icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
                },
                {
                  step: "03",
                  title: "Connect & Play",
                  desc: "Search for 'ZO Syndicate' in the FiveM server browser, or use the direct connect link from Discord.",
                  icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z",
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="text-label text-gold mb-2">Step {step.step}</div>
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
            powered by the same engine that runs LISA across 9 streaming platforms. This isn&apos;t
            a server with downloaded scripts — it&apos;s an ecosystem.
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
