"use client";

import { useState } from "react";

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

const CUSTOM_COMMANDS: Command[] = [
  { id: "1", name: "!socials", response: "Follow Pro everywhere: Twitch, Kick, YouTube, X, TikTok, Instagram, Facebook, Trovo, Discord! Links at prozilligaming.com/connect", cooldown: 30, permission: "everyone", enabled: true, uses: 1247, platforms: ["Twitch", "Kick", "Discord"] },
  { id: "2", name: "!discord", response: "Join the ZO Syndicate Discord: https://discord.gg/zosyndicate", cooldown: 60, permission: "everyone", enabled: true, uses: 892, platforms: ["Twitch", "Kick", "YouTube"] },
  { id: "3", name: "!server", response: "ZO Syndicate RP - connect via FiveM! 48 slots, 51 custom resources, 10 gangs. Info: prozilligaming.com/zo-syndicate", cooldown: 30, permission: "everyone", enabled: true, uses: 634, platforms: ["Twitch", "Kick", "YouTube"] },
  { id: "4", name: "!merch", response: "Rep the brand! Official Prozilli merch at prozilligaming.com/shop", cooldown: 60, permission: "everyone", enabled: true, uses: 321, platforms: ["Twitch", "Kick", "Discord"] },
  { id: "5", name: "!tip", response: "Support the stream! Tips and donations: prozilligaming.com/support", cooldown: 60, permission: "everyone", enabled: true, uses: 567, platforms: ["Twitch", "Kick"] },
  { id: "6", name: "!lisa", response: "LISA (Live Interactive System Administrator) is our AI co-host! She sees all platforms, remembers everyone, and has opinions. Talk to her!", cooldown: 30, permission: "everyone", enabled: true, uses: 1089, platforms: ["Twitch", "Kick", "YouTube", "Discord"] },
  { id: "7", name: "!uptime", response: "Stream has been live for {uptime}! Playing {game}", cooldown: 15, permission: "everyone", enabled: true, uses: 445, platforms: ["Twitch", "Kick"] },
  { id: "8", name: "!shoutout", response: "Go check out {user}! They're amazing and you should follow them!", cooldown: 10, permission: "moderator", enabled: true, uses: 234, platforms: ["Twitch", "Kick", "YouTube"] },
  { id: "9", name: "!lurk", response: "{user} is lurking in the shadows... we see you! Enjoy the vibes.", cooldown: 0, permission: "everyone", enabled: true, uses: 789, platforms: ["Twitch", "Kick"] },
  { id: "10", name: "!schedule", response: "Stream schedule: Mon/Wed/Fri 5PM EST - ZO Syndicate | Sat 2PM EST - Marathon | Sun 3PM EST - Community Games", cooldown: 60, permission: "everyone", enabled: true, uses: 456, platforms: ["Twitch", "Kick", "YouTube", "Discord"] },
];

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
  const [commands, setCommands] = useState(CUSTOM_COMMANDS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [activeTab, setActiveTab] = useState<"custom" | "builtin" | "variables">("custom");
  const [searchQuery, setSearchQuery] = useState("");

  /* New command form state */
  const [newName, setNewName] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [newCooldown, setNewCooldown] = useState(30);
  const [newPermission, setNewPermission] = useState<Command["permission"]>("everyone");

  const toggleCommand = (id: string) => {
    setCommands((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const deleteCommand = (id: string) => {
    setCommands((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCommand = () => {
    if (!newName || !newResponse) return;
    const cmd: Command = {
      id: Date.now().toString(),
      name: newName.startsWith("!") ? newName : `!${newName}`,
      response: newResponse,
      cooldown: newCooldown,
      permission: newPermission,
      enabled: true,
      uses: 0,
      platforms: ["Twitch", "Kick", "Discord"],
    };
    setCommands((prev) => [...prev, cmd]);
    setNewName("");
    setNewResponse("");
    setNewCooldown(30);
    setNewPermission("everyone");
    setShowAddForm(false);
  };

  const filteredCommands = commands.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.response.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Commands</h1>
          <p className="text-sm text-muted mt-1">{commands.length} custom commands configured</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Command
        </button>
      </div>

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

          {/* Commands Table */}
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
                      <td className="p-4 text-right text-data text-xs text-muted">{cmd.uses.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => toggleCommand(cmd.id)}
                            className={`w-8 h-4 rounded-full transition-colors flex-shrink-0 ${
                              cmd.enabled ? "bg-emerald" : "bg-dim"
                            }`}
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
                            className="p-1.5 text-dim hover:text-error transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowAddForm(false); setEditingCommand(null); }} />
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
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Response</label>
                <textarea
                  value={editingCommand ? editingCommand.response : newResponse}
                  onChange={(e) => editingCommand ? setEditingCommand({ ...editingCommand, response: e.target.value }) : setNewResponse(e.target.value)}
                  placeholder="The response message... Use {user}, {platform}, etc."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Cooldown (seconds)</label>
                  <input
                    type="number"
                    value={editingCommand ? editingCommand.cooldown : newCooldown}
                    onChange={(e) => editingCommand ? setEditingCommand({ ...editingCommand, cooldown: Number(e.target.value) }) : setNewCooldown(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
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
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="moderator">Moderator</option>
                    <option value="broadcaster">Broadcaster</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowAddForm(false); setEditingCommand(null); }} className="btn btn-ghost btn-sm">
                Cancel
              </button>
              <button onClick={handleAddCommand} className="btn btn-primary btn-sm">
                {editingCommand ? "Save Changes" : "Create Command"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
