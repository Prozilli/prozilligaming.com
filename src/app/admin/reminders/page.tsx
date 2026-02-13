"use client";

import { useState, useEffect } from "react";
import { getSetting, saveSetting } from "@/lib/admin-api";

interface ScheduledReminder {
  message: string;
  days: string[];
  time: string;
  platforms: string[];
  enabled: boolean;
}

interface RemindersConfig {
  streamReminders: { enabled: boolean; intervalMinutes: number };
  scheduled: ScheduledReminder[];
}

const DEFAULT_CONFIG: RemindersConfig = {
  streamReminders: { enabled: false, intervalMinutes: 30 },
  scheduled: [],
};

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ALL_PLATFORMS = [
  { id: "twitch", label: "Twitch" },
  { id: "kick", label: "Kick" },
  { id: "discord", label: "Discord" },
  { id: "youtube", label: "YouTube" },
  { id: "trovo", label: "Trovo" },
];

const EMPTY_REMINDER: ScheduledReminder = {
  message: "",
  days: [],
  time: "12:00",
  platforms: [],
  enabled: true,
};

export default function RemindersPage() {
  const [config, setConfig] = useState<RemindersConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Load settings on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getSetting<RemindersConfig>("reminders_config");
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
      await saveSetting("reminders_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addReminder = () => {
    setConfig({
      ...config,
      scheduled: [...config.scheduled, { ...EMPTY_REMINDER }],
    });
  };

  const removeReminder = (index: number) => {
    setConfig({
      ...config,
      scheduled: config.scheduled.filter((_, i) => i !== index),
    });
  };

  const updateReminder = (index: number, updates: Partial<ScheduledReminder>) => {
    const updated = [...config.scheduled];
    updated[index] = { ...updated[index], ...updates };
    setConfig({ ...config, scheduled: updated });
  };

  const toggleDay = (index: number, day: string) => {
    const reminder = config.scheduled[index];
    const days = reminder.days.includes(day)
      ? reminder.days.filter((d) => d !== day)
      : [...reminder.days, day];
    updateReminder(index, { days });
  };

  const togglePlatform = (index: number, platform: string) => {
    const reminder = config.scheduled[index];
    const platforms = reminder.platforms.includes(platform)
      ? reminder.platforms.filter((p) => p !== platform)
      : [...reminder.platforms, platform];
    updateReminder(index, { platforms });
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
        <h1 className="text-2xl font-bold text-white">Reminders</h1>
        <p className="mt-1 text-sm text-gray-400">
          Configure stream link reminders and scheduled messages
        </p>
      </div>

      {/* Stream Reminders */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Stream Link Reminders</h3>
            <p className="text-xs text-gray-500 mt-1">
              Automatically post stream links in chat at regular intervals while live
            </p>
          </div>
          <button
            onClick={() =>
              setConfig({
                ...config,
                streamReminders: {
                  ...config.streamReminders,
                  enabled: !config.streamReminders.enabled,
                },
              })
            }
            className={`relative h-6 w-11 rounded-full transition-colors ${
              config.streamReminders.enabled ? "bg-red" : "bg-raised"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                config.streamReminders.enabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {config.streamReminders.enabled && (
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Interval (minutes)
            </label>
            <input
              type="number"
              min={5}
              max={120}
              value={config.streamReminders.intervalMinutes}
              onChange={(e) =>
                setConfig({
                  ...config,
                  streamReminders: {
                    ...config.streamReminders,
                    intervalMinutes: parseInt(e.target.value) || 30,
                  },
                })
              }
              className="w-32 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              Stream links will be posted every {config.streamReminders.intervalMinutes} minutes during a live stream.
            </p>
          </div>
        )}
      </div>

      {/* Scheduled Reminders */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Scheduled Reminders</h3>
            <p className="text-xs text-gray-500 mt-1">
              Set up recurring messages on specific days and times
            </p>
          </div>
          <button
            onClick={addReminder}
            className="flex items-center gap-1.5 rounded-lg bg-red/10 px-3 py-1.5 text-xs font-medium text-red transition-colors hover:bg-red/20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Reminder
          </button>
        </div>

        {config.scheduled.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
            <svg className="mx-auto h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No scheduled reminders yet</p>
            <button
              onClick={addReminder}
              className="mt-3 text-xs font-medium text-red hover:text-red/80 transition-colors"
            >
              Add your first reminder
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {config.scheduled.map((reminder, index) => (
              <div
                key={index}
                className="rounded-lg border border-[var(--color-border)] bg-white/[0.02] p-4 space-y-4"
              >
                {/* Reminder Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">
                    Reminder #{index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateReminder(index, { enabled: !reminder.enabled })}
                      className={`relative h-5 w-9 rounded-full transition-colors ${
                        reminder.enabled ? "bg-red" : "bg-raised"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                          reminder.enabled ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => removeReminder(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    value={reminder.message}
                    onChange={(e) => updateReminder(index, { message: e.target.value })}
                    placeholder="Enter the reminder message..."
                    rows={2}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
                  />
                </div>

                {/* Days of Week */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Days
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_DAYS.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(index, day)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                          reminder.days.includes(day)
                            ? "bg-red text-white"
                            : "bg-surface text-gray-400 hover:bg-raised hover:text-white"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={reminder.time}
                    onChange={(e) => updateReminder(index, { time: e.target.value })}
                    className="w-36 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Platforms */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Platforms
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ALL_PLATFORMS.map((platform) => (
                      <label key={platform.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reminder.platforms.includes(platform.id)}
                          onChange={() => togglePlatform(index, platform.id)}
                          className="h-4 w-4 rounded border-white/20 bg-surface text-red focus:ring-brand-red"
                        />
                        <span className="text-xs text-gray-300">{platform.label}</span>
                      </label>
                    ))}
                  </div>
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
