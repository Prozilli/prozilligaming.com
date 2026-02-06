import { NextResponse } from "next/server";

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const BROADCASTER_LOGIN = "prozilligaming";

// Cache the app access token
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAppAccessToken(): Promise<string | null> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 300000) {
    return cachedToken.token;
  }

  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    console.error("Missing Twitch credentials");
    return null;
  }

  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      { method: "POST" }
    );

    if (!response.ok) {
      console.error("Failed to get Twitch token:", await response.text());
      return null;
    }

    const data = await response.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return cachedToken.token;
  } catch (error) {
    console.error("Error getting Twitch token:", error);
    return null;
  }
}

async function getBroadcasterId(token: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/users?login=${BROADCASTER_LOGIN}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": TWITCH_CLIENT_ID!,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to get broadcaster ID:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.data?.[0]?.id || null;
  } catch (error) {
    console.error("Error getting broadcaster ID:", error);
    return null;
  }
}

async function getStreamSchedule(token: string, broadcasterId: string) {
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcasterId}&first=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": TWITCH_CLIENT_ID!,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (response.status === 404) {
      // No schedule set up
      return { segments: [] };
    }

    if (!response.ok) {
      console.error("Failed to get schedule:", await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting schedule:", error);
    return null;
  }
}

async function getLiveStatus(token: string, broadcasterId: string) {
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${broadcasterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": TWITCH_CLIENT_ID!,
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      return { isLive: false };
    }

    const data = await response.json();
    const stream = data.data?.[0];

    if (stream) {
      return {
        isLive: true,
        title: stream.title,
        gameName: stream.game_name,
        viewerCount: stream.viewer_count,
        startedAt: stream.started_at,
        thumbnailUrl: stream.thumbnail_url,
      };
    }

    return { isLive: false };
  } catch (error) {
    console.error("Error getting live status:", error);
    return { isLive: false };
  }
}

export async function GET() {
  try {
    const token = await getAppAccessToken();
    if (!token) {
      return NextResponse.json(
        { error: "Failed to authenticate with Twitch" },
        { status: 500 }
      );
    }

    const broadcasterId = await getBroadcasterId(token);
    if (!broadcasterId) {
      return NextResponse.json(
        { error: "Broadcaster not found" },
        { status: 404 }
      );
    }

    // Fetch both live status and schedule in parallel
    const [liveStatus, scheduleData] = await Promise.all([
      getLiveStatus(token, broadcasterId),
      getStreamSchedule(token, broadcasterId),
    ]);

    // Find the next upcoming stream segment
    const now = new Date();
    const segments = scheduleData?.data?.segments || [];
    const nextStream = segments.find((segment: { start_time: string; canceled_until: string | null }) => {
      const startTime = new Date(segment.start_time);
      return startTime > now && !segment.canceled_until;
    });

    return NextResponse.json({
      isLive: liveStatus.isLive,
      liveData: liveStatus.isLive ? liveStatus : null,
      nextStream: nextStream
        ? {
            title: nextStream.title || "Live Stream",
            category: nextStream.category?.name || null,
            startTime: nextStream.start_time,
            endTime: nextStream.end_time,
            isRecurring: nextStream.is_recurring,
          }
        : null,
      broadcasterName: BROADCASTER_LOGIN,
    });
  } catch (error) {
    console.error("Schedule API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
