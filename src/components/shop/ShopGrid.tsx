"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { formatPrice, type ShopProduct } from "@/lib/api";
import ProductModal from "./ProductModal";

interface ShopGridProps {
  products: ShopProduct[];
  storeUrl: string;
}

export default function ShopGrid({ products, storeUrl }: ShopGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <>
      {/* Category Filter */}
      {categories.length > 2 && (
        <section className="border-b border-[var(--color-border)] bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                    cat === activeCategory
                      ? "bg-red text-white"
                      : "border border-[var(--color-border)] text-muted hover:border-red/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-surface p-6">
              <svg
                className="h-12 w-12 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">No products available</h3>
            <p className="mt-2 text-sm text-muted">
              Check back soon for new merch drops!
            </p>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red px-6 py-3 text-sm font-medium tracking-wide text-white transition-all hover:bg-red/80"
            >
              Visit Fourthwall Store
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

// Product card component
function ProductCard({
  product,
  onClick,
}: {
  product: ShopProduct;
  onClick: () => void;
}) {
  const hasImage = product.thumbnail || product.images?.[0]?.url;
  const imageUrl = product.thumbnail || product.images?.[0]?.url;

  return (
    <button
      onClick={onClick}
      className="panel group overflow-hidden transition-all text-left w-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        {hasImage ? (
          <Image
            src={imageUrl!}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/10">PG</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-red/0 transition-colors group-hover:bg-red/10">
          <span className="translate-y-4 text-sm font-medium tracking-wide text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            Quick View
          </span>
        </div>
        {/* Compare at price badge */}
        {product.compareAtPrice && (
          <div className="absolute top-3 left-3 rounded-lg bg-red px-2 py-1 text-xs font-semibold text-white">
            SALE
          </div>
        )}
        {/* Out of stock badge */}
        {!product.available && (
          <div className="absolute top-3 right-3 rounded-lg bg-raised px-2 py-1 text-xs font-medium text-white/60">
            Sold Out
          </div>
        )}
        {/* Variants indicator */}
        {product.hasVariants && (product.availableColors.length > 1 || product.availableSizes.length > 1) && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.availableColors.length > 1 && (
              <span className="rounded-lg bg-black/60 px-2 py-1 text-xs text-white/80">
                {product.availableColors.length} colors
              </span>
            )}
            {product.availableSizes.length > 1 && (
              <span className="rounded-lg bg-black/60 px-2 py-1 text-xs text-white/80">
                {product.availableSizes.length} sizes
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs uppercase tracking-wider text-red">
          {product.category}
        </span>
        <h3 className="mt-2 text-base font-semibold tracking-wide text-white transition-colors group-hover:text-red">
          {product.name}
        </h3>
        <p className="mt-2 text-xs text-muted line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="rounded-lg bg-red/10 border border-red/30 px-4 py-2 text-xs font-medium tracking-wide text-red transition-all group-hover:bg-red group-hover:text-white">
            View
          </span>
        </div>
      </div>
    </button>
  );
}
