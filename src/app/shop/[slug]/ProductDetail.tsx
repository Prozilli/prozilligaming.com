"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function ProductDetail() {
  const params = useParams();
  const paramSlug = params?.slug as string;
  // In static export, CF Pages _redirects serves /shop/placeholder for all /shop/:slug
  // So useParams may return "placeholder" — fall back to reading from actual URL
  const slug = (!paramSlug || paramSlug === "placeholder")
    ? (typeof window !== "undefined" ? window.location.pathname.split("/shop/")[1]?.split("/")[0] || paramSlug : paramSlug)
    : paramSlug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/prismai/shop/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data.product || data);
      } catch {
        setError("Product not found or unavailable.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  async function addToCart() {
    if (!product || !product.variants[selectedVariant]) return;
    setAddingToCart(true);
    try {
      const res = await fetch("/api/prismai/shop/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: product.variants[selectedVariant].id,
          quantity: 1,
        }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      const data = await res.json();
      const cartId = data.cart?.id || data.id;
      if (cartId) {
        window.location.href = `https://prozilli-shop.fourthwall.com/checkout/?cartCurrency=USD&cartId=${cartId}`;
      }
    } catch {
      alert("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-base min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-surface rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 bg-surface rounded w-1/4" />
              <div className="h-8 bg-surface rounded w-3/4" />
              <div className="h-4 bg-surface rounded w-full" />
              <div className="h-4 bg-surface rounded w-2/3" />
              <div className="h-12 bg-surface rounded w-1/2 mt-8" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="py-32 bg-base min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-headline mb-4">Product Not Found</h1>
          <p className="text-muted mb-8">{error || "This product doesn't exist or has been removed."}</p>
          <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </section>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const price = currentVariant?.unitPrice ? `$${currentVariant.unitPrice.value.toFixed(2)}` : "$0.00";

  const attributeTypes: Record<string, string[]> = {};
  for (const v of product.variants) {
    if (v.attributes) {
      for (const [key, val] of Object.entries(v.attributes)) {
        if (!attributeTypes[key]) attributeTypes[key] = [];
        if (!attributeTypes[key].includes(val)) attributeTypes[key].push(val);
      }
    }
  }

  return (
    <section className="py-32 bg-base min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span className="text-dim">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square bg-surface rounded-xl overflow-hidden mb-4">
              {product.images?.[selectedImage]?.url ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dots">
                  <svg className="w-16 h-16 text-dim" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === i ? "border-red" : "border-glass-border hover:border-glass-border-hover"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-gold mb-6">{price}</p>

            {product.description && (
              <div
                className="text-sm text-muted mb-8 prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {Object.entries(attributeTypes).map(([attrName, values]) => (
              <div key={attrName} className="mb-6">
                <label className="text-xs font-bold text-dim uppercase tracking-wider mb-2 block">
                  {attrName}
                </label>
                <div className="flex flex-wrap gap-2">
                  {values.map((val) => {
                    const variantIdx = product.variants.findIndex(
                      (v) => v.attributes?.[attrName] === val
                    );
                    const isSelected = currentVariant?.attributes?.[attrName] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => variantIdx >= 0 && setSelectedVariant(variantIdx)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-red text-white"
                            : "bg-glass border border-glass-border hover:border-glass-border-hover text-muted"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={addToCart}
              disabled={addingToCart}
              className="btn btn-primary btn-lg w-full mt-4"
            >
              {addingToCart ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Adding to Cart...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  Add to Cart — {price}
                </>
              )}
            </button>

            <p className="text-xs text-dim mt-4 text-center">
              Secure checkout. Worldwide shipping available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
