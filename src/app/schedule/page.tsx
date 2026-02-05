import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
};

const SCHEDULE = [
  {
    day: "Monday",
    time: "7:00 PM EST",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Tuesday",
    time: "8:00 PM EST",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Wednesday",
    time: "7:00 PM EST",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Thursday",
    time: "8:00 PM EST",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Friday",
    time: "7:00 PM EST",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Saturday",
    time: "3:00 PM EST",
    category: "Special Events",
    description: "Collabs, tournaments, community events, and premieres",
    active: true,
  },
  {
    day: "Sunday",
    time: "--",
    category: "Off Day",
    description: "Rest, recharge, plan the next move",
    active: false,
  },
];

export default function SchedulePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            STREAM <span className="text-brand-red">SCHEDULE</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Catch every broadcast. Multiplatform, every time.
          </p>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-4">
          {SCHEDULE.map((slot) => (
            <div
              key={slot.day}
              className={`glass glow-border rounded-lg p-6 transition-all ${
                slot.active ? "" : "opacity-40"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {slot.active && (
                    <span className="hidden h-3 w-3 rounded-full bg-brand-red sm:block" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold tracking-wide text-white">
                      {slot.day}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {slot.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:text-right">
                  <div>
                    <p className="text-sm font-semibold text-brand-gold">
                      {slot.time}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-brand-silver">
                      {slot.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-lg border border-white/5 bg-brand-darker p-6 text-center">
          <p className="text-sm text-muted">
            Schedule subject to change. Follow on{" "}
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold transition-colors hover:text-white"
            >
              Discord
            </a>{" "}
            for real-time updates and surprise streams.
          </p>
          <p className="mt-2 text-xs text-muted">
            All times in Eastern Standard Time (EST).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Never Miss a Stream
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Join the Discord community for notifications, schedule changes, and behind-the-scenes updates.
          </p>
          <a
            href="https://discord.gg/prozillihq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-sm bg-brand-red px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
          >
            Join Discord
          </a>
        </div>
      </section>
    </>
  );
}
