"use client";

import { useState, useEffect, useCallback } from "react";
import { getLevelsConfig, saveLevelsConfig, getLeaderboard, getLevelRewards, saveLevelRewards, useDiscordTextChannels, useDiscordRoles } from "@/lib/admin-api";

type TabType = "settings" | "rewards" | "leaderboard";

interface LevelsConfig {
  enabled: boolean;
  minXp: number;
  maxXp: number;
  cooldownMs: number;
  multiplier: number;
  announceChannel: string | null;
  announceDm: boolean;
  announceMessage: string;
  stackRoles: boolean;
  removeOnLevelDown: boolean;
  publicLeaderboard: boolean;
}

interface LeaderboardUser {
  platform: string;
  user_id: string;
  username: string;
  xp: number;
  level: number;
  messages: number;
}

interface LevelReward {
  level: number;
  roleId: string;
  roleName?: string;
}

const DEFAULT_CONFIG: LevelsConfig = {
  enabled: true,
  minXp: 15,
  maxXp: 25,
  cooldownMs: 60000,
  multiplier: 1.0,
  announceChannel: null,
  announceDm: false,
  announceMessage: "🎉 {user} just reached **Level {level}**!",
  stackRoles: true,
  removeOnLevelDown: false,
  publicLeaderboard: true,
};

export default function LevelsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("settings");
  const [config, setConfig] = useState<LevelsConfig>(DEFAULT_CONFIG);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [rewards, setRewards] = useState<LevelReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const { channels: textChannels } = useDiscordTextChannels();
  const { roles } = useDiscordRoles();

  // Add reward form
  const [newRewardLevel, setNewRewardLevel] = useState(5);
  const [newRewardRoleId, setNewRewardRoleId] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [configRes, lbRes, rewardsRes] = await Promise.all([
        getLevelsConfig(),
        getLeaderboard(20),
        getLevelRewards(),
      ]);
      if (configRes.config) setConfig({ ...DEFAULT_CONFIG, ...configRes.config } as LevelsConfig);
      if (lbRes.leaderboard) setLeaderboard(lbRes.leaderboard);
      if (rewardsRes.rewards) setRewards(rewardsRes.rewards);
    } catch (err) {
      console.error("Failed to load levels data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSaveConfig = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      await saveLevelsConfig(config as unknown as Record<string, unknown>);
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch {
      setSaveMsg("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRewards = async () => {
    setSaving(true);
    try {
      await saveLevelRewards(rewards);
      setSaveMsg("Rewards saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch {
      setSaveMsg("Failed to save rewards");
    } finally {
      setSaving(false);
    }
  };

  const addReward = () => {
    if (!newRewardRoleId) return;
    const role = roles.find(r => r.id === newRewardRoleId);
    setRewards(prev => [...prev, { level: newRewardLevel, roleId: newRewardRoleId, roleName: role?.name }].sort((a, b) => a.level - b.level));
    setNewRewardLevel(5);
    setNewRewardRoleId("");
  };

  const removeReward = (index: number) => {
    setRewards(prev => prev.filter((_, i) => i !== index));
  };

  const updateConfig = <K extends keyof LevelsConfig>(key: K, value: LevelsConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Levels & XP</h1>
          <p className="mt-1 text-sm text-gray-400">Reward active members with XP and level-based roles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateConfig("enabled", !config.enabled)}
            className={`relative h-6 w-11 rounded-full transition-colors ${config.enabled ? "bg-green-500" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enabled ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-400">{config.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        {[
          { id: "settings", label: "Settings" },
          { id: "rewards", label: "Role Rewards" },
          { id: "leaderboard", label: "Leaderboard" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-brand-red text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Rank Card Preview */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-sm font-semibold text-white">Rank Card Preview</h3>
              <span className="text-xs text-gray-500 ml-1">How member rank cards appear</span>
            </div>
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #0d1117 0%, #161b22 40%, #1a0a0a 100%)",
                  boxShadow: "0 0 40px rgba(145, 0, 0, 0.2), 0 4px 30px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(145, 0, 0, 0.3)",
                }}
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent" />
                <div className="p-6">
                  <div className="flex items-center gap-5">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                        style={{
                          background: "linear-gradient(135deg, #910000 0%, #c41000 100%)",
                          boxShadow: "0 0 20px rgba(145, 0, 0, 0.4)",
                        }}
                      >
                        {leaderboard.length > 0 ? leaderboard[0].username.charAt(0).toUpperCase() : "P"}
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-[3px] border-[#0d1117] bg-green-500" />
                    </div>
                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-white truncate">
                          {leaderboard.length > 0 ? leaderboard[0].username : "ProzilliGaming"}
                        </h4>
                        <span className="flex-shrink-0 rounded-md bg-brand-red/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">
                          Rank #1
                        </span>
                      </div>
                      {/* Level Display */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-black" style={{ color: "#c41000", textShadow: "0 0 20px rgba(196, 16, 0, 0.3)" }}>
                          {leaderboard.length > 0 ? leaderboard[0].level : 42}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Level</span>
                      </div>
                      {/* XP Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-gray-400">
                            {leaderboard.length > 0 ? formatNumber(leaderboard[0].xp) : "12,450"} XP
                          </span>
                          <span className="text-[11px] font-medium text-gray-500">
                            {leaderboard.length > 0 ? formatNumber(Math.ceil(leaderboard[0].xp * 1.2)) : "15,000"} XP
                          </span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: "72%",
                              background: "linear-gradient(90deg, #910000, #c41000, #e63946)",
                              boxShadow: "0 0 10px rgba(145, 0, 0, 0.5)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Stats Row */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
                      <p className="text-xs text-gray-500">Messages</p>
                      <p className="text-sm font-bold text-white">{leaderboard.length > 0 ? formatNumber(leaderboard[0].messages) : "2,847"}</p>
                    </div>
                    <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
                      <p className="text-xs text-gray-500">Total XP</p>
                      <p className="text-sm font-bold text-white">{leaderboard.length > 0 ? formatNumber(leaderboard[0].xp) : "12,450"}</p>
                    </div>
                    <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
                      <p className="text-xs text-gray-500">Platform</p>
                      <p className="text-sm font-bold text-white">{leaderboard.length > 0 ? leaderboard[0].platform : "Discord"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600">XP Settings</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">XP Earning</h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Min XP per Message</label>
                  <input type="number" value={config.minXp} onChange={(e) => updateConfig("minXp", parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Max XP per Message</label>
                  <input type="number" value={config.maxXp} onChange={(e) => updateConfig("maxXp", parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Cooldown (seconds)</label>
                <input type="number" value={config.cooldownMs / 1000} onChange={(e) => updateConfig("cooldownMs", (parseInt(e.target.value) || 60) * 1000)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red" />
                <p className="mt-1 text-xs text-gray-500">Time between XP gains to prevent spam</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">XP Multiplier</label>
                <select value={config.multiplier} onChange={(e) => updateConfig("multiplier", parseFloat(e.target.value))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red">
                  <option value={0.5}>0.5x (Slow)</option>
                  <option value={1}>1x (Normal)</option>
                  <option value={1.5}>1.5x (Fast)</option>
                  <option value={2}>2x (Double)</option>
                  <option value={3}>3x (Triple)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Announcements</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Level Up Announcement */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Level Up Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Announce Channel</label>
                <select value={config.announceChannel || ""} onChange={(e) => updateConfig("announceChannel", e.target.value || null)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red">
                  <option value="">Don&apos;t Announce</option>
                  {textChannels.map(ch => (
                    <option key={ch.id} value={ch.id}>#{ch.name}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={config.announceDm} onChange={(e) => updateConfig("announceDm", e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red" />
                <div>
                  <p className="text-sm text-white">Also DM the user</p>
                </div>
              </label>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Message Template</label>
                <textarea value={config.announceMessage} onChange={(e) => updateConfig("announceMessage", e.target.value)} rows={3} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red resize-none" />
                <p className="mt-1 text-xs text-gray-500">Variables: {"{user}"}, {"{level}"}</p>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Roles</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Role Behavior */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Role Behavior</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={config.stackRoles} onChange={(e) => updateConfig("stackRoles", e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red" />
                <div>
                  <p className="text-sm text-white">Stack Roles</p>
                  <p className="text-xs text-gray-500">Keep all earned roles instead of just the highest</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={config.removeOnLevelDown} onChange={(e) => updateConfig("removeOnLevelDown", e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red" />
                <div>
                  <p className="text-sm text-white">Remove on Level Down</p>
                  <p className="text-xs text-gray-500">Remove role rewards if member loses levels</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {saveMsg && <span className="text-sm text-green-400">{saveMsg}</span>}
            <button onClick={handleSaveConfig} disabled={saving} className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Role Rewards Tab */}
      {activeTab === "rewards" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Add Role Reward</h3>
            <div className="flex gap-3 items-end">
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-400 mb-2">Level</label>
                <input type="number" min={1} value={newRewardLevel} onChange={(e) => setNewRewardLevel(parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-2">Role</label>
                <select value={newRewardRoleId} onChange={(e) => setNewRewardRoleId(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none">
                  <option value="">Select a role...</option>
                  {roles.filter(r => !r.managed).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={addReward} disabled={!newRewardRoleId} className="rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50">
                Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rewards.length === 0 && (
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-8 text-center">
                <p className="text-gray-400">No role rewards configured yet.</p>
              </div>
            )}
            {rewards.map((reward, index) => {
              const role = roles.find(r => r.id === reward.roleId);
              return (
                <div key={index} className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#161b22] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-xl font-bold text-white">
                    {reward.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: role?.color || "#888" }} />
                      <span className="text-sm font-medium text-white">{reward.roleName || role?.name || "Unknown Role"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{role?.memberCount || 0} members</p>
                  </div>
                  <button onClick={() => removeReward(index)} className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3">
            {saveMsg && <span className="text-sm text-green-400">{saveMsg}</span>}
            <button onClick={handleSaveRewards} disabled={saving} className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Rewards"}
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Top Members</h3>
              <button onClick={loadData} className="text-xs text-brand-red hover:text-white transition-colors">Refresh</button>
            </div>
            {leaderboard.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No XP data yet. Members will appear as they chat.</p>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((user, i) => (
                  <div
                    key={`${user.platform}-${user.user_id}`}
                    className={`flex items-center gap-4 rounded-lg p-4 transition-colors ${
                      i === 0 ? "bg-brand-gold/10 border border-brand-gold/20" :
                      i === 1 ? "bg-gray-400/5 border border-gray-400/10" :
                      i === 2 ? "bg-amber-700/10 border border-amber-700/15" :
                      "bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="relative flex-shrink-0">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${i === 0 ? "bg-brand-gold text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-white/10 text-gray-400"}`}>
                        {i + 1}
                      </span>
                      {i < 3 && (
                        <svg className="absolute -top-2 -right-2" width="14" height="14" viewBox="0 0 24 24" fill={i === 0 ? "#c4a265" : i === 1 ? "#949d9f" : "#b45309"} stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                    </div>
                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/20 text-brand-red font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.username}</p>
                      <p className="text-xs text-gray-500">{formatNumber(user.xp)} XP &middot; {formatNumber(user.messages)} messages &middot; {user.platform}</p>
                    </div>
                    {/* Level */}
                    <div className="text-right flex-shrink-0">
                      <p className={`text-lg font-bold ${i === 0 ? "text-brand-gold" : "text-white"}`}>Lv.{user.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard Settings */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Leaderboard Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={config.publicLeaderboard} onChange={(e) => updateConfig("publicLeaderboard", e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red" />
              <div>
                <p className="text-sm text-white">Public Leaderboard</p>
                <p className="text-xs text-gray-500">Allow members to view the leaderboard with !leaderboard</p>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
