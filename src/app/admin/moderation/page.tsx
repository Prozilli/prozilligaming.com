"use client";

import { useState, useEffect, useCallback } from "react";
import { api, ModerationConfig } from "@/lib/api";

/* ============================================================
   Moderation Page
   ============================================================ */

interface ModRule {
  id: string;
  name: string;
  configKey: keyof ModerationConfig;
  description: string;
  enabled: boolean;
  severity: "low" | "medium" | "high";
  action: string;
}

// Map between UI rule ids and API config keys
const RULE_DEFINITIONS: {
  id: string;
  name: string;
  configKey: string;
  description: string;
  severity: "low" | "medium" | "high";
  action: string;
}[] = [
  { id: "links", name: "Link Filter", configKey: "linkFilter", description: "Block unauthorized links. Permits whitelisted domains.", severity: "medium", action: "Delete + Warn" },
  { id: "spam", name: "Spam Detection", configKey: "spamFilter", description: "Detect repeated messages, character spam, and copypasta.", severity: "medium", action: "Delete + Timeout 5m" },
  { id: "caps", name: "Caps Filter", configKey: "capsFilter", description: "Limit messages with excessive capitalization (>70% caps).", severity: "low", action: "Delete + Warn" },
  { id: "banned", name: "Banned Words", configKey: "bannedWords", description: "Filter messages containing blacklisted words/phrases.", severity: "high", action: "Delete + Warn" },
  { id: "slow", name: "Slow Mode", configKey: "slowMode", description: "Require delay between messages per user.", severity: "low", action: "Rate limit 5s" },
  { id: "emotes", name: "Emote Spam", configKey: "emoteSpam", description: "Limit excessive emote usage in a single message.", severity: "low", action: "Delete" },
  { id: "mentions", name: "Mass Mentions", configKey: "massMentions", description: "Block messages that @mention too many users.", severity: "high", action: "Delete + Timeout 10m" },
  { id: "invites", name: "Discord Invites", configKey: "discordInvites", description: "Block Discord server invite links.", severity: "high", action: "Delete + Warn" },
];

const ESCALATION_STEPS = [
  { step: 1, action: "Verbal Warning", description: "LISA sends a friendly warning", icon: "text-warning" },
  { step: 2, action: "Final Warning", description: "Formal warning logged to database", icon: "text-warning" },
  { step: 3, action: "Mute (10 min)", description: "Temporary mute across all platforms", icon: "text-error" },
  { step: 4, action: "Temp Ban (1 hr)", description: "Temporary ban from chat", icon: "text-error" },
  { step: 5, action: "Temp Ban (24 hr)", description: "Full day ban from chat", icon: "text-error" },
  { step: 6, action: "Permanent Ban", description: "Permanently banned from all platforms", icon: "text-error" },
];

const MOD_LOG = [
  { time: "2:34 PM", user: "ToxicUser123", action: "Banned Word", platform: "Twitch", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "2:22 PM", user: "SpamBot_99", action: "Spam Detected", platform: "Kick", result: "Deleted + Timeout 5m", moderator: "LISA" },
  { time: "1:58 PM", user: "LinkDropper", action: "Link Filter", platform: "Discord", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "1:45 PM", user: "CapsLock_King", action: "Caps Filter", platform: "Twitch", result: "Deleted", moderator: "LISA" },
  { time: "1:30 PM", user: "RaidBot_7", action: "Mass Mentions", platform: "Discord", result: "Timeout 10m", moderator: "LISA" },
  { time: "12:15 PM", user: "ToxicUser123", action: "Banned Word (2nd)", platform: "Twitch", result: "Deleted + Warning #2", moderator: "LISA" },
  { time: "11:52 AM", user: "InviteSpam", action: "Discord Invite", platform: "Kick", result: "Deleted + Warning #1", moderator: "LISA" },
  { time: "11:30 AM", user: "TrollAccount", action: "Manual Ban", platform: "All", result: "Permanent Ban", moderator: "Pro" },
];

const BANNED_USERS = [
  { user: "TrollAccount", reason: "Targeted harassment", date: "Feb 12, 2026", type: "Permanent", by: "Pro" },
  { user: "HateBot_99", reason: "Hate speech", date: "Feb 10, 2026", type: "Permanent", by: "LISA" },
  { user: "ScamLink_Pro", reason: "Phishing links", date: "Feb 8, 2026", type: "Permanent", by: "LISA" },
  { user: "Impersonator_1", reason: "Impersonating staff", date: "Feb 5, 2026", type: "30 days", by: "Pro" },
];

export default function ModerationPage() {
  const [rules, setRules] = useState<ModRule[]>([]);
  const [modConfig, setModConfig] = useState<ModerationConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [searchUser, setSearchUser] = useState("");
  const [activeTab, setActiveTab] = useState<"rules" | "log" | "bans" | "escalation">("rules");

  // Fetch moderation config from API
  const fetchConfig = useCallback(async () => {
    try {
      setConfigLoading(true);
      setConfigError("");
      const config = await api.moderationConfig();
      setModConfig(config);

      // Build rules from API config merged with definitions
      const builtRules: ModRule[] = RULE_DEFINITIONS.map((def) => {
        const configValue = config[def.configKey];
        let enabled: boolean;
        if (typeof configValue === "boolean") {
          enabled = configValue;
        } else if (def.configKey === "bannedWords") {
          // bannedWords is an array — rule is "enabled" if there are words
          enabled = Array.isArray(configValue) && configValue.length > 0;
        } else {
          // For keys not in the config, default to false
          enabled = !!configValue;
        }
        return {
          id: def.id,
          name: def.name,
          configKey: def.configKey as keyof ModerationConfig,
          description: def.description,
          enabled,
          severity: def.severity,
          action: def.action,
        };
      });
      setRules(builtRules);
    } catch (err) {
      setConfigError(err instanceof Error ? err.message : "Failed to fetch moderation config");
      // Fall back to default rules
      setRules(
        RULE_DEFINITIONS.map((def) => ({
          id: def.id,
          name: def.name,
          configKey: def.configKey as keyof ModerationConfig,
          description: def.description,
          enabled: false,
          severity: def.severity,
          action: def.action,
        }))
      );
    } finally {
      setConfigLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Toggle a rule and save to API
  const toggleRule = async (id: string) => {
    const rule = rules.find((r) => r.id === id);
    if (!rule) return;

    const newEnabled = !rule.enabled;

    // Optimistic update
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: newEnabled } : r))
    );

    // Build the partial config update
    const update: Partial<ModerationConfig> = {};
    const configKey = rule.configKey;

    if (configKey === "bannedWords") {
      // Cannot toggle bannedWords as a boolean, skip the save for this one
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (update as any)[configKey] = newEnabled;

    setSaving(true);
    setSaveResult(null);
    try {
      await api.moderationSave(update);
      setSaveResult({ ok: true, message: `${rule.name} ${newEnabled ? "enabled" : "disabled"}` });
      // Update local config mirror
      if (modConfig) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setModConfig({ ...modConfig, [configKey]: newEnabled } as any);
      }
      setTimeout(() => setSaveResult(null), 3000);
    } catch (err) {
      // Revert optimistic update
      setRules((prev) =>
        prev.map((r) => (r.id === id ? { ...r, enabled: !newEnabled } : r))
      );
      setSaveResult({
        ok: false,
        message: err instanceof Error ? err.message : "Failed to save",
      });
      setTimeout(() => setSaveResult(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  // Toggle master enable/disable
  const toggleMasterEnabled = async () => {
    if (!modConfig) return;
    const newEnabled = !modConfig.enabled;
    const prevConfig = { ...modConfig };

    // Optimistic update
    setModConfig({ ...modConfig, enabled: newEnabled });

    setSaving(true);
    setSaveResult(null);
    try {
      await api.moderationSave({ enabled: newEnabled });
      setSaveResult({ ok: true, message: `Auto-mod ${newEnabled ? "enabled" : "disabled"}` });
      setTimeout(() => setSaveResult(null), 3000);
    } catch (err) {
      setModConfig(prevConfig);
      setSaveResult({
        ok: false,
        message: err instanceof Error ? err.message : "Failed to save",
      });
      setTimeout(() => setSaveResult(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const activeRulesCount = rules.filter((r) => r.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Moderation</h1>
          <p className="text-sm text-muted mt-1">Auto-mod rules, user management, and moderation logs</p>
        </div>
        <div className="flex items-center gap-3">
          {configLoading ? (
            <div className="badge badge-gold">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Loading...
            </div>
          ) : modConfig?.enabled ? (
            <button onClick={toggleMasterEnabled} disabled={saving} className="badge badge-emerald cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Auto-Mod Active
            </button>
          ) : (
            <button onClick={toggleMasterEnabled} disabled={saving} className="badge badge-red cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Auto-Mod Disabled
            </button>
          )}
        </div>
      </div>

      {/* Save feedback toast */}
      {saveResult && (
        <div className={`p-3 rounded-lg border text-xs ${
          saveResult.ok
            ? "bg-emerald/10 border-emerald/20 text-emerald"
            : "bg-error/10 border-error/20 text-error"
        }`}>
          <div className="flex items-center gap-2">
            {saveResult.ok ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            )}
            {saveResult.message}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["rules", "log", "bans", "escalation"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "log" ? "Mod Log" : tab === "bans" ? "Banned Users" : tab}
          </button>
        ))}
      </div>

      {/* Rules Tab */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Rules Active", value: configLoading ? "--" : activeRulesCount, total: configLoading ? "" : rules.length, color: "text-emerald" },
              { label: "Actions Today", value: "47", total: "", color: "text-electric" },
              { label: "Users Warned", value: "12", total: "", color: "text-warning" },
              { label: "Users Banned", value: "2", total: "", color: "text-error" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <div className={`text-xl font-extrabold ${stat.color}`}>
                  {stat.value}{stat.total && <span className="text-dim text-sm">/{stat.total}</span>}
                </div>
                <div className="text-[10px] text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Rules Grid */}
          {configLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-glass" />
                      <div className="h-3 bg-glass rounded w-24" />
                    </div>
                    <div className="w-10 h-5 rounded-full bg-glass" />
                  </div>
                  <div className="h-2 bg-glass rounded w-full mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-glass rounded w-12" />
                    <div className="h-2 bg-glass rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : configError ? (
            <div className="card p-6 text-center">
              <p className="text-xs text-error mb-3">{configError}</p>
              <button onClick={fetchConfig} className="btn btn-ghost btn-sm text-xs">
                Retry
              </button>
              <p className="text-[10px] text-dim mt-2">Showing default rule definitions below (not synced with server)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {rules.map((rule) => (
                  <div key={rule.id} className={`card p-4 ${!rule.enabled ? "opacity-50" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          rule.severity === "high" ? "bg-error" :
                          rule.severity === "medium" ? "bg-warning" : "bg-info"
                        }`} />
                        <span className="text-sm font-bold">{rule.name}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted mb-3">{rule.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        rule.severity === "high" ? "bg-error/10 text-error" :
                        rule.severity === "medium" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                      }`}>
                        {rule.severity}
                      </span>
                      <span className="text-[10px] text-dim">{rule.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((rule) => (
                <div key={rule.id} className={`card p-4 transition-opacity ${!rule.enabled ? "opacity-50" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        rule.severity === "high" ? "bg-error" :
                        rule.severity === "medium" ? "bg-warning" : "bg-info"
                      }`} />
                      <span className="text-sm font-bold">{rule.name}</span>
                    </div>
                    <button
                      onClick={() => toggleRule(rule.id)}
                      disabled={saving}
                      className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                        rule.enabled ? "bg-emerald" : "bg-dim"
                      } ${saving ? "opacity-50 cursor-wait" : ""}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                        rule.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                  <p className="text-xs text-muted mb-3">{rule.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      rule.severity === "high" ? "bg-error/10 text-error" :
                      rule.severity === "medium" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                    }`}>
                      {rule.severity}
                    </span>
                    <span className="text-[10px] text-dim">{rule.action}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mod Log Tab */}
      {activeTab === "log" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Time</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">User</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Action</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Platform</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Result</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">By</th>
                </tr>
              </thead>
              <tbody>
                {MOD_LOG.map((entry, i) => (
                  <tr key={i} className="border-b border-glass-border hover:bg-glass transition-colors">
                    <td className="p-4 text-data text-xs text-dim">{entry.time}</td>
                    <td className="p-4 text-xs font-semibold">{entry.user}</td>
                    <td className="p-4 text-xs text-muted">{entry.action}</td>
                    <td className="p-4 text-xs text-muted">{entry.platform}</td>
                    <td className="p-4 text-xs text-muted">{entry.result}</td>
                    <td className="p-4 text-xs text-electric">{entry.moderator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Banned Users Tab */}
      {activeTab === "bans" && (
        <div className="space-y-4">
          {/* Search + Actions */}
          <div className="flex gap-3">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Search by username..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
            />
            <button className="btn btn-primary btn-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Ban User
            </button>
          </div>

          {/* Banned List */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Username</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Reason</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Date</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Type</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">By</th>
                    <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {BANNED_USERS.map((user) => (
                    <tr key={user.user} className="border-b border-glass-border hover:bg-glass transition-colors">
                      <td className="p-4 text-xs font-semibold text-error">{user.user}</td>
                      <td className="p-4 text-xs text-muted">{user.reason}</td>
                      <td className="p-4 text-data text-xs text-dim">{user.date}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.type === "Permanent" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                        }`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-muted">{user.by}</td>
                      <td className="p-4 text-right">
                        <button className="btn btn-ghost btn-sm text-xs">Unban</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Tab */}
      {activeTab === "escalation" && (
        <div className="card p-6">
          <h2 className="text-sm font-bold mb-6">Warning Escalation Pipeline</h2>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-glass-border" />

            <div className="space-y-6">
              {ESCALATION_STEPS.map((step) => (
                <div key={step.step} className="flex items-start gap-4 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-glass border border-glass-border z-10 ${step.icon}`}>
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <div className="text-sm font-bold">{step.action}</div>
                    <p className="text-xs text-muted mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button className="btn btn-secondary btn-sm">Customize Pipeline</button>
          </div>
        </div>
      )}
    </div>
  );
}
