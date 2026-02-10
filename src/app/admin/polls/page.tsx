"use client";

import { useState, useEffect, useCallback } from "react";
import { getSetting, saveSetting, getActivePolls, getPollHistory, createPoll, endPoll } from "@/lib/admin-api";

interface PollsConfig {
  enabled: boolean;
}

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  ends_at?: string;
  ended_at?: string;
  status: string;
  total_votes: number;
  created_at: string;
}

const DEFAULT_CONFIG: PollsConfig = {
  enabled: false,
};

function timeRemaining(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ending...";
  const mins = Math.floor(diff / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  if (mins > 0) return `${mins}m ${secs}s remaining`;
  return `${secs}s remaining`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `Ended ${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Ended ${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `Ended ${days}d ago`;
}

export default function PollsPage() {
  const [config, setConfig] = useState<PollsConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [historyExpanded, setHistoryExpanded] = useState(false);

  // Poll data
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [pastPolls, setPastPolls] = useState<Poll[]>([]);
  const [pollsLoading, setPollsLoading] = useState(false);

  // New poll form
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(5);
  const [creating, setCreating] = useState(false);

  const fetchPolls = useCallback(async () => {
    setPollsLoading(true);
    try {
      const [active, history] = await Promise.all([
        getActivePolls(),
        getPollHistory(20),
      ]);
      setActivePolls(active.polls || []);
      setPastPolls(history.polls || []);
    } catch {
      // silently fail
    } finally {
      setPollsLoading(false);
    }
  }, []);

  // Load settings + polls on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getSetting<PollsConfig>("polls_config");
        if (stored) setConfig(stored);
      } catch {
        // fall back to defaults
      } finally {
        setLoading(false);
      }
    })();
    fetchPolls();
  }, [fetchPolls]);

  // Refresh active polls every 15s
  useEffect(() => {
    if (!config.enabled) return;
    const interval = setInterval(fetchPolls, 15_000);
    return () => clearInterval(interval);
  }, [config.enabled, fetchPolls]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("polls_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePoll = async () => {
    const validOptions = options.filter((o) => o.trim());
    if (!question.trim() || validOptions.length < 2) return;
    setCreating(true);
    try {
      const result = await createPoll(question.trim(), validOptions, duration);
      if (result.success) {
        setQuestion("");
        setOptions(["", ""]);
        setDuration(5);
        await fetchPolls();
      }
    } catch {
      // silently fail
    } finally {
      setCreating(false);
    }
  };

  const handleEndPoll = async (id: number) => {
    try {
      await endPoll(id);
      await fetchPolls();
    } catch {
      // silently fail
    }
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const getBarWidth = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
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
        <h1 className="text-2xl font-bold text-white">Polls</h1>
        <p className="mt-1 text-sm text-gray-400">
          Create polls and gather community feedback across platforms
        </p>
      </div>

      {/* Enable Toggle */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Enable Polls</h3>
            <p className="text-xs text-gray-500 mt-1">
              Allow creating and running polls in chat
            </p>
          </div>
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              config.enabled ? "bg-brand-red" : "bg-white/10"
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

      {config.enabled && (
        <>
          {/* Create Poll */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Create Poll</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What do you want to ask?"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Options (2-4)
                </label>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-5 shrink-0">{i + 1}.</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(i)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20 shrink-0"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {options.length < 4 && (
                  <button
                    onClick={addOption}
                    className="mt-2 flex items-center gap-1.5 text-xs text-brand-red hover:text-brand-red/80 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Option
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 5)}
                  className="w-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCreatePoll}
                  disabled={creating || !question.trim() || options.filter((o) => o.trim()).length < 2}
                  className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red/90 disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Poll"}
                </button>
              </div>
            </div>
          </div>

          {/* Active Polls */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Active Polls</h3>
            {pollsLoading && activePolls.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
              </div>
            ) : activePolls.length === 0 ? (
              <p className="text-sm text-gray-500">No active polls right now.</p>
            ) : (
              <div className="space-y-4">
                {activePolls.map((poll) => (
                  <div key={poll.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-medium text-white">{poll.question}</h4>
                      {poll.ends_at && (
                        <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400 shrink-0 ml-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                          {timeRemaining(poll.ends_at)}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {poll.options.map((opt, i) => {
                        const pct = getBarWidth(opt.votes, poll.total_votes);
                        return (
                          <div key={i} className="relative">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-300">{opt.text}</span>
                              <span className="text-gray-500">{opt.votes} votes ({pct}%)</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-brand-red transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {poll.total_votes} total votes
                      </span>
                      <button
                        onClick={() => handleEndPoll(poll.id)}
                        className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        End Poll
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Poll History */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <button
              onClick={() => setHistoryExpanded(!historyExpanded)}
              className="flex w-full items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-white">
                Poll History
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({pastPolls.length} polls)
                </span>
              </h3>
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  historyExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {historyExpanded && (
              <div className="mt-4 space-y-4">
                {pastPolls.length === 0 ? (
                  <p className="text-sm text-gray-500">No polls yet.</p>
                ) : (
                  pastPolls.map((poll) => (
                    <div key={poll.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 opacity-75">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-medium text-white">{poll.question}</h4>
                        <span className="text-xs text-gray-500 shrink-0 ml-3">
                          {poll.ended_at ? timeAgo(poll.ended_at) : "Ended"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {poll.options.map((opt, i) => {
                          const pct = getBarWidth(opt.votes, poll.total_votes);
                          const isWinner = opt.votes === Math.max(...poll.options.map((o) => o.votes));
                          return (
                            <div key={i} className="relative">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className={isWinner ? "text-brand-gold font-medium" : "text-gray-300"}>
                                  {opt.text} {isWinner && poll.total_votes > 0 && "(Winner)"}
                                </span>
                                <span className="text-gray-500">{opt.votes} votes ({pct}%)</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    isWinner ? "bg-brand-gold" : "bg-white/20"
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">{poll.total_votes} total votes</p>
                    </div>
                  ))
                )}
              </div>
            )}
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
          className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
