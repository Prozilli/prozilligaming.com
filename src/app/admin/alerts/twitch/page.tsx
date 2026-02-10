"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type AlertType = "live" | "offline" | "clip" | "vod";

interface AlertConfig {
  enabled: boolean;
  channelId: string;
  mentionRoleId: string;
  embedEnabled: boolean;
  embedColor: string;
  title: string;
  description: string;
  showThumbnail: boolean;
  showGame: boolean;
  showViewers: boolean;
}

const DEFAULT_ALERTS: Record<AlertType, AlertConfig> = {
  live: {
    enabled: true,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#9146FF",
    title: "🔴 {streamer} is LIVE!",
    description: "**{title}**\nPlaying {game}\n\n[Watch Now]({url})",
    showThumbnail: true,
    showGame: true,
    showViewers: false,
  },
  offline: {
    enabled: false,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#7a8899",
    title: "Stream Ended",
    description: "{streamer} has gone offline. Thanks for watching!",
    showThumbnail: false,
    showGame: false,
    showViewers: false,
  },
  clip: {
    enabled: true,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#9146FF",
    title: "New Clip: {title}",
    description: "Clipped by {clipper}\n\n[Watch Clip]({url})",
    showThumbnail: true,
    showGame: true,
    showViewers: false,
  },
  vod: {
    enabled: false,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#9146FF",
    title: "New VOD: {title}",
    description: "Duration: {duration}\n\n[Watch VOD]({url})",
    showThumbnail: true,
    showGame: true,
    showViewers: false,
  },
};

export default function TwitchAlertsPage() {
  const [activeAlertType, setActiveAlertType] = useState<AlertType>("live");
  const [alerts, setAlerts] = useState(DEFAULT_ALERTS);
  const [connectedChannel] = useState("ProzilliGaming");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch Discord data
  const { channels, loading: channelsLoading } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const savedAlerts = await getSetting<Record<AlertType, AlertConfig>>("twitch_alerts");
        if (savedAlerts) {
          setAlerts(savedAlerts);
        }
      } catch (err) {
        console.error("Failed to load alert settings:", err);
      }
    }
    loadSettings();
  }, []);

  const currentAlert = alerts[activeAlertType];

  const updateAlert = <K extends keyof AlertConfig>(
    key: K,
    value: AlertConfig[K]
  ) => {
    setAlerts({
      ...alerts,
      [activeAlertType]: { ...currentAlert, [key]: value },
    });
  };

  // Get role name from ID
  const getRoleName = (roleId: string) => {
    if (roleId === "everyone") return "@everyone";
    if (roleId === "here") return "@here";
    const role = roles.find((r) => r.id === roleId);
    return role ? `@${role.name}` : "";
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("twitch_alerts", alerts);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg className="h-7 w-7 text-[#9146FF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            Twitch Alerts
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Notify your Discord when you go live, post clips, and more
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-[#9146FF]/10 px-4 py-2">
          <div className="h-8 w-8 rounded-full bg-[#9146FF] flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <div>
            <p className="text-sm font-medium text-white">{connectedChannel}</p>
            <p className="text-[10px] text-[#9146FF]">Connected</p>
          </div>
          <button className="ml-2 text-xs text-gray-400 hover:text-white">
            Change
          </button>
        </div>
      </div>

      {/* Alert Type Selector */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { id: "live", label: "Go Live", icon: "🔴", enabled: alerts.live.enabled },
          { id: "offline", label: "Go Offline", icon: "⚫", enabled: alerts.offline.enabled },
          { id: "clip", label: "New Clip", icon: "🎬", enabled: alerts.clip.enabled },
          { id: "vod", label: "New VOD", icon: "📼", enabled: alerts.vod.enabled },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveAlertType(type.id as AlertType)}
            className={`relative rounded-xl border p-4 text-left transition-all ${
              activeAlertType === type.id
                ? "border-[#9146FF] bg-[#9146FF]/10"
                : "border-white/5 bg-[#161b22] hover:border-white/10"
            }`}
          >
            <span className="text-2xl">{type.icon}</span>
            <p className="mt-2 text-sm font-medium text-white">{type.label}</p>
            <p className="text-[10px] text-gray-500">
              {type.enabled ? "Enabled" : "Disabled"}
            </p>
            {type.enabled && (
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Settings */}
        <div className="space-y-6">
          {/* Enable Toggle */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeAlertType === "live"
                    ? "Go Live Alerts"
                    : activeAlertType === "offline"
                    ? "Offline Alerts"
                    : activeAlertType === "clip"
                    ? "Clip Alerts"
                    : "VOD Alerts"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {activeAlertType === "live"
                    ? "Send a message when you start streaming"
                    : activeAlertType === "offline"
                    ? "Send a message when you stop streaming"
                    : activeAlertType === "clip"
                    ? "Post new clips to Discord"
                    : "Post new VODs to Discord"}
                </p>
              </div>
              <button
                onClick={() => updateAlert("enabled", !currentAlert.enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  currentAlert.enabled ? "bg-[#9146FF]" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    currentAlert.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {currentAlert.enabled && (
            <>
              {/* Channel & Role */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Destination
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Channel
                    </label>
                    {channelsLoading ? (
                      <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                        Loading channels...
                      </div>
                    ) : (
                      <select
                        value={currentAlert.channelId}
                        onChange={(e) => updateAlert("channelId", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#9146FF] focus:outline-none"
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
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Mention Role (Optional)
                    </label>
                    {rolesLoading ? (
                      <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                        Loading roles...
                      </div>
                    ) : (
                      <select
                        value={currentAlert.mentionRoleId}
                        onChange={(e) =>
                          updateAlert("mentionRoleId", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#9146FF] focus:outline-none"
                      >
                        <option value="">No mention</option>
                        <option value="everyone">@everyone</option>
                        <option value="here">@here</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            @{role.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Settings */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Embed Message
                  </h3>
                  <button
                    onClick={() =>
                      updateAlert("embedEnabled", !currentAlert.embedEnabled)
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      currentAlert.embedEnabled ? "bg-[#9146FF]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        currentAlert.embedEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {currentAlert.embedEnabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Embed Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={currentAlert.embedColor}
                          onChange={(e) =>
                            updateAlert("embedColor", e.target.value)
                          }
                          className="h-10 w-14 rounded cursor-pointer border-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={currentAlert.embedColor}
                          onChange={(e) =>
                            updateAlert("embedColor", e.target.value)
                          }
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#9146FF] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={currentAlert.title}
                        onChange={(e) => updateAlert("title", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#9146FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentAlert.description}
                        onChange={(e) =>
                          updateAlert("description", e.target.value)
                        }
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#9146FF] focus:outline-none resize-none"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentAlert.showThumbnail}
                          onChange={(e) =>
                            updateAlert("showThumbnail", e.target.checked)
                          }
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#9146FF] focus:ring-[#9146FF]"
                        />
                        <span className="text-sm text-gray-400">
                          Show Thumbnail
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentAlert.showGame}
                          onChange={(e) =>
                            updateAlert("showGame", e.target.checked)
                          }
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#9146FF] focus:ring-[#9146FF]"
                        />
                        <span className="text-sm text-gray-400">Show Game</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentAlert.showViewers}
                          onChange={(e) =>
                            updateAlert("showViewers", e.target.checked)
                          }
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#9146FF] focus:ring-[#9146FF]"
                        />
                        <span className="text-sm text-gray-400">
                          Show Viewer Count
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Variables */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Available Variables
                </h3>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between">
                    <code className="text-[#9146FF]">{"{streamer}"}</code>
                    <span className="text-gray-500">Channel name</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#9146FF]">{"{title}"}</code>
                    <span className="text-gray-500">Stream/clip title</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#9146FF]">{"{game}"}</code>
                    <span className="text-gray-500">Game being played</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#9146FF]">{"{url}"}</code>
                    <span className="text-gray-500">Link to stream/clip</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#9146FF]">{"{viewers}"}</code>
                    <span className="text-gray-500">Current viewer count</span>
                  </div>
                </div>
              </div>
            </>
          )}

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
              className="rounded-lg bg-[#9146FF] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9146FF]/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Preview</h3>
          <div className="rounded-xl border border-white/5 bg-[#36393f] p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm shrink-0">
                P
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#5865F2] text-sm">
                    PRISMAI
                  </span>
                  <span className="rounded bg-[#5865F2] px-1 py-0.5 text-[10px] font-medium text-white">
                    BOT
                  </span>
                  <span className="text-xs text-gray-500">
                    Today at 12:00 PM
                  </span>
                </div>

                {currentAlert.mentionRoleId && (
                  <p className="mt-1 text-sm text-[#5865F2]">
                    {getRoleName(currentAlert.mentionRoleId)}
                  </p>
                )}

                {currentAlert.embedEnabled ? (
                  <div
                    className="mt-2 rounded border-l-4 bg-[#2f3136] overflow-hidden"
                    style={{ borderColor: currentAlert.embedColor }}
                  >
                    {currentAlert.showThumbnail && (
                      <div className="h-32 bg-gradient-to-r from-[#9146FF]/20 to-[#9146FF]/10 flex items-center justify-center">
                        <span className="text-4xl">📺</span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-semibold text-white text-sm">
                        {currentAlert.title
                          .replace("{streamer}", connectedChannel)
                          .replace("{title}", "Epic GTA RP Session!")}
                      </p>
                      <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                        {currentAlert.description
                          .replace("{streamer}", connectedChannel)
                          .replace("{title}", "Epic GTA RP Session!")
                          .replace("{game}", "Grand Theft Auto V")
                          .replace("{url}", "https://twitch.tv/prozilligaming")
                          .replace("{viewers}", "142")}
                      </p>
                      {currentAlert.showGame && (
                        <p className="mt-2 text-xs text-gray-500">
                          🎮 Grand Theft Auto V
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-300">
                    {currentAlert.title
                      .replace("{streamer}", connectedChannel)
                      .replace("{title}", "Epic GTA RP Session!")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            This is how the alert will appear in Discord
          </p>
        </div>
      </div>
    </div>
  );
}
