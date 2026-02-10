"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type TabType = "welcome" | "goodbye";

interface MessageConfig {
  enabled: boolean;
  channelId: string;
  dmEnabled: boolean;
  embedEnabled: boolean;
  embedColor: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  footer: string;
}

const DEFAULT_WELCOME: MessageConfig = {
  enabled: true,
  channelId: "",
  dmEnabled: false,
  embedEnabled: true,
  embedColor: "#910000",
  title: "Welcome to Prozilli HQ!",
  description:
    "Hey {user}, welcome to the server! We're glad to have you here.\n\nMake sure to check out the rules and introduce yourself!",
  image: "",
  thumbnail: "{user.avatar}",
  footer: "Member #{count} • Joined {date}",
};

const DEFAULT_GOODBYE: MessageConfig = {
  enabled: true,
  channelId: "",
  dmEnabled: false,
  embedEnabled: true,
  embedColor: "#7a8899",
  title: "Goodbye!",
  description: "{user.tag} has left the server. We'll miss you!",
  image: "",
  thumbnail: "",
  footer: "We now have {count} members",
};

export default function WelcomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("welcome");
  const [welcome, setWelcome] = useState(DEFAULT_WELCOME);
  const [goodbye, setGoodbye] = useState(DEFAULT_GOODBYE);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch Discord channels
  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const welcomeSettings = await getSetting<MessageConfig>("welcome_config");
        const goodbyeSettings = await getSetting<MessageConfig>("goodbye_config");
        if (welcomeSettings) setWelcome(welcomeSettings);
        if (goodbyeSettings) setGoodbye(goodbyeSettings);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }
    loadSettings();
  }, []);

  const currentConfig = activeTab === "welcome" ? welcome : goodbye;
  const setCurrentConfig = activeTab === "welcome" ? setWelcome : setGoodbye;

  const updateConfig = <K extends keyof MessageConfig>(
    key: K,
    value: MessageConfig[K]
  ) => {
    setCurrentConfig((prev) => ({ ...prev, [key]: value }));
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("welcome_config", welcome);
      await saveSetting("goodbye_config", goodbye);
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
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome & Goodbye</h1>
        <p className="mt-1 text-sm text-gray-400">
          Greet new members and say farewell when they leave
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setActiveTab("welcome")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "welcome"
              ? "bg-green-500 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Welcome
        </button>
        <button
          onClick={() => setActiveTab("goodbye")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "goodbye"
              ? "bg-gray-500 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
          Goodbye
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Settings Column */}
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeTab === "welcome" ? "Welcome Messages" : "Goodbye Messages"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {activeTab === "welcome"
                    ? "Send a message when members join"
                    : "Send a message when members leave"}
                </p>
              </div>
              <button
                onClick={() => updateConfig("enabled", !currentConfig.enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  currentConfig.enabled ? "bg-green-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    currentConfig.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {currentConfig.enabled && (
            <>
              {/* Channel Selection */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Send To
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
                    ) : channelsError ? (
                      <div className="w-full rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                        {channelsError}
                      </div>
                    ) : (
                      <select
                        value={currentConfig.channelId}
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
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentConfig.dmEnabled}
                      onChange={(e) => updateConfig("dmEnabled", e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red"
                    />
                    <div>
                      <p className="text-sm text-white">Also send as DM</p>
                      <p className="text-xs text-gray-500">
                        Send a copy directly to the member
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Embed Settings */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Use Embed
                  </h3>
                  <button
                    onClick={() =>
                      updateConfig("embedEnabled", !currentConfig.embedEnabled)
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      currentConfig.embedEnabled ? "bg-green-500" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        currentConfig.embedEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {currentConfig.embedEnabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Embed Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={currentConfig.embedColor}
                          onChange={(e) =>
                            updateConfig("embedColor", e.target.value)
                          }
                          className="h-10 w-14 rounded cursor-pointer border-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={currentConfig.embedColor}
                          onChange={(e) =>
                            updateConfig("embedColor", e.target.value)
                          }
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={currentConfig.title}
                        onChange={(e) => updateConfig("title", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentConfig.description}
                        onChange={(e) =>
                          updateConfig("description", e.target.value)
                        }
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Footer
                      </label>
                      <input
                        type="text"
                        value={currentConfig.footer}
                        onChange={(e) => updateConfig("footer", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Variables Reference */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Available Variables
                </h3>
                <div className="grid gap-2 text-xs">
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{user}"}</code>
                    <span className="text-gray-500">@mention the user</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{user.tag}"}</code>
                    <span className="text-gray-500">Username#0000</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{user.avatar}"}</code>
                    <span className="text-gray-500">Avatar URL</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{server}"}</code>
                    <span className="text-gray-500">Server name</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{count}"}</code>
                    <span className="text-gray-500">Member count</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-brand-gold">{"{date}"}</code>
                    <span className="text-gray-500">Current date</span>
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
              className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Preview</h3>
          <div className="rounded-xl border border-white/5 bg-[#36393f] p-4">
            {/* Discord-style message preview */}
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
                  <span className="text-xs text-gray-500">Today at 12:00 PM</span>
                </div>

                {currentConfig.embedEnabled ? (
                  <div
                    className="mt-2 rounded border-l-4 bg-[#2f3136] p-3"
                    style={{ borderColor: currentConfig.embedColor }}
                  >
                    {currentConfig.thumbnail && (
                      <div className="float-right ml-4 mb-2">
                        <div className="h-16 w-16 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red">
                          <svg
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    <p className="font-semibold text-white text-sm">
                      {currentConfig.title}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                      {currentConfig.description
                        .replace("{user}", "@NewMember")
                        .replace("{user.tag}", "NewMember#1234")
                        .replace("{server}", "Prozilli HQ")
                        .replace("{count}", "3,248")
                        .replace("{date}", "Feb 6, 2026")}
                    </p>
                    {currentConfig.footer && (
                      <p className="mt-3 text-xs text-gray-500">
                        {currentConfig.footer
                          .replace("{count}", "3,248")
                          .replace("{date}", "Feb 6, 2026")}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-300">
                    {currentConfig.description
                      .replace("{user}", "@NewMember")
                      .replace("{user.tag}", "NewMember#1234")
                      .replace("{server}", "Prozilli HQ")
                      .replace("{count}", "3,248")
                      .replace("{date}", "Feb 6, 2026")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            This is how the message will appear in Discord
          </p>
        </div>
      </div>
    </div>
  );
}
