"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type AlertType = "tweet" | "retweet";

interface AlertConfig {
  enabled: boolean;
  channelId: string;
  mentionRoleId: string;
  embedEnabled: boolean;
  embedColor: string;
  title: string;
  description: string;
  showThumbnail: boolean;
}

const DEFAULT_ALERTS: Record<AlertType, AlertConfig> = {
  tweet: {
    enabled: true,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#1DA1F2",
    title: "New Tweet from {username}!",
    description: "{text}\n\n[View Tweet]({url})",
    showThumbnail: true,
  },
  retweet: {
    enabled: false,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#1DA1F2",
    title: "{username} Retweeted",
    description: "{text}\n\n[View Retweet]({url})",
    showThumbnail: false,
  },
};

export default function XAlertsPage() {
  const [activeAlertType, setActiveAlertType] = useState<AlertType>("tweet");
  const [alerts, setAlerts] = useState(DEFAULT_ALERTS);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch Discord data
  const { channels, loading: channelsLoading } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const savedAlerts = await getSetting<Record<AlertType, AlertConfig>>("x_alerts");
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
      await saveSetting("x_alerts", alerts);
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
            <svg className="h-7 w-7 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X Alerts
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Notify your Discord when new tweets and retweets are posted
          </p>
        </div>
      </div>

      {/* Alert Type Selector */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "tweet", label: "New Tweet", icon: "💬", enabled: alerts.tweet.enabled },
          { id: "retweet", label: "New Retweet", icon: "🔁", enabled: alerts.retweet.enabled },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveAlertType(type.id as AlertType)}
            className={`relative rounded-xl border p-4 text-left transition-all ${
              activeAlertType === type.id
                ? "border-[#1DA1F2] bg-[#1DA1F2]/10"
                : "border-[var(--color-border)] bg-surface hover:border-[var(--color-border)]"
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
          <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeAlertType === "tweet"
                    ? "Tweet Alerts"
                    : "Retweet Alerts"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {activeAlertType === "tweet"
                    ? "Send a message when a new tweet is posted"
                    : "Send a message when a tweet is retweeted"}
                </p>
              </div>
              <button
                onClick={() => updateAlert("enabled", !currentAlert.enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  currentAlert.enabled ? "bg-[#1DA1F2]" : "bg-raised"
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
              <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Destination
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Channel
                    </label>
                    {channelsLoading ? (
                      <div className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-gray-500">
                        Loading channels...
                      </div>
                    ) : (
                      <select
                        value={currentAlert.channelId}
                        onChange={(e) => updateAlert("channelId", e.target.value)}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-[#1DA1F2] focus:outline-none"
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
                      <div className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-gray-500">
                        Loading roles...
                      </div>
                    ) : (
                      <select
                        value={currentAlert.mentionRoleId}
                        onChange={(e) =>
                          updateAlert("mentionRoleId", e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-[#1DA1F2] focus:outline-none"
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
              <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Embed Message
                  </h3>
                  <button
                    onClick={() =>
                      updateAlert("embedEnabled", !currentAlert.embedEnabled)
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      currentAlert.embedEnabled ? "bg-[#1DA1F2]" : "bg-raised"
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
                          className="flex-1 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-[#1DA1F2] focus:outline-none"
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
                        className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-[#1DA1F2] focus:outline-none"
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
                        className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-[#1DA1F2] focus:outline-none resize-none"
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
                          className="h-4 w-4 rounded border-white/20 bg-surface text-[#1DA1F2] focus:ring-[#1DA1F2]"
                        />
                        <span className="text-sm text-gray-400">
                          Show Thumbnail
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Variables */}
              <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Available Variables
                </h3>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between">
                    <code className="text-[#1DA1F2]">{"{username}"}</code>
                    <span className="text-gray-500">X username</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#1DA1F2]">{"{text}"}</code>
                    <span className="text-gray-500">Tweet text</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#1DA1F2]">{"{url}"}</code>
                    <span className="text-gray-500">Link to tweet</span>
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
              className="rounded-lg bg-[#1DA1F2] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1DA1F2]/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Preview</h3>
          <div className="rounded-xl border border-[var(--color-border)] bg-[#36393f] p-4">
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
                      <div className="h-32 bg-gradient-to-r from-[#1DA1F2]/20 to-[#1DA1F2]/10 flex items-center justify-center">
                        <span className="text-4xl">
                          {activeAlertType === "tweet" ? "💬" : "🔁"}
                        </span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-semibold text-white text-sm">
                        {currentAlert.title
                          .replace("{username}", "ProzilliGaming")
                          .replace("{text}", "Just dropped a 20 bomb in Warzone!")}
                      </p>
                      <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                        {currentAlert.description
                          .replace("{username}", "ProzilliGaming")
                          .replace("{text}", "Just dropped a 20 bomb in Warzone!")
                          .replace("{url}", "https://x.com/ProzilliGaming/status/123")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-300">
                    {currentAlert.title
                      .replace("{username}", "ProzilliGaming")
                      .replace("{text}", "Just dropped a 20 bomb in Warzone!")}
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
