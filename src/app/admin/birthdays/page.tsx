"use client";

import { useState, useEffect } from "react";
import { useDiscordTextChannels, useDiscordRoles, getSetting, saveSetting } from "@/lib/admin-api";

interface BirthdaysConfig {
  enabled: boolean;
  channelId: string;
  hour: number;
  timezone: string;
  messageTemplate: string;
  autoRole: { roleId: string; durationDays: number };
}

const US_TIMEZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
  { value: "America/Anchorage", label: "Alaska (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii (HT)" },
];

const DEFAULT_CONFIG: BirthdaysConfig = {
  enabled: false,
  channelId: "",
  hour: 9,
  timezone: "America/New_York",
  messageTemplate: "Happy Birthday, {user}! You are now {age} years old! Have an amazing day!",
  autoRole: { roleId: "", durationDays: 1 },
};

export default function BirthdaysPage() {
  const [config, setConfig] = useState<BirthdaysConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const saved = await getSetting<BirthdaysConfig>("birthdays_config");
        if (saved) setConfig(saved);
      } catch (err) {
        console.error("Failed to load birthday settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("birthdays_config", config);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Birthdays</h1>
          <p className="mt-1 text-sm text-gray-400">
            Celebrate member birthdays automatically with announcements and temporary roles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative h-6 w-11 rounded-full transition-colors ${config.enabled ? "bg-brand-red" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enabled ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-400">{config.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Announce Channel */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Announce Channel</h3>
        <p className="text-xs text-gray-500 mb-3">
          Where birthday announcements will be posted each day
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
            onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
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

      {/* Schedule */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Schedule</h3>
        <p className="text-xs text-gray-500 mb-3">
          When to check and send birthday announcements
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Hour of Day</label>
            <select
              value={config.hour}
              onChange={(e) => setConfig({ ...config, hour: parseInt(e.target.value) })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const label = i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
                return (
                  <option key={i} value={i}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Timezone</label>
            <select
              value={config.timezone}
              onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              {US_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message Template */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Message Template</h3>
        <textarea
          value={config.messageTemplate}
          onChange={(e) => setConfig({ ...config, messageTemplate: e.target.value })}
          rows={4}
          placeholder="Happy Birthday, {user}!"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red resize-none"
        />
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500 mb-2">Available Variables</p>
          <div className="grid gap-2 text-xs">
            <div className="flex justify-between">
              <code className="text-brand-gold">{"{user}"}</code>
              <span className="text-gray-500">@mention the birthday member</span>
            </div>
            <div className="flex justify-between">
              <code className="text-brand-gold">{"{age}"}</code>
              <span className="text-gray-500">Member&apos;s new age (if set)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Role */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Birthday Role</h3>
        <p className="text-xs text-gray-500 mb-3">
          Automatically assign a special role on the member&apos;s birthday
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Role</label>
            {rolesLoading ? (
              <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                Loading roles...
              </div>
            ) : (
              <select
                value={config.autoRole.roleId}
                onChange={(e) =>
                  setConfig({ ...config, autoRole: { ...config.autoRole, roleId: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              >
                <option value="">No birthday role</option>
                {roles
                  .filter((r) => !r.managed)
                  .map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Duration (days)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={config.autoRole.durationDays}
              onChange={(e) =>
                setConfig({
                  ...config,
                  autoRole: { ...config.autoRole, durationDays: parseInt(e.target.value) || 1 },
                })
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            />
            <p className="mt-1 text-xs text-gray-500">
              Role will be automatically removed after this many days
            </p>
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
