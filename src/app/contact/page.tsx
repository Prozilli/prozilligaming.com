import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prozilli Gaming. Business inquiries, sponsorships, community support, and general questions. Reach out via email, Discord, or social media.",
};

const CONTACT_METHODS = [
  {
    title: "Business Inquiries",
    description: "Sponsorships, collaborations, partnerships, and professional opportunities. We respond within 48 hours.",
    value: "business@prozilli.com",
    href: "mailto:business@prozilli.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    accent: "gold",
  },
  {
    title: "Community Support",
    description: "Technical issues, account help, VIP questions, or general community support. Our Discord team is here to help.",
    value: "discord.gg/prozillihq",
    href: "https://discord.gg/prozillihq",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    accent: "electric",
  },
  {
    title: "Social Media",
    description: "DMs are open on most platforms. For the fastest response, reach out on Discord or X.",
    value: "@ProzilliGaming",
    href: "https://x.com/ProzilliGaming",
    icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
    accent: "red",
  },
  {
    title: "ZO Syndicate Support",
    description: "FiveM server issues, whitelist applications, bug reports, and in-game support tickets.",
    value: "discord.gg/tF698jBb3k",
    href: "https://discord.gg/tF698jBb3k",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "gold",
  },
];

const FAQ = [
  {
    question: "What platforms do you stream on?",
    answer: "We stream simultaneously on 9 platforms: Twitch, YouTube, Kick, TikTok, X, Instagram, Facebook, Trovo, and Discord. All managed by our custom PRISMAI engine.",
  },
  {
    question: "How do I join the ZO Syndicate FiveM server?",
    answer: "Join the ZO Syndicate Discord (discord.gg/tF698jBb3k), read the rules, submit a whitelist application, and once approved you'll get the server connection details. The server runs on Qbox framework with 51 custom resources.",
  },
  {
    question: "How does LISA work?",
    answer: "LISA (Live Interactive System Administrator) is our AI co-host powered by Groq's llama-3.3-70b-versatile model with OpenAI fallback. She operates across all 9 platforms simultaneously, has a relationship memory system, and genuinely unique personality. She's not a generic chatbot.",
  },
  {
    question: "How do I become a VIP?",
    answer: "You can subscribe via Tebex on our website, subscribe on Twitch, become a YouTube member, or support on Patreon. All VIP tiers sync across platforms via PRISMAI. Visit the Support page for full details on each tier.",
  },
  {
    question: "Do you do sponsorships or collaborations?",
    answer: "Yes. Send business inquiries to business@prozilli.com with details about your proposal. We review all serious inquiries and respond within 48 hours. We're selective about partnerships to maintain community trust.",
  },
  {
    question: "I found a bug or have a feature request. Where do I report it?",
    answer: "Join the Prozilli HQ Discord and use the appropriate support channel. For ZO Syndicate issues, use the ZO Syndicate Discord's bug report channel. Include as much detail as possible — screenshots, error messages, and steps to reproduce.",
  },
  {
    question: "Can I contribute to the community?",
    answer: "Absolutely. Create content (clips, art, memes), help new members in Discord, be active during streams, participate in events, and spread the word. Top community contributors get recognized with special roles and perks.",
  },
  {
    question: "What is PRISMAI?",
    answer: "PRISMAI is our custom-built backend engine that connects all 9 streaming platforms, manages OAuth tokens (encrypted with AES-256-GCM), processes webhooks, runs LISA's AI, moderates chat, auto-posts content, and orchestrates the entire Prozilli ecosystem 24/7.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[60vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6 animate-reveal">Contact</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Get in{" "}
              <span className="text-shimmer">Touch</span>
            </h1>
            <p
              className="text-body-lg max-w-xl animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Business inquiries, community support, or just want to say what&apos;s up.
              We&apos;re here and we respond.
            </p>
          </div>
        </div>
      </section>

      {/* ====== CONTACT METHODS ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 stagger">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card-holo p-6 group block"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${method.accent}/10 flex items-center justify-center`}>
                      <svg className={`w-6 h-6 text-${method.accent}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={method.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-foreground transition-colors">
                        {method.title}
                      </h3>
                      <span className="text-data text-electric text-xs">{method.value}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted">{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT FORM ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="badge badge-electric mb-4">Send a Message</div>
              <h2 className="text-headline mb-4">Contact Form</h2>
              <p className="text-body-lg mb-8">
                Fill out the form and we&apos;ll get back to you within 48 hours. For urgent
                community support, Discord is faster.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Response Time", value: "Within 48 hours for email" },
                  { label: "Discord Support", value: "Usually within a few hours" },
                  { label: "Business Hours", value: "We're online most evenings EST" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-electric flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">
                      <span className="text-foreground font-semibold">{item.label}:</span>{" "}
                      <span className="text-muted">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ====== FAQ ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">FAQ</div>
            <h2 className="text-headline mb-4">Frequently Asked Questions</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Quick answers to the most common questions. If your question isn&apos;t
              here, ask in Discord or send us a message above.
            </p>
          </div>

          <div className="space-y-4 stagger">
            {FAQ.map((item, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.question}
                </h3>
                <p className="text-sm text-muted pl-8">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SOCIAL LINKS ====== */}
      <section className="py-16 bg-grid border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-subhead mb-6">Find Us Everywhere</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { name: "Twitch", color: "#9146ff", href: "https://twitch.tv/prozilligaming" },
              { name: "YouTube", color: "#ff0000", href: "https://youtube.com/@prozilligaming" },
              { name: "Kick", color: "#53fc18", href: "https://kick.com/prozilligaming" },
              { name: "TikTok", color: "#ff0050", href: "https://tiktok.com/@prozilligaming" },
              { name: "X", color: "#ffffff", href: "https://x.com/ProzilliGaming" },
              { name: "Instagram", color: "#e4405f", href: "https://instagram.com/prozilligaming" },
              { name: "Facebook", color: "#1877f2", href: "https://facebook.com/ProzilliGaming" },
              { name: "Discord", color: "#5865f2", href: "https://discord.gg/prozillihq" },
              { name: "Trovo", color: "#19d65c", href: "https://trovo.live/s/ProzilliGaming" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-glass-border bg-glass hover:bg-glass-hover transition-colors"
                style={{ color: platform.color }}
              >
                {platform.name}
              </a>
            ))}
          </div>
          <div className="powered-by-prismai mx-auto w-fit">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Powered by PRISMAI
          </div>
        </div>
      </section>
    </>
  );
}
