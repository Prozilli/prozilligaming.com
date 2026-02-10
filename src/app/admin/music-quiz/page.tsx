"use client";

import { useState, useEffect } from "react";
import { useDiscordTextChannels, getSetting, saveSetting } from "@/lib/admin-api";

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface MusicQuizConfig {
  enabled: boolean;
  channelId: string;
  roundDuration: number;
  pointsPerAnswer: number;
  songs: Song[];
}

const DEFAULT_CONFIG: MusicQuizConfig = {
  enabled: false,
  channelId: "",
  roundDuration: 30,
  pointsPerAnswer: 10,
  songs: [
    { title: "Blinding Lights", artist: "The Weeknd", url: "" },
    { title: "Bohemian Rhapsody", artist: "Queen", url: "" },
    { title: "Shape of You", artist: "Ed Sheeran", url: "" },
  ],
};

export default function MusicQuizPage() {
  const [config, setConfig] = useState<MusicQuizConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const saved = await getSetting<MusicQuizConfig>("music_quiz_config");
        if (saved) setConfig(saved);
      } catch (err) {
        console.error("Failed to load music quiz settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await saveSetting("music_quiz_config", config);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to save:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addSong = () => {
    setConfig((prev) => ({
      ...prev,
      songs: [...prev.songs, { title: "", artist: "", url: "" }],
    }));
  };

  const removeSong = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      songs: prev.songs.filter((_, i) => i !== index),
    }));
  };

  const updateSong = <K extends keyof Song>(index: number, key: K, value: Song[K]) => {
    setConfig((prev) => ({
      ...prev,
      songs: prev.songs.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Music Quiz</h1>
          <p className="mt-1 text-sm text-gray-400">
            Host music quiz games where members guess the song title or artist
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

      {/* Quiz Channel */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Quiz Channel</h3>
        <p className="text-xs text-gray-500 mb-3">
          The Discord channel where music quiz games will be hosted
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

      {/* Game Settings */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Game Settings</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Round Duration (seconds)</label>
            <input
              type="number"
              min={5}
              max={120}
              value={config.roundDuration}
              onChange={(e) => setConfig({ ...config, roundDuration: parseInt(e.target.value) || 30 })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            />
            <p className="mt-1 text-xs text-gray-500">
              How long members have to guess each song
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Points Per Correct Answer</label>
            <input
              type="number"
              min={1}
              max={100}
              value={config.pointsPerAnswer}
              onChange={(e) => setConfig({ ...config, pointsPerAnswer: parseInt(e.target.value) || 10 })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            />
            <p className="mt-1 text-xs text-gray-500">
              Points awarded for each correct guess
            </p>
          </div>
        </div>
      </div>

      {/* Song Library */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Song Library</h3>
            <p className="text-xs text-gray-500 mt-1">
              {config.songs.length} song{config.songs.length !== 1 ? "s" : ""} in library
            </p>
          </div>
          <button
            onClick={addSong}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Song
          </button>
        </div>

        {config.songs.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            No songs in the library. Click &quot;Add Song&quot; to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Song Title</div>
              <div className="col-span-3">Artist</div>
              <div className="col-span-5">YouTube / Audio URL</div>
              <div className="col-span-1"></div>
            </div>

            {/* Song Rows */}
            {config.songs.map((song, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-lg bg-white/5 p-3 items-center"
              >
                {/* Title */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Title</label>
                  <input
                    type="text"
                    value={song.title}
                    onChange={(e) => updateSong(index, "title", e.target.value)}
                    placeholder="Song title"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Artist */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Artist</label>
                  <input
                    type="text"
                    value={song.artist}
                    onChange={(e) => updateSong(index, "artist", e.target.value)}
                    placeholder="Artist name"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* URL */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">URL</label>
                  <input
                    type="text"
                    value={song.url}
                    onChange={(e) => updateSong(index, "url", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                {/* Remove */}
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeSong(index)}
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
          className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
