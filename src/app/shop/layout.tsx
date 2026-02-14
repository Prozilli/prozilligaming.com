import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Official ProzilliGaming Merchandise",
  description:
    "Official ProzilliGaming merchandise. Premium apparel, accessories, digital goods, and limited-edition collectibles. Quality merch designed in-house by Prozilli Entertainment.",
  openGraph: {
    title: "Shop — Official ProzilliGaming Merchandise",
    description:
      "Official ProzilliGaming merch. Premium apparel, accessories, and limited-edition collectibles.",
    url: "https://prozilligaming.com/shop",
    images: [{ url: "/images/heroes/hero-home.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop — Official ProzilliGaming Merchandise",
    description:
      "Official ProzilliGaming merch. Premium apparel, accessories, and limited-edition collectibles.",
  },
};

const shopJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "ProzilliGaming Official Merchandise",
  "description":
    "Official merchandise from ProzilliGaming and Prozilli Entertainment. Premium apparel, accessories, digital goods, and limited-edition collectibles.",
  "url": "https://prozilligaming.com/shop",
  "numberOfItems": 0,
  "itemListElement": [],
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      {children}
    </>
  );
}
