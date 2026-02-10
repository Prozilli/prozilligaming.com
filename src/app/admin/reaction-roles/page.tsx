"use client";

import { useState, useEffect } from "react";
import {
  useDiscordTextChannels,
  useDiscordRoles,
  getSetting,
  saveSetting,
} from "@/lib/admin-api";

interface ReactionRole {
  id: string;
  messageId: string;
  channelId: string;
  channelName: string;
  emoji: string;
  roleId: string;
  roleName: string;
  roleColor: string;
  mode: "toggle" | "add" | "remove";
}

type TabType = "active" | "create";

export default function ReactionRolesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [reactionRoles, setReactionRoles] = useState<ReactionRole[]>([]);
  const [saving, setSaving] = useState(false);
  const [newRole, setNewRole] = useState({
    channel: "",
    messageMode: "new" as "new" | "existing",
    existingMessageId: "",
    newMessageContent: "",
    emoji: "",
    role: "",
    mode: "toggle" as "toggle" | "add" | "remove",
  });

  // Fetch Discord data
  const { channels, loading: channelsLoading } = useDiscordTextChannels();
  const { roles, loading: rolesLoading } = useDiscordRoles();

  // Load saved reaction roles
  useEffect(() => {
    async function loadReactionRoles() {
      try {
        const saved = await getSetting<ReactionRole[]>("reaction_roles");
        if (saved) setReactionRoles(saved);
      } catch (err) {
        console.error("Failed to load reaction roles:", err);
      }
    }
    loadReactionRoles();
  }, []);

  // Delete a reaction role
  const deleteReactionRole = async (id: string) => {
    const updated = reactionRoles.filter((rr) => rr.id !== id);
    setReactionRoles(updated);
    await saveSetting("reaction_roles", updated);
  };

  // Create new reaction role
  const createReactionRole = async () => {
    if (!newRole.channel || !newRole.emoji || !newRole.role) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const role = roles.find((r) => r.id === newRole.role);
      const channel = channels.find((c) => c.id === newRole.channel);

      const newReactionRole: ReactionRole = {
        id: Date.now().toString(),
        messageId: newRole.messageMode === "existing" ? newRole.existingMessageId : "pending",
        channelId: newRole.channel,
        channelName: channel ? `#${channel.name}` : "#unknown",
        emoji: newRole.emoji,
        roleId: newRole.role,
        roleName: role?.name || "Unknown",
        roleColor: role?.color || "#ffffff",
        mode: newRole.mode,
      };

      const updated = [...reactionRoles, newReactionRole];
      setReactionRoles(updated);
      await saveSetting("reaction_roles", updated);

      // Reset form
      setNewRole({
        channel: "",
        messageMode: "new",
        existingMessageId: "",
        newMessageContent: "",
        emoji: "",
        role: "",
        mode: "toggle",
      });
      setActiveTab("active");
    } catch (err) {
      console.error("Failed to create reaction role:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Reaction Roles</h1>
        <p className="mt-1 text-sm text-gray-400">
          Let members self-assign roles by reacting to messages
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "active"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Active Reaction Roles ({reactionRoles.length})
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "create"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Create New
        </button>
      </div>

      {activeTab === "active" ? (
        <div className="space-y-4">
          {/* Group by message */}
          {Object.entries(
            reactionRoles.reduce((acc, rr) => {
              if (!acc[rr.messageId]) acc[rr.messageId] = [];
              acc[rr.messageId].push(rr);
              return acc;
            }, {} as Record<string, ReactionRole[]>)
          ).map(([messageId, groupedRoles]) => (
            <div
              key={messageId}
              className="rounded-xl border border-white/5 bg-[#161b22] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 bg-white/5">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {groupedRoles[0].channelName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Message ID: {messageId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:bg-white/10 hover:text-white">
                    Edit
                  </button>
                  <button
                    onClick={() => groupedRoles.forEach((rr) => deleteReactionRole(rr.id))}
                    className="rounded-md bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-3">
                  {groupedRoles.map((rr) => (
                    <div
                      key={rr.id}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2"
                    >
                      <span className="text-xl">{rr.emoji}</span>
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${rr.roleColor}20`,
                          color: rr.roleColor,
                        }}
                      >
                        @{rr.roleName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {reactionRoles.length === 0 && (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <svg
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">
                No Reaction Roles Yet
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Create your first reaction role to let members self-assign roles
              </p>
              <button
                onClick={() => setActiveTab("create")}
                className="mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white hover:bg-brand-red/90"
              >
                Create Reaction Role
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Create Form */}
          <div className="space-y-6">
            {/* Message Settings */}
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">
                Message Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Channel
                  </label>
                  {channelsLoading ? (
                    <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                      Loading channels...
                    </div>
                  ) : (
                    <select
                      value={newRole.channel}
                      onChange={(e) =>
                        setNewRole({ ...newRole, channel: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
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

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Message Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setNewRole({ ...newRole, messageMode: "new" })
                      }
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        newRole.messageMode === "new"
                          ? "bg-brand-red text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      Create New Message
                    </button>
                    <button
                      onClick={() =>
                        setNewRole({ ...newRole, messageMode: "existing" })
                      }
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        newRole.messageMode === "existing"
                          ? "bg-brand-red text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      Use Existing
                    </button>
                  </div>
                </div>

                {newRole.messageMode === "new" ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Message Content
                    </label>
                    <textarea
                      value={newRole.newMessageContent}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          newMessageContent: e.target.value,
                        })
                      }
                      rows={4}
                      placeholder="React below to get your roles!"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Message ID
                    </label>
                    <input
                      type="text"
                      value={newRole.existingMessageId}
                      onChange={(e) =>
                        setNewRole({
                          ...newRole,
                          existingMessageId: e.target.value,
                        })
                      }
                      placeholder="Right-click message → Copy Message ID"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Role Settings */}
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">
                Role Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={newRole.emoji}
                    onChange={(e) =>
                      setNewRole({ ...newRole, emoji: e.target.value })
                    }
                    placeholder="🎮 or custom emoji name"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Role to Assign
                  </label>
                  {rolesLoading ? (
                    <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-500">
                      Loading roles...
                    </div>
                  ) : (
                    <select
                      value={newRole.role}
                      onChange={(e) =>
                        setNewRole({ ...newRole, role: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="">Select a role</option>
                      {roles
                        .filter((r) => !r.managed) // Exclude bot-managed roles
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            @{role.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Behavior Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        value: "toggle",
                        label: "Toggle",
                        desc: "Add/remove on react",
                      },
                      {
                        value: "add",
                        label: "Add Only",
                        desc: "Only adds role",
                      },
                      {
                        value: "remove",
                        label: "Remove Only",
                        desc: "Only removes role",
                      },
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() =>
                          setNewRole({
                            ...newRole,
                            mode: mode.value as "toggle" | "add" | "remove",
                          })
                        }
                        className={`rounded-lg p-3 text-left transition-colors ${
                          newRole.mode === mode.value
                            ? "bg-brand-red/10 border border-brand-red"
                            : "bg-white/5 border border-transparent hover:bg-white/10"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            newRole.mode === mode.value
                              ? "text-brand-red"
                              : "text-white"
                          }`}
                        >
                          {mode.label}
                        </p>
                        <p className="text-[10px] text-gray-500">{mode.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button className="rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white">
                Add Another Role
              </button>
              <button
                onClick={createReactionRole}
                disabled={saving}
                className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90 disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Reaction Role"}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Preview</h3>
            <div className="rounded-xl border border-white/5 bg-[#36393f] p-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  P
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#5865F2] text-sm">
                      PRISMAI
                    </span>
                    <span className="rounded bg-[#5865F2] px-1 py-0.5 text-[10px] font-medium text-white">
                      BOT
                    </span>
                    <span className="text-xs text-gray-500">
                      Today at 12:00 PM
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    {newRole.newMessageContent ||
                      "React below to get your roles!"}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {newRole.emoji && (
                      <button className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20">
                        <span>{newRole.emoji}</span>
                        <span className="text-gray-400 text-xs">1</span>
                      </button>
                    )}
                    <button className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20">
                      <span>🎮</span>
                      <span className="text-gray-400 text-xs">24</span>
                    </button>
                    <button className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20">
                      <span>🎬</span>
                      <span className="text-gray-400 text-xs">18</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              This is how the message will appear in Discord
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
