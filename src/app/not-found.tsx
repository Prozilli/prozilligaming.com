import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] bg-grid relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-[120px] md:text-[160px] font-extrabold leading-none bg-gradient-to-b from-[#910000] to-[#910000]/20 bg-clip-text text-transparent select-none">
            404
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted text-lg mb-10 max-w-md mx-auto">
          The page you are looking for does not exist, has been moved, or is temporarily
          unavailable. Let us get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link href="/watch" className="btn btn-secondary btn-lg">
            Watch Live
          </Link>
        </div>
        <div className="glass-raised p-6 inline-block">
          <p className="text-sm text-dim mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Watch", href: "/watch" },
              { label: "Shop", href: "/shop" },
              { label: "ZO Syndicate", href: "/zo-syndicate" },
              { label: "Schedule", href: "/schedule" },
              { label: "Support", href: "/support" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg bg-glass border border-glass-border text-sm text-muted hover:text-foreground hover:border-glass-border-hover transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
