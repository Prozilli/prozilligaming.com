import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Official Merch",
  description:
    "Official ProzilliGaming merchandise. Apparel, accessories, digital items, and collectibles. Powered by Fourthwall. Rep the brand.",
};

const CATEGORIES = [
  {
    name: "Apparel",
    desc: "Hoodies, tees, joggers, and hats. Premium quality streetwear with Prozilli branding.",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    accent: "red",
    count: "12+ items",
  },
  {
    name: "Accessories",
    desc: "Phone cases, stickers, mousepads, and drinkware. Show the brand everywhere you go.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    accent: "electric",
    count: "8+ items",
  },
  {
    name: "Digital",
    desc: "Desktop wallpapers, emote packs, overlays, and exclusive digital content for the community.",
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
    accent: "emerald",
    count: "6+ items",
  },
  {
    name: "Collectibles",
    desc: "Limited edition runs, signed prints, and exclusive drops. Once they're gone, they're gone.",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    accent: "gold",
    count: "4+ items",
  },
];

const FEATURED_PRODUCTS = [
  {
    name: "ZO Syndicate Hoodie",
    price: "$55.00",
    category: "Apparel",
    desc: "Premium heavyweight hoodie with embroidered ZO Syndicate logo. Fleece-lined. Available in black and charcoal.",
    badge: "Best Seller",
    badgeColor: "badge-red",
  },
  {
    name: "PRISMAI Tee",
    price: "$35.00",
    category: "Apparel",
    desc: "Soft-touch cotton tee with holographic PRISMAI circuit design on the back. Minimalist front logo.",
    badge: "New",
    badgeColor: "badge-electric",
  },
  {
    name: "Prozilli Red Snapback",
    price: "$30.00",
    category: "Apparel",
    desc: "Structured snapback with Prozilli Gaming logo. Red on black embroidery. Adjustable fit.",
    badge: null,
    badgeColor: null,
  },
  {
    name: "LISA Avatar Sticker Pack",
    price: "$12.00",
    category: "Accessories",
    desc: "Set of 10 holographic vinyl stickers featuring LISA, the NPC crew, and Prozilli branding. Waterproof.",
    badge: "Popular",
    badgeColor: "badge-gold",
  },
  {
    name: "Gang Logo Mousepad",
    price: "$20.00",
    category: "Accessories",
    desc: "XL desk mousepad with all 10 ZO Syndicate gang logos on a dark grid background. Non-slip rubber base.",
    badge: null,
    badgeColor: null,
  },
  {
    name: "Command Center Wallpaper Pack",
    price: "$5.00",
    category: "Digital",
    desc: "4K and ultrawide wallpapers featuring the Prozilli ecosystem HUD, LISA avatar, and holographic glass design.",
    badge: "Digital",
    badgeColor: "badge-emerald",
  },
  {
    name: "Founder's Edition Poster",
    price: "$45.00",
    category: "Collectibles",
    desc: "Limited run 18x24 poster with signed certificate. Features the full Prozilli ecosystem diagram. Numbered edition.",
    badge: "Limited",
    badgeColor: "badge-gold",
  },
  {
    name: "ZO Syndicate Joggers",
    price: "$50.00",
    category: "Apparel",
    desc: "Tapered joggers with ZO Syndicate branding down the left leg. French terry. Zippered pockets.",
    badge: "New",
    badgeColor: "badge-electric",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[70vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6 animate-reveal">Official Merch</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Rep the{" "}
              <span className="text-shimmer-red">Brand</span>
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Official ProzilliGaming merchandise. From premium apparel to limited-edition collectibles,
              every item is designed to represent the ecosystem. Quality first, always.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://prozilli-shop.fourthwall.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Browse Full Store
              </a>
              <Link href="/support" className="btn btn-secondary btn-lg">
                VIP Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">Categories</div>
            <h2 className="text-headline mb-4">What We Carry</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Four categories of official merchandise, all designed in-house and shipped through
              our Fourthwall storefront. New drops announced on Discord and across all platforms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href="https://prozilli-shop.fourthwall.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-holo p-6 text-center group block"
              >
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-${cat.accent}/10`}
                  >
                    <svg
                      className={`w-6 h-6 text-${cat.accent}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">{cat.desc}</p>
                  <span className={`badge badge-${cat.accent}`}>{cat.count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED PRODUCTS ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">Featured</div>
            <h2 className="text-headline mb-4">Top Picks</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Our most popular items and latest additions. Every product is designed with the same
              attention to detail we put into our streams and our code.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {FEATURED_PRODUCTS.map((product) => (
              <a
                key={product.name}
                href="https://prozilli-shop.fourthwall.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card group block overflow-hidden"
              >
                {/* Product image placeholder */}
                <div className="aspect-square bg-surface relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`badge ${product.badgeColor}`}>{product.badge}</span>
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-glass border border-glass-border flex items-center justify-center group-hover:border-glass-border-hover transition-colors">
                      <svg className="w-8 h-8 text-dim group-hover:text-muted transition-colors" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Product info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-dim">{product.category}</span>
                    <span className="text-sm font-bold text-gold">{product.price}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-foreground transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">{product.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://prozilli-shop.fourthwall.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ====== VIP & SUPPORT ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-10 md:p-16 text-center max-w-3xl mx-auto">
            <div className="badge badge-gold mb-6">VIP</div>
            <h2 className="text-headline mb-4">
              Want More? Go{" "}
              <span className="text-shimmer">VIP</span>
            </h2>
            <p className="text-body-lg max-w-xl mx-auto mb-8">
              Beyond merch, we offer VIP tiers with exclusive perks: custom Discord roles, priority
              game lobbies, early access to content, in-game VIP benefits on ZO Syndicate, and direct
              access to Pro. Three tiers — Supporter, VIP, and Elite — with benefits across every platform.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { tier: "Supporter", price: "$4.99/mo", color: "text-emerald", features: "Discord role, supporter badge, ad-free VODs" },
                { tier: "VIP", price: "$9.99/mo", color: "text-electric", features: "All Supporter perks + game lobbies, early access, emotes" },
                { tier: "Elite", price: "$24.99/mo", color: "text-gold", features: "All VIP perks + 1-on-1 access, in-game VIP, custom content" },
              ].map((vip) => (
                <div key={vip.tier} className="card p-4 text-center">
                  <h3 className={`font-bold mb-1 ${vip.color}`}>{vip.tier}</h3>
                  <p className="text-lg font-extrabold mb-2">{vip.price}</p>
                  <p className="text-xs text-muted">{vip.features}</p>
                </div>
              ))}
            </div>
            <Link href="/support" className="btn btn-gold btn-lg">
              Explore VIP Tiers
            </Link>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY FOURTHWALL ====== */}
      <section className="py-16 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Powered by Fourthwall</h3>
              <p className="text-sm text-muted">
                Our storefront is hosted on Fourthwall. Secure checkout, worldwide shipping,
                quality printing, and order tracking — all handled seamlessly.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://prozilli-shop.fourthwall.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Visit Fourthwall Store
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <span className="powered-by-prismai">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" opacity="0.3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                PRISMAI Integration
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
