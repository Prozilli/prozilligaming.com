"use client";

import { useState } from "react";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  triggerType: "join" | "leave" | "message" | "reaction" | "scheduled" | "role";
  actions: string[];
  enabled: boolean;
  runs: number;
}

const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: "1",
    name: "New Member Welcome",
    trigger: "Member joins server",
    triggerType: "join",
    actions: ["Assign @New Member role", "Send welcome DM", "Log to #joins"],
    enabled: true,
    runs: 3247,
  },
  {
    id: "2",
    name: "Subscriber Sync",
    trigger: "Twitch sub detected",
    triggerType: "role",
    actions: ["Assign @Subscriber role", "Send thank you message"],
    enabled: true,
    runs: 892,
  },
  {
    id: "3",
    name: "Daily Reminder",
    trigger: "Every day at 6 PM EST",
    triggerType: "scheduled",
    actions: ["Post stream reminder in #announcements"],
    enabled: false,
    runs: 156,
  },
  {
    id: "4",
    name: "Level 10 Reward",
    trigger: "Member reaches level 10",
    triggerType: "role",
    actions: ["Assign @Regular role", "Send congratulations message"],
    enabled: true,
    runs: 234,
  },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(MOCK_AUTOMATIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleAutomation = (id: string) => {
    setAutomations(
      automations.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const deleteAutomation = (id: string) => {
    setAutomations(automations.filter((a) => a.id !== id));
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case "join":
        return "👋";
      case "leave":
        return "👋";
      case "message":
        return "💬";
      case "reaction":
        return "⭐";
      case "scheduled":
        return "⏰";
      case "role":
        return "🏷️";
      default:
        return "⚡";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automations</h1>
          <p className="mt-1 text-sm text-gray-400">
            Create automated workflows triggered by events
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-red px-4 py-2.5 text-sm font-medium text-white hover:bg-red/90"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-4">
          <p className="text-2xl font-bold text-white">{automations.length}</p>
          <p className="text-xs text-gray-500">Total Automations</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-4">
          <p className="text-2xl font-bold text-green-400">
            {automations.filter((a) => a.enabled).length}
          </p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-4">
          <p className="text-2xl font-bold text-gold">
            {automations.reduce((sum, a) => sum + a.runs, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Total Runs</p>
        </div>
      </div>

      {/* Automations List */}
      <div className="space-y-3">
        {automations.map((automation) => (
          <div
            key={automation.id}
            className={`rounded-xl border border-[var(--color-border)] bg-surface p-5 ${
              !automation.enabled ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-2xl">
                  {getTriggerIcon(automation.triggerType)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {automation.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    When: {automation.trigger}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {automation.actions.map((action, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-surface px-3 py-1 text-xs text-gray-400"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Ran {automation.runs.toLocaleString()} times
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAutomation(automation.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    automation.enabled ? "bg-green-500" : "bg-raised"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      automation.enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
                <button className="rounded-lg bg-surface p-2 text-gray-400 hover:bg-raised hover:text-white">
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deleteAutomation(automation.id)}
                  className="rounded-lg bg-surface p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-surface p-6">
            <h2 className="text-lg font-bold text-white mb-6">
              Create Automation
            </h2>

            {/* Trigger Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                When this happens...
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "join", label: "Member Joins", icon: "👋" },
                  { type: "leave", label: "Member Leaves", icon: "👋" },
                  { type: "message", label: "Message Sent", icon: "💬" },
                  { type: "reaction", label: "Reaction Added", icon: "⭐" },
                  { type: "scheduled", label: "Scheduled Time", icon: "⏰" },
                  { type: "role", label: "Role Changed", icon: "🏷️" },
                ].map((trigger) => (
                  <button
                    key={trigger.type}
                    className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-surface p-4 text-left hover:border-brand-red hover:bg-red/5 transition-colors"
                  >
                    <span className="text-2xl">{trigger.icon}</span>
                    <span className="text-sm text-white">{trigger.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                Do these actions...
              </label>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 rounded-lg border border-dashed border-white/20 p-4 text-gray-400 hover:border-white/40 hover:text-white transition-colors">
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span className="text-sm">Add Action</span>
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Actions: Assign/Remove Role, Send Message, Add Reaction, Wait,
                Log
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg bg-surface px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-raised hover:text-white"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-red px-6 py-2.5 text-sm font-medium text-white hover:bg-red/90">
                Create Automation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
