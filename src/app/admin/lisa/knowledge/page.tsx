"use client";

import { useState } from "react";

interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  enabled: boolean;
  priority: number;
}

const MOCK_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "1",
    category: "Streamer",
    question: "Who is Pro/Prozilli?",
    answer:
      "Pro (Widler Sanon) is a streamer, content creator, and filmmaker. He founded Prozilli Entertainment under Prozilli Inc., a C-corp focused on cinema-first creative content. He streams GTA RP, games, and creative content.",
    enabled: true,
    priority: 10,
  },
  {
    id: "2",
    category: "Community",
    question: "What is the community name?",
    answer:
      "The community is called the 'Prozilli Fam' - a welcoming group of viewers who enjoy gaming, cinema, and creative content together.",
    enabled: true,
    priority: 9,
  },
  {
    id: "3",
    category: "Schedule",
    question: "When does Pro stream?",
    answer:
      "Pro typically streams Tuesday, Thursday, and Saturday at 8 PM EST. Check the schedule at prozilligaming.com/schedule for the most up-to-date information.",
    enabled: true,
    priority: 8,
  },
  {
    id: "4",
    category: "FiveM",
    question: "What is ZO Syndicate?",
    answer:
      "ZO Syndicate RP is Pro's FiveM roleplay server running on Qbox framework. It features cinematic roleplay with custom gangs, jobs, and stories. Join the Discord for whitelist info.",
    enabled: true,
    priority: 7,
  },
  {
    id: "5",
    category: "Divisions",
    question: "What are Prozilli's divisions?",
    answer:
      "Prozilli Entertainment has 4 divisions: Gaming (live streaming), Studio (short films), Creator Academy (education/tutorials), and Productions (feature films).",
    enabled: true,
    priority: 6,
  },
];

const CATEGORIES = [
  "Streamer",
  "Community",
  "Schedule",
  "FiveM",
  "Divisions",
  "Technical",
  "Rules",
  "Other",
];

export default function LisaKnowledgePage() {
  const [knowledge, setKnowledge] = useState(MOCK_KNOWLEDGE);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "Other",
    question: "",
    answer: "",
    priority: 5,
  });

  const filteredKnowledge = knowledge.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = knowledge.filter((k) => k.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const toggleItem = (id: string) => {
    setKnowledge(
      knowledge.map((k) => (k.id === id ? { ...k, enabled: !k.enabled } : k))
    );
  };

  const deleteItem = (id: string) => {
    setKnowledge(knowledge.filter((k) => k.id !== id));
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
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            LISA Knowledge Base
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Train LISA with facts about your community
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
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
          Add Knowledge
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
          <p className="text-2xl font-bold text-white">{knowledge.length}</p>
          <p className="text-xs text-gray-500">Total Items</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
          <p className="text-2xl font-bold text-green-400">
            {knowledge.filter((k) => k.enabled).length}
          </p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
          <p className="text-2xl font-bold text-brand-gold">{CATEGORIES.length}</p>
          <p className="text-xs text-gray-500">Categories</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
          <p className="text-2xl font-bold text-white">
            {Math.round(
              knowledge.reduce((sum, k) => sum + k.answer.length, 0) / 1000
            )}K
          </p>
          <p className="text-xs text-gray-500">Characters</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              !selectedCategory
                ? "bg-brand-red/10 text-brand-red"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>All Items</span>
            <span className="text-xs">{knowledge.length}</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-red/10 text-brand-red"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{cat}</span>
              <span className="text-xs">{categoryCounts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Knowledge Items */}
        <div className="lg:col-span-3 space-y-4">
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
              placeholder="Search knowledge base..."
              className="w-full rounded-lg border border-white/10 bg-[#161b22] py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
            />
          </div>

          {/* Items */}
          <div className="space-y-3">
            {filteredKnowledge
              .sort((a, b) => b.priority - a.priority)
              .map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border border-white/5 bg-[#161b22] p-4 ${
                    !item.enabled ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded bg-brand-red/20 px-1.5 py-0.5 text-[10px] font-medium text-brand-red">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Priority: {item.priority}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white mb-2">
                        Q: {item.question}
                      </p>
                      <p className="text-sm text-gray-400">A: {item.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          item.enabled ? "bg-green-500" : "bg-white/10"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            item.enabled ? "left-4" : "left-0.5"
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
                        onClick={() => deleteItem(item.id)}
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

            {filteredKnowledge.length === 0 && (
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-12 text-center">
                <span className="text-4xl">📚</span>
                <h3 className="mt-4 text-lg font-medium text-white">
                  No knowledge found
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {searchQuery
                    ? "Try a different search term"
                    : "Add some knowledge to train LISA"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#161b22] p-6">
            <h2 className="text-lg font-bold text-white mb-4">Add Knowledge</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Priority (1-10)
                  </label>
                  <input
                    type="number"
                    value={newItem.priority}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        priority: parseInt(e.target.value) || 5,
                      })
                    }
                    min={1}
                    max={10}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Question / Topic
                </label>
                <input
                  type="text"
                  value={newItem.question}
                  onChange={(e) =>
                    setNewItem({ ...newItem, question: e.target.value })
                  }
                  placeholder="What question or topic does this answer?"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Answer / Information
                </label>
                <textarea
                  value={newItem.answer}
                  onChange={(e) =>
                    setNewItem({ ...newItem, answer: e.target.value })
                  }
                  rows={4}
                  placeholder="The information LISA should know..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newItem.question && newItem.answer) {
                    setKnowledge([
                      ...knowledge,
                      {
                        id: Date.now().toString(),
                        ...newItem,
                        enabled: true,
                      },
                    ]);
                    setNewItem({
                      category: "Other",
                      question: "",
                      answer: "",
                      priority: 5,
                    });
                    setShowAddModal(false);
                  }
                }}
                className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-red/90"
              >
                Add Knowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
