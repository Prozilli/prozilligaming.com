"use client";

import { useState } from "react";

/* ============================================================
   LISA AI Configuration Page
   ============================================================ */

const NPC_CHARACTERS = [
  {
    name: "Vania",
    role: "The Romantic Intellectual",
    status: "online",
    color: "#e4405f",
    personality: "Sultry librarian meets philosophy professor. Quotes Nietzsche then roasts your gaming skills.",
    platform: "Discord",
    messages: 1247,
  },
  {
    name: "Benny",
    role: "The Street-Smart Hustler",
    status: "online",
    color: "#53fc18",
    personality: "Fast-talking Brooklyn energy. Knows everybody, sells everything, trusts nobody.",
    platform: "Discord",
    messages: 892,
  },
  {
    name: "Dolores",
    role: "The Motherly Enforcer",
    status: "online",
    color: "#c4a265",
    personality: "Abuela who bakes empanadas AND runs the numbers. Warm but terrifying.",
    platform: "Discord",
    messages: 634,
  },
  {
    name: "Snake",
    role: "The Paranoid Conspiracy Theorist",
    status: "online",
    color: "#9146ff",
    personality: "Every conversation leads to government surveillance. Has three burner phones.",
    platform: "Discord",
    messages: 1051,
  },
  {
    name: "Tony",
    role: "The Old-School Boss",
    status: "online",
    color: "#ff0000",
    personality: "Runs things the traditional way. Speaks in metaphors about respect and loyalty.",
    platform: "Discord",
    messages: 788,
  },
];

const AI_PROVIDERS = [
  {
    name: "Groq (Primary)",
    model: "llama-3.3-70b-versatile",
    status: "online",
    latency: "180ms",
    circuitState: "CLOSED",
    failCount: 0,
    color: "text-emerald",
  },
  {
    name: "OpenAI (Fallback)",
    model: "gpt-4-turbo",
    status: "standby",
    latency: "--",
    circuitState: "CLOSED",
    failCount: 0,
    color: "text-warning",
  },
];

const RELATIONSHIP_SAMPLES = [
  { user: "NightRider_99", platform: "Twitch", level: "Trusted Regular", interactions: 342, mood: "Friendly", lastSeen: "2 min ago" },
  { user: "GhostPepper42", platform: "Kick", level: "New Friend", interactions: 28, mood: "Curious", lastSeen: "1 hr ago" },
  { user: "PixelKing", platform: "Discord", level: "Inner Circle", interactions: 891, mood: "Loyal", lastSeen: "Just now" },
  { user: "LunaStream", platform: "YouTube", level: "Acquaintance", interactions: 12, mood: "Neutral", lastSeen: "3 days ago" },
  { user: "TurboFan_X", platform: "Twitch", level: "Regular", interactions: 156, mood: "Playful", lastSeen: "5 hr ago" },
];

const BANNED_TOPICS = [
  "Real personal addresses",
  "Credit card numbers",
  "Social security numbers",
  "Other streamers' drama",
  "Political arguments",
  "Illegal activity instructions",
];

export default function LisaPage() {
  const [humorLevel, setHumorLevel] = useState(75);
  const [formalityLevel, setFormalityLevel] = useState(25);
  const [sassLevel, setSassLevel] = useState(80);
  const [memoryDepth, setMemoryDepth] = useState(50);
  const [testInput, setTestInput] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTestChat = () => {
    if (!testInput.trim()) return;
    setTestResponse("Hey! That's a solid question. Let me break it down for you... *adjusts invisible glasses* Okay so basically, I've been processing chat across 9 platforms and I can tell you that the ZO Syndicate server is absolutely popping right now. But between us? I think Benny's been skimming off the top of the casino revenue. Don't tell Tony I said that.");
    setTestInput("");
  };

  const filteredRelationships = RELATIONSHIP_SAMPLES.filter((r) =>
    r.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">LISA Configuration</h1>
          <p className="text-sm text-muted mt-1">Live Interactive System Administrator — AI co-host</p>
        </div>
        <div className="powered-by-prismai">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" opacity="0.3" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          LISA v3.2 Active
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Personality + Providers */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Provider Status */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">AI Provider Status</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {AI_PROVIDERS.map((provider) => (
                <div key={provider.name} className="p-4 rounded-lg bg-glass border border-glass-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold">{provider.name}</span>
                    <div className={`badge text-[9px] ${provider.status === "online" ? "badge-emerald" : "badge-gold"}`}>
                      {provider.status}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-dim">Model</span>
                      <span className="text-data text-muted">{provider.model}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-dim">Latency</span>
                      <span className="text-data text-muted">{provider.latency}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-dim">Circuit Breaker</span>
                      <span className={`text-data ${provider.circuitState === "CLOSED" ? "text-emerald" : "text-error"}`}>
                        {provider.circuitState}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-dim">Failures</span>
                      <span className="text-data text-muted">{provider.failCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personality Settings */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Personality Tuning</h2>
            <div className="space-y-5">
              {[
                { label: "Humor Level", value: humorLevel, setter: setHumorLevel, desc: "Dry wit to full comedian", left: "Serious", right: "Maximum Sass" },
                { label: "Formality", value: formalityLevel, setter: setFormalityLevel, desc: "Professional to street", left: "Corporate", right: "Street" },
                { label: "Sass Factor", value: sassLevel, setter: setSassLevel, desc: "How much she roasts people", left: "Gentle", right: "Ruthless" },
                { label: "Memory Depth", value: memoryDepth, setter: setMemoryDepth, desc: "How far back she remembers interactions", left: "Recent", right: "Elephant" },
              ].map((slider) => (
                <div key={slider.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold">{slider.label}</span>
                      <span className="text-[10px] text-dim ml-2">{slider.desc}</span>
                    </div>
                    <span className="text-data text-xs text-muted">{slider.value}%</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={slider.value}
                      onChange={(e) => slider.setter(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-bright [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(220,38,38,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-dim">{slider.left}</span>
                      <span className="text-[9px] text-dim">{slider.right}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-primary btn-sm">Save Personality</button>
            </div>
          </div>

          {/* NPC Character Management */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">NPC Characters</h2>
              <span className="text-data text-xs text-dim">5 bots online</span>
            </div>
            <div className="space-y-3">
              {NPC_CHARACTERS.map((npc) => (
                <div key={npc.name} className="flex items-start gap-4 p-4 rounded-lg bg-glass border border-glass-border hover:border-glass-border-hover transition-all">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${npc.color}20`, color: npc.color }}
                  >
                    {npc.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold">{npc.name}</span>
                      <span className="text-[10px] text-dim">({npc.role})</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${npc.status === "online" ? "bg-emerald" : "bg-error"}`} />
                    </div>
                    <p className="text-xs text-muted mb-2">{npc.personality}</p>
                    <div className="flex items-center gap-3 text-[10px] text-dim">
                      <span>{npc.platform}</span>
                      <span>&middot;</span>
                      <span>{npc.messages.toLocaleString()} messages</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm text-xs flex-shrink-0">Configure</button>
                </div>
              ))}
            </div>
          </div>

          {/* Banned Topics */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Banned Topics / Content Filters</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {BANNED_TOPICS.map((topic) => (
                <div key={topic} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-error/10 border border-error/20 text-xs text-error">
                  {topic}
                  <button className="hover:text-foreground transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add banned topic..."
                className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
              />
              <button className="btn btn-secondary btn-sm">Add</button>
            </div>
          </div>
        </div>

        {/* Right Column: Test Chat + Relationships */}
        <div className="space-y-6">
          {/* Test Chat */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Test Chat</h2>
            <div className="h-64 rounded-lg bg-glass border border-glass-border p-3 mb-3 overflow-y-auto">
              {testResponse ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-muted flex-shrink-0">You:</span>
                    <span className="text-xs text-muted">Hey LISA, what&apos;s going on?</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-electric flex-shrink-0">LISA:</span>
                    <span className="text-xs text-foreground">{testResponse}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xs text-dim text-center">Send a test message to see how LISA responds with current personality settings</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTestChat()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-electric/50 transition-colors"
              />
              <button onClick={handleTestChat} className="btn btn-primary btn-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Relationship Memory */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Relationship Memory</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full px-3 py-2 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-electric/50 transition-colors mb-3"
            />
            <div className="space-y-2">
              {filteredRelationships.map((rel) => (
                <div key={rel.user} className="p-3 rounded-lg bg-glass border border-glass-border hover:border-glass-border-hover transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{rel.user}</span>
                    <span className="text-[10px] text-dim">{rel.lastSeen}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-muted">{rel.platform}</span>
                    <span className="text-dim">&middot;</span>
                    <span className="text-electric">{rel.level}</span>
                    <span className="text-dim">&middot;</span>
                    <span className="text-muted">{rel.interactions} interactions</span>
                  </div>
                  <div className="mt-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      rel.mood === "Friendly" ? "bg-emerald/10 text-emerald" :
                      rel.mood === "Loyal" ? "bg-gold/10 text-gold" :
                      rel.mood === "Playful" ? "bg-electric/10 text-electric" :
                      rel.mood === "Curious" ? "bg-info/10 text-info" :
                      "bg-glass text-dim"
                    }`}>
                      {rel.mood}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LISA Stats */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">LISA Stats</h2>
            <div className="space-y-3">
              {[
                { label: "Total Messages Sent", value: "24,891" },
                { label: "Unique Users Known", value: "1,247" },
                { label: "Platforms Active", value: "8 / 9" },
                { label: "Avg Response Time", value: "210ms" },
                { label: "Uptime", value: "99.7%" },
                { label: "Languages Spoken", value: "12" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center p-2 rounded-lg hover:bg-glass transition-colors">
                  <span className="text-xs text-muted">{stat.label}</span>
                  <span className="text-data text-xs font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
