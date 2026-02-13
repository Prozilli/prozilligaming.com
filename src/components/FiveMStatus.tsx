"use client";

import { useState, useEffect } from "react";

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
}

export default function FiveMStatus() {
  const [status, setStatus] = useState<ServerStatus>({
    online: false,
    players: 0,
    maxPlayers: 48,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          "https://servers-frontend.fivem.net/api/servers/single/bwpao4",
          { next: { revalidate: 60 } }
        );
        if (res.ok) {
          const data = await res.json();
          setStatus({
            online: true,
            players: data?.Data?.clients ?? 0,
            maxPlayers: data?.Data?.sv_maxclients ?? 48,
          });
        }
      } catch {
        // Server offline or API unreachable
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-lg p-4 text-center">
        <div className="h-3 w-3 mx-auto rounded-full bg-brand-silver/30 animate-pulse" />
        <p className="mt-2 text-xs text-muted">Checking server...</p>
      </div>
    );
  }

  return (
    <div className="glass glow-border rounded-lg p-5 text-center transition-all">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            status.online
              ? "bg-green-400 animate-live-pulse"
              : "bg-red-400"
          }`}
        />
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            status.online ? "text-green-400" : "text-red-400"
          }`}
        >
          {status.online ? "ONLINE" : "OFFLINE"}
        </span>
      </div>
      {status.online && (
        <>
          <p className="text-3xl font-bold text-white">
            {status.players}
            <span className="text-lg text-muted">/{status.maxPlayers}</span>
          </p>
          <p className="mt-1 text-xs text-muted uppercase tracking-wider">
            Players Online
          </p>
        </>
      )}
      <a
        href="fivem://connect/play.prozilligaming.com"
        className="mt-3 inline-block rounded-sm bg-brand-red/20 px-4 py-1.5 text-xs font-medium text-red transition-colors hover:bg-brand-red/30"
      >
        Direct Connect
      </a>
    </div>
  );
}
