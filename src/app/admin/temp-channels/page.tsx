"use client";

import { useState, useEffect } from "react";
import { useDiscordChannels, getSetting, saveSetting } from "@/lib/admin-api";

interface TempChannelsConfig {
  enabled: boolean;
  creatorChannelId: string;
  categoryId: string;
  nameTemplate: string;
  permissions: {
    rename: boolean;
    userLimit: boolean;
    bitrate: boolean;
    lock: boolean;
  };
}

const DEFAULT_CONFIG: TempChannelsConfig = {
  enabled: false,
  creatorChannelId: "",
  categoryId: "",
  nameTemplate: "{user}'s Channel",
  permissions: {
    rename: true,
    userLimit: true,
    bitrate: false,
    lock: true,
  },
};

const PERMISSION_OPTIONS = [
  {
    key: "rename" as const,
    label: "Rename Channel",
    description: "Allow the channel owner to change the channel name",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    ),
  },
  {
    key: "userLimit" as const,
    label: "User Limit",
    description: "Allow setting a maximum number of users in the channel",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    ),
  },
  {
    key: "bitrate" as const,
    label: "Bitrate",
    description: "Allow changing the audio quality of the channel",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    ),
  },
  {
    key: "lock" as const,
    label: "Lock / Unlock",
    description: "Allow locking the channel to prevent others from joining",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    ),
  },
];

export default function TempChannelsPage() {
  const [config, setConfig] = useState<TempChannelsConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels: allChannels, loading: channelsLoading, error: channelsError } = useDiscordChannels();
  const voiceChannels = allChannels.filter((c) => c.type === 2);
  const categoryChannels = allChannels.filter((c) => c.type === 4);

  // Load settings on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getSetting<TempChannelsConfig>("temp_channels_config");
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
      await saveSetting("temp_channels_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const togglePermission = (key: keyof TempChannelsConfig["permissions"]) => {
    setConfig({
      ...config,
      permissions: {
        ...config.permissions,
        [key]: !config.permissions[key],
      },
    });
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
        <h1 className="text-2xl font-bold text-white">Temp Channels</h1>
        <p className="mt-1 text-sm text-gray-400">
          Let members create temporary voice channels on demand
        </p>
      </div>

      {/* Enable Toggle */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Enable Temp Channels</h3>
            <p className="text-xs text-gray-500 mt-1">
              When enabled, joining the creator channel will automatically create a private voice channel
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
          {/* Channel Settings */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Channel Settings</h3>
            <div className="space-y-4">
              {/* Creator Channel */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Creator Channel
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  The voice channel users join to create a new temporary channel
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
                    value={config.creatorChannelId}
                    onChange={(e) => setConfig({ ...config, creatorChannelId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  >
                    <option value="">Select a voice channel</option>
                    {voiceChannels.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Category
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  New temp channels will be created under this category
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
                    value={config.categoryId}
                    onChange={(e) => setConfig({ ...config, categoryId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  >
                    <option value="">Select a category</option>
                    {categoryChannels.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Name Template */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Name Template
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Use <code className="text-brand-gold">{"{user}"}</code> for the member&apos;s display name
                </p>
                <input
                  type="text"
                  value={config.nameTemplate}
                  onChange={(e) => setConfig({ ...config, nameTemplate: e.target.value })}
                  placeholder="{user}'s Channel"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Preview: <span className="text-white">{config.nameTemplate.replace("{user}", "Pro")}</span>
                </p>
              </div>
            </div>
          </div>

          {/* User Permissions */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Owner Permissions</h3>
            <p className="text-xs text-gray-500 mb-4">
              What the channel creator can do with their temp channel
            </p>

            <div className="space-y-3">
              {PERMISSION_OPTIONS.map((perm) => (
                <div
                  key={perm.key}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400">
                      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        {perm.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{perm.label}</p>
                      <p className="text-xs text-gray-500">{perm.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePermission(perm.key)}
                    className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ml-3 ${
                      config.permissions[perm.key] ? "bg-brand-red" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        config.permissions[perm.key] ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">How It Works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-red shrink-0">1</span>
                <p className="text-sm text-gray-400">A member joins the <span className="text-white">Creator Channel</span></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-red shrink-0">2</span>
                <p className="text-sm text-gray-400">PRISMAI creates a new voice channel named <span className="text-white">{config.nameTemplate.replace("{user}", "Username")}</span></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-red shrink-0">3</span>
                <p className="text-sm text-gray-400">The member is moved into their new channel with owner permissions</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-red shrink-0">4</span>
                <p className="text-sm text-gray-400">When everyone leaves, the channel is automatically deleted</p>
              </div>
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
