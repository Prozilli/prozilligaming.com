"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    paypal?: any;
  }
}

const PAYPAL_CLIENT_ID =
  "AewAvHvMtwkFIRxCVqRBoIY-6J3nqEjAX5tZWsmx4j-Xw5xE9UBTAj-AzG2hGutKZ5Gowil8YtNvJ9om";

const VIP_TIERS = [
  {
    name: "Supporter",
    price: "$4.99",
    period: "/month",
    color: "emerald",
    badge: "badge-emerald",
    tebexUrl: "https://zo-syndicate.tebex.io/category/supporter",
    features: [
      "Supporter role in Discord",
      "Custom name color in chat",
      "Priority queue in ZO Syndicate",
      "Supporter badge on stream overlays",
      "Access to supporter-only Discord channels",
      "Monthly supporter shoutout",
    ],
  },
  {
    name: "VIP",
    price: "$9.99",
    period: "/month",
    color: "electric",
    badge: "badge-electric",
    popular: true,
    tebexUrl: "https://zo-syndicate.tebex.io/category/vip",
    features: [
      "Everything in Supporter, plus:",
      "VIP role with exclusive Discord channels",
      "Custom vehicle plate in ZO Syndicate",
      "VIP inventory slots (+10 extra)",
      "LISA remembers you with priority",
      "Early access to new features",
      "Monthly VIP-only giveaways",
      "Vote on stream game choices",
    ],
  },
  {
    name: "Elite",
    price: "$24.99",
    period: "/month",
    color: "gold",
    badge: "badge-gold",
    tebexUrl: "https://zo-syndicate.tebex.io/category/elite",
    features: [
      "Everything in VIP, plus:",
      "Elite role — top of the hierarchy",
      "Custom character in ZO Syndicate",
      "Exclusive Elite Discord lounge",
      "Direct line to Pro for suggestions",
      "Name in stream credits",
      "Custom LISA greeting message",
      "Priority bug fixes & feature requests",
      "Quarterly merch surprise package",
    ],
  },
];

const TRANSPARENCY = [
  {
    label: "Server Hosting",
    description: "FiveM server, PRISMAI bot hosting, Cloudflare Workers, domains",
    percentage: 35,
  },
  {
    label: "Equipment & Software",
    description: "Streaming hardware, software licenses, AI API costs",
    percentage: 25,
  },
  {
    label: "Content Creation",
    description: "Graphics, video editing, music licensing, overlays",
    percentage: 20,
  },
  {
    label: "Community & Giveaways",
    description: "Prizes, community events, game keys, merchandise",
    percentage: 15,
  },
  {
    label: "Growth & Marketing",
    description: "Platform promotions, collaborations, outreach",
    percentage: 5,
  },
];

const PRESETS = [5, 10, 25, 50];

export default function SupportPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  // PayPal SDK state
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const [donationStatus, setDonationStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [donorName, setDonorName] = useState("");
  const paypalButtonRef = useRef<HTMLDivElement>(null);

  // Refs so PayPal callbacks always read latest values
  const amountRef = useRef<number | "">(amount);
  const nicknameRef = useRef(nickname);
  const messageRef = useRef(message);
  useEffect(() => { amountRef.current = amount; }, [amount]);
  useEffect(() => { nicknameRef.current = nickname; }, [nickname]);
  useEffect(() => { messageRef.current = message; }, [message]);

  // Load PayPal JS SDK
  useEffect(() => {
    if (window.paypal) {
      setPaypalReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&disable-funding=credit,card`;
    script.async = true;
    script.onload = () => setPaypalReady(true);
    script.onerror = () => setPaypalError("Failed to load PayPal. Try refreshing.");
    document.head.appendChild(script);
  }, []);

  // Render PayPal buttons
  useEffect(() => {
    if (!paypalReady || !paypalButtonRef.current || !window.paypal) return;

    paypalButtonRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          color: "black" as const,
          shape: "rect" as const,
          label: "pay" as const,
          height: 50,
          layout: "vertical" as const,
          tagline: false,
        },
        createOrder: (_data: any, actions: any) => {
          const tipAmount = String(amountRef.current || 5);
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: tipAmount, currency_code: "USD" },
                description: "Tip for ProzilliGaming",
                custom_id: JSON.stringify({
                  nickname: nicknameRef.current || "Anonymous",
                  message: messageRef.current || "",
                }),
              },
            ],
            application_context: {
              brand_name: "Prozilli Gaming",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
            },
          });
        },
        onApprove: async (_data: any, actions: any) => {
          setDonationStatus("processing");
          try {
            const details = await actions.order.capture();
            const payer = details?.payer?.name;
            setDonorName(
              payer ? `${payer.given_name} ${payer.surname}` : "Supporter"
            );
            setDonationStatus("success");
          } catch {
            setDonationStatus("error");
            setPaypalError("Payment capture failed. Please contact support.");
          }
        },
        onError: () => {
          setDonationStatus("error");
          setPaypalError("Something went wrong. Please try again.");
        },
        onCancel: () => {
          setDonationStatus("idle");
        },
      })
      .render(paypalButtonRef.current);
  }, [paypalReady]);

  const handlePreset = (value: number) => {
    setSelectedPreset(value);
    setAmount(value);
  };

  const handleCustomAmount = (value: string) => {
    setSelectedPreset(null);
    setAmount(value === "" ? "" : Number(value));
  };

  const resetDonation = () => {
    setDonationStatus("idle");
    setPaypalError("");
    setDonorName("");
    setNickname("");
    setMessage("");
    setAmount("");
    setSelectedPreset(null);
  };

  return (
    <>
      {/* ====== HERO with Donation Form ====== */}
      <section className="hero-section min-h-[80vh] bg-grid relative overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heroes/hero-support.webp"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div>
              <div className="badge badge-red mb-6 animate-reveal">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Support &amp; Tips
              </div>
              <h1
                className="text-display mb-6 animate-reveal"
                style={{ animationDelay: "0.1s" }}
              >
                Fuel the{" "}
                <span className="text-shimmer-red">Ecosystem</span>
              </h1>
              <p
                className="text-body-lg max-w-lg mb-6 animate-reveal"
                style={{ animationDelay: "0.2s" }}
              >
                Every tip keeps the servers running, the content flowing, and the
                community growing. This is an independent operation — your support
                makes it all possible.
              </p>
              <div
                className="flex flex-wrap gap-3 animate-reveal"
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href="https://zo-syndicate.tebex.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  VIP Store
                </a>
                <Link href="/shop" className="btn btn-ghost">
                  Browse Merch
                </Link>
              </div>
            </div>

            {/* Right — Donation Form */}
            <div
              className="glass-raised p-8 animate-reveal"
              style={{ animationDelay: "0.25s" }}
            >
              {/* Success State */}
              {donationStatus === "success" ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Thank You{donorName ? `, ${donorName}` : ""}!</h2>
                  <p className="text-sm text-muted mb-2">
                    Your ${amountRef.current || 5} tip was received successfully.
                  </p>
                  <p className="text-xs text-dim mb-6">
                    If Pro is live, your alert will appear on stream momentarily.
                  </p>
                  <button onClick={resetDonation} className="btn btn-secondary">
                    Send Another Tip
                  </button>
                </div>
              ) : donationStatus === "processing" ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin mx-auto mb-4" />
                  <h2 className="text-lg font-bold mb-1">Processing Payment...</h2>
                  <p className="text-sm text-muted">Hang tight, confirming with PayPal.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1">Send a Tip via PayPal</h2>
                  <p className="text-sm text-muted mb-6">
                    Checkout happens right here — powered by PayPal
                  </p>

                  {/* Error Banner */}
                  {(donationStatus === "error" || paypalError) && (
                    <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 flex items-center gap-2">
                      <svg className="w-4 h-4 text-error flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <span className="text-xs text-error">{paypalError || "Something went wrong."}</span>
                      <button
                        onClick={() => { setDonationStatus("idle"); setPaypalError(""); }}
                        className="ml-auto text-dim hover:text-foreground"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Amount Presets */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handlePreset(preset)}
                        className={`py-3 rounded-lg font-bold text-lg transition-all ${
                          selectedPreset === preset
                            ? "bg-red text-white shadow-lg shadow-red-glow"
                            : "bg-glass border border-glass-border hover:border-glass-border-hover text-foreground"
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Custom amount"
                        value={selectedPreset ? "" : amount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        className="w-full bg-glass border border-glass-border rounded-lg py-3 pl-8 pr-4 text-foreground placeholder:text-dim focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Nickname */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Nickname — shown on stream alert if Pro is live"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full bg-glass border border-glass-border rounded-lg py-3 px-4 text-foreground placeholder:text-dim focus:border-gold focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <textarea
                      placeholder="Message — Pro and LISA will read this live if streaming"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="w-full bg-glass border border-glass-border rounded-lg py-3 px-4 text-foreground placeholder:text-dim focus:border-gold focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Tip Amount Display */}
                  <div className="mb-4 p-3 rounded-lg bg-glass border border-glass-border flex items-center justify-between">
                    <span className="text-xs text-muted">Tip Amount</span>
                    <span className="text-lg font-extrabold text-gold">
                      ${amount || 5}.00
                    </span>
                  </div>

                  {/* PayPal Smart Buttons */}
                  <div className="relative">
                    {!paypalReady && (
                      <div className="flex items-center justify-center py-6 gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-electric border-t-transparent animate-spin" />
                        <span className="text-xs text-dim">Loading PayPal...</span>
                      </div>
                    )}
                    <div
                      ref={paypalButtonRef}
                      className={paypalReady ? "" : "hidden"}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    <svg className="w-3.5 h-3.5 text-dim" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <p className="text-xs text-dim">
                      Secure checkout by PayPal. Pay with PayPal or debit/credit card.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== OTHER WAYS + PLATFORM SUBS ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">More Ways to Support</div>
            <h2 className="text-headline mb-4">Platform Subscriptions</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Subscribe through your favorite platform for exclusive perks, or use
              other payment methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {/* Twitch */}
            <a
              href="https://twitch.tv/prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="card-holo p-6 group block"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#9146ff15", color: "#9146ff" }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                  </div>
                  <h3 className="font-bold group-hover:text-foreground transition-colors">Twitch Sub</h3>
                </div>
                <p className="text-xs text-muted">Emotes, ad-free, badge. Free with Amazon Prime.</p>
              </div>
            </a>

            {/* Kick */}
            <a
              href="https://kick.com/prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="card-holo p-6 group block"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#53fc1815", color: "#53fc18" }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h6.5v6.5H15V2h7v7h-6.5v6.5H9V22H2v-7h6.5V8.5H2V2z" /></svg>
                  </div>
                  <h3 className="font-bold group-hover:text-foreground transition-colors">Kick Sub</h3>
                </div>
                <p className="text-xs text-muted">Subscribe on Kick for emotes, badges, and chat perks.</p>
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="card-holo p-6 group block"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ff000015", color: "#ff0000" }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </div>
                  <h3 className="font-bold group-hover:text-foreground transition-colors">YouTube</h3>
                </div>
                <p className="text-xs text-muted">Membership badges, emojis, and early access.</p>
              </div>
            </a>

            {/* Tebex Store */}
            <a
              href="https://zo-syndicate.tebex.io"
              target="_blank"
              rel="noopener noreferrer"
              className="card-holo p-6 group block"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#5865f215", color: "#5865f2" }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  </div>
                  <h3 className="font-bold group-hover:text-foreground transition-colors">Tebex Store</h3>
                </div>
                <p className="text-xs text-muted">VIP packages, in-game perks, and ZO Syndicate upgrades.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <div className="divider-red" />

      {/* ====== VIP TIERS ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">VIP Memberships</div>
            <h2 className="text-headline mb-4">
              Unlock <span className="text-shimmer">VIP Perks</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Monthly memberships with exclusive access, custom perks in ZO Syndicate,
              priority LISA interactions, and a direct line to shape the ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger">
            {VIP_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`glass-raised p-8 relative ${
                  tier.popular ? "ring-2 ring-electric/30" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-electric">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <span className={`badge ${tier.badge} mb-4`}>{tier.name}</span>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted">{tier.period}</span>
                  </div>
                </div>
                <div className="divider mb-6" />
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.tebexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full text-center ${tier.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  Subscribe
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHERE YOUR MONEY GOES ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="badge badge-emerald mb-4">Transparency</div>
              <h2 className="text-headline mb-4">Where Your Money Goes</h2>
              <p className="text-body-lg mb-8">
                Full transparency. Every dollar is reinvested into the ecosystem.
                No salaries, no overhead — pure content and community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn btn-primary">
                  Visit the Shop
                </Link>
                <a
                  href="https://zo-syndicate.tebex.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  VIP Store
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {TRANSPARENCY.map((item) => (
                <div key={item.label} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted mt-0.5">{item.description}</p>
                    </div>
                    <span className="text-xl font-extrabold text-gold ml-4 flex-shrink-0">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-raised rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
