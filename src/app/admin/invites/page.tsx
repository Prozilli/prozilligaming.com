"use client";

import { useState, useEffect } from "react";
import { useDiscordTextChannels, useDiscordRoles, getSetting, saveSetting } from "@/lib/admin-api";

interface InviteMilestone {
  invites: number;
  reward: string;
  roleId: string;
}

interface InviteTrackerConfig {
  enabled: boolean;
  channelId: string;
  messageTemplate: string;
  milestones: InviteMilestone[];
}

const DEFAULT_CONFIG: InviteTrackerConfig = {
  enabled: false,
  channelId: "",
  messageTemplate: "{inviter} just invited {invited}! They now have {count} invites.",
  milestones: [
    { invites: 5, reward: "Recruiter badge", roleId: "" },
    { invites: 10, reward: "Community Builder role", roleId: "" },
    { invites: 25, reward: "Top Recruiter role", roleId: "" },
  ],
};

export default function InviteTrackerPage() {
  const [config, setConfig] = useState<InviteTrackerConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const saved = await getSetting<InviteTrackerConfig>("invite_tracker_config");
        if (saved) setConfig(saved);
      } catch (err) {
        console.error("Failed to load invite tracker settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("invite_tracker_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addMilestone = () => {
    setConfig((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { invites: 10, reward: "", roleId: "" },
      ],
    }));
  };

  const removeMilestone = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const updateMilestone = <K extends keyof InviteMilestone>(
    index: number,
    key: K,
    value: InviteMilestone[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => (i === index ? { ...m, [key]: value } : m)),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invite Tracker</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track server invites and reward top inviters with roles and milestones
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative h-6 w-11 rounded-full transition-colors ${config.enabled ? "bg-red" : "bg-raised"}`}
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enabled ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-400">{config.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Log Channel */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Log Channel</h3>
        <p className="text-xs text-gray-500 mb-3">
          Where invite tracking messages will be posted
        </p>
        {channelsLoading ? (
          <div className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-gray-500">
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
            className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
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

      {/* Message Template */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Message Template</h3>
        <textarea
          value={config.messageTemplate}
          onChange={(e) => setConfig({ ...config, messageTemplate: e.target.value })}
          rows={3}
          placeholder="{inviter} just invited {invited}! They now have {count} invites."
          className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red resize-none"
        />
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500 mb-2">Available Variables</p>
          <div className="grid gap-2 text-xs">
            <div className="flex justify-between">
              <code className="text-gold">{"{inviter}"}</code>
              <span className="text-gray-500">@mention the inviter</span>
            </div>
            <div className="flex justify-between">
              <code className="text-gold">{"{invited}"}</code>
              <span className="text-gray-500">@mention the new member</span>
            </div>
            <div className="flex justify-between">
              <code className="text-gold">{"{count}"}</code>
              <span className="text-gray-500">Inviter&apos;s total invite count</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Rewards */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Milestone Rewards</h3>
            <p className="text-xs text-gray-500 mt-1">
              Reward members when they reach invite milestones
            </p>
          </div>
          <button
            onClick={addMilestone}
            className="flex items-center gap-1.5 rounded-lg bg-surface px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-raised"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Milestone
          </button>
        </div>

        {config.milestones.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            No milestone rewards configured. Click &quot;Add Milestone&quot; to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Invites</div>
              <div className="col-span-4">Reward Description</div>
              <div className="col-span-5">Role Reward</div>
              <div className="col-span-1"></div>
            </div>

            {/* Milestone Rows */}
            {config.milestones.map((milestone, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-lg bg-surface p-3 items-center"
              >
                {/* Invites Threshold */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Invites</label>
                  <input
                    type="number"
                    min={1}
                    value={milestone.invites}
                    onChange={(e) => updateMilestone(index, "invites", parseInt(e.target.value) || 1)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Reward Description */}
                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Reward</label>
                  <input
                    type="text"
                    value={milestone.reward}
                    onChange={(e) => updateMilestone(index, "reward", e.target.value)}
                    placeholder="Reward description"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Role Reward */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Role</label>
                  {rolesLoading ? (
                    <div className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-gray-500">
                      Loading...
                    </div>
                  ) : (
                    <select
                      value={milestone.roleId}
                      onChange={(e) => updateMilestone(index, "roleId", e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="">No role reward</option>
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

                {/* Remove */}
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeMilestone(index)}
                    className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
          className="rounded-lg bg-red px-6 py-2.5 text-sm font-medium text-white hover:bg-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
