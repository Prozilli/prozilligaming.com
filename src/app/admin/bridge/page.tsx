"use client";

import { useState, useEffect } from "react";
import { getBridgeConfig, saveBridgeConfig } from "@/lib/admin-api";

interface PlatformToggle {
  id: string;
  name: string;
  enabled: boolean;
  color: string;
  icon: string;
}

interface BridgeSettings {
  enabled: boolean;
  platforms: Record<string, boolean>;
  excludeBots: boolean;
  format: "default" | "compact" | "full";
}

const DEFAULT_PLATFORMS: PlatformToggle[] = [
  { id: "twitch", name: "Twitch", enabled: true, color: "#9146FF", icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" },
  { id: "kick", name: "Kick", enabled: true, color: "#53FC18", icon: "M1.333 0v24H8v-8l2.667 2.667L16 24h6.667L16 17.333 22.667 8H16l-5.333 5.333V0z" },
  { id: "discord", name: "Discord", enabled: true, color: "#5865F2", icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" },
  { id: "youtube", name: "YouTube", enabled: false, color: "#FF0000", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { id: "trovo", name: "Trovo", enabled: false, color: "#19E3A1", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" },
  { id: "facebook", name: "Facebook", enabled: false, color: "#1877F2", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
];

const FORMAT_OPTIONS = [
  { value: "default", label: "Default", preview: "[Twitch] ProGamer: Let's go!" },
  { value: "compact", label: "Compact", preview: "ProGamer: Let's go!" },
  { value: "full", label: "Full", preview: "[Twitch | ProGamer] Let's go!" },
] as const;

export default function BridgePage() {
  const [bridgeEnabled, setBridgeEnabled] = useState(false);
  const [platforms, setPlatforms] = useState<PlatformToggle[]>(DEFAULT_PLATFORMS);
  const [excludeBots, setExcludeBots] = useState(true);
  const [format, setFormat] = useState<"default" | "compact" | "full">("default");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Load config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await getBridgeConfig();
        const config = data.config as unknown as BridgeSettings | null;
        if (config) {
          setBridgeEnabled(config.enabled ?? false);
          setExcludeBots(config.excludeBots ?? true);
          setFormat(config.format ?? "default");
          if (config.platforms) {
            setPlatforms((prev) =>
              prev.map((p) => ({
                ...p,
                enabled: config.platforms[p.id] ?? p.enabled,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to load bridge config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const platformMap: Record<string, boolean> = {};
      platforms.forEach((p) => {
        platformMap[p.id] = p.enabled;
      });

      await saveBridgeConfig({
        enabled: bridgeEnabled,
        platforms: platformMap,
        excludeBots,
        format,
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save bridge config:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const enabledCount = platforms.filter((p) => p.enabled).length;
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
        <h1 className="text-2xl font-bold text-white">Chat Bridge</h1>
        <p className="mt-1 text-sm text-gray-400">
          Relay messages between connected platforms in real-time
        </p>
      </div>

      {/* Bridge Status */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                bridgeEnabled ? "bg-green-500/20" : "bg-white/5"
              }`}
            >
              <svg
                className={`h-6 w-6 ${
                  bridgeEnabled ? "text-green-400" : "text-gray-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Bridge Status
              </h2>
              <p className="text-sm text-gray-400">
                {bridgeEnabled ? (
                  <span className="text-green-400">
                    Active — relaying across {enabledCount} platform
                    {enabledCount !== 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Disabled — no messages are being relayed
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setBridgeEnabled(!bridgeEnabled)}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              bridgeEnabled ? "bg-green-500" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                bridgeEnabled ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Platform Toggles */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Platform Connections
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                platform.enabled
                  ? "border-white/10 bg-white/5"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: platform.enabled
                      ? `${platform.color}20`
                      : "rgba(255,255,255,0.05)",
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      color: platform.enabled ? platform.color : "#6b7280",
                    }}
                  >
                    <path d={platform.icon} />
                  </svg>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      platform.enabled ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {platform.name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {platform.enabled ? "Relaying" : "Disabled"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => togglePlatform(platform.id)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  platform.enabled ? "bg-green-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    platform.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Settings</h3>
        <div className="space-y-5">
          {/* Message Format */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-400">
              Message Format
            </label>
            <select
              value={format}
              onChange={(e) =>
                setFormat(e.target.value as "default" | "compact" | "full")
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
            >
              {FORMAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Format Preview */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-400">
              Preview
            </label>
            <div className="rounded-lg border border-white/5 bg-[#0d1117] p-4">
              <div className="space-y-2">
                {platforms
                  .filter((p) => p.enabled)
                  .slice(0, 3)
                  .map((platform) => {
                    let message = "";
                    if (format === "default") {
                      message = `[${platform.name}] ProGamer: GG that was sick!`;
                    } else if (format === "compact") {
                      message = "ProGamer: GG that was sick!";
                    } else {
                      message = `[${platform.name} | ProGamer] GG that was sick!`;
                    }
                    return (
                      <div
                        key={platform.id}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="h-3.5 w-3.5 shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ color: platform.color }}
                        >
                          <path d={platform.icon} />
                        </svg>
                        <span className="font-mono text-xs text-gray-300">
                          {message}
                        </span>
                      </div>
                    );
                  })}
                {enabledCount === 0 && (
                  <p className="text-xs text-gray-500">
                    Enable at least one platform to see preview
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Exclude Bots */}
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium text-white">Exclude Bots</p>
              <p className="text-xs text-gray-500">
                Filter out known bot accounts from relayed messages
              </p>
            </div>
            <button
              onClick={() => setExcludeBots(!excludeBots)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                excludeBots ? "bg-green-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  excludeBots ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
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
          className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
