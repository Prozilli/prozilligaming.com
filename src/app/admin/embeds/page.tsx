"use client";

import { useState } from "react";
import { useDiscordTextChannels, sendDiscordEmbed } from "@/lib/admin-api";

interface EmbedField {
  name: string;
  value: string;
  inline: boolean;
}

interface EmbedData {
  title: string;
  description: string;
  color: string;
  fields: EmbedField[];
  image: string;
  thumbnail: string;
  footer: string;
}

const DEFAULT_EMBED: EmbedData = {
  title: "",
  description: "",
  color: "#910000",
  fields: [],
  image: "",
  thumbnail: "",
  footer: "",
};

function hexToDecimal(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

export default function EmbedsPage() {
  const [channelId, setChannelId] = useState("");
  const [embed, setEmbed] = useState<EmbedData>(DEFAULT_EMBED);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { channels, loading: channelsLoading, error: channelsError } = useDiscordTextChannels();

  const updateEmbed = <K extends keyof EmbedData>(key: K, value: EmbedData[K]) => {
    setEmbed((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    if (embed.fields.length >= 5) return;
    setEmbed((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: "", value: "", inline: false }],
    }));
  };

  const removeField = (index: number) => {
    setEmbed((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const updateField = <K extends keyof EmbedField>(index: number, key: K, value: EmbedField[K]) => {
    setEmbed((prev) => ({
      ...prev,
      fields: prev.fields.map((f, i) => (i === index ? { ...f, [key]: value } : f)),
    }));
  };

  const handleSend = async () => {
    if (!channelId) {
      setErrorMessage("Please select a channel");
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 3000);
      return;
    }
    if (!embed.title && !embed.description) {
      setErrorMessage("Embed must have a title or description");
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 3000);
      return;
    }

    setSending(true);
    setSendStatus("idle");
    setErrorMessage("");
    try {
      const discordEmbed: Record<string, unknown> = {
        color: hexToDecimal(embed.color),
      };
      if (embed.title) discordEmbed.title = embed.title;
      if (embed.description) discordEmbed.description = embed.description;
      if (embed.image) discordEmbed.image = { url: embed.image };
      if (embed.thumbnail) discordEmbed.thumbnail = { url: embed.thumbnail };
      if (embed.footer) discordEmbed.footer = { text: embed.footer };
      if (embed.fields.length > 0) {
        discordEmbed.fields = embed.fields
          .filter((f) => f.name && f.value)
          .map((f) => ({ name: f.name, value: f.value, inline: f.inline }));
      }

      await sendDiscordEmbed(channelId, discordEmbed);
      setSendStatus("success");
      setTimeout(() => setSendStatus("idle"), 3000);
    } catch (err) {
      console.error("Failed to send embed:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to send embed");
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Embed Builder</h1>
        <p className="mt-1 text-sm text-gray-400">
          Create and send custom embed messages to Discord channels
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor Column */}
        <div className="space-y-6">
          {/* Channel Select */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Target Channel</h3>
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
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
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

          {/* Embed Content */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Embed Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={embed.title}
                  onChange={(e) => updateEmbed("title", e.target.value)}
                  placeholder="Embed title"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={embed.description}
                  onChange={(e) => updateEmbed("description", e.target.value)}
                  rows={4}
                  placeholder="Embed description (supports Discord markdown)"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={embed.color}
                    onChange={(e) => updateEmbed("color", e.target.value)}
                    className="h-10 w-14 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={embed.color}
                    onChange={(e) => updateEmbed("color", e.target.value)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Fields</h3>
                <p className="text-xs text-gray-500 mt-1">Up to 5 fields</p>
              </div>
              <button
                onClick={addField}
                disabled={embed.fields.length >= 5}
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Field
              </button>
            </div>

            {embed.fields.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-500">No fields added yet</p>
            ) : (
              <div className="space-y-4">
                {embed.fields.map((field, index) => (
                  <div key={index} className="rounded-lg bg-white/5 p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">Field {index + 1}</span>
                      <button
                        onClick={() => removeField(index)}
                        className="rounded p-1 text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(index, "name", e.target.value)}
                      placeholder="Field name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateField(index, "value", e.target.value)}
                      placeholder="Field value"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-red focus:outline-none"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.inline}
                        onChange={(e) => updateField(index, "inline", e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-red focus:ring-brand-red"
                      />
                      <span className="text-xs text-gray-400">Inline</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images & Footer */}
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Images & Footer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Image URL</label>
                <input
                  type="text"
                  value={embed.image}
                  onChange={(e) => updateEmbed("image", e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Thumbnail URL</label>
                <input
                  type="text"
                  value={embed.thumbnail}
                  onChange={(e) => updateEmbed("thumbnail", e.target.value)}
                  placeholder="https://example.com/thumbnail.png"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Footer Text</label>
                <input
                  type="text"
                  value={embed.footer}
                  onChange={(e) => updateEmbed("footer", e.target.value)}
                  placeholder="Footer text"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Send Button */}
          <div className="flex items-center justify-end gap-3">
            {sendStatus === "success" && (
              <span className="text-sm text-green-400">Embed sent successfully!</span>
            )}
            {sendStatus === "error" && (
              <span className="text-sm text-red-400">{errorMessage || "Failed to send"}</span>
            )}
            <button
              onClick={handleSend}
              disabled={sending}
              className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Embed"}
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Preview</h3>
          <div className="rounded-xl border border-white/5 bg-[#36393f] p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm shrink-0">
                P
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#5865F2] text-sm">PRISMAI</span>
                  <span className="rounded bg-[#5865F2] px-1 py-0.5 text-[10px] font-medium text-white">
                    BOT
                  </span>
                  <span className="text-xs text-gray-500">Today at 12:00 PM</span>
                </div>

                <div
                  className="mt-2 rounded border-l-4 bg-[#2f3136] p-3"
                  style={{ borderColor: embed.color }}
                >
                  {/* Thumbnail */}
                  {embed.thumbnail && (
                    <div className="float-right ml-4 mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={embed.thumbnail}
                        alt="Thumbnail"
                        className="h-16 w-16 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Title */}
                  {embed.title && (
                    <p className="font-semibold text-white text-sm">{embed.title}</p>
                  )}

                  {/* Description */}
                  {embed.description && (
                    <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                      {embed.description}
                    </p>
                  )}

                  {/* Fields */}
                  {embed.fields.length > 0 && (
                    <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: embed.fields.some((f) => f.inline) ? "repeat(3, 1fr)" : "1fr" }}>
                      {embed.fields
                        .filter((f) => f.name || f.value)
                        .map((field, i) => (
                          <div
                            key={i}
                            className={field.inline ? "" : "col-span-full"}
                          >
                            <p className="text-xs font-semibold text-white">
                              {field.name || "Field name"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {field.value || "Field value"}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Image */}
                  {embed.image && (
                    <div className="mt-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={embed.image}
                        alt="Embed"
                        className="max-w-full rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Footer */}
                  {embed.footer && (
                    <p className="mt-3 text-xs text-gray-500">{embed.footer}</p>
                  )}

                  {/* Empty state */}
                  {!embed.title && !embed.description && embed.fields.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      Start building your embed to see a preview here
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            This is how the embed will appear in Discord
          </p>
        </div>
      </div>
    </div>
  );
}
