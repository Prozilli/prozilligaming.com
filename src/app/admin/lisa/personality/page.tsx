"use client";

import { useState, useEffect, useCallback } from "react";
import { getSetting, saveSetting } from "@/lib/admin-api";

interface PersonalityTrait {
  id: string;
  name: string;
  value: number;
  description: string;
}

interface LisaPersonality {
  nickname: string;
  pronouns: string;
  avatar: string;
  basePrompt: string;
  traits: PersonalityTrait[];
}

const DEFAULT_TRAITS: PersonalityTrait[] = [
  {
    id: "friendliness",
    name: "Friendliness",
    value: 85,
    description: "How warm and welcoming LISA is",
  },
  {
    id: "humor",
    name: "Humor",
    value: 70,
    description: "How often LISA uses jokes and wit",
  },
  {
    id: "formality",
    name: "Formality",
    value: 30,
    description: "How formal vs casual the language is",
  },
  {
    id: "enthusiasm",
    name: "Enthusiasm",
    value: 90,
    description: "Energy level in responses",
  },
  {
    id: "verbosity",
    name: "Verbosity",
    value: 50,
    description: "How long and detailed responses are",
  },
];

const DEFAULT_PROMPT = `You are LISA (Live Interactive Streaming Assistant), the AI assistant for Prozilli Gaming. You're part of the PRISMAI ecosystem.

Your personality:
- Friendly and welcoming, especially to new viewers
- Knowledgeable about Pro's content and community
- Slightly sassy but never rude
- Enthusiastic about gaming, especially GTA RP
- Always supportive of the community

Remember:
- Pro (Prozilli) is the streamer and your creator
- The community is called the "Prozilli Fam"
- Be helpful but keep responses concise for chat
- Use emotes sparingly and appropriately`;

export default function LisaPersonalityPage() {
  const [traits, setTraits] = useState(DEFAULT_TRAITS);
  const [basePrompt, setBasePrompt] = useState(DEFAULT_PROMPT);
  const [nickname, setNickname] = useState("LISA");
  const [pronouns, setPronouns] = useState("she/her");
  const [avatar, setAvatar] = useState("default");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "failed">("idle");

  // Load personality config on mount
  useEffect(() => {
    async function loadPersonality() {
      try {
        const stored = await getSetting<LisaPersonality>("lisa_personality");
        if (stored) {
          setNickname(stored.nickname || "LISA");
          setPronouns(stored.pronouns || "she/her");
          setAvatar(stored.avatar || "default");
          setBasePrompt(stored.basePrompt || DEFAULT_PROMPT);
          setTraits(stored.traits || DEFAULT_TRAITS);
        }
      } catch {
        // If loading fails, keep defaults — no action needed
      } finally {
        setLoading(false);
      }
    }
    loadPersonality();
  }, []);

  // Clear save status after 3 seconds
  useEffect(() => {
    if (saveStatus === "saved" || saveStatus === "failed") {
      const timer = setTimeout(() => setSaveStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("lisa_personality", {
        nickname,
        pronouns,
        avatar,
        basePrompt,
        traits,
      });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("failed");
    } finally {
      setSaving(false);
    }
  }, [nickname, pronouns, avatar, basePrompt, traits]);

  const handleReset = useCallback(async () => {
    setNickname("LISA");
    setPronouns("she/her");
    setAvatar("default");
    setBasePrompt(DEFAULT_PROMPT);
    setTraits(DEFAULT_TRAITS);
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("lisa_personality", {
        nickname: "LISA",
        pronouns: "she/her",
        avatar: "default",
        basePrompt: DEFAULT_PROMPT,
        traits: DEFAULT_TRAITS,
      });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("failed");
    } finally {
      setSaving(false);
    }
  }, []);

  const updateTrait = (id: string, value: number) => {
    setTraits(traits.map((t) => (t.id === id ? { ...t, value } : t)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-gray-400">
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-sm">Loading personality config...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-red to-brand-gold">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </div>
            LISA Personality
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Configure LISA&apos;s character and behavior
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-400">
            LISA is Active
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Identity */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Pronouns
                </label>
                <select
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  <option value="she/her">she/her</option>
                  <option value="he/him">he/him</option>
                  <option value="they/them">they/them</option>
                  <option value="it/its">it/its</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Avatar Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["default", "anime", "minimal"].map((style) => (
                    <button
                      key={style}
                      onClick={() => setAvatar(style)}
                      className={`rounded-lg p-3 text-center transition-colors ${
                        avatar === style
                          ? "bg-brand-red/10 border border-brand-red"
                          : "bg-white/5 border border-transparent hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                          style === "default"
                            ? "bg-gradient-to-br from-brand-red to-brand-gold"
                            : style === "anime"
                            ? "bg-gradient-to-br from-pink-500 to-purple-500"
                            : "bg-white/20"
                        }`}
                      >
                        <span className="text-lg">
                          {style === "default"
                            ? "L"
                            : style === "anime"
                            ? "✨"
                            : "•"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 capitalize">{style}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traits */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Personality Traits
            </h3>
            <div className="space-y-5">
              {traits.map((trait) => (
                <div key={trait.id}>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-gray-400">
                      {trait.name}
                    </label>
                    <span className="text-xs text-brand-gold">{trait.value}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={trait.value}
                    onChange={(e) =>
                      updateTrait(trait.id, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-red"
                  />
                  <p className="mt-1 text-[10px] text-gray-500">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Preview Response
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-gray-500 mb-1">User says:</p>
                <p className="text-sm text-white">&quot;Hey LISA, when&apos;s the next stream?&quot;</p>
              </div>
              <div className="rounded-lg bg-brand-red/10 border border-brand-red/20 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-gold text-white text-xs font-bold">
                    L
                  </div>
                  <span className="text-xs font-medium text-brand-red">
                    {nickname}
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  {traits.find((t) => t.id === "enthusiasm")!.value > 70
                    ? "Hey there! 🎮 "
                    : "Hi! "}
                  {traits.find((t) => t.id === "formality")!.value > 50
                    ? "Pro's next scheduled stream is tomorrow at 8 PM EST. "
                    : "Pro's going live tomorrow at 8 PM EST! "}
                  {traits.find((t) => t.id === "friendliness")!.value > 70
                    ? "Can't wait to see you there! "
                    : ""}
                  {traits.find((t) => t.id === "humor")!.value > 60
                    ? "Time to cause some chaos in Los Santos 😎"
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Active Platforms
            </h3>
            <div className="space-y-2">
              {[
                { name: "Twitch Chat", enabled: true },
                { name: "Discord", enabled: true },
                { name: "YouTube Chat", enabled: false },
                { name: "Kick Chat", enabled: false },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-sm text-gray-400">{platform.name}</span>
                  <span
                    className={`text-xs ${
                      platform.enabled ? "text-green-400" : "text-gray-500"
                    }`}
                  >
                    {platform.enabled ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Base Prompt */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">
          System Prompt
        </h3>
        <textarea
          value={basePrompt}
          onChange={(e) => setBasePrompt(e.target.value)}
          rows={12}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white font-mono focus:border-brand-red focus:outline-none resize-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          This is the base instruction that shapes LISA&apos;s behavior. Be careful when
          editing.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saveStatus === "saved" && (
          <span className="text-sm font-medium text-green-400">Saved!</span>
        )}
        {saveStatus === "failed" && (
          <span className="text-sm font-medium text-red-400">Failed to save</span>
        )}
        <button
          onClick={handleReset}
          disabled={saving}
          className="rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          Reset to Default
        </button>
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
