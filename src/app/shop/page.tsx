import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shop",
};

const PRODUCTS = [
  {
    id: "pg-hoodie-black",
    name: "Prozilli Gaming Hoodie",
    category: "Apparel",
    price: "$54.99",
    image: "/images/shop/hoodie-placeholder.png",
    description: "Premium heavyweight hoodie with embroidered logo.",
  },
  {
    id: "pg-tee-red",
    name: "PG Logo Tee - Red Edition",
    category: "Apparel",
    price: "$29.99",
    image: "/images/shop/tee-placeholder.png",
    description: "Soft cotton tee with screen-printed logo.",
  },
  {
    id: "pg-snapback",
    name: "PG Snapback Cap",
    category: "Accessories",
    price: "$24.99",
    image: "/images/shop/cap-placeholder.png",
    description: "Structured snapback with embroidered logo.",
  },
  {
    id: "pg-mousepad-xl",
    name: "Prozilli Mousepad XL",
    category: "Gear",
    price: "$19.99",
    image: "/images/shop/mousepad-placeholder.png",
    description: "Extended gaming mousepad with stitched edges.",
  },
  {
    id: "pg-mug",
    name: "PG Coffee Mug",
    category: "Accessories",
    price: "$14.99",
    image: "/images/shop/mug-placeholder.png",
    description: "15oz ceramic mug, dishwasher safe.",
  },
  {
    id: "pg-sticker-pack",
    name: "Sticker Pack",
    category: "Accessories",
    price: "$9.99",
    image: "/images/shop/stickers-placeholder.png",
    description: "Pack of 5 vinyl die-cut stickers.",
  },
];

const CATEGORIES = ["All", "Apparel", "Accessories", "Gear"];

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-6 pt-20 pb-12 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Fireflies */}
        <div className="fireflies">
          <span className="f1" />
          <span className="f2" />
          <span className="f3" />
          <span className="f4" />
          <span className="f5" />
          <span className="f6" />
        </div>
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-shop.png")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            OFFICIAL <span className="text-brand-red">MERCH</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Rep the brand. Premium quality gear designed for the community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                  cat === "All"
                    ? "bg-brand-red text-white"
                    : "border border-white/10 text-brand-silver hover:border-brand-red/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="glass glow-border group rounded-lg overflow-hidden transition-all"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-white/5 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/10">PG</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-red/0 transition-colors group-hover:bg-brand-red/10">
                  <span className="translate-y-4 text-sm font-medium tracking-wide text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-brand-red">
                  {product.category}
                </span>
                <h3 className="mt-2 text-base font-semibold tracking-wide text-white transition-colors group-hover:text-brand-red">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs text-muted line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-gold">
                    {product.price}
                  </span>
                  <button className="rounded-sm bg-brand-red/10 border border-brand-red/30 px-4 py-2 text-xs font-medium tracking-wide text-brand-red transition-all hover:bg-brand-red hover:text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fourthwall Integration Notice */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
            POWERED BY FOURTHWALL
          </span>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            All orders are fulfilled through our official Fourthwall store.
            Secure checkout, quality guarantee, and worldwide shipping.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Worldwide Shipping
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Easy Returns
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
