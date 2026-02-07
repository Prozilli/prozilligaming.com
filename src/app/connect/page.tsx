"use client";

import { useState } from "react";

// Complete scope definitions for each platform
const PLATFORM_SCOPES = {
  twitch: {
    name: "Twitch",
    icon: "🟣",
    color: "#9146FF",
    authUrl: "https://id.twitch.tv/oauth2/authorize",
    clientId: "khtgcmrdffyautneihm3gpgpcwgh8q",
    note: "",
    requiresPKCE: false,
    scopes: [
      // Channel scopes
      { id: "channel:read:subscriptions", desc: "View subscriber list", category: "Channel" },
      { id: "channel:read:redemptions", desc: "View Channel Points redemptions", category: "Channel" },
      { id: "channel:manage:redemptions", desc: "Manage Channel Points rewards", category: "Channel" },
      { id: "channel:read:polls", desc: "View polls", category: "Channel" },
      { id: "channel:manage:polls", desc: "Create and manage polls", category: "Channel" },
      { id: "channel:read:predictions", desc: "View predictions", category: "Channel" },
      { id: "channel:manage:predictions", desc: "Create and manage predictions", category: "Channel" },
      { id: "channel:read:hype_train", desc: "View Hype Train status", category: "Channel" },
      { id: "channel:read:goals", desc: "View Creator Goals", category: "Channel" },
      { id: "channel:manage:broadcast", desc: "Edit stream info (title, game, tags)", category: "Channel" },
      { id: "channel:read:ads", desc: "View ad schedule", category: "Channel" },
      { id: "channel:manage:ads", desc: "Run and schedule ads", category: "Channel" },
      { id: "channel:edit:commercial", desc: "Run commercials", category: "Channel" },
      { id: "channel:read:editors", desc: "View channel editors", category: "Channel" },
      { id: "channel:read:vips", desc: "View VIP list", category: "Channel" },
      { id: "channel:manage:vips", desc: "Add/remove VIPs", category: "Channel" },
      { id: "channel:manage:moderators", desc: "Add/remove moderators", category: "Channel" },
      { id: "channel:manage:raids", desc: "Start and cancel raids", category: "Channel" },
      { id: "channel:read:stream_key", desc: "View stream key", category: "Channel" },
      { id: "channel:manage:schedule", desc: "Edit stream schedule", category: "Channel" },
      { id: "channel:manage:videos", desc: "Delete videos", category: "Channel" },
      { id: "channel:read:charity", desc: "View charity campaigns", category: "Channel" },
      // Chat scopes
      { id: "chat:read", desc: "Read chat messages (IRC)", category: "Chat", recommended: "bot" },
      { id: "chat:edit", desc: "Send chat messages (IRC)", category: "Chat", recommended: "bot" },
      { id: "user:read:chat", desc: "Read chat messages (API)", category: "Chat" },
      { id: "user:write:chat", desc: "Send chat messages (API)", category: "Chat", recommended: "bot" },
      { id: "user:bot", desc: "Appear as bot user in chat", category: "Chat", recommended: "bot" },
      { id: "channel:bot", desc: "Join channel as bot", category: "Chat", recommended: "bot" },
      // Moderation scopes
      { id: "channel:moderate", desc: "Perform moderation actions", category: "Moderation" },
      { id: "moderator:read:followers", desc: "View follower list", category: "Moderation" },
      { id: "moderator:read:chatters", desc: "View chatter list", category: "Moderation" },
      { id: "moderator:manage:chat_messages", desc: "Delete chat messages", category: "Moderation" },
      { id: "moderator:manage:banned_users", desc: "Ban/unban users", category: "Moderation" },
      { id: "moderator:read:banned_users", desc: "View ban list", category: "Moderation" },
      { id: "moderator:manage:chat_settings", desc: "Manage chat settings (slow mode, etc)", category: "Moderation" },
      { id: "moderator:read:chat_settings", desc: "View chat settings", category: "Moderation" },
      { id: "moderator:manage:announcements", desc: "Send announcements", category: "Moderation" },
      { id: "moderator:manage:shoutouts", desc: "Send shoutouts", category: "Moderation" },
      { id: "moderator:read:shoutouts", desc: "View shoutouts", category: "Moderation" },
      { id: "moderator:manage:automod", desc: "Manage AutoMod held messages", category: "Moderation" },
      { id: "moderator:read:automod_settings", desc: "View AutoMod settings", category: "Moderation" },
      { id: "moderator:manage:automod_settings", desc: "Edit AutoMod settings", category: "Moderation" },
      { id: "moderator:read:blocked_terms", desc: "View blocked terms", category: "Moderation" },
      { id: "moderator:manage:blocked_terms", desc: "Manage blocked terms", category: "Moderation" },
      { id: "moderator:manage:shield_mode", desc: "Toggle Shield Mode", category: "Moderation" },
      { id: "moderator:read:shield_mode", desc: "View Shield Mode status", category: "Moderation" },
      { id: "moderator:manage:warnings", desc: "Warn users", category: "Moderation" },
      { id: "moderator:read:warnings", desc: "View warnings", category: "Moderation" },
      { id: "moderator:read:suspicious_users", desc: "View suspicious users", category: "Moderation" },
      { id: "moderator:manage:suspicious_users", desc: "Update suspicious user status", category: "Moderation" },
      { id: "moderator:read:unban_requests", desc: "View unban requests", category: "Moderation" },
      { id: "moderator:manage:unban_requests", desc: "Manage unban requests", category: "Moderation" },
      // User scopes
      { id: "user:read:email", desc: "View email address", category: "User" },
      { id: "user:read:follows", desc: "View followed channels", category: "User" },
      { id: "user:read:subscriptions", desc: "View subscriptions", category: "User" },
      { id: "user:read:blocked_users", desc: "View blocked users", category: "User" },
      { id: "user:manage:blocked_users", desc: "Block/unblock users", category: "User" },
      { id: "user:read:broadcast", desc: "View stream configuration", category: "User" },
      { id: "user:edit:broadcast", desc: "Edit stream configuration", category: "User" },
      { id: "user:read:emotes", desc: "View available emotes", category: "User" },
      { id: "user:manage:chat_color", desc: "Change chat color", category: "User" },
      { id: "user:read:moderated_channels", desc: "View moderated channels", category: "User" },
      { id: "user:read:whispers", desc: "Receive whispers", category: "User" },
      { id: "user:manage:whispers", desc: "Send whispers", category: "User" },
      // Other
      { id: "bits:read", desc: "View Bits leaderboard", category: "Other" },
      { id: "clips:edit", desc: "Create clips", category: "Other" },
      { id: "analytics:read:extensions", desc: "View extension analytics", category: "Other" },
      { id: "analytics:read:games", desc: "View game analytics", category: "Other" },
    ]
  },
  youtube: {
    name: "YouTube",
    icon: "🔴",
    color: "#FF0000",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    clientId: "527131954672-hc69an9k03tanh0vjqqarkd2ru4atgc7.apps.googleusercontent.com",
    note: "App is in testing mode - add test users in Google Cloud Console first",
    requiresPKCE: false,
    scopes: [
      { id: "https://www.googleapis.com/auth/youtube.readonly", desc: "View your YouTube account (videos, playlists, etc)", category: "Read" },
      { id: "https://www.googleapis.com/auth/youtube", desc: "Manage your YouTube account", category: "Manage" },
      { id: "https://www.googleapis.com/auth/youtube.force-ssl", desc: "View and manage videos, comments, ratings (requires SSL)", category: "Manage", recommended: "bot" },
      { id: "https://www.googleapis.com/auth/youtube.upload", desc: "Upload videos", category: "Manage" },
      { id: "https://www.googleapis.com/auth/youtube.channel-memberships.creator", desc: "View channel members and their levels", category: "Read" },
      { id: "https://www.googleapis.com/auth/youtubepartner", desc: "View and manage YouTube partner assets", category: "Partner" },
      { id: "https://www.googleapis.com/auth/youtubepartner-channel-audit", desc: "View private channel info during partner audit", category: "Partner" },
    ]
  },
  kick: {
    name: "Kick",
    icon: "🟢",
    color: "#53FC18",
    authUrl: "https://id.kick.com/oauth/authorize",
    clientId: "01JTS911DF9KYBZSZ7VX4B7V3S",
    note: "",
    requiresPKCE: true,
    scopes: [
      { id: "user:read", desc: "View user info (username, ID)", category: "User" },
      { id: "channel:read", desc: "View channel info (description, category)", category: "Channel" },
      { id: "channel:write", desc: "Update stream title, category", category: "Channel" },
      { id: "channel:rewards:read", desc: "View Channel Points rewards", category: "Channel" },
      { id: "channel:rewards:write", desc: "Manage Channel Points rewards", category: "Channel" },
      { id: "chat:write", desc: "Send chat messages", category: "Chat", recommended: "bot" },
      { id: "streamkey:read", desc: "View stream key", category: "Channel" },
      { id: "events:subscribe", desc: "Subscribe to events (chat, follows, subs)", category: "Events", recommended: "both" },
      { id: "moderation:ban", desc: "Ban/unban users", category: "Moderation" },
      { id: "moderation:chat_message:manage", desc: "Delete chat messages", category: "Moderation" },
      { id: "kicks:read", desc: "View KICKS leaderboards", category: "Other" },
    ]
  },
  trovo: {
    name: "Trovo",
    icon: "🟡",
    color: "#19D65C",
    authUrl: "https://open.trovo.live/page/login.html",
    clientId: "aeaf81c93a5f587c797cc9bde7ffa28e",
    note: "",
    requiresPKCE: false,
    scopes: [
      { id: "user_details_self", desc: "View email and user profile", category: "User" },
      { id: "channel_details_self", desc: "View channel details including stream key", category: "Channel" },
      { id: "channel_update_self", desc: "Update channel settings", category: "Channel" },
      { id: "channel_subscriptions", desc: "View subscriber list", category: "Channel" },
      { id: "chat_send_self", desc: "Send chat messages as yourself", category: "Chat", recommended: "bot" },
      { id: "send_to_my_channel", desc: "Send messages to your channel", category: "Chat", recommended: "bot" },
      { id: "manage_messages", desc: "Delete messages and run chat commands", category: "Moderation" },
    ]
  },
  discord: {
    name: "Discord",
    icon: "💬",
    color: "#5865F2",
    authUrl: "https://discord.com/api/oauth2/authorize",
    clientId: "1445478850539683890",
    note: "Bot is already connected via token. OAuth is for user authorization only.",
    requiresPKCE: false,
    scopes: [
      // User scopes
      { id: "identify", desc: "View username, avatar, banner, locale", category: "User" },
      { id: "email", desc: "View email address", category: "User" },
      { id: "connections", desc: "View linked accounts (Twitch, YouTube, Spotify, etc)", category: "User" },
      { id: "openid", desc: "OpenID Connect authentication", category: "User" },
      // Guild scopes
      { id: "guilds", desc: "View list of servers user is in", category: "Guilds" },
      { id: "guilds.join", desc: "Add user to servers (requires bot in server)", category: "Guilds" },
      { id: "guilds.members.read", desc: "View member info (nickname, roles, etc)", category: "Guilds" },
      { id: "role_connections.write", desc: "Update linked roles metadata", category: "Guilds" },
      // Bot scopes
      { id: "bot", desc: "Add bot to server with permissions", category: "Bot", recommended: "bot" },
      { id: "applications.commands", desc: "Register and use slash commands", category: "Bot", recommended: "bot" },
      { id: "webhook.incoming", desc: "Create webhook and get URL", category: "Bot" },
    ]
  },
  facebook: {
    name: "Facebook",
    icon: "🔵",
    color: "#1877F2",
    authUrl: "https://www.facebook.com/v21.0/dialog/oauth",
    clientId: "788626606846793",
    note: "App is in development mode. Requires app review for public access.",
    requiresPKCE: false,
    scopes: [
      // Pages
      { id: "pages_show_list", desc: "View list of Pages you manage", category: "Pages", recommended: "broadcaster" },
      { id: "pages_read_engagement", desc: "Read engagement data on your Pages", category: "Pages", recommended: "broadcaster" },
      { id: "pages_manage_posts", desc: "Create and manage Page posts", category: "Pages" },
      { id: "pages_read_user_content", desc: "Read user-generated content on your Pages", category: "Pages" },
      // Content
      { id: "pages_read_user_content", desc: "Read user-generated content on your Pages", category: "Content" },
      { id: "pages_manage_engagement", desc: "Manage comments and reactions on your Pages", category: "Content" },
      // Messaging
      { id: "pages_messaging", desc: "Send and receive messages via Messenger", category: "Messaging" },
    ]
  },
  instagram: {
    name: "Instagram",
    icon: "📸",
    color: "#E4405F",
    authUrl: "https://www.facebook.com/v21.0/dialog/oauth",
    clientId: "788626606846793",
    note: "Uses Facebook Login. App is in development mode.",
    requiresPKCE: false,
    scopes: [
      { id: "instagram_basic", desc: "View Instagram profile info and media", category: "Basic", recommended: "broadcaster" },
      { id: "instagram_manage_comments", desc: "Read and manage comments on your posts", category: "Basic", recommended: "broadcaster" },
      { id: "instagram_manage_insights", desc: "View insights and analytics for your Instagram", category: "Analytics" },
    ]
  },
  x: {
    name: "X (Twitter)",
    icon: "✖",
    color: "#000000",
    authUrl: "https://twitter.com/i/oauth2/authorize",
    clientId: "b2Q0dmxsWUhQMGk5ZTV6S1hqVTY6MTpjaQ",
    note: "",
    requiresPKCE: true,
    scopes: [
      // Read
      { id: "tweet.read", desc: "View tweets, timeline, lists, and spaces", category: "Read", recommended: "both" },
      { id: "users.read", desc: "View user profile information", category: "Read", recommended: "both" },
      { id: "follows.read", desc: "View who you follow and who follows you", category: "Read" },
      { id: "list.read", desc: "View your lists", category: "Read" },
      { id: "space.read", desc: "View spaces", category: "Read" },
      { id: "mute.read", desc: "View muted accounts", category: "Read" },
      { id: "like.read", desc: "View liked tweets", category: "Read" },
      { id: "block.read", desc: "View blocked accounts", category: "Read" },
      { id: "bookmark.read", desc: "View bookmarked tweets", category: "Read" },
      // Write
      { id: "tweet.write", desc: "Post, retweet, and delete tweets", category: "Write", recommended: "both" },
      { id: "follows.write", desc: "Follow and unfollow accounts", category: "Write" },
      { id: "list.write", desc: "Create and manage lists", category: "Write" },
      { id: "mute.write", desc: "Mute and unmute accounts", category: "Write" },
      { id: "like.write", desc: "Like and unlike tweets", category: "Write" },
      { id: "block.write", desc: "Block and unblock accounts", category: "Write" },
      { id: "bookmark.write", desc: "Bookmark and remove bookmarks", category: "Write" },
      // DMs
      { id: "dm.read", desc: "Read direct messages", category: "Direct Messages" },
      { id: "dm.write", desc: "Send direct messages", category: "Direct Messages" },
      // Auth
      { id: "offline.access", desc: "Stay connected (refresh token)", category: "Auth", recommended: "both" },
    ]
  }
};

const API_BASE = "https://api.prozilli.com";

type PlatformKey = keyof typeof PLATFORM_SCOPES;

export default function ConnectPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [selectedScopes, setSelectedScopes] = useState<Record<string, Set<string>>>({});
  const [role, setRole] = useState<"broadcaster" | "bot">("broadcaster");

  const toggleScope = (platform: string, scopeId: string) => {
    setSelectedScopes(prev => {
      const platformScopes = new Set(prev[platform] || []);
      if (platformScopes.has(scopeId)) {
        platformScopes.delete(scopeId);
      } else {
        platformScopes.add(scopeId);
      }
      return { ...prev, [platform]: platformScopes };
    });
  };

  const selectRecommended = (platform: PlatformKey, forRole: "broadcaster" | "bot") => {
    const platformData = PLATFORM_SCOPES[platform];
    const recommended = new Set<string>();

    platformData.scopes.forEach(scope => {
      if (scope.recommended === forRole || scope.recommended === "both") {
        recommended.add(scope.id);
      }
    });

    // Add some sensible defaults
    if (forRole === "broadcaster") {
      if (platform === "twitch") {
        recommended.add("channel:read:subscriptions");
        recommended.add("channel:read:redemptions");
        recommended.add("moderator:read:followers");
        recommended.add("bits:read");
        recommended.add("channel:read:hype_train");
      }
    }

    setSelectedScopes(prev => ({ ...prev, [platform]: recommended }));
  };

  const startOAuth = async (platform: PlatformKey) => {
    const platformData = PLATFORM_SCOPES[platform];
    const scopes = selectedScopes[platform];

    if (!scopes || scopes.size === 0) {
      alert("Please select at least one scope");
      return;
    }

    const redirectUri = `${API_BASE}/callback/${platform}`;
    const state = `${role}_${Date.now()}`;
    const scopeString = Array.from(scopes).join(" ");

    let authUrl = "";

    switch (platform) {
      case "twitch":
        authUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${state}&force_verify=true`;
        break;

      case "youtube":
        authUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${state}&access_type=offline&prompt=consent`;
        break;

      case "kick": {
        // Kick requires PKCE with S256
        // Embed verifier in state (KV has eventual consistency issues)
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateS256Challenge(codeVerifier);
        const kickState = `${state}|${codeVerifier}`;
        const kickUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${encodeURIComponent(kickState)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
        window.open(kickUrl, `oauth_${platform}`, "width=600,height=800,left=200,top=50");
        return;
      }

      case "trovo":
        // Trovo scopes are joined with +
        const trovoScopes = Array.from(scopes).join("+");
        authUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${trovoScopes}&state=${state}`;
        break;

      case "discord": {
        // Discord supports combined bot + user auth in a single URL
        const hasBot = scopes.has("bot");
        const params = new URLSearchParams({
          client_id: platformData.clientId,
          scope: scopeString,
        });
        if (hasBot) {
          params.set("permissions", "277025770560");
        }
        // Always include redirect_uri + response_type for user auth callback
        params.set("redirect_uri", redirectUri);
        params.set("response_type", "code");
        params.set("state", state);
        authUrl = `${platformData.authUrl}?${params.toString()}`;
        break;
      }

      case "x": {
        // X uses PKCE S256 — embed verifier in state (same pattern as Kick)
        // X Developer Portal has callback registered as /callback/twitter
        const xRedirectUri = `${API_BASE}/callback/twitter`;
        const xVerifier = generateCodeVerifier();
        const xChallenge = await generateS256Challenge(xVerifier);
        const xState = `${state}|${xVerifier}`;
        const xUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(xRedirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${encodeURIComponent(xState)}&code_challenge=${xChallenge}&code_challenge_method=S256`;
        window.open(xUrl, `oauth_${platform}`, "width=600,height=800,left=200,top=50");
        return;
      }

      case "facebook":
      case "instagram":
        authUrl = `${platformData.authUrl}?client_id=${platformData.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${state}`;
        break;
    }

    if (authUrl) {
      window.open(authUrl, `oauth_${platform}`, "width=600,height=800,left=200,top=50");
    }
  };

  const generateCodeVerifier = (): string => {
    // RFC 7636: 43-128 chars from unreserved set [A-Z/a-z/0-9/-._~]
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const generateS256Challenge = async (verifier: string): Promise<string> => {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const platform = selectedPlatform ? PLATFORM_SCOPES[selectedPlatform] : null;
  const currentScopes = selectedPlatform ? (selectedScopes[selectedPlatform] || new Set()) : new Set();

  // Group scopes by category
  const scopesByCategory: Record<string, typeof PLATFORM_SCOPES.twitch.scopes> = {};
  if (platform) {
    platform.scopes.forEach(scope => {
      if (!scopesByCategory[scope.category]) {
        scopesByCategory[scope.category] = [];
      }
      scopesByCategory[scope.category].push(scope);
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#001c3f]/20 to-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <h1 className="text-2xl font-bold">🔗 Platform OAuth Configuration</h1>
          <p className="text-gray-400 text-sm mt-1">Select scopes for each platform connection</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Role Selection */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setRole("broadcaster")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              role === "broadcaster"
                ? "bg-[#910000] text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            👤 Broadcaster (Pro)
          </button>
          <button
            onClick={() => setRole("bot")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              role === "bot"
                ? "bg-[#c4a265] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            🤖 Bot (LISA)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Platforms</h2>
            {(Object.entries(PLATFORM_SCOPES) as [PlatformKey, typeof PLATFORM_SCOPES.twitch][]).map(([key, p]) => (
              <button
                key={key}
                onClick={() => setSelectedPlatform(key)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  selectedPlatform === key
                    ? "bg-white/10 border-2"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
                style={{ borderColor: selectedPlatform === key ? p.color : undefined }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${p.color}30` }}
                >
                  {p.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">
                    {selectedScopes[key]?.size || 0} scopes selected
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Scope Selection */}
          <div className="lg:col-span-2">
            {platform && selectedPlatform ? (
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <h2 className="text-lg sm:text-xl font-bold">{platform.name} Scopes</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const allScopes = new Set(platform.scopes.map(s => s.id));
                        setSelectedScopes(prev => ({ ...prev, [selectedPlatform]: allScopes }));
                      }}
                      className="flex-1 sm:flex-none px-3 py-2 bg-[#910000]/20 text-[#910000] rounded text-xs sm:text-sm font-medium hover:bg-[#910000]/30"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => selectRecommended(selectedPlatform, role)}
                      className="flex-1 sm:flex-none px-3 py-2 bg-[#c4a265]/20 text-[#c4a265] rounded text-xs sm:text-sm font-medium hover:bg-[#c4a265]/30"
                    >
                      Recommended
                    </button>
                    <button
                      onClick={() => setSelectedScopes(prev => ({ ...prev, [selectedPlatform]: new Set() }))}
                      className="px-3 py-2 bg-white/10 text-gray-400 rounded text-xs sm:text-sm hover:bg-white/20"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {platform.note && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-500 text-sm">
                    ⚠️ {platform.note}
                  </div>
                )}

                <div className="space-y-6 max-h-[60vh] sm:max-h-[500px] overflow-y-auto pr-2 -mr-2">
                  {Object.entries(scopesByCategory).map(([category, scopes]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {scopes.map(scope => (
                          <label
                            key={scope.id}
                            className={`flex items-start gap-3 p-3 sm:p-3 rounded-lg cursor-pointer transition-all touch-manipulation ${
                              currentScopes.has(scope.id)
                                ? "bg-white/10 border border-white/20"
                                : "bg-white/5 border border-transparent hover:bg-white/8"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={currentScopes.has(scope.id)}
                              onChange={() => toggleScope(selectedPlatform, scope.id)}
                              className="mt-0.5 w-5 h-5 sm:w-4 sm:h-4 rounded border-gray-600 text-[#910000] focus:ring-[#910000] flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                <code className="text-[10px] sm:text-xs bg-black/30 px-1.5 py-0.5 rounded text-gray-300 break-all">
                                  {scope.id}
                                </code>
                                {scope.recommended && (
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                                    scope.recommended === "bot"
                                      ? "bg-[#c4a265]/20 text-[#c4a265]"
                                      : "bg-[#910000]/20 text-[#910000]"
                                  }`}>
                                    {scope.recommended === "bot" ? "Bot" : scope.recommended === "both" ? "Both" : "Broadcaster"}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-400 mt-1">{scope.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connect Button */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={() => startOAuth(selectedPlatform)}
                    disabled={currentScopes.size === 0}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: platform.color,
                      color: selectedPlatform === "kick" || selectedPlatform === "trovo" ? "#000" : "#fff"
                    }}
                  >
                    Connect {platform.name} as {role === "broadcaster" ? "Broadcaster" : "Bot"}
                    {currentScopes.size > 0 && ` (${currentScopes.size} scopes)`}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center">
                <div className="text-4xl mb-4">👈</div>
                <p className="text-gray-400">Select a platform to configure scopes</p>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="font-bold mb-3">🔍 Connection Status</h3>
          <a
            href="http://5.78.106.41:5084/platforms"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#910000] rounded-lg text-sm font-semibold hover:bg-[#a10000] transition-colors"
          >
            View PRISMAI Status →
          </a>
        </div>
      </div>
    </main>
  );
}
