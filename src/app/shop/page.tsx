"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ProductVariant {
  id: string;
  name: string;
  unitPrice: { value: number; currency: string };
  attributes?: Record<string, string>;
}

interface ProductImage {
  url: string;
  width?: number;
  height?: number;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  state?: string;
  tags?: string[];
}

const CATEGORY_FILTERS = ["All", "Apparel", "Accessories", "Digital", "Collectibles"];

function getCategory(product: Product): string {
  const name = product.name.toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  if (tags.includes("apparel") || name.includes("hoodie") || name.includes("tee") || name.includes("jogger") || name.includes("hat") || name.includes("snapback") || name.includes("shirt")) return "Apparel";
  if (tags.includes("accessories") || name.includes("sticker") || name.includes("mousepad") || name.includes("mug") || name.includes("case")) return "Accessories";
  if (tags.includes("digital") || name.includes("wallpaper") || name.includes("pack") || name.includes("digital") || name.includes("emote")) return "Digital";
  if (tags.includes("collectibles") || name.includes("poster") || name.includes("edition") || name.includes("signed") || name.includes("limited")) return "Collectibles";
  return "Apparel";
}

function getPrice(product: Product): string {
  if (!product.variants?.length) return "$0.00";
  const price = product.variants[0].unitPrice;
  if (!price) return "$0.00";
  return `$${price.value.toFixed(2)}`;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/prismai/shop/products");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data.products || data || []);
      } catch (err: unknown) {
        console.error("Shop fetch error:", err);
        setError("Unable to load products right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = filter === "All" ? products : products.filter((p) => getCategory(p) === filter);

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
              <Link href="#products" className="btn btn-primary btn-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Browse Products
              </Link>
              <Link href="/support" className="btn btn-secondary btn-lg">
                VIP Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRODUCTS ====== */}
      <section id="products" className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="badge badge-red mb-4">Shop</div>
            <h2 className="text-headline mb-4">Our Products</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Premium quality merchandise designed in-house. New drops announced on Discord and across all platforms.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-red text-white shadow-lg shadow-red-glow"
                    : "bg-glass border border-glass-border hover:border-glass-border-hover text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="aspect-square bg-surface" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-surface rounded w-1/3" />
                    <div className="h-4 bg-surface rounded w-2/3" />
                    <div className="h-3 bg-surface rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-muted">{error}</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
                  {filtered.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      className="card group block overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-surface relative flex items-center justify-center overflow-hidden">
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-dots opacity-20" />
                            <div className="relative z-10 w-16 h-16 rounded-xl bg-glass border border-glass-border flex items-center justify-center">
                              <svg className="w-8 h-8 text-dim" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-dim">{getCategory(product)}</span>
                          <span className="text-sm font-bold text-gold">{getPrice(product)}</span>
                        </div>
                        <h3 className="font-bold text-sm mb-1 group-hover:text-foreground transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-muted line-clamp-2">
                            {product.description.replace(/<[^>]*>/g, "").substring(0, 120)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
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
              Three ranks in the Syndicate — each one opens doors the last one didn&apos;t.
              Custom Discord roles, in-game VIP perks, priority LISA interactions, and direct access to Pro.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { tier: "Associate", price: "$4.99/mo", color: "text-emerald", features: "Priority queue, chat tag, Discord role, LISA recognition" },
                { tier: "Connected", price: "$9.99/mo", color: "text-electric", features: "All Associate perks + custom plate, extra slots, exclusive gear" },
                { tier: "Inner Circle", price: "$24.99/mo", color: "text-gold", features: "All Connected perks + direct access to Pro, stream credits, merch drops" },
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
    </>
  );
}
