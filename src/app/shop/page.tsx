import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

const PRODUCTS = [
  {
    name: "Prozilli Gaming Tee",
    category: "T-Shirt",
    price: "$29.99",
  },
  {
    name: "Prozilli Gaming Hoodie",
    category: "Hoodie",
    price: "$54.99",
  },
  {
    name: "PG Snapback",
    category: "Hat",
    price: "$24.99",
  },
  {
    name: "Prozilli Gaming Mug",
    category: "Mug",
    price: "$14.99",
  },
  {
    name: "PG Mousepad XL",
    category: "Mousepad",
    price: "$19.99",
  },
  {
    name: "Prozilli Sticker Pack",
    category: "Stickers",
    price: "$9.99",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            OFFICIAL <span className="text-brand-red">MERCH</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Rep the brand. Official Prozilli Gaming gear, powered by Fourthwall.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <a
              key={product.name}
              href="https://fourthwall.com/prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glow-border group rounded-lg p-6 transition-all"
            >
              {/* Placeholder image area */}
              <div className="mb-6 flex h-48 items-center justify-center rounded-md bg-white/5">
                <span className="text-xs uppercase tracking-widest text-muted">
                  {product.category}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-wide text-white transition-colors group-hover:text-brand-red">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-brand-gold">
                  {product.price}
                </span>
                <span className="text-xs uppercase tracking-wider text-brand-silver transition-colors group-hover:text-white">
                  View &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Full Store CTA */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
            FOURTHWALL
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Visit the Full Store
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Browse the complete Prozilli Gaming collection on Fourthwall. New drops, limited runs, and exclusive items.
          </p>
          <a
            href="https://fourthwall.com/prozilligaming"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-sm bg-brand-red px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
          >
            Visit the Full Store on Fourthwall
          </a>
        </div>
      </section>
    </>
  );
}
