"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useDiscordTextChannels,
  getStarboardConfig,
  saveStarboardConfig,
} from "@/lib/admin-api";

interface StarboardConfig {
  enabled: boolean;
  channelId: string;
  emoji: string;
  threshold: number;
  allowSelfStar: boolean;
  includeBotMessages: boolean;
}

const DEFAULT_CONFIG: StarboardConfig = {
  enabled: true,
  channelId: "",
  emoji: "\u2B50",
  threshold: 3,
  allowSelfStar: false,
  includeBotMessages: false,
};

export default function StarboardPage() {
  const [config, setConfig] = useState<StarboardConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch Discord channels
  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();

  // Load saved config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const result = await getStarboardConfig();
        if (result.config && Object.keys(result.config).length > 0) {
          setConfig((prev) => ({ ...prev, ...(result.config as Partial<StarboardConfig>) }));
        }
      } catch (err) {
        console.error("Failed to load starboard config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Get channel name from ID
  const getChannelName = useCallback(
    (channelId: string) => {
      const channel = channels.find((c) => c.id === channelId);
      return channel ? `#${channel.name}` : "#general";
    },
    [channels]
  );

  // Update a single config field
  const updateConfig = <K extends keyof StarboardConfig>(
    key: K,
    value: StarboardConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  // Save config
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveStarboardConfig(config as unknown as Record<string, unknown>);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Failed to save starboard config:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setSaving(false);
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Starboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Highlight popular messages by collecting reactions
          </p>
        </div>
        <button
          onClick={() => updateConfig("enabled", !config.enabled)}
          className={`relative h-7 w-12 rounded-full transition-colors ${
            config.enabled ? "bg-brand-red" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              config.enabled ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      {config.enabled && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Configuration Column */}
          <div className="space-y-6">
            {/* Configuration Card */}
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Configuration</h3>
              <div className="space-y-5">
                {/* Channel Selector */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Starboard Channel
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Where starred messages will be reposted
                  </p>
                  {channelsLoading ? (
                    <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                      Loading channels...
                    </div>
                  ) : channelsError ? (
                    <div className="w-full rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                      {channelsError}
                    </div>
                  ) : (
                    <select
                      value={config.channelId}
                      onChange={(e) => updateConfig("channelId", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
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

                {/* Emoji Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Reaction Emoji
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    The emoji users react with to star a message
                  </p>
                  <input
                    type="text"
                    value={config.emoji}
                    onChange={(e) => updateConfig("emoji", e.target.value)}
                    placeholder="\u2B50"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>

                {/* Threshold Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Reaction Threshold
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Minimum reactions needed to post to the starboard
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={config.threshold}
                    onChange={(e) => updateConfig("threshold", Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-white/5" />

                {/* Allow Self-Star Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Allow Self-Star</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Let users star their own messages
                    </p>
                  </div>
                  <button
                    onClick={() => updateConfig("allowSelfStar", !config.allowSelfStar)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      config.allowSelfStar ? "bg-brand-red" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        config.allowSelfStar ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Include Bot Messages Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Include Bot Messages</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Allow bot messages to appear on the starboard
                    </p>
                  </div>
                  <button
                    onClick={() => updateConfig("includeBotMessages", !config.includeBotMessages)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      config.includeBotMessages ? "bg-brand-red" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        config.includeBotMessages ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3">
              {saveStatus === "success" && (
                <span className="flex items-center gap-1.5 text-sm text-green-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Saved successfully!
                </span>
              )}
              {saveStatus === "error" && (
                <span className="flex items-center gap-1.5 text-sm text-red-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  Failed to save
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Preview</h3>

            {/* Starboard Post Preview */}
            <div className="rounded-xl border border-white/5 bg-[#36393f] p-4">
              {/* Starboard header line */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{config.emoji || "\u2B50"}</span>
                <span className="text-sm font-bold text-brand-gold">{config.threshold}</span>
                <span className="text-gray-500 text-sm">|</span>
                <span className="text-sm text-gray-400">
                  {getChannelName(config.channelId)}
                </span>
              </div>

              {/* Embedded message */}
              <div className="rounded border-l-4 border-brand-gold bg-[#2f3136] p-3">
                <div className="flex gap-3">
                  {/* Author avatar */}
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    G
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Author name */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">GamerPro99</span>
                      <span className="text-xs text-gray-500">Today at 8:42 PM</span>
                    </div>
                    {/* Message content */}
                    <p className="mt-1 text-sm text-gray-300">
                      That clutch play at the end was absolutely insane! GG everyone, what a stream tonight.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reaction bar */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 px-2.5 py-1">
                  <span className="text-sm">{config.emoji || "\u2B50"}</span>
                  <span className="text-xs font-medium text-brand-gold">{config.threshold}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Posted to starboard
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              This is how a starred message will appear in your starboard channel
            </p>

            {/* Info Card */}
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <h4 className="text-sm font-semibold text-white mb-3">How It Works</h4>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold font-bold text-[10px]">
                    1
                  </div>
                  <p>Members react to a message with {config.emoji || "\u2B50"}</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold font-bold text-[10px]">
                    2
                  </div>
                  <p>Once the message reaches {config.threshold} reaction{config.threshold !== 1 ? "s" : ""}, it gets posted to the starboard channel</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold font-bold text-[10px]">
                    3
                  </div>
                  <p>The starboard post updates in real-time as more reactions are added</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disabled State */}
      {!config.enabled && (
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">Starboard is Disabled</h3>
          <p className="mt-2 text-sm text-gray-400">
            Enable the starboard to highlight the best messages from your community
          </p>
          <button
            onClick={() => updateConfig("enabled", true)}
            className="mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white hover:bg-brand-red/90"
          >
            Enable Starboard
          </button>
        </div>
      )}
    </div>
  );
}
