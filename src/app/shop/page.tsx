import type { Metadata } from "next";
import Link from "next/link";
import { getShopProducts, type ShopProduct } from "@/lib/api";
import ShopGrid from "@/components/shop/ShopGrid";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Official Prozilli Gaming merchandise. Premium hoodies, tees, caps, and gear. Rep the brand with quality apparel designed for the community.",
  keywords: ["Prozilli Gaming merch", "gaming merchandise", "streamer merch", "Prozilli hoodie", "gaming apparel", "Fourthwall store"],
  openGraph: {
    title: "Official Merch | Prozilli Gaming",
    description: "Shop official Prozilli Gaming merchandise. Premium quality gear designed for the community.",
    type: "website",
    url: "https://prozilligaming.com/shop",
    images: [{ url: "/images/heroes/hero-shop.png", width: 1200, height: 630, alt: "Prozilli Gaming Official Merchandise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Merch | Prozilli Gaming",
    description: "Premium gaming merchandise. Rep the Prozilli brand.",
    images: ["/images/heroes/hero-shop.png"],
  },
  alternates: { canonical: "https://prozilligaming.com/shop" },
};

const FALLBACK_PRODUCTS: ShopProduct[] = [
  {
    id: "pg-hoodie-black", slug: "pg-hoodie-black", name: "Prozilli Gaming Hoodie", category: "Apparel",
    price: { value: 54.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/hoodie-placeholder.png", description: "Premium heavyweight hoodie with embroidered logo.",
    variants: [
      { id: "pg-hoodie-black-s", name: "Black / S", price: { value: 54.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Black", swatch: "black" }, size: { name: "S" } } },
      { id: "pg-hoodie-black-m", name: "Black / M", price: { value: 54.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Black", swatch: "black" }, size: { name: "M" } } },
      { id: "pg-hoodie-black-l", name: "Black / L", price: { value: 54.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Black", swatch: "black" }, size: { name: "L" } } },
      { id: "pg-hoodie-black-xl", name: "Black / XL", price: { value: 54.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Black", swatch: "black" }, size: { name: "XL" } } },
    ],
    hasVariants: true, availableColors: ["Black"], availableSizes: ["S", "M", "L", "XL"],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
  {
    id: "pg-tee-red", slug: "pg-tee-red", name: "PG Logo Tee - Red Edition", category: "Apparel",
    price: { value: 29.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/tee-placeholder.png", description: "Soft cotton tee with screen-printed logo.",
    variants: [
      { id: "pg-tee-red-s", name: "Red / S", price: { value: 29.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Red", swatch: "red" }, size: { name: "S" } } },
      { id: "pg-tee-red-m", name: "Red / M", price: { value: 29.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Red", swatch: "red" }, size: { name: "M" } } },
      { id: "pg-tee-red-l", name: "Red / L", price: { value: 29.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Red", swatch: "red" }, size: { name: "L" } } },
    ],
    hasVariants: true, availableColors: ["Red"], availableSizes: ["S", "M", "L"],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
  {
    id: "pg-snapback", slug: "pg-snapback", name: "PG Snapback Cap", category: "Accessories",
    price: { value: 24.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/cap-placeholder.png", description: "Structured snapback with embroidered logo.",
    variants: [
      { id: "pg-snapback-black", name: "Black", price: { value: 24.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Black", swatch: "black" } } },
      { id: "pg-snapback-red", name: "Red", price: { value: 24.99, currency: "USD" }, available: true, images: [], attributes: { color: { name: "Red", swatch: "red" } } },
    ],
    hasVariants: true, availableColors: ["Black", "Red"], availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
  {
    id: "pg-mousepad-xl", slug: "pg-mousepad-xl", name: "Prozilli Mousepad XL", category: "Gear",
    price: { value: 19.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/mousepad-placeholder.png", description: "Extended gaming mousepad with stitched edges.",
    variants: [{ id: "pg-mousepad-xl-default", name: "Default", price: { value: 19.99, currency: "USD" }, available: true, images: [], attributes: {} }],
    hasVariants: false, availableColors: [], availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
  {
    id: "pg-mug", slug: "pg-mug", name: "PG Coffee Mug", category: "Accessories",
    price: { value: 14.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/mug-placeholder.png", description: "15oz ceramic mug, dishwasher safe.",
    variants: [{ id: "pg-mug-default", name: "Default", price: { value: 14.99, currency: "USD" }, available: true, images: [], attributes: {} }],
    hasVariants: false, availableColors: [], availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
  {
    id: "pg-sticker-pack", slug: "pg-sticker-pack", name: "Sticker Pack", category: "Accessories",
    price: { value: 9.99, currency: "USD" }, compareAtPrice: null, currency: "USD", images: [],
    thumbnail: "/images/shop/stickers-placeholder.png", description: "Pack of 5 vinyl die-cut stickers.",
    variants: [{ id: "pg-sticker-pack-default", name: "Default", price: { value: 9.99, currency: "USD" }, available: true, images: [], attributes: {} }],
    hasVariants: false, availableColors: [], availableSizes: [],
    url: "https://prozilli-shop.fourthwall.com", available: true,
  },
];

export default async function ShopPage() {
  const shopData = await getShopProducts();
  const products = shopData.products.length > 0 ? shopData.products : FALLBACK_PRODUCTS;
  const storeUrl = shopData.storeUrl || "https://prozilli-shop.fourthwall.com";
  const isUsingFallback = shopData.products.length === 0;

  return (
    <>
      <PageHero
        label="Official Merch"
        labelColor="red"
        title="THE SHOP"
        subtitle="Rep the brand. Premium quality gear designed for the community."
      >
        <Link
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Visit Full Store
        </Link>
      </PageHero>

      {isUsingFallback && (
        <section className="border-b border-gold/20 bg-gold/5">
          <div className="mx-auto max-w-4xl px-6 py-4 text-center">
            <p className="text-sm text-gold">
              Preview Mode — Visit our{" "}
              <Link href={storeUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                Fourthwall store
              </Link>{" "}
              for all products and purchases.
            </p>
          </div>
        </section>
      )}

      <ShopGrid products={products} storeUrl={storeUrl} />

      {/* Fourthwall notice */}
      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-center">
          <span className="text-label text-gold">Powered by Fourthwall</span>
          <p className="text-body mt-3 max-w-lg text-base">
            All orders are fulfilled through our official Fourthwall store.
            Secure checkout, quality guarantee, and worldwide shipping.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-6 text-xs text-dim">
            <span>Secure Checkout</span>
            <span>Worldwide Shipping</span>
            <span>Easy Returns</span>
          </div>
        </div>
      </section>
    </>
  );
}
