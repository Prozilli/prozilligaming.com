"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

type TabType = "automod" | "warnings" | "logs" | "banned";

interface AutoModRule {
  id: string;
  name: string;
  enabled: boolean;
  action: "warn" | "mute" | "kick" | "ban" | "delete";
  description: string;
}

interface Warning {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  reason: string;
  moderator: string;
  date: string;
  count: number;
}

interface ModSettings {
  logChannelId: string;
  muteRoleId: string;
  warningThreshold: number;
  warningAction: "mute" | "kick" | "ban";
  bannedWords: string[];
  allowedLinks: string[];
}

const DEFAULT_AUTOMOD_RULES: AutoModRule[] = [
  {
    id: "spam",
    name: "Anti-Spam",
    enabled: true,
    action: "mute",
    description: "Detect and prevent spam messages",
  },
  {
    id: "links",
    name: "Link Filter",
    enabled: true,
    action: "delete",
    description: "Block unauthorized links",
  },
  {
    id: "caps",
    name: "Caps Lock",
    enabled: false,
    action: "warn",
    description: "Warn for excessive caps usage",
  },
  {
    id: "mentions",
    name: "Mass Mentions",
    enabled: true,
    action: "mute",
    description: "Prevent mass pinging",
  },
  {
    id: "invites",
    name: "Discord Invites",
    enabled: true,
    action: "delete",
    description: "Block Discord server invites",
  },
  {
    id: "slurs",
    name: "Slur Filter",
    enabled: true,
    action: "ban",
    description: "Auto-ban for slurs",
  },
];

const MOCK_WARNINGS: Warning[] = [
  {
    id: "1",
    userId: "123",
    username: "ToxicUser",
    avatar: "T",
    reason: "Spam in #general",
    moderator: "Pro",
    date: "2h ago",
    count: 3,
  },
  {
    id: "2",
    userId: "456",
    username: "RuleBreaker",
    avatar: "R",
    reason: "Posting invite links",
    moderator: "LISA",
    date: "1d ago",
    count: 1,
  },
];

export default function ModeratorPage() {
  const [activeTab, setActiveTab] = useState<TabType>("automod");
  const [rules, setRules] = useState(DEFAULT_AUTOMOD_RULES);
  const [logChannelId, setLogChannelId] = useState("");
  const [muteRoleId, setMuteRoleId] = useState("");
  const [warningThreshold, setWarningThreshold] = useState(3);
  const [warningAction, setWarningAction] = useState<"mute" | "kick" | "ban">("mute");
  const [bannedWords, setBannedWords] = useState("slur1\nslur2\nbadword\noffensive");
  const [allowedLinks, setAllowedLinks] = useState("youtube.com\ntwitch.tv\ntwitter.com\ndiscord.com\nprozilli.com");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch Discord data
  const { channels, loading: channelsLoading } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const modSettings = await getSetting<ModSettings>("mod_settings");
        const savedRules = await getSetting<AutoModRule[]>("automod_rules");
        if (modSettings) {
          setLogChannelId(modSettings.logChannelId || "");
          setMuteRoleId(modSettings.muteRoleId || "");
          setWarningThreshold(modSettings.warningThreshold || 3);
          setWarningAction(modSettings.warningAction || "mute");
          setBannedWords(modSettings.bannedWords?.join("\n") || "");
          setAllowedLinks(modSettings.allowedLinks?.join("\n") || "");
        }
        if (savedRules) {
          setRules(savedRules);
        }
      } catch (err) {
        console.error("Failed to load moderator settings:", err);
      }
    }
    loadSettings();
  }, []);

  const toggleRule = (id: string) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  // Save all settings
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const modSettings: ModSettings = {
        logChannelId,
        muteRoleId,
        warningThreshold,
        warningAction,
        bannedWords: bannedWords.split("\n").filter(Boolean),
        allowedLinks: allowedLinks.split("\n").filter(Boolean),
      };
      await saveSetting("mod_settings", modSettings);
      await saveSetting("automod_rules", rules);
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
        <h1 className="text-2xl font-bold text-white">Moderator</h1>
        <p className="mt-1 text-sm text-gray-400">
          Automod, warnings, and moderation tools
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        {[
          { id: "automod", label: "AutoMod" },
          { id: "warnings", label: "Warnings" },
          { id: "logs", label: "Mod Logs" },
          { id: "banned", label: "Banned Words" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-brand-red text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "automod" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Rules List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white">AutoMod Rules</h3>
            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-[#161b22] p-4"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        rule.enabled ? "bg-green-500" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          rule.enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {rule.name}
                      </p>
                      <p className="text-xs text-gray-500">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        rule.action === "ban"
                          ? "bg-red-500/20 text-red-400"
                          : rule.action === "kick"
                          ? "bg-orange-500/20 text-orange-400"
                          : rule.action === "mute"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : rule.action === "warn"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {rule.action.toUpperCase()}
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Settings</h3>

            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Log Channel
                </label>
                {channelsLoading ? (
                  <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                    Loading...
                  </div>
                ) : (
                  <select
                    value={logChannelId}
                    onChange={(e) => setLogChannelId(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
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
                  Mute Role
                </label>
                {rolesLoading ? (
                  <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                    Loading...
                  </div>
                ) : (
                  <select
                    value={muteRoleId}
                    onChange={(e) => setMuteRoleId(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        @{role.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Warning Threshold
                </label>
                <input
                  type="number"
                  value={warningThreshold}
                  onChange={(e) =>
                    setWarningThreshold(parseInt(e.target.value) || 3)
                  }
                  min={1}
                  max={10}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
                <p className="mt-1 text-[10px] text-gray-500">
                  Warnings before action is taken
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Threshold Action
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["mute", "kick", "ban"] as const).map((action) => (
                    <button
                      key={action}
                      onClick={() => setWarningAction(action)}
                      className={`rounded-lg py-2 text-xs font-medium transition-colors ${
                        warningAction === action
                          ? action === "ban"
                            ? "bg-red-500 text-white"
                            : action === "kick"
                            ? "bg-orange-500 text-white"
                            : "bg-yellow-500 text-black"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {saveStatus === "success" && (
                <p className="text-sm text-green-400 text-center">Saved successfully!</p>
              )}
              {saveStatus === "error" && (
                <p className="text-sm text-red-400 text-center">Failed to save</p>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "warnings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Recent Warnings</h3>
            <button className="rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white hover:bg-brand-red/90">
              Issue Warning
            </button>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                    Moderator
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                    Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_WARNINGS.map((warning) => (
                  <tr
                    key={warning.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-400 font-bold text-xs">
                          {warning.avatar}
                        </div>
                        <span className="text-sm text-white">
                          {warning.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {warning.reason}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {warning.moderator}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {warning.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          warning.count >= 3
                            ? "bg-red-500/20 text-red-400"
                            : warning.count >= 2
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {warning.count}/3
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs text-red-400 hover:text-red-300">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">
              Moderation Activity
            </h3>
            <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-brand-red focus:outline-none">
              <option>All Actions</option>
              <option>Bans</option>
              <option>Kicks</option>
              <option>Mutes</option>
              <option>Warnings</option>
            </select>
          </div>
          <div className="space-y-3">
            {[
              {
                action: "MUTE",
                user: "ToxicUser",
                mod: "LISA",
                reason: "Spam",
                time: "2h ago",
                color: "yellow",
              },
              {
                action: "WARN",
                user: "RuleBreaker",
                mod: "Pro",
                reason: "Posting invite links",
                time: "1d ago",
                color: "blue",
              },
              {
                action: "BAN",
                user: "Troll123",
                mod: "Pro",
                reason: "Slurs",
                time: "3d ago",
                color: "red",
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg bg-white/5 p-3"
              >
                <span
                  className={`rounded px-2 py-1 text-xs font-bold ${
                    log.color === "red"
                      ? "bg-red-500/20 text-red-400"
                      : log.color === "yellow"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {log.action}
                </span>
                <div className="flex-1">
                  <span className="text-sm text-white">{log.user}</span>
                  <span className="text-sm text-gray-500"> • {log.reason}</span>
                </div>
                <span className="text-xs text-gray-500">by {log.mod}</span>
                <span className="text-xs text-gray-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "banned" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Banned Words
            </h3>
            <textarea
              rows={10}
              value={bannedWords}
              onChange={(e) => setBannedWords(e.target.value)}
              placeholder="One word per line..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none font-mono"
            />
            <p className="mt-2 text-xs text-gray-500">
              Messages containing these words will be automatically deleted
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Allowed Links
            </h3>
            <textarea
              rows={10}
              value={allowedLinks}
              onChange={(e) => setAllowedLinks(e.target.value)}
              placeholder="One domain per line..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none font-mono"
            />
            <p className="mt-2 text-xs text-gray-500">
              Only links from these domains are allowed (if Link Filter is
              enabled)
            </p>
          </div>
          <div className="lg:col-span-2 flex items-center justify-end gap-3">
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
      )}
    </div>
  );
}
