// PRISMAI API client — proxied through Cloudflare Pages Functions at /api/prismai/
const BASE = "/api/prismai";

async function fetchAPI<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

// ─── Types ─────────────────────────────────────────────────────

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

export interface HealthStatus {
  core: { name: string; version: string; status: string; uptime: number };
  analytics: { name: string; version: string | null; status: string } | null;
}

export interface CoreStatus {
  name: string;
  version: string;
  status: string;
  uptime: number;
  timestamp: string;
  busListeners: Record<string, number>;
}

export interface ChatMessage {
  id?: string;
  platform: string;
  username: string;
  message: string;
  timestamp: string;
  badges?: string[];
  color?: string;
}

export interface AnalyticsSummary {
  days: number;
  revenue: { total: number; change: number };
  messages: { total: number; change: number };
  followers: { total: number; change: number };
  events: { total: number; change: number };
  sparkline: number[];
  error?: string;
}

export interface RevenueData {
  days: number;
  totalRevenue: number;
  donations: number;
  subscriptions: number;
  merchandise: number;
  topSupporters: { username: string; total: number; platform: string }[];
  timeline: { date: string; amount: number }[];
}

export interface EngagementData {
  days: number;
  timeline: { date: string; messages: number }[];
  peakHours: { hour: number; messages: number }[];
}

export interface EventsData {
  days: number;
  timeline: { date: string; follow: number; sub: number; donation: number; order: number; raid: number }[];
  recent: { type: string; username: string; platform: string; timestamp: string; amount?: number; message?: string }[];
}

export interface AutopostConfig {
  enabled: boolean;
  interval: number;
  timezone: string;
  maxDailyPosts: Record<string, number>;
  platforms: string[];
  contentTypes: string[];
  scheduler: { running: boolean; nextRun?: string; paused?: boolean };
  [key: string]: unknown;
}

export interface AutopostPost {
  id: number;
  platform: string;
  postType: string;
  caption: string;
  hashtags?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: string;
  scheduledAt?: string;
  postedAt?: string;
  createdAt?: string;
  error?: string;
  aiGenerated?: boolean;
  engagement?: { likes?: number; comments?: number; shares?: number };
  [key: string]: unknown;
}

export interface AutopostStats {
  totalPosted: number;
  totalFailed: number;
  totalScheduled: number;
  scheduler: { running: boolean; nextRun?: string; paused?: boolean };
  byPlatform: Record<string, number>;
}

export interface VideoGenerationResult {
  success: boolean;
  image?: { url: string; source: string };
  video?: { url: string; generationId: string; source: string };
  motionPrompt?: string;
  error?: string;
}

export interface ModerationConfig {
  enabled: boolean;
  linkFilter: boolean;
  spamFilter: boolean;
  capsFilter: boolean;
  bannedWords: string[];
  [key: string]: unknown;
}

export interface LevelsConfig {
  enabled: boolean;
  xpPerMessage: number;
  xpCooldown: number;
  [key: string]: unknown;
}

export interface WelcomeConfig {
  enabled: boolean;
  channelId: string;
  message: string;
  [key: string]: unknown;
}

export interface NpcBotStatus {
  name: string;
  character: string;
  online: boolean;
  [key: string]: unknown;
}

export interface DiscordServer {
  connected: boolean;
  id: string;
  name: string;
  memberCount: number;
  icon: string;
  [key: string]: unknown;
}

export interface CircuitBreakerStatus {
  breakers: Record<string, { state: string; failures: number; lastFailure?: string }>;
}

// ─── Fetchers ──────────────────────────────────────────────────

export const api = {
  // Core
  status: () => fetchAPI<CoreStatus>(""),
  health: () => fetchAPI<HealthStatus>("health"),
  circuitBreakers: () => fetchAPI<CircuitBreakerStatus>("circuit-breakers"),

  // Live
  live: () => fetchAPI<LiveStatus>("live"),
  platforms: () => fetchAPI<{ platforms: PlatformStatus[] }>("platforms"),

  // Stats
  stats: () => fetchAPI<Record<string, unknown>>("stats"),

  // Chat
  chat: (limit = 50, platform?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (platform) params.set("platform", platform);
    return fetchAPI<{ messages: ChatMessage[] }>(`chat?${params}`);
  },

  // Analytics
  analyticsSummary: (days = 7) => fetchAPI<AnalyticsSummary>(`analytics/summary?days=${days}`),
  analyticsRevenue: (days = 7) => fetchAPI<RevenueData>(`analytics/revenue?days=${days}`),
  analyticsEngagement: (days = 7) => fetchAPI<EngagementData>(`analytics/engagement?days=${days}`),
  analyticsEvents: (days = 7) => fetchAPI<EventsData>(`analytics/events?days=${days}`),

  // Autopost
  autopostConfig: () => fetchAPI<AutopostConfig>("autopost/config"),
  autopostSave: (config: Partial<AutopostConfig>) =>
    fetchAPI<{ success: boolean; config: AutopostConfig }>("autopost/config", { method: "POST", body: JSON.stringify(config) }),
  autopostHistory: (limit = 50, platform?: string, status?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (platform) params.set("platform", platform);
    if (status) params.set("status", status);
    return fetchAPI<{ history: AutopostPost[] }>(`autopost/history?${params}`);
  },
  autopostQueue: (limit = 50, platform?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (platform) params.set("platform", platform);
    return fetchAPI<{ queue: AutopostPost[] }>(`autopost/queue?${params}`);
  },
  autopostStats: () => fetchAPI<AutopostStats>("autopost/stats"),
  autopostSchedulerStatus: () => fetchAPI<{ running: boolean; nextRun?: string; paused?: boolean }>("autopost/scheduler/status"),
  autopostSchedule: (post: { platform: string; postType: string; caption?: string; hashtags?: string; imageUrl?: string; videoUrl?: string; imagePrompt?: string; scheduledAt: string; template?: string }) =>
    fetchAPI<{ success: boolean; post: AutopostPost }>("autopost/schedule", { method: "POST", body: JSON.stringify(post) }),
  autopostGenerate: (opts: { category?: string; platform: string; context?: string; captionPrompt?: string }) =>
    fetchAPI<{ success: boolean; caption?: string; hashtags?: string; imageUrl?: string; error?: string }>("autopost/generate", { method: "POST", body: JSON.stringify(opts) }),
  autopostPostNow: (post: { platform: string; caption?: string; hashtags?: string; imageUrl?: string; videoUrl?: string; imagePrompt?: string; postType?: string; template?: string }) =>
    fetchAPI<{ success: boolean; error?: string }>("autopost/post-now", { method: "POST", body: JSON.stringify(post) }),
  autopostGenerateVideo: (opts: { imagePrompt?: string; imageUrl?: string; motionPrompt?: string; platform?: string }) =>
    fetchAPI<VideoGenerationResult>("autopost/generate-video", { method: "POST", body: JSON.stringify(opts) }),
  autopostCancel: (id: number) =>
    fetchAPI<{ success: boolean }>("autopost/" + id, { method: "DELETE" }),
  autopostPause: () =>
    fetchAPI<{ success: boolean }>("autopost/scheduler/pause", { method: "POST" }),
  autopostResume: () =>
    fetchAPI<{ success: boolean }>("autopost/scheduler/resume", { method: "POST" }),

  // Moderation
  moderationConfig: () => fetchAPI<ModerationConfig>("moderation/config"),
  moderationSave: (config: Partial<ModerationConfig>) =>
    fetchAPI<{ ok: boolean }>("moderation/config", { method: "POST", body: JSON.stringify(config) }),

  // Levels
  levelsConfig: () => fetchAPI<LevelsConfig>("levels/config"),
  levelsSave: (config: Partial<LevelsConfig>) =>
    fetchAPI<{ ok: boolean }>("levels/config", { method: "POST", body: JSON.stringify(config) }),
  levelsLeaderboard: (limit = 20) => fetchAPI<{ leaderboard: unknown[] }>(`levels/leaderboard?limit=${limit}`),

  // Welcome
  welcomeConfig: () => fetchAPI<WelcomeConfig>("welcome/config"),
  welcomeSave: (config: Partial<WelcomeConfig>) =>
    fetchAPI<{ ok: boolean }>("welcome/config", { method: "POST", body: JSON.stringify(config) }),
  welcomeTest: () =>
    fetchAPI<{ ok: boolean }>("welcome/test", { method: "POST" }),

  // Discord
  discordServer: () => fetchAPI<DiscordServer>("discord/server"),
  discordChannels: () => fetchAPI<{ channels: unknown[] }>("discord/channels"),
  discordRoles: () => fetchAPI<{ roles: unknown[] }>("discord/roles"),
  discordMembers: (limit = 20) => fetchAPI<{ members: unknown[] }>(`discord/members?limit=${limit}`),
  discordMemberCount: () => fetchAPI<{ count: number }>("discord/members/count"),

  // NPC Bots
  npcBotStatus: () => fetchAPI<NpcBotStatus[]>("npc-bots/status"),

  // Commands
  commands: () => fetchAPI<{ commands: unknown[] }>("commands"),
  commandCreate: (cmd: Record<string, unknown>) =>
    fetchAPI<{ ok: boolean }>("commands", { method: "POST", body: JSON.stringify(cmd) }),
  commandUpdate: (id: string, cmd: Record<string, unknown>) =>
    fetchAPI<{ ok: boolean }>(`commands/${id}`, { method: "PUT", body: JSON.stringify(cmd) }),
  commandDelete: (id: string) =>
    fetchAPI<{ ok: boolean }>(`commands/${id}`, { method: "DELETE" }),

  // Automations
  automations: () => fetchAPI<{ automations: unknown[] }>("automations"),

  // Tickets
  tickets: (status?: string) => {
    const params = status ? `?status=${status}` : "";
    return fetchAPI<{ tickets: unknown[] }>(`tickets${params}`);
  },

  // Twitch
  twitchClips: (limit = 10) => fetchAPI<{ clips: unknown[] }>(`twitch/clips?limit=${limit}`),
  twitchVods: (limit = 10) => fetchAPI<{ vods: unknown[] }>(`twitch/vods?limit=${limit}`),

  // Shop
  shopProducts: () => fetchAPI<{ products: unknown[] }>("shop/products"),

  // Chat send
  chatSend: (platform: string, message: string) =>
    fetchAPI<{ ok: boolean }>("chat/send", { method: "POST", body: JSON.stringify({ platform, message }) }),

  // LISA
  lisaAsk: (message: string, context?: Record<string, unknown>) =>
    fetchAPI<{ response: string }>("lisa/ask", { method: "POST", body: JSON.stringify({ message, ...context }) }),

  // Settings
  settings: () => fetchAPI<Record<string, unknown>>("settings"),
  settingGet: (key: string) => fetchAPI<{ value: unknown }>(`settings/${key}`),
  settingSave: (key: string, value: unknown) =>
    fetchAPI<{ ok: boolean }>(`settings/${key}`, { method: "POST", body: JSON.stringify({ value }) }),
};
