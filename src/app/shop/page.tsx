import type { Metadata } from "next";
import Link from "next/link";
import { getShopProducts, type ShopProduct } from "@/lib/api";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Official Prozilli Gaming merchandise. Premium hoodies, tees, caps, and gear. Rep the brand with quality apparel designed for the community.",
  keywords: [
    "Prozilli Gaming merch",
    "gaming merchandise",
    "streamer merch",
    "Prozilli hoodie",
    "gaming apparel",
    "Fourthwall store",
  ],
  openGraph: {
    title: "Official Merch | Prozilli Gaming",
    description:
      "Shop official Prozilli Gaming merchandise. Premium quality gear designed for the community.",
    type: "website",
    url: "https://prozilligaming.com/shop",
    images: [
      {
        url: "/images/heroes/hero-shop.png",
        width: 1200,
        height: 630,
        alt: "Prozilli Gaming Official Merchandise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Merch | Prozilli Gaming",
    description: "Premium gaming merchandise. Rep the Prozilli brand.",
    images: ["/images/heroes/hero-shop.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/shop",
  },
};

// Fallback products when Fourthwall API is not configured
const FALLBACK_PRODUCTS: ShopProduct[] = [
  {
    id: "pg-hoodie-black",
    slug: "pg-hoodie-black",
    name: "Prozilli Gaming Hoodie",
    category: "Apparel",
    price: { value: 54.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/hoodie-placeholder.png",
    description: "Premium heavyweight hoodie with embroidered logo.",
    variants: [
      {
        id: "pg-hoodie-black-s",
        name: "Black / S",
        price: { value: 54.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Black", swatch: "black" }, size: { name: "S" } },
      },
      {
        id: "pg-hoodie-black-m",
        name: "Black / M",
        price: { value: 54.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Black", swatch: "black" }, size: { name: "M" } },
      },
      {
        id: "pg-hoodie-black-l",
        name: "Black / L",
        price: { value: 54.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Black", swatch: "black" }, size: { name: "L" } },
      },
      {
        id: "pg-hoodie-black-xl",
        name: "Black / XL",
        price: { value: 54.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Black", swatch: "black" }, size: { name: "XL" } },
      },
    ],
    hasVariants: true,
    availableColors: ["Black"],
    availableSizes: ["S", "M", "L", "XL"],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
  {
    id: "pg-tee-red",
    slug: "pg-tee-red",
    name: "PG Logo Tee - Red Edition",
    category: "Apparel",
    price: { value: 29.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/tee-placeholder.png",
    description: "Soft cotton tee with screen-printed logo.",
    variants: [
      {
        id: "pg-tee-red-s",
        name: "Red / S",
        price: { value: 29.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Red", swatch: "red" }, size: { name: "S" } },
      },
      {
        id: "pg-tee-red-m",
        name: "Red / M",
        price: { value: 29.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Red", swatch: "red" }, size: { name: "M" } },
      },
      {
        id: "pg-tee-red-l",
        name: "Red / L",
        price: { value: 29.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Red", swatch: "red" }, size: { name: "L" } },
      },
    ],
    hasVariants: true,
    availableColors: ["Red"],
    availableSizes: ["S", "M", "L"],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
  {
    id: "pg-snapback",
    slug: "pg-snapback",
    name: "PG Snapback Cap",
    category: "Accessories",
    price: { value: 24.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/cap-placeholder.png",
    description: "Structured snapback with embroidered logo.",
    variants: [
      {
        id: "pg-snapback-black",
        name: "Black",
        price: { value: 24.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Black", swatch: "black" } },
      },
      {
        id: "pg-snapback-red",
        name: "Red",
        price: { value: 24.99, currency: "USD" },
        available: true,
        images: [],
        attributes: { color: { name: "Red", swatch: "red" } },
      },
    ],
    hasVariants: true,
    availableColors: ["Black", "Red"],
    availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
  {
    id: "pg-mousepad-xl",
    slug: "pg-mousepad-xl",
    name: "Prozilli Mousepad XL",
    category: "Gear",
    price: { value: 19.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/mousepad-placeholder.png",
    description: "Extended gaming mousepad with stitched edges.",
    variants: [
      {
        id: "pg-mousepad-xl-default",
        name: "Default",
        price: { value: 19.99, currency: "USD" },
        available: true,
        images: [],
        attributes: {},
      },
    ],
    hasVariants: false,
    availableColors: [],
    availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
  {
    id: "pg-mug",
    slug: "pg-mug",
    name: "PG Coffee Mug",
    category: "Accessories",
    price: { value: 14.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/mug-placeholder.png",
    description: "15oz ceramic mug, dishwasher safe.",
    variants: [
      {
        id: "pg-mug-default",
        name: "Default",
        price: { value: 14.99, currency: "USD" },
        available: true,
        images: [],
        attributes: {},
      },
    ],
    hasVariants: false,
    availableColors: [],
    availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
  {
    id: "pg-sticker-pack",
    slug: "pg-sticker-pack",
    name: "Sticker Pack",
    category: "Accessories",
    price: { value: 9.99, currency: "USD" },
    compareAtPrice: null,
    currency: "USD",
    images: [],
    thumbnail: "/images/shop/stickers-placeholder.png",
    description: "Pack of 5 vinyl die-cut stickers.",
    variants: [
      {
        id: "pg-sticker-pack-default",
        name: "Default",
        price: { value: 9.99, currency: "USD" },
        available: true,
        images: [],
        attributes: {},
      },
    ],
    hasVariants: false,
    availableColors: [],
    availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com",
    available: true,
  },
];

export default async function ShopPage() {
  // Fetch products from PRISMAI/Fourthwall
  const shopData = await getShopProducts();

  // Use real products if available, otherwise fallback
  const products =
    shopData.products.length > 0 ? shopData.products : FALLBACK_PRODUCTS;
  const storeUrl = shopData.storeUrl || "https://prozilli-shop.fourthwall.com";
  const isUsingFallback = shopData.products.length === 0;

  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-shop.webp")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl">
            OFFICIAL <span className="text-brand-red">MERCH</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted">
            Rep the brand. Premium quality gear designed for the community.
          </p>
          {/* Direct store link */}
          <Link
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fade-in-up animate-delay-200 mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-red px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium tracking-wide text-white transition-all hover:bg-brand-red/80 active:scale-[0.98]"
          >
            Visit Full Store
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Preview Notice when using fallback */}
      {isUsingFallback && (
        <section className="border-b border-brand-gold/20 bg-brand-gold/5">
          <div className="mx-auto max-w-4xl px-6 py-4 text-center">
            <p className="text-sm text-brand-gold">
              Preview Mode - Visit our{" "}
              <Link
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Fourthwall store
              </Link>{" "}
              to see all available products and make purchases.
            </p>
          </div>
        </section>
      )}

      {/* Shop Grid (client component with filtering and modal) */}
      <ShopGrid products={products} storeUrl={storeUrl} />

      {/* Fourthwall Integration Notice */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 sm:px-6 py-10 sm:py-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
            POWERED BY FOURTHWALL
          </span>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            All orders are fulfilled through our official Fourthwall store.
            Secure checkout, quality guarantee, and worldwide shipping.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              Worldwide Shipping
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-silver">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Easy Returns
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
