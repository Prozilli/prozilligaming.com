"use client";

import { useState, useEffect } from "react";
import { useDiscordChannels, getSetting, saveSetting } from "@/lib/admin-api";

interface StatChannel {
  channelId: string;
  statType: string;
  format: string;
}

interface StatsChannelsConfig {
  enabled: boolean;
  channels: StatChannel[];
}

const DEFAULT_CONFIG: StatsChannelsConfig = {
  enabled: false,
  channels: [],
};

const STAT_TYPES = [
  { value: "members", label: "Members" },
  { value: "online", label: "Online" },
  { value: "bots", label: "Bots" },
  { value: "roles", label: "Roles" },
  { value: "channels", label: "Channels" },
  { value: "boosts", label: "Boosts" },
];

const FORMAT_PRESETS: Record<string, string> = {
  members: "Members: {count}",
  online: "Online: {count}",
  bots: "Bots: {count}",
  roles: "Roles: {count}",
  channels: "Channels: {count}",
  boosts: "Boosts: {count}",
};

const EMPTY_CHANNEL: StatChannel = {
  channelId: "",
  statType: "members",
  format: "Members: {count}",
};

export default function StatsChannelsPage() {
  const [config, setConfig] = useState<StatsChannelsConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels: allChannels, loading: channelsLoading, error: channelsError } = useDiscordChannels();
  const voiceChannels = allChannels.filter((c) => c.type === 2);

  // Load settings on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getSetting<StatsChannelsConfig>("stats_channels_config");
        if (stored) setConfig(stored);
      } catch {
        // fall back to defaults
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("stats_channels_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addChannel = () => {
    setConfig({
      ...config,
      channels: [...config.channels, { ...EMPTY_CHANNEL }],
    });
  };

  const removeChannel = (index: number) => {
    setConfig({
      ...config,
      channels: config.channels.filter((_, i) => i !== index),
    });
  };

  const updateChannel = (index: number, updates: Partial<StatChannel>) => {
    const updated = [...config.channels];
    updated[index] = { ...updated[index], ...updates };
    // Auto-update format when stat type changes and format is still a default preset
    if (updates.statType) {
      const currentFormat = updated[index].format;
      const isPreset = Object.values(FORMAT_PRESETS).includes(currentFormat);
      if (isPreset || !currentFormat) {
        updated[index].format = FORMAT_PRESETS[updates.statType] || "{count}";
      }
    }
    setConfig({ ...config, channels: updated });
  };

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
      <div>
        <h1 className="text-2xl font-bold text-white">Stats Channels</h1>
        <p className="mt-1 text-sm text-gray-400">
          Display server statistics in Discord voice channel names
        </p>
      </div>

      {/* Enable Toggle */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Enable Stats Channels</h3>
            <p className="text-xs text-gray-500 mt-1">
              Automatically update voice channel names with live server statistics
            </p>
          </div>
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              config.enabled ? "bg-brand-red" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                config.enabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {config.enabled && (
        <>
          {/* Channel List */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Stat Channels</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Map voice channels to server statistics. Use <code className="text-brand-gold">{"{count}"}</code> in the format template.
                </p>
              </div>
              <button
                onClick={addChannel}
                className="flex items-center gap-1.5 rounded-lg bg-brand-red/10 px-3 py-1.5 text-xs font-medium text-brand-red transition-colors hover:bg-brand-red/20"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Channel
              </button>
            </div>

            {config.channels.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 p-8 text-center">
                <svg className="mx-auto h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No stat channels configured</p>
                <button
                  onClick={addChannel}
                  className="mt-3 text-xs font-medium text-brand-red hover:text-brand-red/80 transition-colors"
                >
                  Add your first stat channel
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Table Header */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_140px_1fr_40px] gap-3 px-1">
                  <span className="text-xs font-medium text-gray-500">Voice Channel</span>
                  <span className="text-xs font-medium text-gray-500">Stat Type</span>
                  <span className="text-xs font-medium text-gray-500">Name Format</span>
                  <span />
                </div>

                {config.channels.map((channel, index) => (
                  <div
                    key={index}
                    className="grid gap-3 sm:grid-cols-[1fr_140px_1fr_40px] rounded-lg border border-white/5 bg-white/[0.02] p-3"
                  >
                    {/* Voice Channel Select */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:hidden">
                        Voice Channel
                      </label>
                      {channelsLoading ? (
                        <div className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-500">
                          Loading...
                        </div>
                      ) : channelsError ? (
                        <div className="w-full rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                          {channelsError}
                        </div>
                      ) : (
                        <select
                          value={channel.channelId}
                          onChange={(e) => updateChannel(index, { channelId: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                        >
                          <option value="">Select channel</option>
                          {voiceChannels.map((vc) => (
                            <option key={vc.id} value={vc.id}>
                              {vc.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Stat Type */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:hidden">
                        Stat Type
                      </label>
                      <select
                        value={channel.statType}
                        onChange={(e) => updateChannel(index, { statType: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                      >
                        {STAT_TYPES.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name Format */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:hidden">
                        Name Format
                      </label>
                      <input
                        type="text"
                        value={channel.format}
                        onChange={(e) => updateChannel(index, { format: e.target.value })}
                        placeholder="Members: {count}"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    {/* Remove */}
                    <div className="flex items-end sm:items-center">
                      <button
                        onClick={() => removeChannel(index)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
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

          {/* Preview */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Preview</h3>
            <p className="text-xs text-gray-500 mb-3">
              This is how your stat channels will appear in Discord:
            </p>
            <div className="rounded-lg bg-[#2b2d31] p-3 space-y-1.5">
              {config.channels.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-2">Add channels above to see preview</p>
              ) : (
                config.channels.map((ch, i) => {
                  const previewName = ch.format.replace("{count}", "3,248");
                  const channelName = voiceChannels.find((vc) => vc.id === ch.channelId)?.name;
                  return (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400 px-2 py-1 rounded hover:bg-white/5">
                      <svg className="h-4 w-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                      </svg>
                      <span>{previewName || channelName || "Unnamed Channel"}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}

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
          className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
