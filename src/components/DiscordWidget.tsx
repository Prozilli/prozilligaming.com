"use client";

import { useState, useEffect } from "react";

interface DiscordData {
  approximate_member_count: number;
  approximate_presence_count: number;
  name: string;
}

export default function DiscordWidget() {
  const [data, setData] = useState<DiscordData | null>(null);

  useEffect(() => {
    fetch("https://discord.com/api/v10/invites/prozillihq?with_counts=true")
      .then((res) => res.json())
      .then((json) => {
        if (json.approximate_member_count) {
          setData({
            approximate_member_count: json.approximate_member_count,
            approximate_presence_count: json.approximate_presence_count,
            name: json.guild?.name || "Prozilli HQ",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href="https://discord.gg/prozillihq"
      target="_blank"
      rel="noopener noreferrer"
      className="glass glow-border group flex items-center gap-4 rounded-lg p-5 sm:p-6 transition-all hover:border-[#5865F2]/50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5865F2]/20">
        <svg className="h-7 w-7 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white group-hover:text-[#5865F2] transition-colors">
          Join the Community
        </h3>
        <p className="mt-1 text-sm text-muted">
          {data ? (
            <>
              <span className="text-green-400 font-medium">{data.approximate_presence_count}</span> online
              {" / "}
              <span className="text-white font-medium">{data.approximate_member_count}</span> members
            </>
          ) : (
            "Connect with Pro and the community on Discord"
          )}
        </p>
      </div>
      <span className="shrink-0 rounded-lg bg-[#5865F2] px-4 py-2 text-sm font-medium text-white transition-all group-hover:bg-[#4752C4]">
        Join
      </span>
    </a>
  );
}
