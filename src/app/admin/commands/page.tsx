"use client";

import { useState } from "react";

interface Command {
  id: string;
  name: string;
  response: string;
  enabled: boolean;
  cooldown: number;
  userLevel: "everyone" | "subscriber" | "moderator" | "admin";
  uses: number;
}

const MOCK_COMMANDS: Command[] = [
  {
    id: "1",
    name: "discord",
    response: "Join our Discord community: https://discord.gg/prozilli",
    enabled: true,
    cooldown: 5,
    userLevel: "everyone",
    uses: 1247,
  },
  {
    id: "2",
    name: "socials",
    response:
      "Follow Pro everywhere! Twitch: twitch.tv/prozilligaming | YouTube: youtube.com/@prozilligaming | X: x.com/prozilligaming",
    enabled: true,
    cooldown: 10,
    userLevel: "everyone",
    uses: 892,
  },
  {
    id: "3",
    name: "schedule",
    response:
      "Pro streams Tue-Thu-Sat at 8PM EST! Check the schedule at prozilligaming.com/schedule",
    enabled: true,
    cooldown: 30,
    userLevel: "everyone",
    uses: 456,
  },
  {
    id: "4",
    name: "server",
    response:
      "The FiveM server is ZO Syndicate RP! Join the Discord for whitelist info.",
    enabled: true,
    cooldown: 15,
    userLevel: "everyone",
    uses: 234,
  },
  {
    id: "5",
    name: "lurk",
    response: "Thanks for lurking {user}! Enjoy the vibes 🫡",
    enabled: true,
    cooldown: 0,
    userLevel: "everyone",
    uses: 678,
  },
];

export default function CommandsPage() {
  const [commands, setCommands] = useState(MOCK_COMMANDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommand, setNewCommand] = useState({
    name: "",
    response: "",
    cooldown: 5,
    userLevel: "everyone" as Command["userLevel"],
  });

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCommand = (id: string) => {
    setCommands(
      commands.map((cmd) =>
        cmd.id === id ? { ...cmd, enabled: !cmd.enabled } : cmd
      )
    );
  };

  const deleteCommand = (id: string) => {
    setCommands(commands.filter((cmd) => cmd.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Custom Commands</h1>
          <p className="mt-1 text-sm text-gray-400">
            Create commands that respond when users type !command
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Command
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search commands..."
          className="w-full rounded-lg border border-white/10 bg-[#161b22] py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
        />
      </div>

      {/* Commands List */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Command
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Response
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Cooldown
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Permission
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Uses
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.map((cmd) => (
              <tr
                key={cmd.id}
                className={`border-b border-white/5 last:border-0 ${
                  !cmd.enabled ? "opacity-50" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <code className="rounded bg-white/10 px-2 py-1 text-sm text-brand-gold">
                    !{cmd.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-400 max-w-xs truncate">
                    {cmd.response}
                  </p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {cmd.cooldown}s
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      cmd.userLevel === "admin"
                        ? "bg-red-500/20 text-red-400"
                        : cmd.userLevel === "moderator"
                        ? "bg-purple-500/20 text-purple-400"
                        : cmd.userLevel === "subscriber"
                        ? "bg-brand-gold/20 text-brand-gold"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {cmd.userLevel}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {cmd.uses.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleCommand(cmd.id)}
                      className={`relative h-5 w-9 rounded-full transition-colors ${
                        cmd.enabled ? "bg-green-500" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                          cmd.enabled ? "left-4" : "left-0.5"
                        }`}
                      />
                    </button>
                    <button className="rounded p-1.5 text-gray-400 hover:bg-white/5 hover:text-white">
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
                    <button
                      onClick={() => deleteCommand(cmd.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Variables Reference */}
      <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-3">
          Available Variables
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <code className="text-brand-gold">{"{user}"}</code>
            <p className="text-gray-500">Username of the sender</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{channel}"}</code>
            <p className="text-gray-500">Current channel name</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{game}"}</code>
            <p className="text-gray-500">Current game category</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{title}"}</code>
            <p className="text-gray-500">Current stream title</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{uptime}"}</code>
            <p className="text-gray-500">Stream uptime</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{viewers}"}</code>
            <p className="text-gray-500">Current viewer count</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{followers}"}</code>
            <p className="text-gray-500">Total follower count</p>
          </div>
          <div>
            <code className="text-brand-gold">{"{count}"}</code>
            <p className="text-gray-500">Command use counter</p>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#161b22] p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Create Command
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Command Name
                </label>
                <div className="flex">
                  <span className="flex items-center rounded-l-lg border border-r-0 border-white/10 bg-white/5 px-3 text-sm text-gray-400">
                    !
                  </span>
                  <input
                    type="text"
                    value={newCommand.name}
                    onChange={(e) =>
                      setNewCommand({ ...newCommand, name: e.target.value })
                    }
                    placeholder="commandname"
                    className="flex-1 rounded-r-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Response
                </label>
                <textarea
                  value={newCommand.response}
                  onChange={(e) =>
                    setNewCommand({ ...newCommand, response: e.target.value })
                  }
                  rows={3}
                  placeholder="What should the bot say?"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Cooldown (seconds)
                  </label>
                  <input
                    type="number"
                    value={newCommand.cooldown}
                    onChange={(e) =>
                      setNewCommand({
                        ...newCommand,
                        cooldown: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Permission Level
                  </label>
                  <select
                    value={newCommand.userLevel}
                    onChange={(e) =>
                      setNewCommand({
                        ...newCommand,
                        userLevel: e.target.value as Command["userLevel"],
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="subscriber">Subscribers</option>
                    <option value="moderator">Moderators</option>
                    <option value="admin">Admin Only</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newCommand.name && newCommand.response) {
                    setCommands([
                      ...commands,
                      {
                        id: Date.now().toString(),
                        ...newCommand,
                        enabled: true,
                        uses: 0,
                      },
                    ]);
                    setNewCommand({
                      name: "",
                      response: "",
                      cooldown: 5,
                      userLevel: "everyone",
                    });
                    setShowCreateModal(false);
                  }
                }}
                className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90"
              >
                Create Command
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
