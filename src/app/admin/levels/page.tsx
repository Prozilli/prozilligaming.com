"use client";

import { useState } from "react";

/* ============================================================
   XP / Levels System Page
   ============================================================ */

const LEADERBOARD = [
  { rank: 1, user: "PixelKing", level: 42, xp: 84200, messages: 8912, platform: "Discord", avatar: "P" },
  { rank: 2, user: "NightRider_99", level: 38, xp: 71400, messages: 7234, platform: "Twitch", avatar: "N" },
  { rank: 3, user: "GhostPepper42", level: 35, xp: 62100, messages: 6891, platform: "Kick", avatar: "G" },
  { rank: 4, user: "TurboFan_X", level: 31, xp: 55800, messages: 5432, platform: "Twitch", avatar: "T" },
  { rank: 5, user: "LunaStream", level: 28, xp: 48900, messages: 4781, platform: "YouTube", avatar: "L" },
  { rank: 6, user: "CyberNova", level: 26, xp: 44200, messages: 4321, platform: "Discord", avatar: "C" },
  { rank: 7, user: "BlazeMaster", level: 24, xp: 39800, messages: 3890, platform: "Twitch", avatar: "B" },
  { rank: 8, user: "ShadowFox", level: 22, xp: 35100, messages: 3456, platform: "Kick", avatar: "S" },
  { rank: 9, user: "IceQueen_X", level: 20, xp: 31400, messages: 3012, platform: "Discord", avatar: "I" },
  { rank: 10, user: "StormChaser", level: 18, xp: 27200, messages: 2678, platform: "Twitch", avatar: "S" },
];

interface RoleReward {
  level: number;
  roleName: string;
  color: string;
  perks: string[];
}

const ROLE_REWARDS: RoleReward[] = [
  { level: 5, roleName: "Newcomer", color: "#7a8599", perks: ["Access to #general", "Basic emotes"] },
  { level: 10, roleName: "Regular", color: "#38bdf8", perks: ["Image permissions", "Custom nickname color"] },
  { level: 20, roleName: "Veteran", color: "#34d399", perks: ["Voice channel priority", "Extended message length"] },
  { level: 30, roleName: "Elite", color: "#c4a265", perks: ["Private channels access", "Custom role color"] },
  { level: 50, roleName: "Legend", color: "#dc2626", perks: ["VIP lounge access", "Custom emote slot", "Direct message to Pro"] },
];

const XP_MULTIPLIERS = [
  { platform: "Twitch", multiplier: 1.0, color: "#9146ff" },
  { platform: "Kick", multiplier: 1.2, color: "#53fc18" },
  { platform: "YouTube", multiplier: 1.0, color: "#ff0000" },
  { platform: "Discord", multiplier: 0.8, color: "#5865f2" },
  { platform: "Trovo", multiplier: 1.5, color: "#19d65c" },
];

export default function LevelsPage() {
  const [xpPerMessage, setXpPerMessage] = useState(15);
  const [xpPerMinute, setXpPerMinute] = useState(5);
  const [levelUpAnnounce, setLevelUpAnnounce] = useState(true);
  const [multipliers, setMultipliers] = useState(XP_MULTIPLIERS);
  const [xpCurve, setXpCurve] = useState<"linear" | "exponential" | "logarithmic">("exponential");

  const updateMultiplier = (platform: string, value: number) => {
    setMultipliers((prev) =>
      prev.map((m) => (m.platform === platform ? { ...m, multiplier: value } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Levels & XP</h1>
          <p className="text-sm text-muted mt-1">Configure experience points, level rewards, and leaderboards</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Reset All XP
          </button>
          <button className="btn btn-primary btn-sm">Save Settings</button>
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
                    type="range"
                    min="1"
                    max="50"
                    value={xpPerMessage}
                    onChange={(e) => setXpPerMessage(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-electric [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-data text-sm font-bold w-10 text-right">{xpPerMessage}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">XP per Minute (Watch)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={xpPerMinute}
                    onChange={(e) => setXpPerMinute(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-electric [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-data text-sm font-bold w-10 text-right">{xpPerMinute}</span>
                </div>
              </div>
            </div>

            {/* XP Curve */}
            <div className="mt-6">
              <label className="text-xs font-semibold text-dim block mb-3">XP Curve</label>
              <div className="flex gap-3">
                {(["linear", "exponential", "logarithmic"] as const).map((curve) => (
                  <button
                    key={curve}
                    onClick={() => setXpCurve(curve)}
                    className={`flex-1 p-3 rounded-lg border text-center text-xs font-semibold capitalize transition-all ${
                      xpCurve === curve
                        ? "bg-electric/10 border-electric/30 text-electric"
                        : "bg-glass border-glass-border text-muted hover:border-glass-border-hover"
                    }`}
                  >
                    {curve}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-dim mt-2">
                {xpCurve === "linear" && "Each level requires the same amount of XP. Simple and predictable."}
                {xpCurve === "exponential" && "Higher levels require significantly more XP. Standard for most systems."}
                {xpCurve === "logarithmic" && "Early levels are harder, later levels get progressively easier."}
              </p>
            </div>

            {/* Announcements */}
            <div className="mt-6 flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
              <div>
                <div className="text-xs font-semibold">Level-Up Announcements</div>
                <div className="text-[10px] text-dim">Post a message when users level up</div>
              </div>
              <button
                onClick={() => setLevelUpAnnounce(!levelUpAnnounce)}
                className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                  levelUpAnnounce ? "bg-emerald" : "bg-dim"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                  levelUpAnnounce ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          </div>

          {/* Platform Multipliers */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Platform XP Multipliers</h2>
            <div className="space-y-3">
              {multipliers.map((m) => (
                <div key={m.platform} className="flex items-center gap-4 p-3 rounded-lg bg-glass border border-glass-border">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: `${m.color}20`, color: m.color }}
                  >
                    {m.platform.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold w-20">{m.platform}</span>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={m.multiplier}
                    onChange={(e) => updateMultiplier(m.platform, Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-glass cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-data text-sm font-bold w-12 text-right">{m.multiplier}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Rewards */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Level-Up Role Rewards</h2>
              <button className="btn btn-ghost btn-sm text-xs">Add Reward</button>
            </div>
            <div className="space-y-3">
              {ROLE_REWARDS.map((reward) => (
                <div key={reward.level} className="flex items-start gap-4 p-4 rounded-lg bg-glass border border-glass-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0 bg-glass border border-glass-border">
                    {reward.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: reward.color }}>
                        {reward.roleName}
                      </span>
                      <span className="text-[10px] text-dim">Level {reward.level}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {reward.perks.map((perk) => (
                        <span key={perk} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-muted">
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm text-xs flex-shrink-0">Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Leaderboard */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Leaderboard</h2>
            <div className="space-y-1">
              {LEADERBOARD.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-glass ${
                    entry.rank <= 3 ? "bg-glass/50" : ""
                  }`}
                >
                  <span className={`text-data text-xs font-bold w-5 text-center ${
                    entry.rank === 1 ? "text-gold" :
                    entry.rank === 2 ? "text-muted" :
                    entry.rank === 3 ? "text-[#cd7f32]" : "text-dim"
                  }`}>
                    {entry.rank}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-glass border border-glass-border flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {entry.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{entry.user}</div>
                    <div className="text-[10px] text-dim">Lv.{entry.level} &middot; {entry.xp.toLocaleString()} XP</div>
                  </div>
                  <div className="text-[10px] text-dim text-right">
                    {entry.messages.toLocaleString()} msgs
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XP Preview */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">XP to Next Level</h2>
            <div className="space-y-3">
              {[
                { level: "1 -> 2", xp: "100 XP" },
                { level: "5 -> 6", xp: "500 XP" },
                { level: "10 -> 11", xp: "1,500 XP" },
                { level: "20 -> 21", xp: "4,000 XP" },
                { level: "30 -> 31", xp: "8,500 XP" },
                { level: "50 -> 51", xp: "22,500 XP" },
              ].map((preview) => (
                <div key={preview.level} className="flex items-center justify-between p-2 rounded-lg hover:bg-glass transition-colors">
                  <span className="text-xs text-muted">{preview.level}</span>
                  <span className="text-data text-xs font-semibold">{preview.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
