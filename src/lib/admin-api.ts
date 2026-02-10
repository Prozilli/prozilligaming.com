/**
 * PRISMAI Admin API Client
 * Routes through CF Pages Function proxy at /api/prismai/*
 */

import { useState, useEffect, useCallback } from "react";

// Same-origin proxy — CF Pages Function forwards to PRISMAI core
const API_BASE_URL = "/api/prismai";

// ============================================
// Types
// ============================================

export interface DiscordServer {
  connected: boolean;
  id?: string;
  name?: string;
  memberCount?: number;
  icon?: string | null;
  banner?: string | null;
  description?: string | null;
  ownerId?: string;
  createdAt?: string;
  error?: string;
}

export interface DiscordChannel {
  id: string;
  name: string;
  type: number; // 0=text, 2=voice, 4=category, 5=announcement, 15=forum
  parentId: string | null;
  position: number;
}

export interface DiscordRole {
  id: string;
  name: string;
  color: string;
  position: number;
  mentionable: boolean;
  managed: boolean;
  memberCount: number;
}

export interface PlatformStatus {
  name: string;
  connected: boolean;
  live: boolean;
}

export interface LiveStatus {
  isLive: boolean;
  platforms: PlatformStatus[];
  liveCount: number;
}

// ============================================
// Helper Functions
// ============================================

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// Discord API
// ============================================

export async function getDiscordServer(): Promise<DiscordServer> {
  return fetchAPI<DiscordServer>("/discord/server");
}

export async function getDiscordChannels(): Promise<{ channels: DiscordChannel[]; error?: string }> {
  return fetchAPI<{ channels: DiscordChannel[]; error?: string }>("/discord/channels");
}

export async function getDiscordTextChannels(): Promise<DiscordChannel[]> {
  const { channels } = await getDiscordChannels();
  return channels.filter((c) => c.type === 0 || c.type === 5);
}

export async function getDiscordRoles(): Promise<{ roles: DiscordRole[]; error?: string }> {
  return fetchAPI<{ roles: DiscordRole[]; error?: string }>("/discord/roles");
}

export async function sendDiscordEmbed(channelId: string, embed: Record<string, unknown>) {
  return fetchAPI<{ success: boolean; id?: string }>("/discord/send-embed", {
    method: "POST",
    body: JSON.stringify({ channelId, embed }),
  });
}

export async function addDiscordRole(userId: string, roleId: string) {
  return fetchAPI<{ success: boolean }>("/discord/roles/add", {
    method: "POST",
    body: JSON.stringify({ userId, roleId }),
  });
}

export async function removeDiscordRole(userId: string, roleId: string) {
  return fetchAPI<{ success: boolean }>("/discord/roles/remove", {
    method: "POST",
    body: JSON.stringify({ userId, roleId }),
  });
}

// ============================================
// Settings API
// ============================================

export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  const result = await fetchAPI<{ key: string; value: T | null }>(`/settings/${key}`);
  return result.value;
}

export async function getAllSettings(): Promise<Record<string, unknown>> {
  const result = await fetchAPI<{ settings: Record<string, unknown> }>("/settings");
  return result.settings;
}

export async function saveSetting<T>(key: string, value: T): Promise<boolean> {
  const result = await fetchAPI<{ success: boolean }>(`/settings/${key}`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
  return result.success;
}

export async function deleteSetting(key: string): Promise<boolean> {
  const result = await fetchAPI<{ success: boolean }>(`/settings/${key}`, {
    method: "DELETE",
  });
  return result.success;
}

// ============================================
// Platform Status API
// ============================================

export async function getLiveStatus(): Promise<LiveStatus> {
  return fetchAPI<LiveStatus>("/live");
}

export async function getPlatforms(): Promise<{ platforms: PlatformStatus[] }> {
  return fetchAPI<{ platforms: PlatformStatus[] }>("/platforms");
}

// ============================================
// Levels API
// ============================================

export async function getLevelsConfig() {
  return fetchAPI<{ config: Record<string, unknown> }>("/levels/config");
}

export async function saveLevelsConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean; config: Record<string, unknown> }>("/levels/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function getLeaderboard(limit = 20, platform?: string) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (platform) params.set("platform", platform);
  return fetchAPI<{ leaderboard: Array<{ platform: string; user_id: string; username: string; xp: number; level: number; messages: number }> }>(`/levels/leaderboard?${params}`);
}

export async function getLevelRewards() {
  return fetchAPI<{ rewards: Array<{ level: number; roleId: string; roleName?: string }> }>("/levels/rewards");
}

export async function saveLevelRewards(rewards: Array<{ level: number; roleId: string; roleName?: string }>) {
  return fetchAPI<{ success: boolean }>("/levels/rewards", {
    method: "POST",
    body: JSON.stringify({ rewards }),
  });
}

// ============================================
// Reaction Roles API
// ============================================

export async function getReactionRoles() {
  return fetchAPI<{ configs: Array<{ messageId: string; channelId: string; emoji: string; roleId: string; roleName?: string; mode: string; title?: string }> }>("/reaction-roles");
}

export async function createReactionRole(config: { channelId: string; emoji: string; roleId: string; roleName?: string; title?: string; description?: string; mode?: string }) {
  return fetchAPI<{ success: boolean; messageId: string }>("/reaction-roles", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function deleteReactionRole(messageId: string) {
  return fetchAPI<{ success: boolean }>(`/reaction-roles/${messageId}`, {
    method: "DELETE",
  });
}

// ============================================
// Welcome API
// ============================================

export async function getWelcomeConfig() {
  return fetchAPI<{ welcome: Record<string, unknown>; goodbye: Record<string, unknown> }>("/welcome/config");
}

export async function saveWelcomeConfig(config: { welcome?: Record<string, unknown>; goodbye?: Record<string, unknown> }) {
  return fetchAPI<{ success: boolean }>("/welcome/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function sendTestWelcome(type: "welcome" | "goodbye" = "welcome") {
  return fetchAPI<{ success: boolean }>("/welcome/test", {
    method: "POST",
    body: JSON.stringify({ type }),
  });
}

// ============================================
// Starboard API
// ============================================

export async function getStarboardConfig() {
  return fetchAPI<{ config: Record<string, unknown> }>("/starboard/config");
}

export async function saveStarboardConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean }>("/starboard/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

// ============================================
// Economy API
// ============================================

export async function getEconomyConfig() {
  return fetchAPI<{ config: Record<string, unknown> }>("/economy/config");
}

export async function saveEconomyConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean }>("/economy/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function getEconomyLeaderboard(limit = 20) {
  return fetchAPI<{ leaderboard: Array<{ platform: string; user_id: string; username: string; coins: number }> }>(`/economy/leaderboard?limit=${limit}`);
}

export async function getShopItems() {
  return fetchAPI<{ items: Array<{ id: string; name: string; price: number; description?: string; roleId?: string; stock?: number; type?: string }> }>("/economy/items");
}

export async function saveShopItem(item: { id?: string; name: string; price: number; description?: string; roleId?: string; stock?: number; type?: string }) {
  return fetchAPI<{ success: boolean }>("/economy/items", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function deleteShopItem(id: string) {
  return fetchAPI<{ success: boolean }>(`/economy/items/${id}`, {
    method: "DELETE",
  });
}

export async function resetEconomy() {
  return fetchAPI<{ success: boolean }>("/economy/reset", {
    method: "POST",
  });
}

// ============================================
// Auto-Post API
// ============================================

export async function getAutopostConfig() {
  return fetchAPI<{ enabled: boolean; timezone: string; maxDailyPosts: Record<string, number>; scheduler: Record<string, unknown> }>("/autopost/config");
}

export async function saveAutopostConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean }>("/autopost/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function getAutopostQueue(limit = 50) {
  return fetchAPI<{ queue: Array<Record<string, unknown>> }>(`/autopost/queue?limit=${limit}`);
}

export async function getAutopostHistory(limit = 50) {
  return fetchAPI<{ history: Array<Record<string, unknown>> }>(`/autopost/history?limit=${limit}`);
}

export async function getSchedulerStatus() {
  return fetchAPI<Record<string, unknown>>("/autopost/scheduler/status");
}

export async function schedulePost(post: Record<string, unknown>) {
  return fetchAPI<{ success: boolean }>("/autopost/schedule", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export async function postNow(post: Record<string, unknown>) {
  return fetchAPI<{ success: boolean }>("/autopost/post-now", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export async function cancelPost(id: number) {
  return fetchAPI<{ success: boolean }>(`/autopost/${id}`, {
    method: "DELETE",
  });
}

// ============================================
// Moderation API
// ============================================

export async function getModerationConfig() {
  return fetchAPI<{ config: Record<string, unknown> }>("/moderation/config");
}

export async function saveModerationConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean; config: Record<string, unknown> }>("/moderation/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export async function updateBannedWords(add?: string[], remove?: string[]) {
  return fetchAPI<{ success: boolean; bannedWords: string[] }>("/moderation/banned-words", {
    method: "POST",
    body: JSON.stringify({ add, remove }),
  });
}

// ============================================
// Chat Bridge API
// ============================================

export async function getBridgeConfig() {
  return fetchAPI<{ config: Record<string, unknown> }>("/bridge/config");
}

export async function saveBridgeConfig(config: Record<string, unknown>) {
  return fetchAPI<{ success: boolean; config: Record<string, unknown> }>("/bridge/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

// ============================================
// Cross-Platform Messaging API
// ============================================

export async function sendChatMessage(platform: string, message: string, channel?: string) {
  return fetchAPI<{ success: boolean; results: Array<{ platform: string; sent: boolean }> }>("/chat/send", {
    method: "POST",
    body: JSON.stringify({ platform, message, channel }),
  });
}

export async function sendBroadcast(message: string) {
  return fetchAPI<{ success: boolean; results: Array<{ platform: string; sent: boolean }> }>("/lisa/broadcast", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export async function postTweet(text: string) {
  return fetchAPI<{ success: boolean }>("/x/tweet", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

// ============================================
// Analytics API
// ============================================

export async function getAnalyticsSummary(days = 7) {
  return fetchAPI<{ days: number; revenue: { total: number; change: number }; messages: { total: number; change: number }; followers: { total: number; change: number }; events: { total: number; change: number }; sparkline: number[] }>(`/analytics/summary?days=${days}`);
}

// ============================================
// Polls API
// ============================================

export async function getActivePolls() {
  return fetchAPI<{ polls: Array<{ id: number; question: string; options: Array<{ text: string; votes: number }>; status: string; ends_at: string; total_votes: number; created_at: string }> }>("/polls/active");
}

export async function getPollHistory(limit = 50) {
  return fetchAPI<{ polls: Array<{ id: number; question: string; options: Array<{ text: string; votes: number }>; status: string; ended_at: string; total_votes: number; created_at: string }> }>(`/polls/history?limit=${limit}`);
}

export async function createPoll(question: string, options: string[], durationMinutes = 5) {
  return fetchAPI<{ success: boolean; id?: number }>("/polls", {
    method: "POST",
    body: JSON.stringify({ question, options, durationMinutes }),
  });
}

export async function endPoll(id: number) {
  return fetchAPI<{ success: boolean }>(`/polls/${id}/end`, {
    method: "POST",
  });
}

// ============================================
// Health API
// ============================================

export async function getHealth() {
  return fetchAPI<{ core: { name: string; version: string; status: string; uptime: number }; analytics: { name: string; version: string; status: string } | null }>("/health");
}

// ============================================
// React Hooks
// ============================================

export function useDiscordChannels() {
  const [channels, setChannels] = useState<DiscordChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDiscordChannels();
      if (data.error) {
        setError(data.error);
      } else {
        setChannels(data.channels);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch channels");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { channels, loading, error, refetch };
}

export function useDiscordTextChannels() {
  const { channels, loading, error, refetch } = useDiscordChannels();
  const textChannels = channels.filter((c) => c.type === 0 || c.type === 5);
  return { channels: textChannels, loading, error, refetch };
}

export function useDiscordRoles() {
  const [roles, setRoles] = useState<DiscordRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDiscordRoles();
      if (data.error) {
        setError(data.error);
      } else {
        setRoles(data.roles);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { roles, loading, error, refetch };
}

export function useDiscordServer() {
  const [server, setServer] = useState<DiscordServer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDiscordServer();
      if (data.error) {
        setError(data.error);
      } else {
        setServer(data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { server, loading, error, refetch };
}

export function useSetting<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSetting<T>(key)
      .then((stored) => {
        if (stored !== null) {
          setValue(stored);
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load setting");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  const save = useCallback(
    async (newValue: T) => {
      setSaving(true);
      setError(null);
      try {
        await saveSetting(key, newValue);
        setValue(newValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save setting");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [key]
  );

  return { value, setValue, save, loading, saving, error };
}
