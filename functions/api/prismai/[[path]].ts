const PRISMAI_CORE = "http://prismai-core.prozilli.com:5084";
const PRISMAI_ANALYTICS = "http://prismai-analytics.prozilli.com:5018";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

async function safeFetch(url: string): Promise<{ ok: boolean; data: any }> {
  try {
    const res = await fetch(url);
    const text = await res.text();
    try {
      return { ok: true, data: JSON.parse(text) };
    } catch {
      return { ok: false, data: { error: "Invalid JSON from server", raw: text.substring(0, 200) } };
    }
  } catch (err: any) {
    return { ok: false, data: { error: "Connection failed", message: err?.message || "Unknown error" } };
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction = async (context) => {
  const path = (context.params.path as string[])?.join("/") || "";

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
      { headers: CORS_HEADERS }
    );
  }

  // Route to appropriate backend
  const baseUrl = path.startsWith("analytics/") ? PRISMAI_ANALYTICS : PRISMAI_CORE;
  const result = await safeFetch(`${baseUrl}/${path}`);

  if (result.ok) {
    return new Response(JSON.stringify(result.data), { headers: CORS_HEADERS });
  }

  return new Response(
    JSON.stringify(result.data),
    { status: 502, headers: CORS_HEADERS }
  );
};

export const onRequestPost: PagesFunction = async (context) => {
  const path = (context.params.path as string[])?.join("/") || "";

  try {
    const body = await context.request.text();
    const res = await fetch(`${PRISMAI_CORE}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const text = await res.text();
    try {
      return new Response(text, { status: res.status, headers: CORS_HEADERS });
    } catch {
      return new Response(text, { status: res.status, headers: CORS_HEADERS });
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Connection failed", message: err?.message || "Unknown" }),
      { status: 502, headers: CORS_HEADERS }
    );
  }
};
