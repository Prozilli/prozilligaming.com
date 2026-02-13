"use client";

import { useState } from "react";

/* ============================================================
   Welcome System Page
   ============================================================ */

const CHANNEL_OPTIONS = [
  { id: "welcome", name: "#welcome", category: "WELCOME" },
  { id: "general", name: "#general-chat", category: "COMMUNITY" },
  { id: "introductions", name: "#introductions", category: "COMMUNITY" },
  { id: "announcements", name: "#announcements", category: "INFORMATION" },
];

const AUTO_ROLES = [
  { id: "1", name: "Community", color: "#5865f2", enabled: true },
  { id: "2", name: "Notifications", color: "#38bdf8", enabled: true },
  { id: "3", name: "Newcomer", color: "#7a8599", enabled: true },
  { id: "4", name: "Stream Alerts", color: "#ff0000", enabled: false },
];

const WELCOME_VARIABLES = [
  { var: "{user}", desc: "Username/mention" },
  { var: "{server}", desc: "Server name" },
  { var: "{memberCount}", desc: "Total members" },
  { var: "{user.avatar}", desc: "User avatar URL" },
  { var: "{user.createdAt}", desc: "Account creation date" },
];

export default function WelcomePage() {
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [welcomeChannel, setWelcomeChannel] = useState("welcome");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to **ZO Syndicate**, {user}! You're member #{memberCount}.\n\nCheck out the rules in #rules and grab your roles in #role-selection.\n\nPowered by PRISMAI."
  );
  const [dmEnabled, setDmEnabled] = useState(true);
  const [dmMessage, setDmMessage] = useState(
    "Hey {user}! Welcome to the ZO Syndicate Discord.\n\nHere's what you need to know:\n- Read the rules\n- Grab your roles\n- Say hi in #general-chat\n\nSee you around!\n- LISA"
  );
  const [leaveEnabled, setLeaveEnabled] = useState(true);
  const [leaveMessage, setLeaveMessage] = useState("{user} has left the server. We'll miss you.");
  const [embedColor, setEmbedColor] = useState("#910000");
  const [showEmbedPreview, setShowEmbedPreview] = useState(false);
  const [roles, setRoles] = useState(AUTO_ROLES);

  const toggleRole = (id: string) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome System</h1>
          <p className="text-sm text-muted mt-1">Configure welcome messages, DMs, and auto-roles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWelcomeEnabled(!welcomeEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
              welcomeEnabled
                ? "bg-emerald/10 border-emerald/30 text-emerald"
                : "bg-glass border-glass-border text-dim"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${welcomeEnabled ? "bg-emerald" : "bg-dim"}`} />
            {welcomeEnabled ? "System Active" : "System Disabled"}
          </button>
          <button className="btn btn-primary btn-sm">Save All</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Welcome Message</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Channel</label>
                <select
                  value={welcomeChannel}
                  onChange={(e) => setWelcomeChannel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                >
                  {CHANNEL_OPTIONS.map((ch) => (
                    <option key={ch.id} value={ch.id}>{ch.name} ({ch.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Message Content</label>
                <textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none font-mono"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Embed Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={embedColor}
                      onChange={(e) => setEmbedColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-glass-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={embedColor}
                      onChange={(e) => setEmbedColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-data text-sm focus:outline-none focus:border-red/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setShowEmbedPreview(!showEmbedPreview)}
                    className="btn btn-secondary btn-sm w-full"
                  >
                    {showEmbedPreview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>
              </div>

              {/* Embed Preview */}
              {showEmbedPreview && (
                <div className="p-4 rounded-lg bg-surface border-l-4" style={{ borderLeftColor: embedColor }}>
                  <div className="text-xs font-bold mb-2">Welcome to ZO Syndicate!</div>
                  <div className="text-xs text-muted whitespace-pre-line">
                    {welcomeMessage
                      .replace("{user}", "@NewUser")
                      .replace("{memberCount}", "1,247")
                      .replace("{server}", "ZO Syndicate")}
                  </div>
                  <div className="mt-3 text-[10px] text-dim">Today at 3:42 PM</div>
                </div>
              )}
            </div>
          </div>

          {/* Welcome DM */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Welcome DM</h2>
              <button
                onClick={() => setDmEnabled(!dmEnabled)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  dmEnabled ? "bg-emerald" : "bg-dim"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                  dmEnabled ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            {dmEnabled && (
              <textarea
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none font-mono"
              />
            )}
          </div>

          {/* Leave Message */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Leave Message</h2>
              <button
                onClick={() => setLeaveEnabled(!leaveEnabled)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  leaveEnabled ? "bg-emerald" : "bg-dim"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                  leaveEnabled ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            {leaveEnabled && (
              <div>
                <textarea
                  value={leaveMessage}
                  onChange={(e) => setLeaveMessage(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none font-mono"
                />
                <p className="text-[10px] text-dim mt-1.5">Sent to the welcome channel when a member leaves.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Auto-Roles + Variables */}
        <div className="space-y-6">
          {/* Auto-Roles */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Auto-Roles on Join</h2>
              <button className="text-xs text-muted hover:text-foreground transition-colors">Add Role</button>
            </div>
            <div className="space-y-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: role.color }}
                    />
                    <span className="text-xs font-semibold">{role.name}</span>
                  </div>
                  <button
                    onClick={() => toggleRole(role.id)}
                    className={`w-8 h-4 rounded-full transition-colors ${
                      role.enabled ? "bg-emerald" : "bg-dim"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-transform ${
                      role.enabled ? "translate-x-4" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Welcome Image */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Welcome Image</h2>
            <div className="aspect-video rounded-lg bg-glass border border-glass-border flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-glass-border-hover transition-colors">
              <svg className="w-8 h-8 text-dim" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              <span className="text-xs text-dim">Click to upload welcome banner</span>
              <span className="text-[10px] text-dim">1200x400 recommended</span>
            </div>
          </div>

          {/* Available Variables */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Variables</h2>
            <div className="space-y-2">
              {WELCOME_VARIABLES.map((v) => (
                <div key={v.var} className="flex items-center justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                  <code className="text-data text-xs text-electric">{v.var}</code>
                  <span className="text-[10px] text-dim">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Welcome Stats</h2>
            <div className="space-y-3">
              {[
                { label: "Welcome Messages Sent", value: "1,247" },
                { label: "DMs Delivered", value: "1,089" },
                { label: "DMs Failed", value: "158" },
                { label: "Auto-Roles Assigned", value: "3,741" },
                { label: "Members This Week", value: "+23" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
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
