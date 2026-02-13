"use client";

import { useState, useEffect } from "react";
import { useDiscordTextChannels, getSetting, saveSetting } from "@/lib/admin-api";

interface Milestone {
  name: string;
  trigger: string;
  threshold: number;
  reward: string;
}

interface AchievementsConfig {
  enabled: boolean;
  channelId: string;
  milestones: Milestone[];
}

const TRIGGER_TYPES = [
  { value: "messages", label: "Messages" },
  { value: "xp", label: "XP" },
  { value: "level", label: "Level" },
  { value: "watch_time", label: "Watch Time (hrs)" },
  { value: "donations", label: "Donations ($)" },
];

const TRIGGER_COLORS: Record<string, string> = {
  messages: "#3b82f6",
  xp: "#eab308",
  level: "#8b5cf6",
  watch_time: "#22c55e",
  donations: "#f59e0b",
};

const TRIGGER_BG: Record<string, string> = {
  messages: "bg-blue-500/20",
  xp: "bg-yellow-500/20",
  level: "bg-purple-500/20",
  watch_time: "bg-green-500/20",
  donations: "bg-amber-500/20",
};

function TrophyIcon({ trigger, size = 20 }: { trigger: string; size?: number }) {
  const color = TRIGGER_COLORS[trigger] || "#888";
  if (trigger === "messages") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (trigger === "xp") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (trigger === "level") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    );
  }
  if (trigger === "watch_time") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (trigger === "donations") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

const DEFAULT_CONFIG: AchievementsConfig = {
  enabled: false,
  channelId: "",
  milestones: [
    { name: "First Message", trigger: "messages", threshold: 1, reward: "Welcome badge" },
    { name: "Chatterbox", trigger: "messages", threshold: 500, reward: "Chatterbox badge" },
    { name: "Rising Star", trigger: "level", threshold: 10, reward: "Rising Star role" },
    { name: "Dedicated Viewer", trigger: "watch_time", threshold: 50, reward: "Dedicated Viewer badge" },
    { name: "Supporter", trigger: "donations", threshold: 10, reward: "Supporter badge" },
  ],
};

export default function AchievementsPage() {
  const [config, setConfig] = useState<AchievementsConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const saved = await getSetting<AchievementsConfig>("achievements_config");
        if (saved) setConfig(saved);
      } catch (err) {
        console.error("Failed to load achievements settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("achievements_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addMilestone = () => {
    setConfig((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { name: "", trigger: "messages", threshold: 100, reward: "" },
      ],
    }));
  };

  const removeMilestone = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const updateMilestone = <K extends keyof Milestone>(index: number, key: K, value: Milestone[K]) => {
    setConfig((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => (i === index ? { ...m, [key]: value } : m)),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Achievements</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track milestones and award badges to your community members
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative h-6 w-11 rounded-full transition-colors ${config.enabled ? "bg-red" : "bg-raised"}`}
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enabled ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-400">{config.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Achievement Notification Preview */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-sm font-semibold text-white">Preview</h3>
          <span className="text-xs text-gray-500 ml-1">How achievement announcements appear</span>
        </div>
        <div className="flex justify-center">
          <div className="panel glow-border w-full max-w-md rounded-xl p-4" style={{ boxShadow: "0 0 30px rgba(145, 0, 0, 0.15), inset 0 0 30px rgba(145, 0, 0, 0.03)" }}>
            <div className="flex items-center gap-4">
              {/* Trophy Icon */}
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15" style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.15)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              {/* Achievement Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Achievement Unlocked</span>
                </div>
                <p className="text-sm font-bold text-white truncate">
                  {config.milestones[0]?.name || "First Message"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {config.milestones[0]?.reward || "Welcome badge"}
                </p>
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Progress</span>
                    <span className="text-[10px] text-gray-500">{config.milestones[0]?.threshold || 1}/{config.milestones[0]?.threshold || 1}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-raised overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-surface" />
        <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Configuration</span>
        <div className="h-px flex-1 bg-surface" />
      </div>

      {/* Announce Channel */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Announce Channel</h3>
        <p className="text-xs text-gray-500 mb-3">
          Where achievement unlock announcements will be posted
        </p>
        {channelsLoading ? (
          <div className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-gray-500">
            Loading channels...
          </div>
        ) : channelsError ? (
          <div className="w-full rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {channelsError}
          </div>
        ) : (
          <select
            value={config.channelId}
            onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
            className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
          >
            <option value="">Select a channel</option>
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                #{channel.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Milestones Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Milestones</h3>
            <p className="text-xs text-gray-500 mt-1">
              Define achievements that members can unlock
            </p>
          </div>
          <button
            onClick={addMilestone}
            className="flex items-center gap-1.5 rounded-lg bg-surface px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-raised"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Milestone
          </button>
        </div>

        {config.milestones.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            No milestones configured. Click &quot;Add Milestone&quot; to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1"></div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Trigger</div>
              <div className="col-span-2">Threshold</div>
              <div className="col-span-3">Reward</div>
              <div className="col-span-1"></div>
            </div>

            {/* Milestone Rows */}
            {config.milestones.map((milestone, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-lg bg-surface p-3 items-center transition-colors hover:bg-white/[0.07]"
                style={{ borderLeft: `3px solid ${TRIGGER_COLORS[milestone.trigger] || "#888"}` }}
              >
                {/* Trophy Icon */}
                <div className="hidden sm:flex sm:col-span-1 justify-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${TRIGGER_BG[milestone.trigger] || "bg-raised"}`}>
                    <TrophyIcon trigger={milestone.trigger} size={18} />
                  </div>
                </div>

                {/* Name */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Name</label>
                  <div className="flex items-center gap-2 sm:block">
                    <div className={`flex sm:hidden h-8 w-8 items-center justify-center rounded-lg ${TRIGGER_BG[milestone.trigger] || "bg-raised"}`}>
                      <TrophyIcon trigger={milestone.trigger} size={16} />
                    </div>
                    <input
                      type="text"
                      value={milestone.name}
                      onChange={(e) => updateMilestone(index, "name", e.target.value)}
                      placeholder="Achievement name"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                {/* Trigger */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Trigger</label>
                  <select
                    value={milestone.trigger}
                    onChange={(e) => updateMilestone(index, "trigger", e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    {TRIGGER_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Threshold */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Threshold</label>
                  <input
                    type="number"
                    min={1}
                    value={milestone.threshold}
                    onChange={(e) => updateMilestone(index, "threshold", parseInt(e.target.value) || 1)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Reward Badge */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Reward</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={milestone.reward}
                      onChange={(e) => updateMilestone(index, "reward", e.target.value)}
                      placeholder="Reward description"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                    />
                    {milestone.reward && (
                      <span
                        className="hidden sm:inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ backgroundColor: `${TRIGGER_COLORS[milestone.trigger]}20`, color: TRIGGER_COLORS[milestone.trigger] || "#888" }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Badge
                      </span>
                    )}
                  </div>
                </div>

                {/* Remove */}
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeMilestone(index)}
                    className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {saveStatus === "success" && (
          <span className="text-sm text-green-400">Saved successfully!</span>
        )}
        {saveStatus === "error" && (
          <span className="text-sm text-red-400">Failed to save</span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-red px-6 py-2.5 text-sm font-medium text-white hover:bg-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
