"use client";

import { useState, useEffect } from "react";
import {
  getModerationConfig,
  saveModerationConfig,
  updateBannedWords,
} from "@/lib/admin-api";

interface ModerationConfig {
  enabled: boolean;
  linkFilter: boolean;
  spamFilter: boolean;
  capsFilter: boolean;
  wordFilter: boolean;
  bannedWords: string[];
  allowedDomains: string[];
  exemptPlatforms: string[];
}

const DEFAULT_CONFIG: ModerationConfig = {
  enabled: false,
  linkFilter: true,
  spamFilter: true,
  capsFilter: false,
  wordFilter: true,
  bannedWords: [],
  allowedDomains: [],
  exemptPlatforms: [],
};

const ALL_PLATFORMS = [
  { id: "twitch", label: "Twitch" },
  { id: "kick", label: "Kick" },
  { id: "discord", label: "Discord" },
  { id: "youtube", label: "YouTube" },
  { id: "trovo", label: "Trovo" },
  { id: "facebook", label: "Facebook" },
];

const FILTER_CARDS = [
  {
    key: "linkFilter" as const,
    title: "Link Filter",
    description: "Blocks unauthorized links from being posted in chat",
  },
  {
    key: "spamFilter" as const,
    title: "Spam Filter",
    description: "Blocks repeated or rapid-fire messages",
  },
  {
    key: "capsFilter" as const,
    title: "Caps Filter",
    description: "Blocks messages with excessive capital letters",
  },
  {
    key: "wordFilter" as const,
    title: "Word Filter",
    description: "Blocks messages containing banned words",
  },
];

export default function ModerationPage() {
  const [config, setConfig] = useState<ModerationConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Banned words input
  const [newWord, setNewWord] = useState("");
  // Allowed domains input
  const [newDomain, setNewDomain] = useState("");

  // Load config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const result = await getModerationConfig();
        if (result.config) {
          setConfig({
            enabled: Boolean(result.config.enabled ?? DEFAULT_CONFIG.enabled),
            linkFilter: Boolean(result.config.linkFilter ?? DEFAULT_CONFIG.linkFilter),
            spamFilter: Boolean(result.config.spamFilter ?? DEFAULT_CONFIG.spamFilter),
            capsFilter: Boolean(result.config.capsFilter ?? DEFAULT_CONFIG.capsFilter),
            wordFilter: Boolean(result.config.wordFilter ?? DEFAULT_CONFIG.wordFilter),
            bannedWords: Array.isArray(result.config.bannedWords)
              ? (result.config.bannedWords as string[])
              : DEFAULT_CONFIG.bannedWords,
            allowedDomains: Array.isArray(result.config.allowedDomains)
              ? (result.config.allowedDomains as string[])
              : DEFAULT_CONFIG.allowedDomains,
            exemptPlatforms: Array.isArray(result.config.exemptPlatforms)
              ? (result.config.exemptPlatforms as string[])
              : DEFAULT_CONFIG.exemptPlatforms,
          });
        }
      } catch (err) {
        console.error("Failed to load moderation config:", err);
        showToast("Failed to load moderation config", "error");
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Toast helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle a filter
  const toggleFilter = (key: keyof ModerationConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Add banned word
  const addBannedWord = () => {
    const word = newWord.trim().toLowerCase();
    if (!word) return;
    if (config.bannedWords.includes(word)) {
      showToast("Word already in the list", "error");
      return;
    }
    setConfig((prev) => ({
      ...prev,
      bannedWords: [...prev.bannedWords, word],
    }));
    setNewWord("");
  };

  // Remove banned word
  const removeBannedWord = (word: string) => {
    setConfig((prev) => ({
      ...prev,
      bannedWords: prev.bannedWords.filter((w) => w !== word),
    }));
  };

  // Add allowed domain
  const addAllowedDomain = () => {
    const domain = newDomain.trim().toLowerCase();
    if (!domain) return;
    if (config.allowedDomains.includes(domain)) {
      showToast("Domain already in the list", "error");
      return;
    }
    setConfig((prev) => ({
      ...prev,
      allowedDomains: [...prev.allowedDomains, domain],
    }));
    setNewDomain("");
  };

  // Remove allowed domain
  const removeAllowedDomain = (domain: string) => {
    setConfig((prev) => ({
      ...prev,
      allowedDomains: prev.allowedDomains.filter((d) => d !== domain),
    }));
  };

  // Toggle exempt platform
  const toggleExemptPlatform = (platformId: string) => {
    setConfig((prev) => ({
      ...prev,
      exemptPlatforms: prev.exemptPlatforms.includes(platformId)
        ? prev.exemptPlatforms.filter((p) => p !== platformId)
        : [...prev.exemptPlatforms, platformId],
    }));
  };

  // Save all changes
  const handleSave = async () => {
    setSaving(true);
    try {
      await saveModerationConfig(config as unknown as Record<string, unknown>);
      await updateBannedWords(config.bannedWords, []);
      showToast("Moderation settings saved successfully", "success");
    } catch (err) {
      console.error("Failed to save moderation config:", err);
      showToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  // Handle Enter key on inputs
  const handleWordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBannedWord();
    }
  };

  const handleDomainKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAllowedDomain();
    }
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
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-20 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Moderation</h1>
          <p className="mt-1 text-sm text-gray-400">
            Cross-platform auto-moderation for all connected chat platforms
          </p>
        </div>
        <button
          onClick={() => toggleFilter("enabled")}
          className={`relative h-7 w-12 rounded-full transition-colors ${
            config.enabled ? "bg-green-500" : "bg-raised"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              config.enabled ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Filter Toggles - 2x2 Grid */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Filters</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FILTER_CARDS.map((filter) => (
            <div
              key={filter.key}
              className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-surface p-6"
            >
              <div className="mr-4">
                <p className="text-sm font-medium text-white">{filter.title}</p>
                <p className="mt-1 text-xs text-gray-500">{filter.description}</p>
              </div>
              <button
                onClick={() => toggleFilter(filter.key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  config[filter.key] ? "bg-red" : "bg-raised"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    config[filter.key] ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Banned Words */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
        <h2 className="mb-4 text-sm font-semibold text-white">Banned Words</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={handleWordKeyDown}
            placeholder="Add a banned word..."
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
          />
          <button
            onClick={addBannedWord}
            className="rounded-lg bg-red px-5 py-2.5 text-sm font-medium text-white hover:bg-red/90 transition-colors"
          >
            Add
          </button>
        </div>
        {config.bannedWords.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {config.bannedWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-sm text-red-400"
              >
                {word}
                <button
                  onClick={() => removeBannedWord(word)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-red-500/20"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-gray-500">
            No banned words configured. Add words above to auto-filter them from chat.
          </p>
        )}
      </div>

      {/* Allowed Domains */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
        <h2 className="mb-4 text-sm font-semibold text-white">Allowed Domains</h2>
        <p className="mb-3 text-xs text-gray-500">
          When the Link Filter is enabled, only links from these domains will be permitted.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={handleDomainKeyDown}
            placeholder="e.g. youtube.com"
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
          />
          <button
            onClick={addAllowedDomain}
            className="rounded-lg bg-red px-5 py-2.5 text-sm font-medium text-white hover:bg-red/90 transition-colors"
          >
            Add
          </button>
        </div>
        {config.allowedDomains.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {config.allowedDomains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gold/10 px-3 py-1.5 text-sm text-gold"
              >
                {domain}
                <button
                  onClick={() => removeAllowedDomain(domain)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-brand-gold/20"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-gray-500">
            No allowed domains configured. All links will be blocked when the Link Filter is on.
          </p>
        )}
      </div>

      {/* Exempt Platforms */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
        <h2 className="mb-2 text-sm font-semibold text-white">Exempt Platforms</h2>
        <p className="mb-4 text-xs text-gray-500">
          Messages from these platforms will not be moderated.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_PLATFORMS.map((platform) => {
            const isExempt = config.exemptPlatforms.includes(platform.id);
            return (
              <label
                key={platform.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-surface px-4 py-3 transition-colors hover:bg-raised"
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    isExempt
                      ? "border-brand-red bg-red"
                      : "border-white/20 bg-transparent"
                  }`}
                  onClick={() => toggleExemptPlatform(platform.id)}
                >
                  {isExempt && (
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={isExempt}
                  onChange={() => toggleExemptPlatform(platform.id)}
                  className="hidden"
                />
                <span className="text-sm text-white">{platform.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-red px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
