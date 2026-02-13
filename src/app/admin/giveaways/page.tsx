"use client";

import { useState } from "react";

/* ============================================================
   Giveaways Page
   ============================================================ */

type GiveawayStatus = "active" | "ended" | "draft" | "drawing";

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prizes: string[];
  platforms: string[];
  entries: number;
  maxEntries: number | null;
  startDate: string;
  endDate: string;
  status: GiveawayStatus;
  winners: string[];
  requirements: string[];
}

const GIVEAWAYS: Giveaway[] = [
  {
    id: "1",
    title: "Valentine's Day Stream Giveaway",
    description: "Win exclusive Prozilli merch and VIP access! Enter by chatting during the Valentine's Day stream.",
    prizes: ["Prozilli Hoodie (Black)", "1 Month VIP Elite", "$25 Gift Card"],
    platforms: ["Twitch", "Kick", "YouTube", "Discord"],
    entries: 247,
    maxEntries: null,
    startDate: "Feb 14, 2026 5:00 PM",
    endDate: "Feb 14, 2026 11:00 PM",
    status: "active",
    winners: [],
    requirements: ["Must be following", "1+ chat messages", "Account 30+ days old"],
  },
  {
    id: "2",
    title: "ZO Syndicate Launch Celebration",
    description: "Celebrating the ZO Syndicate server launch with massive giveaways across all platforms.",
    prizes: ["$50 Steam Gift Card", "Custom ZO Syndicate Role", "In-Game $500K"],
    platforms: ["Discord", "Twitch"],
    entries: 512,
    maxEntries: 1000,
    startDate: "Feb 10, 2026 12:00 PM",
    endDate: "Feb 17, 2026 12:00 PM",
    status: "active",
    winners: [],
    requirements: ["Must be in Discord", "Level 5+", "Verified account"],
  },
  {
    id: "3",
    title: "Weekly Chat Warrior",
    description: "Most active chatter of the week wins!",
    prizes: ["Subscriber Gifted (3 months)", "Custom Badge"],
    platforms: ["Twitch", "Kick"],
    entries: 89,
    maxEntries: null,
    startDate: "Feb 3, 2026",
    endDate: "Feb 10, 2026",
    status: "ended",
    winners: ["NightRider_99"],
    requirements: ["10+ messages during stream"],
  },
  {
    id: "4",
    title: "New Year's Mega Giveaway",
    description: "Ring in 2026 with an epic giveaway.",
    prizes: ["Gaming Headset", "$100 Gift Card", "1 Year VIP"],
    platforms: ["Twitch", "Kick", "YouTube", "Discord"],
    entries: 1847,
    maxEntries: 2000,
    startDate: "Dec 31, 2025",
    endDate: "Jan 2, 2026",
    status: "ended",
    winners: ["PixelKing", "GhostPepper42", "BlazeMaster"],
    requirements: ["Must be following", "Account 7+ days old"],
  },
];

export default function GiveawaysPage() {
  const [giveaways] = useState(GIVEAWAYS);
  const [activeTab, setActiveTab] = useState<"active" | "past" | "create">("active");
  /* Create form state */
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrize, setNewPrize] = useState("");
  const [newPrizes, setNewPrizes] = useState<string[]>([]);
  const [newDuration, setNewDuration] = useState("6");

  const addPrize = () => {
    if (newPrize.trim()) {
      setNewPrizes((prev) => [...prev, newPrize.trim()]);
      setNewPrize("");
    }
  };

  const removePrize = (index: number) => {
    setNewPrizes((prev) => prev.filter((_, i) => i !== index));
  };

  const activeGiveaways = giveaways.filter((g) => g.status === "active" || g.status === "drawing");
  const pastGiveaways = giveaways.filter((g) => g.status === "ended");

  const statusColors: Record<GiveawayStatus, string> = {
    active: "badge-emerald",
    drawing: "badge-gold",
    ended: "badge-red",
    draft: "badge-electric",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giveaways</h1>
          <p className="text-sm text-muted mt-1">{activeGiveaways.length} active, {pastGiveaways.length} completed</p>
        </div>
        <button onClick={() => setActiveTab("create")} className="btn btn-primary btn-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Giveaway
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Giveaways", value: activeGiveaways.length, color: "text-emerald" },
          { label: "Total Entries", value: giveaways.reduce((sum, g) => sum + g.entries, 0).toLocaleString(), color: "text-electric" },
          { label: "Prizes Awarded", value: giveaways.reduce((sum, g) => sum + g.winners.length, 0), color: "text-gold" },
          { label: "Unique Winners", value: "4", color: "text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-dim mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["active", "past", "create"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "create" ? "Create New" : tab === "past" ? "Past Giveaways" : "Active"}
          </button>
        ))}
      </div>

      {/* Active Giveaways */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeGiveaways.length === 0 ? (
            <div className="card p-12 text-center">
              <svg className="w-12 h-12 mx-auto text-dim mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
              </svg>
              <p className="text-sm text-muted">No active giveaways. Create one to get started.</p>
            </div>
          ) : (
            activeGiveaways.map((giveaway) => (
              <div key={giveaway.id} className="card-holo p-6">
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{giveaway.title}</h3>
                        <span className={`badge text-[9px] ${statusColors[giveaway.status]}`}>{giveaway.status}</span>
                      </div>
                      <p className="text-xs text-muted">{giveaway.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="btn btn-gold btn-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172" />
                        </svg>
                        Draw Winner
                      </button>
                      <button className="btn btn-secondary btn-sm">End</button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted">{giveaway.entries} entries</span>
                      {giveaway.maxEntries && (
                        <span className="text-xs text-dim">{giveaway.maxEntries} max</span>
                      )}
                    </div>
                    {giveaway.maxEntries && (
                      <div className="w-full h-2 rounded-full bg-glass overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red to-gold transition-all"
                          style={{ width: `${(giveaway.entries / giveaway.maxEntries) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-[10px] font-bold text-dim uppercase mb-1">Prizes</div>
                      <div className="space-y-1">
                        {giveaway.prizes.map((prize, i) => (
                          <div key={i} className="text-xs text-muted flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                            {prize}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-dim uppercase mb-1">Platforms</div>
                      <div className="flex flex-wrap gap-1">
                        {giveaway.platforms.map((p) => (
                          <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-muted">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-dim uppercase mb-1">Requirements</div>
                      <div className="space-y-1">
                        {giveaway.requirements.map((req, i) => (
                          <div key={i} className="text-[10px] text-muted">{req}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-dim uppercase mb-1">Timeline</div>
                      <div className="text-[10px] text-muted">Start: {giveaway.startDate}</div>
                      <div className="text-[10px] text-muted">End: {giveaway.endDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Past Giveaways */}
      {activeTab === "past" && (
        <div className="space-y-4">
          {pastGiveaways.map((giveaway) => (
            <div key={giveaway.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold">{giveaway.title}</h3>
                    <span className={`badge text-[9px] ${statusColors[giveaway.status]}`}>{giveaway.status}</span>
                  </div>
                  <div className="text-[10px] text-dim">{giveaway.startDate} - {giveaway.endDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{giveaway.entries}</div>
                  <div className="text-[10px] text-dim">entries</div>
                </div>
              </div>

              {/* Winners */}
              {giveaway.winners.length > 0 && (
                <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
                  <div className="text-[10px] font-bold text-gold uppercase mb-2">Winners</div>
                  <div className="flex flex-wrap gap-2">
                    {giveaway.winners.map((winner) => (
                      <span key={winner} className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497" />
                        </svg>
                        {winner}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prizes */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {giveaway.prizes.map((prize) => (
                  <span key={prize} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                    {prize}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-lg font-bold mb-6">Create Giveaway</h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter giveaway title..."
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the giveaway..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Prizes</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newPrize}
                    onChange={(e) => setNewPrize(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addPrize()}
                    placeholder="Add a prize..."
                    className="flex-1 px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                  <button onClick={addPrize} className="btn btn-secondary btn-sm">Add</button>
                </div>
                {newPrizes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newPrizes.map((prize, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs text-gold">
                        {prize}
                        <button onClick={() => removePrize(i)} className="hover:text-foreground">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Duration (hours)</label>
                  <select
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                  >
                    <option value="1">1 hour</option>
                    <option value="3">3 hours</option>
                    <option value="6">6 hours</option>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                    <option value="72">3 days</option>
                    <option value="168">1 week</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Max Entries (optional)</label>
                  <input
                    type="number"
                    placeholder="Unlimited"
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button className="btn btn-ghost btn-sm">Save Draft</button>
                <button className="btn btn-gold btn-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
                  </svg>
                  Launch Giveaway
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-5">
              <h3 className="text-sm font-bold mb-4">Entry Requirements</h3>
              <div className="space-y-3">
                {[
                  { label: "Must be following", enabled: true },
                  { label: "Minimum account age (30 days)", enabled: true },
                  { label: "Must send 1+ chat messages", enabled: false },
                  { label: "Must be subscribed", enabled: false },
                  { label: "Must be in Discord", enabled: false },
                  { label: "Minimum level requirement", enabled: false },
                ].map((req) => (
                  <div key={req.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                    <span className="text-xs text-muted">{req.label}</span>
                    <div className={`w-8 h-4 rounded-full transition-colors ${
                      req.enabled ? "bg-emerald" : "bg-dim"
                    }`}>
                      <div className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-transform ${
                        req.enabled ? "translate-x-4" : "translate-x-0.5"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-bold mb-4">Multi-Platform Sync</h3>
              <p className="text-xs text-muted mb-3">Entries from all selected platforms are pooled together. One entry per user (cross-platform dedup).</p>
              <div className="space-y-2">
                {["Twitch", "Kick", "YouTube", "Discord"].map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-2 rounded-lg bg-glass border border-glass-border">
                    <span className="text-xs font-semibold">{platform}</span>
                    <div className="w-8 h-4 rounded-full bg-emerald">
                      <div className="w-3 h-3 rounded-full bg-white mt-0.5 translate-x-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
