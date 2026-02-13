"use client";

import { useState } from "react";

/* ============================================================
   Moderation Page
   ============================================================ */

interface ModRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: "low" | "medium" | "high";
  action: string;
}

const AUTO_MOD_RULES: ModRule[] = [
  { id: "links", name: "Link Filter", description: "Block unauthorized links. Permits whitelisted domains.", enabled: true, severity: "medium", action: "Delete + Warn" },
  { id: "spam", name: "Spam Detection", description: "Detect repeated messages, character spam, and copypasta.", enabled: true, severity: "medium", action: "Delete + Timeout 5m" },
  { id: "caps", name: "Caps Filter", description: "Limit messages with excessive capitalization (>70% caps).", enabled: true, severity: "low", action: "Delete + Warn" },
  { id: "banned", name: "Banned Words", description: "Filter messages containing blacklisted words/phrases.", enabled: true, severity: "high", action: "Delete + Warn" },
  { id: "slow", name: "Slow Mode", description: "Require delay between messages per user.", enabled: false, severity: "low", action: "Rate limit 5s" },
  { id: "emotes", name: "Emote Spam", description: "Limit excessive emote usage in a single message.", enabled: false, severity: "low", action: "Delete" },
  { id: "mentions", name: "Mass Mentions", description: "Block messages that @mention too many users.", enabled: true, severity: "high", action: "Delete + Timeout 10m" },
  { id: "invites", name: "Discord Invites", description: "Block Discord server invite links.", enabled: true, severity: "high", action: "Delete + Warn" },
];

const ESCALATION_STEPS = [
  { step: 1, action: "Verbal Warning", description: "LISA sends a friendly warning", icon: "text-warning" },
  { step: 2, action: "Final Warning", description: "Formal warning logged to database", icon: "text-warning" },
  { step: 3, action: "Mute (10 min)", description: "Temporary mute across all platforms", icon: "text-error" },
  { step: 4, action: "Temp Ban (1 hr)", description: "Temporary ban from chat", icon: "text-error" },
  { step: 5, action: "Temp Ban (24 hr)", description: "Full day ban from chat", icon: "text-error" },
  { step: 6, action: "Permanent Ban", description: "Permanently banned from all platforms", icon: "text-error" },
];

const MOD_LOG = [
  { time: "2:34 PM", user: "ToxicUser123", action: "Banned Word", platform: "Twitch", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "2:22 PM", user: "SpamBot_99", action: "Spam Detected", platform: "Kick", result: "Deleted + Timeout 5m", moderator: "LISA" },
  { time: "1:58 PM", user: "LinkDropper", action: "Link Filter", platform: "Discord", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "1:45 PM", user: "CapsLock_King", action: "Caps Filter", platform: "Twitch", result: "Deleted", moderator: "LISA" },
  { time: "1:30 PM", user: "RaidBot_7", action: "Mass Mentions", platform: "Discord", result: "Timeout 10m", moderator: "LISA" },
  { time: "12:15 PM", user: "ToxicUser123", action: "Banned Word (2nd)", platform: "Twitch", result: "Deleted + Warning #2", moderator: "LISA" },
  { time: "11:52 AM", user: "InviteSpam", action: "Discord Invite", platform: "Kick", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "11:30 AM", user: "TrollAccount", action: "Manual Ban", platform: "All", result: "Permanent Ban", moderator: "Pro" },
];

const BANNED_USERS = [
  { user: "TrollAccount", reason: "Targeted harassment", date: "Feb 12, 2026", type: "Permanent", by: "Pro" },
  { user: "HateBot_99", reason: "Hate speech", date: "Feb 10, 2026", type: "Permanent", by: "LISA" },
  { user: "ScamLink_Pro", reason: "Phishing links", date: "Feb 8, 2026", type: "Permanent", by: "LISA" },
  { user: "Impersonator_1", reason: "Impersonating staff", date: "Feb 5, 2026", type: "30 days", by: "Pro" },
];

export default function ModerationPage() {
  const [rules, setRules] = useState(AUTO_MOD_RULES);
  const [searchUser, setSearchUser] = useState("");
  const [activeTab, setActiveTab] = useState<"rules" | "log" | "bans" | "escalation">("rules");

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Moderation</h1>
          <p className="text-sm text-muted mt-1">Auto-mod rules, user management, and moderation logs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="badge badge-emerald">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Auto-Mod Active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["rules", "log", "bans", "escalation"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "log" ? "Mod Log" : tab === "bans" ? "Banned Users" : tab}
          </button>
        ))}
      </div>

      {/* Rules Tab */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Rules Active", value: rules.filter((r) => r.enabled).length, total: rules.length, color: "text-emerald" },
              { label: "Actions Today", value: "47", total: "", color: "text-electric" },
              { label: "Users Warned", value: "12", total: "", color: "text-warning" },
              { label: "Users Banned", value: "2", total: "", color: "text-error" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <div className={`text-xl font-extrabold ${stat.color}`}>
                  {stat.value}{stat.total && <span className="text-dim text-sm">/{stat.total}</span>}
                </div>
                <div className="text-[10px] text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule) => (
              <div key={rule.id} className={`card p-4 ${!rule.enabled ? "opacity-50" : ""}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      rule.severity === "high" ? "bg-error" :
                      rule.severity === "medium" ? "bg-warning" : "bg-info"
                    }`} />
                    <span className="text-sm font-bold">{rule.name}</span>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                      rule.enabled ? "bg-emerald" : "bg-dim"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                      rule.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
                <p className="text-xs text-muted mb-3">{rule.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    rule.severity === "high" ? "bg-error/10 text-error" :
                    rule.severity === "medium" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                  }`}>
                    {rule.severity}
                  </span>
                  <span className="text-[10px] text-dim">{rule.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mod Log Tab */}
      {activeTab === "log" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Time</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">User</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Action</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Platform</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Result</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">By</th>
                </tr>
              </thead>
              <tbody>
                {MOD_LOG.map((entry, i) => (
                  <tr key={i} className="border-b border-glass-border hover:bg-glass transition-colors">
                    <td className="p-4 text-data text-xs text-dim">{entry.time}</td>
                    <td className="p-4 text-xs font-semibold">{entry.user}</td>
                    <td className="p-4 text-xs text-muted">{entry.action}</td>
                    <td className="p-4 text-xs text-muted">{entry.platform}</td>
                    <td className="p-4 text-xs text-muted">{entry.result}</td>
                    <td className="p-4 text-xs text-electric">{entry.moderator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Banned Users Tab */}
      {activeTab === "bans" && (
        <div className="space-y-4">
          {/* Search + Actions */}
          <div className="flex gap-3">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Search by username..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
            />
            <button className="btn btn-primary btn-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Ban User
            </button>
          </div>

          {/* Banned List */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Username</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Reason</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Date</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Type</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">By</th>
                    <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {BANNED_USERS.map((user) => (
                    <tr key={user.user} className="border-b border-glass-border hover:bg-glass transition-colors">
                      <td className="p-4 text-xs font-semibold text-error">{user.user}</td>
                      <td className="p-4 text-xs text-muted">{user.reason}</td>
                      <td className="p-4 text-data text-xs text-dim">{user.date}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.type === "Permanent" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                        }`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-muted">{user.by}</td>
                      <td className="p-4 text-right">
                        <button className="btn btn-ghost btn-sm text-xs">Unban</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Tab */}
      {activeTab === "escalation" && (
        <div className="card p-6">
          <h2 className="text-sm font-bold mb-6">Warning Escalation Pipeline</h2>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-glass-border" />

            <div className="space-y-6">
              {ESCALATION_STEPS.map((step) => (
                <div key={step.step} className="flex items-start gap-4 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-glass border border-glass-border z-10 ${step.icon}`}>
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <div className="text-sm font-bold">{step.action}</div>
                    <p className="text-xs text-muted mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button className="btn btn-secondary btn-sm">Customize Pipeline</button>
          </div>
        </div>
      )}
    </div>
  );
}
