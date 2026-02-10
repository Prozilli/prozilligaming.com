"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getSetting,
  saveSetting,
  useDiscordTextChannels,
} from "@/lib/admin-api";

type TabType = "open" | "closed" | "settings";

interface Ticket {
  id: string;
  number: number;
  subject: string;
  user: string;
  userAvatar: string;
  category: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastReply: string;
  messages: number;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  enabled: boolean;
}

interface TicketConfig {
  enabled: boolean;
  categoryId: string;
  logChannelId: string;
  maxOpen: number;
  autoClose: number;
  dmTranscript: boolean;
  categories: Category[];
  tickets: Ticket[];
}

const DEFAULT_CONFIG: TicketConfig = {
  enabled: true,
  categoryId: "",
  logChannelId: "",
  maxOpen: 3,
  autoClose: 72,
  dmTranscript: true,
  categories: [
    { id: "1", name: "Support", emoji: "\uD83C\uDFAB", enabled: true },
    { id: "2", name: "Applications", emoji: "\uD83D\uDCDD", enabled: true },
    { id: "3", name: "Business", emoji: "\uD83D\uDCBC", enabled: true },
    { id: "4", name: "Reports", emoji: "\uD83D\uDEA8", enabled: true },
  ],
  tickets: [],
};

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("open");
  const [config, setConfig] = useState<TicketConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  // Fetch Discord text channels for selectors
  const {
    channels,
    loading: channelsLoading,
  } = useDiscordTextChannels();

  // Load ticket config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const stored = await getSetting<TicketConfig>("ticket_config");
        if (stored) {
          setConfig({ ...DEFAULT_CONFIG, ...stored });
        }
      } catch (err) {
        console.error("Failed to load ticket config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Derived data
  const tickets = config.tickets;
  const categories = config.categories;
  const openTickets = tickets.filter((t) => t.status !== "closed");
  const closedTickets = tickets.filter((t) => t.status === "closed");

  // Update a settings field
  const updateSettings = useCallback(
    <K extends keyof TicketConfig>(key: K, value: TicketConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Toggle a category's enabled state
  const toggleCategory = useCallback((catId: string) => {
    setConfig((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, enabled: !c.enabled } : c
      ),
    }));
  }, []);

  // Save config to API
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("ticket_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save ticket config:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
          <p className="mt-3 text-sm text-gray-400">
            Loading ticket configuration...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ticketing System</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage support tickets and member requests
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-brand-gold/10 px-3 py-2">
            <span className="text-lg">{"\uD83C\uDFAB"}</span>
            <div>
              <p className="text-sm font-medium text-brand-gold">
                {openTickets.length}
              </p>
              <p className="text-[10px] text-gray-400">Open Tickets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setActiveTab("open")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "open"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Open ({openTickets.length})
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "closed"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Closed ({closedTickets.length})
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "settings"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Settings
        </button>
      </div>

      {(activeTab === "open" || activeTab === "closed") && (
        <div className="space-y-3">
          {(activeTab === "open" ? openTickets : closedTickets).map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#161b22] p-4 hover:border-white/10 transition-colors cursor-pointer"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${
                  ticket.priority === "high"
                    ? "bg-red-500/20 text-red-400"
                    : ticket.priority === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {ticket.userAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">#{ticket.number}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      ticket.status === "open"
                        ? "bg-green-500/20 text-green-400"
                        : ticket.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-400">
                    {ticket.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-white truncate">
                  {ticket.subject}
                </p>
                <p className="text-xs text-gray-500">
                  {ticket.user} • Created {ticket.createdAt}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Last reply</p>
                <p className="text-sm text-white">{ticket.lastReply}</p>
                <p className="text-[10px] text-gray-500">
                  {ticket.messages} messages
                </p>
              </div>
              <button className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10">
                View
              </button>
            </div>
          ))}

          {(activeTab === "open" ? openTickets : closedTickets).length === 0 && (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
              <span className="text-4xl">{"\uD83C\uDFAB"}</span>
              <h3 className="mt-4 text-lg font-medium text-white">
                No {activeTab} tickets
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {activeTab === "open"
                  ? "All tickets have been resolved!"
                  : "No closed tickets yet"}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* General Settings */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Ticket System
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enable or disable the ticket system
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSettings("enabled", !config.enabled)
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    config.enabled ? "bg-green-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      config.enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">
                Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Ticket Category
                  </label>
                  <select
                    value={config.categoryId}
                    onChange={(e) =>
                      updateSettings("categoryId", e.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="">
                      {channelsLoading
                        ? "Loading channels..."
                        : "Select a channel"}
                    </option>
                    {channels.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        #{ch.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[10px] text-gray-500">
                    Ticket channels will be created here
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Log Channel
                  </label>
                  <select
                    value={config.logChannelId}
                    onChange={(e) =>
                      updateSettings("logChannelId", e.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="">
                      {channelsLoading
                        ? "Loading channels..."
                        : "Select a channel"}
                    </option>
                    {channels.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        #{ch.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Max Open Tickets Per User
                  </label>
                  <input
                    type="number"
                    value={config.maxOpen}
                    onChange={(e) =>
                      updateSettings(
                        "maxOpen",
                        parseInt(e.target.value) || 1
                      )
                    }
                    min={1}
                    max={10}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Auto-Close After (hours)
                  </label>
                  <input
                    type="number"
                    value={config.autoClose}
                    onChange={(e) =>
                      updateSettings(
                        "autoClose",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min={0}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-gray-500">
                    0 to disable auto-close
                  </p>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.dmTranscript}
                    onChange={(e) =>
                      updateSettings("dmTranscript", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red"
                  />
                  <div>
                    <p className="text-sm text-white">DM Transcript on Close</p>
                    <p className="text-xs text-gray-500">
                      Send ticket transcript to user when closed
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">
                  Ticket Categories
                </h3>
                <button className="rounded-lg bg-brand-red px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-red/90">
                  Add Category
                </button>
              </div>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded-lg bg-white/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-sm text-white">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          cat.enabled ? "bg-green-500" : "bg-white/10"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            cat.enabled ? "left-4" : "left-0.5"
                          }`}
                        />
                      </button>
                      <button className="text-gray-400 hover:text-white">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">
                Panel Message
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                This embed is shown in your ticket panel channel
              </p>
              <div className="rounded-lg bg-[#36393f] p-3">
                <div
                  className="rounded border-l-4 border-brand-red bg-[#2f3136] p-3"
                >
                  <p className="font-semibold text-white text-sm">
                    Need Help?
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Click a button below to create a ticket and our team will
                    assist you!
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories
                      .filter((c) => c.enabled)
                      .map((cat) => (
                        <button
                          key={cat.id}
                          className="flex items-center gap-1 rounded bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
                        >
                          {cat.emoji} {cat.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-end gap-3 items-center">
            {saveStatus === "success" && (
              <span className="text-sm text-green-400">
                Settings saved successfully!
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm text-red-400">
                Failed to save settings. Try again.
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors ${
                saving
                  ? "bg-brand-red/50 cursor-not-allowed"
                  : "bg-brand-red hover:bg-brand-red/90"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
