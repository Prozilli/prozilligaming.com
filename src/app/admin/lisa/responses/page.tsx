"use client";

import { useState } from "react";

interface CustomResponse {
  id: string;
  trigger: string;
  triggerType: "exact" | "contains" | "regex";
  response: string;
  enabled: boolean;
  cooldown: number;
  uses: number;
}

const MOCK_RESPONSES: CustomResponse[] = [
  {
    id: "1",
    trigger: "when is the next stream",
    triggerType: "contains",
    response:
      "Pro usually streams Tue-Thu-Sat at 8PM EST! Check the schedule at prozilligaming.com/schedule for the latest info.",
    enabled: true,
    cooldown: 60,
    uses: 342,
  },
  {
    id: "2",
    trigger: "what game is this",
    triggerType: "contains",
    response:
      "Pro is currently playing {game}! It's a great game, enjoy the stream!",
    enabled: true,
    cooldown: 30,
    uses: 156,
  },
  {
    id: "3",
    trigger: "discord",
    triggerType: "contains",
    response:
      "Join our Discord community at discord.gg/prozilli for announcements, events, and hanging out with the Prozilli Fam!",
    enabled: true,
    cooldown: 120,
    uses: 89,
  },
  {
    id: "4",
    trigger: "hello lisa",
    triggerType: "exact",
    response: "Hey {user}! 👋 How's it going? Welcome to the stream!",
    enabled: true,
    cooldown: 0,
    uses: 567,
  },
];

export default function LisaResponsesPage() {
  const [responses, setResponses] = useState(MOCK_RESPONSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [newResponse, setNewResponse] = useState<Partial<CustomResponse>>({
    trigger: "",
    triggerType: "contains",
    response: "",
    cooldown: 30,
  });

  const filteredResponses = responses.filter(
    (r) =>
      r.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.response.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleResponse = (id: string) => {
    setResponses(
      responses.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const deleteResponse = (id: string) => {
    setResponses(responses.filter((r) => r.id !== id));
  };

  const createResponse = () => {
    if (newResponse.trigger && newResponse.response) {
      setResponses([
        ...responses,
        {
          id: Date.now().toString(),
          trigger: newResponse.trigger,
          triggerType: newResponse.triggerType || "contains",
          response: newResponse.response,
          enabled: true,
          cooldown: newResponse.cooldown || 30,
          uses: 0,
        },
      ]);
      setNewResponse({
        trigger: "",
        triggerType: "contains",
        response: "",
        cooldown: 30,
      });
    }
  };

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
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </div>
            LISA Responses
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Custom trigger-response pairs for LISA
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{responses.length}</p>
          <p className="text-xs text-gray-500">Custom Responses</p>
        </div>
      </div>

      {/* Create New */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-4">
          Create Response
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Trigger
            </label>
            <div className="flex gap-2">
              <select
                value={newResponse.triggerType}
                onChange={(e) =>
                  setNewResponse({
                    ...newResponse,
                    triggerType: e.target.value as CustomResponse["triggerType"],
                  })
                }
                className="rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2.5 text-xs text-white focus:border-brand-red focus:outline-none"
              >
                <option value="contains">Contains</option>
                <option value="exact">Exact Match</option>
                <option value="regex">Regex</option>
              </select>
              <input
                type="text"
                value={newResponse.trigger}
                onChange={(e) =>
                  setNewResponse({ ...newResponse, trigger: e.target.value })
                }
                placeholder="when is the next stream"
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Cooldown (seconds)
            </label>
            <input
              type="number"
              value={newResponse.cooldown}
              onChange={(e) =>
                setNewResponse({
                  ...newResponse,
                  cooldown: parseInt(e.target.value) || 0,
                })
              }
              min={0}
              className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Response
            </label>
            <textarea
              value={newResponse.response}
              onChange={(e) =>
                setNewResponse({ ...newResponse, response: e.target.value })
              }
              rows={3}
              placeholder="LISA's response when triggered..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={createResponse}
            className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red/90"
          >
            Create Response
          </button>
        </div>
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
          placeholder="Search responses..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-surface py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
        />
      </div>

      {/* Responses List */}
      <div className="space-y-3">
        {filteredResponses.map((response) => (
          <div
            key={response.id}
            className={`rounded-xl border border-[var(--color-border)] bg-surface p-4 ${
              !response.enabled ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      response.triggerType === "exact"
                        ? "bg-purple-500/20 text-purple-400"
                        : response.triggerType === "regex"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {response.triggerType.toUpperCase()}
                  </span>
                  <code className="rounded bg-raised px-2 py-0.5 text-xs text-gold">
                    {response.trigger}
                  </code>
                </div>
                <p className="text-sm text-gray-300">{response.response}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>Cooldown: {response.cooldown}s</span>
                  <span>Used {response.uses} times</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleResponse(response.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    response.enabled ? "bg-green-500" : "bg-raised"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      response.enabled ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
                <button className="rounded p-1.5 text-gray-400 hover:bg-surface hover:text-white">
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
                  onClick={() => deleteResponse(response.id)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Variables Reference */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <h3 className="text-sm font-semibold text-white mb-3">
          Available Variables
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <code className="text-gold">{"{user}"}</code>
            <p className="text-gray-500">Username</p>
          </div>
          <div>
            <code className="text-gold">{"{channel}"}</code>
            <p className="text-gray-500">Channel name</p>
          </div>
          <div>
            <code className="text-gold">{"{game}"}</code>
            <p className="text-gray-500">Current game</p>
          </div>
          <div>
            <code className="text-gold">{"{title}"}</code>
            <p className="text-gray-500">Stream title</p>
          </div>
          <div>
            <code className="text-gold">{"{uptime}"}</code>
            <p className="text-gray-500">Stream duration</p>
          </div>
          <div>
            <code className="text-gold">{"{viewers}"}</code>
            <p className="text-gray-500">Viewer count</p>
          </div>
          <div>
            <code className="text-gold">{"{time}"}</code>
            <p className="text-gray-500">Current time</p>
          </div>
          <div>
            <code className="text-gold">{"{random:1-100}"}</code>
            <p className="text-gray-500">Random number</p>
          </div>
        </div>
      </div>
    </div>
  );
}
