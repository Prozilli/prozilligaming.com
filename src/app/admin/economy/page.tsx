"use client";

import { useState, useEffect, useCallback } from "react";
import { getEconomyConfig, saveEconomyConfig, getEconomyLeaderboard, getShopItems, saveShopItem, deleteShopItem, resetEconomy } from "@/lib/admin-api";

interface EconConfig {
  enabled: boolean;
  currencyName: string;
  currencyIcon: string;
  dailyAmount: number;
  gameCooldownMs: number;
  startingBalance: number;
  maxBalance: number;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  type?: string;
  stock?: number | null;
  roleId?: string;
}

interface LeaderboardEntry {
  username: string;
  coins: number;
  platform: string;
  user_id: string;
}

type TabType = "overview" | "shop" | "settings";

export default function EconomyPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [config, setConfig] = useState<EconConfig>({ enabled: true, currencyName: "Prozilli Coins", currencyIcon: "🪙", dailyAmount: 100, gameCooldownMs: 30000, startingBalance: 0, maxBalance: 10000000 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // New item form
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(1000);
  const [newItemType, setNewItemType] = useState("perk");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [configRes, lbRes, itemsRes] = await Promise.all([
        getEconomyConfig(),
        getEconomyLeaderboard(10),
        getShopItems(),
      ]);
      if (configRes.config) setConfig(configRes.config as unknown as EconConfig);
      if (lbRes.leaderboard) setLeaderboard(lbRes.leaderboard as LeaderboardEntry[]);
      if (itemsRes.items) setShopItems(itemsRes.items as ShopItem[]);
    } catch (err) {
      console.error("Failed to load economy data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveEconomyConfig(config as unknown as Record<string, unknown>);
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch { setSaveMsg("Failed"); }
    finally { setSaving(false); }
  };

  const handleAddItem = async () => {
    if (!newItemName) return;
    try {
      await saveShopItem({ name: newItemName, price: newItemPrice, type: newItemType });
      setNewItemName("");
      setNewItemPrice(1000);
      await loadData();
    } catch { /* ignore */ }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteShopItem(id);
      setShopItems(prev => prev.filter(i => i.id !== id));
    } catch { /* ignore */ }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure? This will reset ALL user balances to 0.")) return;
    try {
      await resetEconomy();
      setSaveMsg("Economy reset!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch { /* ignore */ }
  };

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Economy</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your server&apos;s virtual currency system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setConfig(c => ({ ...c, enabled: !c.enabled }))} className={`relative h-6 w-11 rounded-full transition-colors ${config.enabled ? "bg-green-500" : "bg-raised"}`}>
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enabled ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-400">{config.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-surface p-1">
        {[
          { id: "overview", label: "Overview" },
          { id: "shop", label: "Shop" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-brand-gold text-black"
                : "text-gray-400 hover:text-white hover:bg-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-brand-gold/20 bg-surface p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Currency</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-xl" style={{ boxShadow: "0 0 15px rgba(196, 162, 101, 0.15)" }}>
                  {config.currencyIcon}
                </span>
                <p className="text-lg font-bold text-white">{config.currencyName}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Shop Items</p>
              <div className="mt-2 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#949d9f" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="text-2xl font-bold text-white">{loading ? "..." : shopItems.length}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Daily Reward</p>
              <div className="mt-2 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <p className="text-2xl font-bold text-white">{config.currencyIcon} {formatNumber(config.dailyAmount)}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Richest User</p>
              <div className="mt-2 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#c4a265" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <p className="text-2xl font-bold text-white">{loading ? "..." : leaderboard.length > 0 ? `${config.currencyIcon} ${formatNumber(leaderboard[0].coins)}` : "\u2014"}</p>
              </div>
              {leaderboard.length > 0 && <p className="mt-1 text-xs text-gray-400">{leaderboard[0].username}</p>}
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-surface" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Details</span>
            <div className="h-px flex-1 bg-surface" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Leaderboard */}
            <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a265" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-white">Top Earners</h3>
                </div>
                <button onClick={loadData} className="text-xs text-gold hover:text-white transition-colors">Refresh</button>
              </div>
              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-400 py-6">No economy data yet</p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((user, i) => (
                    <div
                      key={`${user.platform}-${user.user_id}`}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                        i === 0 ? "bg-brand-gold/10 border border-brand-gold/20" :
                        i === 1 ? "bg-gray-400/5 border border-gray-400/10" :
                        i === 2 ? "bg-amber-700/10 border border-amber-700/15" :
                        "bg-surface border border-transparent"
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="relative flex-shrink-0">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-brand-gold text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-raised text-gray-400"}`}>
                          {i + 1}
                        </span>
                        {i < 3 && (
                          <svg className="absolute -top-1.5 -right-1.5" width="10" height="10" viewBox="0 0 24 24" fill={i === 0 ? "#c4a265" : i === 1 ? "#949d9f" : "#b45309"} stroke="none">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        )}
                      </div>
                      {/* Avatar */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red/20 text-red text-sm font-medium flex-shrink-0">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      {/* Name */}
                      <span className="flex-1 text-sm font-medium text-white truncate min-w-0">{user.username}</span>
                      {/* Balance */}
                      <span className={`text-sm font-bold flex-shrink-0 ${i === 0 ? "text-gold" : "text-gold/80"}`}>{config.currencyIcon} {formatNumber(user.coins)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Economy Commands</h3>
              <div className="space-y-3">
                {[
                  { cmd: "!daily", desc: `Claim ${config.currencyIcon} ${formatNumber(config.dailyAmount)} daily` },
                  { cmd: "!balance", desc: "Check your balance" },
                  { cmd: "!pay @user amount", desc: "Transfer coins to another user" },
                  { cmd: "!shop", desc: "Browse available items" },
                  { cmd: "!buy <item>", desc: "Purchase a shop item" },
                  { cmd: "!richest", desc: "View the leaderboard" },
                  { cmd: "!flip <amount>", desc: "Coin flip — double or nothing" },
                  { cmd: "!dice <amount>", desc: "Roll dice — beat the dealer" },
                ].map((c) => (
                  <div key={c.cmd} className="flex items-center gap-3 rounded-lg bg-surface p-3">
                    <code className="text-xs font-mono text-gold">{c.cmd}</code>
                    <span className="text-xs text-gray-400">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shop Tab */}
      {activeTab === "shop" && (
        <div className="space-y-6">
          {/* Add Item Form */}
          <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Add Shop Item</h3>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Item name" className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-gold focus:outline-none" />
              </div>
              <div className="w-28">
                <label className="block text-xs font-medium text-gray-400 mb-1">Price</label>
                <input type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-gold focus:outline-none" />
              </div>
              <div className="w-28">
                <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
                <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 text-sm text-white focus:border-brand-gold focus:outline-none">
                  <option value="role">Role</option>
                  <option value="perk">Perk</option>
                  <option value="reward">Reward</option>
                  <option value="cosmetic">Cosmetic</option>
                </select>
              </div>
              <button onClick={handleAddItem} disabled={!newItemName} className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black hover:bg-brand-gold/90 disabled:opacity-50">Add</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{shopItems.length} items in shop</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--color-border)] bg-surface p-5 transition-colors hover:border-[var(--color-border)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    item.type === "role" ? "bg-purple-500/20 text-purple-400" :
                    item.type === "perk" ? "bg-blue-500/20 text-blue-400" :
                    item.type === "reward" ? "bg-green-500/20 text-green-400" :
                    "bg-pink-500/20 text-pink-400"
                  }`}>
                    {item.type === "role" && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    )}
                    {item.type === "perk" && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      </svg>
                    )}
                    {item.type === "reward" && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    )}
                    {item.type === "cosmetic" && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                      </svg>
                    )}
                  </div>
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                    item.type === "role" ? "bg-purple-500/20 text-purple-400" :
                    item.type === "perk" ? "bg-blue-500/20 text-blue-400" :
                    item.type === "reward" ? "bg-green-500/20 text-green-400" :
                    "bg-pink-500/20 text-pink-400"
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">{item.name}</h4>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-gold">
                    {config.currencyIcon} {formatNumber(item.price)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.stock == null ? "∞ stock" : `${item.stock} left`}
                  </p>
                </div>
                {item.description && <p className="mt-2 text-xs text-gray-500">{item.description}</p>}
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleDeleteItem(item.id)} className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Currency Settings</h3>
            {/* Currency Preview */}
            <div className="mb-5 flex items-center gap-4 rounded-lg bg-surface p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold/15 text-3xl" style={{ boxShadow: "0 0 20px rgba(196, 162, 101, 0.15)" }}>
                {config.currencyIcon}
              </div>
              <div>
                <p className="text-base font-bold text-white">{config.currencyName}</p>
                <p className="text-xs text-gray-500">Your server&apos;s virtual currency</p>
              </div>
              <div className="ml-auto rounded-lg bg-brand-gold/10 px-3 py-1.5">
                <p className="text-sm font-bold text-gold">{config.currencyIcon} 1,000</p>
                <p className="text-[10px] text-gray-500 text-right">sample</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Currency Name</label>
                <input type="text" value={config.currencyName} onChange={(e) => setConfig(c => ({ ...c, currencyName: e.target.value }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Currency Icon</label>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-xl flex-shrink-0">
                    {config.currencyIcon}
                  </span>
                  <input type="text" value={config.currencyIcon} onChange={(e) => setConfig(c => ({ ...c, currencyIcon: e.target.value }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Daily Reward Amount</label>
                  <input type="number" value={config.dailyAmount} onChange={(e) => setConfig(c => ({ ...c, dailyAmount: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Game Cooldown (seconds)</label>
                  <input type="number" value={Math.round(config.gameCooldownMs / 1000)} onChange={(e) => setConfig(c => ({ ...c, gameCooldownMs: (parseInt(e.target.value) || 0) * 1000 }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Starting Balance</label>
                  <input type="number" value={config.startingBalance} onChange={(e) => setConfig(c => ({ ...c, startingBalance: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Max Balance</label>
                  <input type="number" value={config.maxBalance} onChange={(e) => setConfig(c => ({ ...c, maxBalance: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-red-500/10" />
            <span className="text-xs font-medium uppercase tracking-wider text-red-500/50">Danger Zone</span>
            <div className="h-px flex-1 bg-red-500/10" />
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Reset All Balances</p>
                  <p className="text-xs text-gray-500">Set everyone&apos;s balance to 0</p>
                </div>
                <button onClick={handleReset} className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20">
                  Reset
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Disable Economy</p>
                  <p className="text-xs text-gray-500">Turn off the entire economy system</p>
                </div>
                <button onClick={() => { setConfig(c => ({ ...c, enabled: false })); handleSave(); }} className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20">
                  Disable
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3">
            {saveMsg && <span className="text-sm text-green-400">{saveMsg}</span>}
            <button onClick={handleSave} disabled={saving} className="rounded-lg bg-brand-gold px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-brand-gold/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
