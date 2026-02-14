"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const WELCOME_VARIABLES = [
  { var: "{user}", desc: "Username/mention" },
  { var: "{server}", desc: "Server name" },
  { var: "{memberCount}", desc: "Total members" },
  { var: "{user.avatar}", desc: "User avatar URL" },
  { var: "{user.createdAt}", desc: "Account creation date" },
];

export default function WelcomePage() {
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showEmbedPreview, setShowEmbedPreview] = useState(false);
  const [channels, setChannels] = useState<{ id: string; name: string; type: number; parentId: string | null }[]>([]);

  // Local form state (populated from API)
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [welcomeChannel, setWelcomeChannel] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [dmEnabled, setDmEnabled] = useState(true);
  const [dmMessage, setDmMessage] = useState("");
  const [leaveEnabled, setLeaveEnabled] = useState(true);
  const [leaveMessage, setLeaveMessage] = useState("");
  const [embedColor, setEmbedColor] = useState("#910000");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [welcomeRes, channelsRes] = await Promise.allSettled([
          api.welcomeConfig(),
          api.discordChannels(),
        ]);

        if (welcomeRes.status === "fulfilled") {
          const c = welcomeRes.value as Record<string, unknown>;
          setConfig(c);
          setWelcomeEnabled((c.enabled as boolean) ?? true);
          setWelcomeChannel((c.channelId as string) ?? "");
          setWelcomeMessage((c.message as string) ?? "Welcome to **ZO Syndicate**, {user}! You're member #{memberCount}.");
          setDmEnabled((c.dmEnabled as boolean) ?? true);
          setDmMessage((c.dmMessage as string) ?? "Hey {user}! Welcome to the ZO Syndicate Discord.");
          setLeaveEnabled((c.leaveEnabled as boolean) ?? true);
          setLeaveMessage((c.leaveMessage as string) ?? "{user} has left the server.");
          setEmbedColor((c.embedColor as string) ?? "#910000");
        }

        if (channelsRes.status === "fulfilled") {
          const ch = channelsRes.value.channels as { id: string; name: string; type: number; parentId: string | null }[];
          setChannels(ch.filter((c) => c.type === 0)); // text channels only
        }
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.welcomeSave({
        enabled: welcomeEnabled,
        channelId: welcomeChannel,
        message: welcomeMessage,
        dmEnabled,
        dmMessage,
        leaveEnabled,
        leaveMessage,
        embedColor,
      } as Record<string, unknown> as never);
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      await api.welcomeTest();
    } catch {
      // silent
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-sm text-dim">Loading welcome config...</div>
      </div>
    );
  }

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
          <button onClick={handleTest} disabled={testing} className="btn btn-secondary btn-sm">
            {testing ? "Testing..." : "Send Test"}
          </button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? "Saving..." : "Save All"}
          </button>
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
                  <option value="">Select a channel</option>
                  {channels.map((ch) => (
                    <option key={ch.id} value={ch.id}>#{ch.name}</option>
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
                    <input type="color" value={embedColor} onChange={(e) => setEmbedColor(e.target.value)} className="w-10 h-10 rounded-lg border border-glass-border cursor-pointer bg-transparent" />
                    <input type="text" value={embedColor} onChange={(e) => setEmbedColor(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-glass border border-glass-border text-data text-sm focus:outline-none focus:border-red/50 transition-colors" />
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={() => setShowEmbedPreview(!showEmbedPreview)} className="btn btn-secondary btn-sm w-full">
                    {showEmbedPreview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>
              </div>

              {showEmbedPreview && (
                <div className="p-4 rounded-lg bg-surface border-l-4" style={{ borderLeftColor: embedColor }}>
                  <div className="text-xs font-bold mb-2">Welcome to ZO Syndicate!</div>
                  <div className="text-xs text-muted whitespace-pre-line">
                    {welcomeMessage.replace("{user}", "@NewUser").replace("{memberCount}", "1,247").replace("{server}", "ZO Syndicate")}
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
              <button onClick={() => setDmEnabled(!dmEnabled)} className={`w-10 h-5 rounded-full transition-colors ${dmEnabled ? "bg-emerald" : "bg-dim"}`}>
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${dmEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {dmEnabled && (
              <textarea value={dmMessage} onChange={(e) => setDmMessage(e.target.value)} rows={6} className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none font-mono" />
            )}
          </div>

          {/* Leave Message */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Leave Message</h2>
              <button onClick={() => setLeaveEnabled(!leaveEnabled)} className={`w-10 h-5 rounded-full transition-colors ${leaveEnabled ? "bg-emerald" : "bg-dim"}`}>
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${leaveEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {leaveEnabled && (
              <div>
                <textarea value={leaveMessage} onChange={(e) => setLeaveMessage(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none font-mono" />
                <p className="text-[10px] text-dim mt-1.5">Sent to the welcome channel when a member leaves.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Variables + Info */}
        <div className="space-y-6">
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

          {/* Connection Status */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                <span className="text-xs text-muted">Config Source</span>
                <span className="text-data text-xs font-semibold text-electric">{config ? "PRISMAI" : "Defaults"}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                <span className="text-xs text-muted">Channels Available</span>
                <span className="text-data text-xs font-semibold">{channels.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
