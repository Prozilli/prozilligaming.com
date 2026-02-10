"use client";

import { useState, useEffect, useCallback } from "react";
import { getSetting, saveSetting, useDiscordTextChannels } from "@/lib/admin-api";

type TabType = "active" | "create" | "history";

interface Giveaway {
  id: string;
  prize: string;
  winners: number;
  entries: number;
  endsAt: string;
  channel: string;
  status: "active" | "ended" | "cancelled";
  hostedBy: string;
}

const DEFAULT_NEW_GIVEAWAY = {
  prize: "",
  winners: 1,
  duration: "24h",
  channel: "",
  requirements: {
    roles: [] as string[],
    minLevel: 0,
    minMessages: 0,
  },
  bonusEntries: [] as { roleId: string; roleName: string; entries: number }[],
};

export default function GiveawaysPage() {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [newGiveaway, setNewGiveaway] = useState(DEFAULT_NEW_GIVEAWAY);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { channels: textChannels, loading: channelsLoading } =
    useDiscordTextChannels();

  // Load giveaways on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getSetting<Giveaway[]>("giveaways");
        if (stored) setGiveaways(stored);
      } catch {
        // silently fall back to empty array
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Derived lists
  const activeGiveaways = giveaways.filter((g) => g.status === "active");
  const pastGiveaways = giveaways.filter(
    (g) => g.status === "ended" || g.status === "cancelled"
  );

  // Persist helper
  const persistGiveaways = useCallback(
    async (updated: Giveaway[]) => {
      setSaving(true);
      try {
        await saveSetting("giveaways", updated);
        setGiveaways(updated);
      } catch {
        // keep local state in sync even if save fails
        setGiveaways(updated);
      } finally {
        setSaving(false);
      }
    },
    []
  );

  // Start giveaway
  const handleStartGiveaway = useCallback(async () => {
    if (!newGiveaway.prize || !newGiveaway.channel) return;

    const created: Giveaway = {
      id: String(Date.now()),
      prize: newGiveaway.prize,
      winners: newGiveaway.winners,
      entries: 0,
      endsAt: newGiveaway.duration,
      channel: newGiveaway.channel,
      status: "active",
      hostedBy: "Pro",
    };

    await persistGiveaways([...giveaways, created]);
    setNewGiveaway(DEFAULT_NEW_GIVEAWAY);
    setActiveTab("active");
  }, [newGiveaway, giveaways, persistGiveaways]);

  // End giveaway early
  const handleEndEarly = useCallback(
    async (id: string) => {
      const updated = giveaways.map((g) =>
        g.id === id ? { ...g, status: "ended" as const, endsAt: "Ended just now" } : g
      );
      await persistGiveaways(updated);
    },
    [giveaways, persistGiveaways]
  );

  // Cancel giveaway
  const handleCancel = useCallback(
    async (id: string) => {
      const updated = giveaways.map((g) =>
        g.id === id ? { ...g, status: "cancelled" as const, endsAt: "Cancelled" } : g
      );
      await persistGiveaways(updated);
    },
    [giveaways, persistGiveaways]
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Giveaways</h1>
          <p className="mt-1 text-sm text-gray-400">
            Create and manage server giveaways
          </p>
        </div>
        <button
          onClick={() => setActiveTab("create")}
          className="flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red/90"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Giveaway
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        {[
          { id: "active", label: "Active", count: activeGiveaways.length },
          { id: "create", label: "Create" },
          { id: "history", label: "History", count: pastGiveaways.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-brand-red text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === tab.id
                    ? "bg-white/20"
                    : "bg-white/10"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active Giveaways */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeGiveaways.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10">
                <svg
                  className="h-8 w-8 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                No Active Giveaways
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Create a new giveaway to get started
              </p>
              <button
                onClick={() => setActiveTab("create")}
                className="mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red/90"
              >
                Create Giveaway
              </button>
            </div>
          ) : (
            activeGiveaways.map((giveaway) => (
              <div
                key={giveaway.id}
                className="rounded-xl border border-white/5 bg-[#161b22] p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/20 text-brand-red">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {giveaway.prize}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {giveaway.winners} winner{giveaway.winners > 1 ? "s" : ""} •{" "}
                        {giveaway.channel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-white/5 p-3 text-center">
                    <p className="text-2xl font-bold text-white">
                      {giveaway.entries}
                    </p>
                    <p className="text-xs text-gray-500">Entries</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3 text-center">
                    <p className="text-2xl font-bold text-brand-gold">
                      {giveaway.endsAt}
                    </p>
                    <p className="text-xs text-gray-500">Time Left</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3 text-center">
                    <p className="text-2xl font-bold text-white">
                      {giveaway.hostedBy}
                    </p>
                    <p className="text-xs text-gray-500">Hosted By</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    View Entries
                  </button>
                  <button
                    onClick={() => handleEndEarly(giveaway.id)}
                    disabled={saving}
                    className="flex-1 rounded-lg bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/20 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "End Early"}
                  </button>
                  <button
                    onClick={() => handleCancel(giveaway.id)}
                    disabled={saving}
                    className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Cancel"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Giveaway */}
      {activeTab === "create" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Giveaway Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Prize
                </label>
                <input
                  type="text"
                  value={newGiveaway.prize}
                  onChange={(e) =>
                    setNewGiveaway({ ...newGiveaway, prize: e.target.value })
                  }
                  placeholder="What are you giving away?"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Number of Winners
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newGiveaway.winners}
                    onChange={(e) =>
                      setNewGiveaway({
                        ...newGiveaway,
                        winners: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Duration
                  </label>
                  <select
                    value={newGiveaway.duration}
                    onChange={(e) =>
                      setNewGiveaway({ ...newGiveaway, duration: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="1h">1 Hour</option>
                    <option value="6h">6 Hours</option>
                    <option value="12h">12 Hours</option>
                    <option value="24h">24 Hours</option>
                    <option value="3d">3 Days</option>
                    <option value="7d">1 Week</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Channel
                </label>
                <select
                  value={newGiveaway.channel}
                  onChange={(e) =>
                    setNewGiveaway({ ...newGiveaway, channel: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  <option value="">
                    {channelsLoading ? "Loading channels..." : "Select a channel..."}
                  </option>
                  {textChannels.map((ch) => (
                    <option key={ch.id} value={`#${ch.name}`}>
                      #{ch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Entry Requirements
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Minimum Level
                </label>
                <input
                  type="number"
                  min="0"
                  value={newGiveaway.requirements.minLevel}
                  onChange={(e) =>
                    setNewGiveaway({
                      ...newGiveaway,
                      requirements: {
                        ...newGiveaway.requirements,
                        minLevel: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  placeholder="0 for no requirement"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Minimum Messages
                </label>
                <input
                  type="number"
                  min="0"
                  value={newGiveaway.requirements.minMessages}
                  onChange={(e) =>
                    setNewGiveaway({
                      ...newGiveaway,
                      requirements: {
                        ...newGiveaway.requirements,
                        minMessages: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  placeholder="0 for no requirement"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActiveTab("active")}
              className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleStartGiveaway}
              disabled={saving || !newGiveaway.prize || !newGiveaway.channel}
              className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50"
            >
              {saving ? "Starting..." : "Start Giveaway"}
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {pastGiveaways.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
              <h3 className="text-lg font-semibold text-white">
                No Past Giveaways
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Completed and cancelled giveaways will appear here
              </p>
            </div>
          ) : (
            pastGiveaways.map((giveaway) => (
              <div
                key={giveaway.id}
                className="rounded-xl border border-white/5 bg-[#161b22] p-5 opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-500/20 text-gray-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {giveaway.prize}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {giveaway.winners} winner{giveaway.winners > 1 ? "s" : ""} •{" "}
                        {giveaway.entries} entries • {giveaway.endsAt}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      giveaway.status === "cancelled"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {giveaway.status === "cancelled" ? "Cancelled" : "Ended"}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    View Winners
                  </button>
                  <button className="rounded-lg bg-brand-red/10 px-4 py-2 text-sm font-medium text-brand-red transition-colors hover:bg-brand-red/20">
                    Reroll
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
