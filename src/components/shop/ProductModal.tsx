"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { formatPrice, type ShopProduct } from "@/lib/api";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: ShopProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get unique colors and sizes from variants
  const colors = product.availableColors;
  const sizes = product.availableSizes;

  // Find selected variant based on color and size
  const selectedVariant = product.variants.find((v) => {
    const colorMatch =
      !colors.length || v.attributes.color?.name === selectedColor;
    const sizeMatch = !sizes.length || v.attributes.size?.name === selectedSize;
    return colorMatch && sizeMatch;
  });

  // Default to first available variant on mount or when product changes
  useEffect(() => {
    if (product.variants.length > 0) {
      const firstAvailable =
        product.variants.find((v) => v.available) || product.variants[0];
      if (firstAvailable.attributes.color?.name) {
        setSelectedColor(firstAvailable.attributes.color.name);
      } else if (colors.length > 0) {
        setSelectedColor(colors[0]);
      }
      if (firstAvailable.attributes.size?.name) {
        setSelectedSize(firstAvailable.attributes.size.name);
      } else if (sizes.length > 0) {
        setSelectedSize(sizes[0]);
      }
    }
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [product, colors, sizes]);

  // Update image when color changes - find first variant with that color and show its image
  useEffect(() => {
    if (selectedColor) {
      const colorVariant = product.variants.find(
        (v) => v.attributes.color?.name === selectedColor
      );
      if (colorVariant?.images && colorVariant.images.length > 0) {
        // Find the index of the variant's first image in the product images
        const variantImageUrl = colorVariant.images[0].url;
        const imageIndex = product.images.findIndex((img) => img.url === variantImageUrl);
        if (imageIndex >= 0) {
          setCurrentImageIndex(imageIndex);
        }
      }
    }
  }, [selectedColor, product.variants, product.images]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant) return;

    const variantName = [
      selectedVariant.attributes.color?.name,
      selectedVariant.attributes.size?.name,
    ]
      .filter(Boolean)
      .join(" / ");

    addItem({
      variantId: selectedVariant.id,
      productSlug: product.slug,
      productName: product.name,
      variantName: variantName || "Default",
      price: selectedVariant.price.value,
      currency: selectedVariant.price.currency,
      quantity,
      image: product.images[0]?.url,
    });
  }, [selectedVariant, product, quantity, addItem]);

  if (!isOpen) return null;

  const images = product.images.length > 0 ? product.images : [{ url: "", alt: product.name }];
  const isOutOfStock = selectedVariant && !selectedVariant.available;
  const displayPrice = selectedVariant?.price || product.price;
  const displayComparePrice = selectedVariant?.compareAtPrice || product.compareAtPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-lg bg-brand-darker border-0 sm:border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:gap-8 md:p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-white/5 to-transparent">
              {images[currentImageIndex]?.url ? (
                <Image
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/10">PG</span>
                </div>
              )}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="rounded-sm bg-white/10 px-4 py-2 text-sm font-medium text-white">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                      idx === currentImageIndex
                        ? "border-brand-red"
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="h-full w-full bg-white/5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="text-xs font-medium uppercase tracking-wider text-brand-red">
              {product.category}
            </span>

            {/* Name */}
            <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white md:text-3xl">
              {product.name}
            </h2>

            {/* Price */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl font-bold text-brand-gold">
                {formatPrice(displayPrice)}
              </span>
              {displayComparePrice && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(displayComparePrice)}
                </span>
              )}
              {displayComparePrice && (
                <span className="rounded-sm bg-brand-red px-2 py-1 text-xs font-semibold text-white">
                  SALE
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            {/* Variant Selectors */}
            <div className="mt-4 sm:mt-6 space-y-4">
              {/* Color Selector */}
              {colors.length > 0 && (
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-brand-silver">
                    Color: {selectedColor}
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-2">
                    {colors.map((color) => {
                      const colorVariant = product.variants.find(
                        (v) => v.attributes.color?.name === color
                      );
                      const swatch = colorVariant?.attributes.color?.swatch || color;
                      const isSelected = selectedColor === color;

                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`relative h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 transition-all ${
                            isSelected
                              ? "border-brand-red ring-2 ring-brand-red/30"
                              : "border-white/20 hover:border-white/40"
                          }`}
                          style={{
                            backgroundColor: getColorHex(swatch),
                          }}
                          title={color}
                          aria-label={`Select ${color}`}
                        >
                          {isSelected && (
                            <svg
                              className="absolute inset-0 m-auto h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke={isLightColor(swatch) ? "#000" : "#fff"}
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-brand-silver">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const sizeVariant = product.variants.find(
                        (v) =>
                          v.attributes.size?.name === size &&
                          (!selectedColor || v.attributes.color?.name === selectedColor)
                      );
                      const isAvailable = sizeVariant?.available ?? false;
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`min-w-[3rem] rounded-sm border px-3 py-2 text-sm font-medium transition-all ${
                            isSelected
                              ? "border-brand-red bg-brand-red text-white"
                              : isAvailable
                              ? "border-white/20 text-white hover:border-brand-red/50"
                              : "cursor-not-allowed border-white/10 text-white/30 line-through"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-brand-silver">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:border-white/40"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center text-lg font-medium text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:border-white/40"
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || !selectedVariant}
                className={`w-full rounded-sm px-6 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                  isOutOfStock || !selectedVariant
                    ? "cursor-not-allowed bg-white/10 text-white/40"
                    : "bg-brand-red text-white hover:bg-brand-red/80 active:scale-[0.98]"
                }`}
              >
                {isOutOfStock ? "Sold Out" : "Add to Cart"}
              </button>
            </div>

            {/* View on Fourthwall link */}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-xs text-muted transition-colors hover:text-white"
            >
              View on Fourthwall
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to convert color names to hex (or pass through hex values)
function getColorHex(colorNameOrHex: string): string {
  // If already a hex color, return it directly
  if (colorNameOrHex.startsWith("#")) {
    return colorNameOrHex;
  }

  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#ffffff",
    red: "#dc2626",
    blue: "#2563eb",
    cobalt: "#0047ab",
    navy: "#001c3f",
    green: "#16a34a",
    yellow: "#eab308",
    orange: "#ea580c",
    chestnut: "#954535",
    purple: "#9333ea",
    pink: "#ec4899",
    gray: "#6b7280",
    grey: "#6b7280",
    brown: "#92400e",
    gold: "#c4a265",
    silver: "#949d9f",
    charcoal: "#36454f",
    heather: "#9ca3af",
  };

  const key = colorNameOrHex.toLowerCase().split(" ")[0];
  return colorMap[key] || "#6b7280";
}

// Helper to determine if a color is light (for checkmark contrast)
function isLightColor(colorNameOrHex: string): boolean {
  // If hex color, calculate luminance
  if (colorNameOrHex.startsWith("#")) {
    const hex = colorNameOrHex.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }

  const lightColors = ["white", "yellow", "gold", "silver", "heather", "light"];
  const key = colorNameOrHex.toLowerCase();
  return lightColors.some((c) => key.includes(c));
}
