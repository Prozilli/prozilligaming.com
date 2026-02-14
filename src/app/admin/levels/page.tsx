"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface LeaderboardEntry {
  rank?: number;
  username: string;
  platform: string;
  level: number;
  xp: number;
  messages?: number;
}

interface RoleReward {
  level: number;
  roleName: string;
  color: string;
  perks: string[];
}

const DEFAULT_ROLE_REWARDS: RoleReward[] = [
  { level: 5, roleName: "Newcomer", color: "#7a8599", perks: ["Access to #general", "Basic emotes"] },
  { level: 10, roleName: "Regular", color: "#38bdf8", perks: ["Image permissions", "Custom nickname color"] },
  { level: 20, roleName: "Veteran", color: "#34d399", perks: ["Voice channel priority", "Extended message length"] },
  { level: 30, roleName: "Elite", color: "#c4a265", perks: ["Private channels access", "Custom role color"] },
  { level: 50, roleName: "Legend", color: "#dc2626", perks: ["VIP lounge access", "Custom emote slot", "Direct message to Pro"] },
];

const PLATFORM_COLORS: Record<string, string> = {
  twitch: "#9146ff", kick: "#53fc18", youtube: "#ff0000", discord: "#5865f2", trovo: "#19d65c",
};

export default function LevelsPage() {
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local form state
  const [xpPerMessage, setXpPerMessage] = useState(15);
  const [xpCooldown, setXpCooldown] = useState(60);
  const [levelUpAnnounce, setLevelUpAnnounce] = useState(true);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, leaderboardRes] = await Promise.allSettled([
          api.levelsConfig(),
          api.levelsLeaderboard(20),
        ]);

        if (configRes.status === "fulfilled") {
          const c = configRes.value as Record<string, unknown>;
          setConfig(c);
          setEnabled((c.enabled as boolean) ?? true);
          setXpPerMessage((c.xpPerMessage as number) ?? 15);
          setXpCooldown((c.xpCooldown as number) ?? 60);
          setLevelUpAnnounce((c.levelUpAnnounce as boolean) ?? true);
        }

        if (leaderboardRes.status === "fulfilled") {
          setLeaderboard((leaderboardRes.value.leaderboard as LeaderboardEntry[]) || []);
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
      await api.levelsSave({
        enabled,
        xpPerMessage,
        xpCooldown,
        levelUpAnnounce,
      } as Record<string, unknown> as never);
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Levels & XP</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading..." : config ? "Connected to PRISMAI" : "Using defaults"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEnabled(!enabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
              enabled ? "bg-emerald/10 border-emerald/30 text-emerald" : "bg-glass border-glass-border text-dim"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${enabled ? "bg-emerald" : "bg-dim"}`} />
            {enabled ? "Active" : "Disabled"}
          </button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP Settings */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">XP Configuration</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">XP per Message</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min="1" max="50" value={xpPerMessage}
                    onChange={(e) => setXpPerMessage(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-electric [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-data text-sm font-bold w-10 text-right">{xpPerMessage}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">XP Cooldown (seconds)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min="10" max="300" step="10" value={xpCooldown}
                    onChange={(e) => setXpCooldown(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-electric [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-data text-sm font-bold w-12 text-right">{xpCooldown}s</span>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="mt-6 flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
              <div>
                <div className="text-xs font-semibold">Level-Up Announcements</div>
                <div className="text-[10px] text-dim">Post a message when users level up</div>
              </div>
              <button
                onClick={() => setLevelUpAnnounce(!levelUpAnnounce)}
                className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${levelUpAnnounce ? "bg-emerald" : "bg-dim"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${levelUpAnnounce ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Role Rewards */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Level-Up Role Rewards</h2>
            </div>
            <div className="space-y-3">
              {DEFAULT_ROLE_REWARDS.map((reward) => (
                <div key={reward.level} className="flex items-start gap-4 p-4 rounded-lg bg-glass border border-glass-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0 bg-glass border border-glass-border">
                    {reward.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: reward.color }}>{reward.roleName}</span>
                      <span className="text-[10px] text-dim">Level {reward.level}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {reward.perks.map((perk) => (
                        <span key={perk} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-muted">{perk}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Leaderboard */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Leaderboard</h2>
            {loading ? (
              <div className="text-center text-xs text-dim py-8">Loading leaderboard...</div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center text-xs text-dim py-8">No leaderboard data yet</div>
            ) : (
              <div className="space-y-1">
                {leaderboard.map((entry, i) => {
                  const rank = entry.rank ?? i + 1;
                  const color = PLATFORM_COLORS[entry.platform?.toLowerCase()] || "#888";
                  return (
                    <div
                      key={`${entry.username}-${entry.platform}`}
                      className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-glass ${rank <= 3 ? "bg-glass/50" : ""}`}
                    >
                      <span className={`text-data text-xs font-bold w-5 text-center ${
                        rank === 1 ? "text-gold" : rank === 2 ? "text-muted" : rank === 3 ? "text-[#cd7f32]" : "text-dim"
                      }`}>
                        {rank}
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate">{entry.username}</div>
                        <div className="text-[10px] text-dim">
                          Lv.{entry.level} &middot; {entry.xp.toLocaleString()} XP
                        </div>
                      </div>
                      {entry.messages != null && (
                        <div className="text-[10px] text-dim text-right">{entry.messages.toLocaleString()} msgs</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Config Status */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Config Source</h2>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                <span className="text-xs text-muted">Source</span>
                <span className="text-data text-xs font-semibold text-electric">{config ? "PRISMAI API" : "Local Defaults"}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                <span className="text-xs text-muted">XP per Message</span>
                <span className="text-data text-xs font-semibold">{xpPerMessage}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                <span className="text-xs text-muted">Cooldown</span>
                <span className="text-data text-xs font-semibold">{xpCooldown}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
