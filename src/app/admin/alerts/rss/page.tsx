"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type AlertType = "item";

interface AlertConfig {
  enabled: boolean;
  channelId: string;
  mentionRoleId: string;
  embedEnabled: boolean;
  embedColor: string;
  title: string;
  description: string;
  showThumbnail: boolean;
  feedUrl: string;
}

const DEFAULT_ALERTS: Record<AlertType, AlertConfig> = {
  item: {
    enabled: true,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#F26522",
    title: "New from {feed_title}: {item_title}",
    description: "By {author}\n\n{summary}\n\n[Read More]({url})",
    showThumbnail: true,
    feedUrl: "",
  },
};

export default function RSSAlertsPage() {
  const [activeAlertType, setActiveAlertType] = useState<AlertType>("item");
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
        const savedAlerts = await getSetting<Record<AlertType, AlertConfig>>("rss_alerts");
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
      await saveSetting("rss_alerts", alerts);
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
            <svg className="h-7 w-7 text-[#F26522]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795 0 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-8.18v4.819c12.951.115 23.357 10.71 23.497 23.625H24C23.843 11.627 13.019.82 0 0z" />
            </svg>
            RSS Alerts
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Subscribe to RSS feeds and notify your Discord of new items
          </p>
        </div>
      </div>

      {/* Alert Type Selector */}
      <div className="grid grid-cols-1 gap-3">
        {[
          { id: "item", label: "New Feed Item", icon: "📰", enabled: alerts.item.enabled },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveAlertType(type.id as AlertType)}
            className={`relative rounded-xl border p-4 text-left transition-all ${
              activeAlertType === type.id
                ? "border-[#F26522] bg-[#F26522]/10"
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
                  Feed Item Alerts
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Send a message when a new item appears in the RSS feed
                </p>
              </div>
              <button
                onClick={() => updateAlert("enabled", !currentAlert.enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  currentAlert.enabled ? "bg-[#F26522]" : "bg-white/10"
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
              {/* Feed URL */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Feed Source
                </h3>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Feed URL
                  </label>
                  <input
                    type="text"
                    value={currentAlert.feedUrl}
                    onChange={(e) => updateAlert("feedUrl", e.target.value)}
                    placeholder="https://example.com/feed.xml"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F26522] focus:outline-none"
                  />
                  <p className="mt-2 text-[10px] text-gray-500">
                    Enter the full URL of the RSS or Atom feed
                  </p>
                </div>
              </div>

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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#F26522] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#F26522] focus:outline-none"
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
                      currentAlert.embedEnabled ? "bg-[#F26522]" : "bg-white/10"
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
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#F26522] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#F26522] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#F26522] focus:outline-none resize-none"
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
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#F26522] focus:ring-[#F26522]"
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
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Available Variables
                </h3>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between">
                    <code className="text-[#F26522]">{"{feed_title}"}</code>
                    <span className="text-gray-500">Name of the feed</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#F26522]">{"{item_title}"}</code>
                    <span className="text-gray-500">Title of the item</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#F26522]">{"{url}"}</code>
                    <span className="text-gray-500">Link to item</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#F26522]">{"{author}"}</code>
                    <span className="text-gray-500">Item author</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#F26522]">{"{summary}"}</code>
                    <span className="text-gray-500">Item summary/excerpt</span>
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
              className="rounded-lg bg-[#F26522] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#F26522]/90 disabled:opacity-50"
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
                      <div className="h-32 bg-gradient-to-r from-[#F26522]/20 to-[#F26522]/10 flex items-center justify-center">
                        <span className="text-4xl">📰</span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-semibold text-white text-sm">
                        {currentAlert.title
                          .replace("{feed_title}", "Gaming News")
                          .replace("{item_title}", "Top 10 Games of 2026")
                          .replace("{author}", "Editorial Team")
                          .replace("{summary}", "Our picks for the best games this year...")}
                      </p>
                      <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                        {currentAlert.description
                          .replace("{feed_title}", "Gaming News")
                          .replace("{item_title}", "Top 10 Games of 2026")
                          .replace("{url}", "https://example.com/top-10-games")
                          .replace("{author}", "Editorial Team")
                          .replace("{summary}", "Our picks for the best games this year...")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-300">
                    {currentAlert.title
                      .replace("{feed_title}", "Gaming News")
                      .replace("{item_title}", "Top 10 Games of 2026")}
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
