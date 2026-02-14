"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

/* ============================================================
   Commands Management Page
   ============================================================ */

interface Command {
  id: string;
  name: string;
  response: string;
  cooldown: number;
  permission: "everyone" | "subscriber" | "moderator" | "broadcaster";
  enabled: boolean;
  uses: number;
  platforms: string[];
}

const BUILT_IN_COMMANDS = [
  { name: "!help", description: "Lists available commands", permission: "everyone" },
  { name: "!followage", description: "Shows how long user has followed", permission: "everyone" },
  { name: "!watchtime", description: "Shows total watch time", permission: "everyone" },
  { name: "!rank", description: "Shows user's XP level and rank", permission: "everyone" },
  { name: "!leaderboard", description: "Shows top 10 chatters by XP", permission: "everyone" },
  { name: "!ban", description: "Bans a user across all platforms", permission: "moderator" },
  { name: "!timeout", description: "Times out a user", permission: "moderator" },
  { name: "!clear", description: "Clears chat messages", permission: "moderator" },
  { name: "!title", description: "Changes stream title", permission: "broadcaster" },
  { name: "!game", description: "Changes stream game/category", permission: "broadcaster" },
];

const VARIABLES = [
  { name: "{user}", description: "The user who triggered the command" },
  { name: "{platform}", description: "The platform the command was used on" },
  { name: "{followers}", description: "Current follower count" },
  { name: "{uptime}", description: "Current stream uptime" },
  { name: "{game}", description: "Current game/category" },
  { name: "{viewers}", description: "Current viewer count" },
  { name: "{title}", description: "Current stream title" },
  { name: "{target}", description: "First argument after the command" },
];

export default function CommandsPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [activeTab, setActiveTab] = useState<"custom" | "builtin" | "variables">("custom");
  const [searchQuery, setSearchQuery] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  /* New command form state */
  const [newName, setNewName] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [newCooldown, setNewCooldown] = useState(30);
  const [newPermission, setNewPermission] = useState<Command["permission"]>("everyone");
  const [newPlatforms, setNewPlatforms] = useState<string[]>(["Twitch", "Kick", "Discord"]);

  /* ── Fetch commands from API ── */
  const fetchCommands = useCallback(async () => {
    try {
      const res = await api.commands();
      setCommands(res.commands as Command[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load commands");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommands();
  }, [fetchCommands]);

  /* ── Toggle command enabled/disabled ── */
  const toggleCommand = async (id: string) => {
    const cmd = commands.find((c) => c.id === id);
    if (!cmd) return;

    setTogglingId(id);
    try {
      await api.commandUpdate(id, { enabled: !cmd.enabled });
      setCommands((prev) =>
        prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle command");
    } finally {
      setTogglingId(null);
    }
  };

  /* ── Delete command ── */
  const deleteCommand = async (id: string) => {
    if (!confirm("Are you sure you want to delete this command?")) return;

    setDeletingId(id);
    try {
      await api.commandDelete(id);
      setCommands((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete command");
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Create new command ── */
  const handleAddCommand = async () => {
    if (!newName || !newResponse) return;

    setSaving(true);
    try {
      const payload = {
        name: newName.startsWith("!") ? newName : `!${newName}`,
        response: newResponse,
        cooldown: newCooldown,
        permission: newPermission,
        enabled: true,
        platforms: newPlatforms,
      };
      await api.commandCreate(payload);
      /* Re-fetch to get the server-assigned id and any defaults */
      await fetchCommands();
      setNewName("");
      setNewResponse("");
      setNewCooldown(30);
      setNewPermission("everyone");
      setNewPlatforms(["Twitch", "Kick", "Discord"]);
      setShowAddForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create command");
    } finally {
      setSaving(false);
    }
  };

  /* ── Save edited command ── */
  const handleSaveEdit = async () => {
    if (!editingCommand) return;

    setSaving(true);
    try {
      await api.commandUpdate(editingCommand.id, {
        name: editingCommand.name,
        response: editingCommand.response,
        cooldown: editingCommand.cooldown,
        permission: editingCommand.permission,
        platforms: editingCommand.platforms,
      });
      setCommands((prev) =>
        prev.map((c) => (c.id === editingCommand.id ? editingCommand : c))
      );
      setEditingCommand(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update command");
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle platform in form ── */
  const togglePlatform = (platform: string, forEdit: boolean) => {
    if (forEdit && editingCommand) {
      const current = editingCommand.platforms;
      setEditingCommand({
        ...editingCommand,
        platforms: current.includes(platform)
          ? current.filter((p) => p !== platform)
          : [...current, platform],
      });
    } else {
      setNewPlatforms((prev) =>
        prev.includes(platform)
          ? prev.filter((p) => p !== platform)
          : [...prev, platform]
      );
    }
  };

  const filteredCommands = commands.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.response.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allPlatformOptions = ["Twitch", "Kick", "YouTube", "Discord"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Commands</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading commands..." : `${commands.length} custom commands configured`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCommands}
            disabled={loading}
            className="btn btn-secondary btn-sm"
          >
            <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Command
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="card p-4 border-error/30 bg-error/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-error flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="text-sm text-error">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-dim hover:text-foreground transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["custom", "builtin", "variables"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "custom" ? "Custom Commands" : tab === "builtin" ? "Built-in" : "Variables"}
          </button>
        ))}
      </div>

      {/* Custom Commands Tab */}
      {activeTab === "custom" && (
        <div className="space-y-4">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-full max-w-md px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
          />

          {/* Loading Skeleton */}
          {loading && (
            <div className="card overflow-hidden">
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="h-4 w-20 bg-glass rounded" />
                    <div className="h-4 flex-1 bg-glass rounded" />
                    <div className="h-4 w-12 bg-glass rounded" />
                    <div className="h-4 w-16 bg-glass rounded" />
                    <div className="h-4 w-10 bg-glass rounded" />
                    <div className="h-4 w-20 bg-glass rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && commands.length === 0 && !error && (
            <div className="card p-12 text-center">
              <svg className="w-12 h-12 text-dim mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <h3 className="text-sm font-bold mb-1">No commands yet</h3>
              <p className="text-xs text-muted mb-4">Create your first custom command to get started.</p>
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
                Add Command
              </button>
            </div>
          )}

          {/* No Search Results */}
          {!loading && commands.length > 0 && filteredCommands.length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-sm text-muted">No commands match &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {/* Commands Table */}
          {!loading && filteredCommands.length > 0 && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Command</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Response</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Cooldown</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Permission</th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-4">Uses</th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommands.map((cmd) => (
                      <tr key={cmd.id} className={`border-b border-glass-border hover:bg-glass transition-colors ${!cmd.enabled ? "opacity-40" : ""}`}>
                        <td className="p-4">
                          <span className="text-data text-sm font-bold text-electric">{cmd.name}</span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <span className="text-xs text-muted truncate block">{cmd.response}</span>
                        </td>
                        <td className="p-4 text-data text-xs text-dim">{cmd.cooldown}s</td>
                        <td className="p-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            cmd.permission === "broadcaster" ? "bg-red/10 text-red-bright" :
                            cmd.permission === "moderator" ? "bg-gold/10 text-gold" :
                            cmd.permission === "subscriber" ? "bg-electric/10 text-electric" :
                            "bg-glass text-dim"
                          }`}>
                            {cmd.permission}
                          </span>
                        </td>
                        <td className="p-4 text-right text-data text-xs text-muted">{(cmd.uses ?? 0).toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => toggleCommand(cmd.id)}
                              disabled={togglingId === cmd.id}
                              className={`w-8 h-4 rounded-full transition-colors flex-shrink-0 ${
                                cmd.enabled ? "bg-emerald" : "bg-dim"
                              } ${togglingId === cmd.id ? "opacity-50" : ""}`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-transform ${
                                cmd.enabled ? "translate-x-4" : "translate-x-0.5"
                              }`} />
                            </button>
                            <button
                              onClick={() => setEditingCommand(cmd)}
                              className="p-1.5 text-dim hover:text-foreground transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteCommand(cmd.id)}
                              disabled={deletingId === cmd.id}
                              className={`p-1.5 text-dim hover:text-error transition-colors ${deletingId === cmd.id ? "opacity-50" : ""}`}
                            >
                              {deletingId === cmd.id ? (
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                </svg>
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Built-in Commands Tab */}
      {activeTab === "builtin" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Command</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Description</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">Permission</th>
                </tr>
              </thead>
              <tbody>
                {BUILT_IN_COMMANDS.map((cmd) => (
                  <tr key={cmd.name} className="border-b border-glass-border hover:bg-glass transition-colors">
                    <td className="p-4">
                      <span className="text-data text-sm font-bold text-gold">{cmd.name}</span>
                    </td>
                    <td className="p-4 text-xs text-muted">{cmd.description}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        cmd.permission === "broadcaster" ? "bg-red/10 text-red-bright" :
                        cmd.permission === "moderator" ? "bg-gold/10 text-gold" :
                        "bg-glass text-dim"
                      }`}>
                        {cmd.permission}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Variables Tab */}
      {activeTab === "variables" && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Available Variables</h2>
          <p className="text-xs text-muted mb-6">Use these variables in your custom command responses. They&apos;ll be automatically replaced with real values at runtime.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {VARIABLES.map((v) => (
              <div key={v.name} className="flex items-center gap-3 p-3 rounded-lg bg-glass border border-glass-border">
                <code className="text-data text-sm text-electric bg-electric/10 px-2 py-0.5 rounded">{v.name}</code>
                <span className="text-xs text-muted">{v.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Command Modal */}
      {(showAddForm || editingCommand) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { if (!saving) { setShowAddForm(false); setEditingCommand(null); } }} />
          <div className="relative w-full max-w-lg glass-raised p-6 animate-reveal">
            <h2 className="text-lg font-bold mb-6">{editingCommand ? "Edit Command" : "Add Command"}</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Command Name</label>
                <input
                  type="text"
                  value={editingCommand ? editingCommand.name : newName}
                  onChange={(e) => editingCommand ? setEditingCommand({ ...editingCommand, name: e.target.value }) : setNewName(e.target.value)}
                  placeholder="!command"
                  disabled={saving}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Response</label>
                <textarea
                  value={editingCommand ? editingCommand.response : newResponse}
                  onChange={(e) => editingCommand ? setEditingCommand({ ...editingCommand, response: e.target.value }) : setNewResponse(e.target.value)}
                  placeholder="The response message... Use {user}, {platform}, etc."
                  rows={3}
                  disabled={saving}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Cooldown (seconds)</label>
                  <input
                    type="number"
                    value={editingCommand ? editingCommand.cooldown : newCooldown}
                    onChange={(e) => editingCommand ? setEditingCommand({ ...editingCommand, cooldown: Number(e.target.value) }) : setNewCooldown(Number(e.target.value))}
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Permission</label>
                  <select
                    value={editingCommand ? editingCommand.permission : newPermission}
                    onChange={(e) => {
                      const val = e.target.value as Command["permission"];
                      if (editingCommand) { setEditingCommand({ ...editingCommand, permission: val }); } else { setNewPermission(val); }
                    }}
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="moderator">Moderator</option>
                    <option value="broadcaster">Broadcaster</option>
                  </select>
                </div>
              </div>

              {/* Platform selection */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {allPlatformOptions.map((platform) => {
                    const isActive = editingCommand
                      ? editingCommand.platforms.includes(platform)
                      : newPlatforms.includes(platform);
                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => togglePlatform(platform, !!editingCommand)}
                        disabled={saving}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-50 ${
                          isActive
                            ? "bg-red/15 border-red/30 text-red-bright"
                            : "bg-glass border-glass-border text-dim hover:text-foreground"
                        }`}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowAddForm(false); setEditingCommand(null); }}
                disabled={saving}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={editingCommand ? handleSaveEdit : handleAddCommand}
                disabled={saving || (!editingCommand && (!newName || !newResponse))}
                className="btn btn-primary btn-sm"
              >
                {saving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  editingCommand ? "Save Changes" : "Create Command"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
