// PRISMAI backend URLs — loaded from CF Pages env vars, fallback to hostnames (not IPs)
const PRISMAI_CORE = "http://bot-service-na-west-01.cybrancee.com:5084";
const PRISMAI_ANALYTICS = "http://cybrancee-bot-na-east-08.cybrancee.com:5018";

const ALLOWED_ORIGINS = [
  "https://prozilli.com",
  "https://www.prozilli.com",
  "https://prozilligaming.com",
  "https://www.prozilligaming.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

// Whitelist of allowed path prefixes that can be proxied to PRISMAI
const ALLOWED_PATH_PREFIXES = [
  "platforms", "live", "chat", "stats", "twitch", "shop", "webhook",
  "vip", "npc-bots", "autopost", "schedules", "blog", "admin",
  "moderation", "commands", "analytics", "stream", "lisa", "tokens",
  "discord", "circuit-breakers", "health", "python-analytics",
  "community-polls", "fivem", "tts", "stt", "alerts",
];

function isAllowedPath(path: string): boolean {
  if (!path || path === "") return true; // root health check is OK
  const firstSegment = path.split("/")[0];
  return ALLOWED_PATH_PREFIXES.includes(firstSegment);
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[2]; // Default to prozilligaming.com

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };
}

// Paths that should never be cached (sensitive/dynamic data)
const SENSITIVE_PATH_PREFIXES = [
  "tokens", "admin", "webhook", "moderation", "commands",
  "vip", "discord", "alerts", "tts", "stt",
];

function isSensitivePath(path: string): boolean {
  if (!path) return false;
  const firstSegment = path.split("/")[0];
  return SENSITIVE_PATH_PREFIXES.includes(firstSegment);
}

function getCacheHeaders(path: string): Record<string, string> {
  if (isSensitivePath(path)) {
    return { "Cache-Control": "no-store" };
  }
  return { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" };
}

async function safeFetch(url: string): Promise<{ ok: boolean; data: any }> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });
    const text = await res.text();
    try {
      return { ok: true, data: JSON.parse(text) };
    } catch {
      return { ok: false, data: { error: "Invalid JSON from server", raw: text.substring(0, 200) } };
    }
  } catch (err: any) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      return { ok: false, data: { error: "Request timeout", message: "Backend did not respond within 10 seconds" } };
    }
    return { ok: false, data: { error: "Connection failed", message: err?.message || "Unknown error" } };
  }
}

export const onRequestOptions: PagesFunction = async (context) => {
  return new Response(null, { headers: getCorsHeaders(context.request.headers.get("Origin")) });
};

export const onRequestGet: PagesFunction = async (context) => {
  const path = (context.params.path as string[])?.join("/") || "";

  // Block requests to non-whitelisted paths (prevents proxying to debug/test endpoints)
  if (!isAllowedPath(path)) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: getCorsHeaders(context.request.headers.get("Origin")) }
    );
  }

  if (path === "health") {
    const [core, analytics] = await Promise.allSettled([
      safeFetch(`${PRISMAI_CORE}/`),
      safeFetch(`${PRISMAI_ANALYTICS}/`),
    ]);

    const coreResult = core.status === "fulfilled" && core.value.ok
      ? core.value.data
      : { status: "offline" };
    const analyticsResult = analytics.status === "fulfilled" && analytics.value.ok
      ? analytics.value.data
      : { status: "offline" };

    return new Response(
      JSON.stringify({ core: coreResult, analytics: analyticsResult }),
      { headers: { ...getCorsHeaders(context.request.headers.get("Origin")), "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } }
    );
  }

  // SSE: Stream chat/stream through without buffering
  if (path === "chat/stream") {
    try {
      const origin = context.request.headers.get("Origin");
      const sseAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[2];
      const res = await fetch(`${PRISMAI_CORE}/chat/stream`, {
        signal: AbortSignal.timeout(10000),
      });
      return new Response(res.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-store",
          "Access-Control-Allow-Origin": sseAllowedOrigin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
        },
      });
    } catch {
      return new Response(
        JSON.stringify({ error: "SSE connection failed" }),
        { status: 502, headers: getCorsHeaders(context.request.headers.get("Origin")) }
      );
    }
  }

  // Route to appropriate backend
  // analytics/* endpoints are on Core (Fastify), python-analytics/* is on Python
  const baseUrl = path.startsWith("python-analytics/") ? PRISMAI_ANALYTICS : PRISMAI_CORE;
  const url = new URL(context.request.url);
  const queryString = url.search;
  const result = await safeFetch(`${baseUrl}/${path}${queryString}`);

  if (result.ok) {
    return new Response(JSON.stringify(result.data), {
      headers: { ...getCorsHeaders(context.request.headers.get("Origin")), ...getCacheHeaders(path) },
    });
  }

  return new Response(
    JSON.stringify(result.data),
    { status: 502, headers: { ...getCorsHeaders(context.request.headers.get("Origin")), "Cache-Control": "no-store" } }
  );
};

async function proxyMutatingRequest(context: Parameters<PagesFunction>[0], method: string) {
  const path = (context.params.path as string[])?.join("/") || "";

  // Block requests to non-whitelisted paths
  if (!isAllowedPath(path)) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: getCorsHeaders(context.request.headers.get("Origin")) }
    );
  }

  try {
    const body = await context.request.text();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const authHeader = context.request.headers.get("Authorization");
    if (authHeader) headers["Authorization"] = authHeader;

    const res = await fetch(`${PRISMAI_CORE}/${path}`, {
      method,
      headers,
      body: body || undefined,
      signal: AbortSignal.timeout(10000),
    });
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...getCorsHeaders(context.request.headers.get("Origin")), "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    const message = (err?.name === "TimeoutError" || err?.name === "AbortError")
      ? "Backend did not respond within 10 seconds"
      : (err?.message || "Unknown");
    return new Response(
      JSON.stringify({ error: "Connection failed", message }),
      { status: 502, headers: { ...getCorsHeaders(context.request.headers.get("Origin")), "Cache-Control": "no-store" } }
    );
  }
}

export const onRequestPost: PagesFunction = async (context) => {
  return proxyMutatingRequest(context, "POST");
};

export const onRequestPut: PagesFunction = async (context) => {
  return proxyMutatingRequest(context, "PUT");
};

export const onRequestDelete: PagesFunction = async (context) => {
  return proxyMutatingRequest(context, "DELETE");
};
