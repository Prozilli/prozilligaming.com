"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type AlertType = "post";

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
  subreddit: string;
}

const DEFAULT_ALERTS: Record<AlertType, AlertConfig> = {
  post: {
    enabled: true,
    channelId: "",
    mentionRoleId: "",
    embedEnabled: true,
    embedColor: "#FF4500",
    title: "New Post in r/{subreddit}",
    description: "**{title}**\n\nPosted by u/{author}\n\n[View Post]({url})",
    showThumbnail: true,
    showGame: false,
    showViewers: false,
    subreddit: "",
  },
};

export default function RedditAlertsPage() {
  const [activeAlertType, setActiveAlertType] = useState<AlertType>("post");
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
        const savedAlerts = await getSetting<Record<AlertType, AlertConfig>>("reddit_alerts");
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
      await saveSetting("reddit_alerts", alerts);
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
            <svg className="h-7 w-7 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.327.327 0 0 0-.462 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.231-.094z" />
            </svg>
            Reddit Alerts
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Notify your Discord about new posts in subreddits you follow
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-[#FF4500]/10 px-4 py-2">
          <div className="h-8 w-8 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-sm">
            r/
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {currentAlert.subreddit ? `r/${currentAlert.subreddit}` : "No subreddit set"}
            </p>
            <p className="text-[10px] text-[#FF4500]">
              {currentAlert.subreddit ? "Configured" : "Not configured"}
            </p>
          </div>
        </div>
      </div>

      {/* Alert Type Selector */}
      <div className="grid grid-cols-1 gap-3 max-w-xs">
        {[
          { id: "post", label: "New Post", icon: "📝", enabled: alerts.post.enabled },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveAlertType(type.id as AlertType)}
            className={`relative rounded-xl border p-4 text-left transition-all ${
              activeAlertType === type.id
                ? "border-[#FF4500] bg-[#FF4500]/10"
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
                  New Post Alerts
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Send a message when a new post appears in the subreddit
                </p>
              </div>
              <button
                onClick={() => updateAlert("enabled", !currentAlert.enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  currentAlert.enabled ? "bg-[#FF4500]" : "bg-white/10"
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
              {/* Subreddit Input */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Subreddit
                </h3>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Subreddit Name
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium">r/</span>
                    <input
                      type="text"
                      value={currentAlert.subreddit}
                      onChange={(e) => updateAlert("subreddit", e.target.value)}
                      placeholder="e.g. prozilli"
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-[#FF4500] focus:outline-none"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">
                    Enter the subreddit name without the r/ prefix
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none"
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
                      currentAlert.embedEnabled ? "bg-[#FF4500]" : "bg-white/10"
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
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none"
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none resize-none"
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
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#FF4500] focus:ring-[#FF4500]"
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
                    <code className="text-[#FF4500]">{"{subreddit}"}</code>
                    <span className="text-gray-500">Subreddit name</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#FF4500]">{"{title}"}</code>
                    <span className="text-gray-500">Post title</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#FF4500]">{"{url}"}</code>
                    <span className="text-gray-500">Link to post</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#FF4500]">{"{author}"}</code>
                    <span className="text-gray-500">Post author</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-[#FF4500]">{"{score}"}</code>
                    <span className="text-gray-500">Post score (upvotes)</span>
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
              className="rounded-lg bg-[#FF4500] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#FF4500]/90 disabled:opacity-50"
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
                      <div className="h-32 bg-gradient-to-r from-[#FF4500]/20 to-[#FF4500]/10 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-semibold text-white text-sm">
                        {currentAlert.title
                          .replace("{subreddit}", currentAlert.subreddit || "gaming")
                          .replace("{title}", "Check out this insane play!")}
                      </p>
                      <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                        {currentAlert.description
                          .replace("{subreddit}", currentAlert.subreddit || "gaming")
                          .replace("{title}", "Check out this insane play!")
                          .replace("{url}", `https://reddit.com/r/${currentAlert.subreddit || "gaming"}/comments/example`)
                          .replace("{author}", "ProzilliGaming")
                          .replace("{score}", "256")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-300">
                    {currentAlert.title
                      .replace("{subreddit}", currentAlert.subreddit || "gaming")
                      .replace("{title}", "Check out this insane play!")}
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
