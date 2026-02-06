// PRISMAI API client for Twitch clips, VODs, and Shop

const API_BASE_URL = "https://api.prozilli.com";

// ============================================
// Shop Types
// ============================================

export interface VariantAttributes {
  color?: { name: string; swatch: string };
  size?: { name: string };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: { value: number; currency: string };
  compareAtPrice?: { value: number; currency: string };
  available: boolean;
  images: { url: string }[];
  attributes: VariantAttributes;
}

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: {
    value: number;
    currency: string;
  } | null;
  compareAtPrice: {
    value: number;
    currency: string;
  } | null;
  currency: string;
  images: { url: string; alt?: string }[];
  thumbnail: string | null;
  variants: ProductVariant[];
  hasVariants: boolean;
  availableColors: string[];
  availableSizes: string[];
  url: string;
  category: string;
  available: boolean;
}

export interface CartItem {
  variantId: string;
  productSlug: string;
  productName: string;
  variantName: string;
  price: number;
  currency: string;
  quantity: number;
  image?: string;
}

export interface CartResponse {
  cartId: string;
  checkoutUrl: string;
  itemCount: number;
  subtotal?: { value: number; currency: string };
}

export interface ShopCollection {
  slug: string;
  name: string;
}

export interface ShopResponse {
  products: ShopProduct[];
  collections: ShopCollection[];
  storeUrl: string;
  error?: string;
  configured?: boolean;
}

export interface TwitchClip {
  id: string;
  url: string;
  embedUrl: string;
  title: string;
  viewCount: number;
  createdAt: string;
  thumbnailUrl: string;
  duration: number;
  creatorName: string;
  gameId: string;
  videoId: string;
}

export interface TwitchVOD {
  id: string;
  url: string;
  title: string;
  description: string;
  viewCount: number;
  createdAt: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration: string; // Format: "1h2m3s"
  type: "archive" | "highlight" | "upload";
  streamId: string;
}

export interface ClipsResponse {
  clips: TwitchClip[];
  pagination?: { cursor?: string };
  channel: string;
  error?: string;
}

export interface VODsResponse {
  vods: TwitchVOD[];
  pagination?: { cursor?: string };
  channel: string;
  error?: string;
}

/**
 * Fetch recent clips from PRISMAI/Twitch
 */
export async function getTwitchClips(limit: number = 20): Promise<ClipsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/twitch/clips?limit=${limit}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch clips: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[API] Failed to fetch Twitch clips:", error);
    return { clips: [], channel: "prozilligaming", error: String(error) };
  }
}

/**
 * Fetch recent VODs from PRISMAI/Twitch
 */
export async function getTwitchVODs(
  limit: number = 20,
  type: "archive" | "highlight" | "upload" = "archive"
): Promise<VODsResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/twitch/vods?limit=${limit}&type=${type}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch VODs: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[API] Failed to fetch Twitch VODs:", error);
    return { vods: [], channel: "prozilligaming", error: String(error) };
  }
}

/**
 * Parse Twitch duration string (e.g., "1h2m3s") to seconds
 */
export function parseDuration(duration: string): number {
  const match = duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format seconds to human-readable duration
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Format view count with K/M suffixes
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths > 0) return `${diffMonths}mo ago`;
  if (diffWeeks > 0) return `${diffWeeks}w ago`;
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return "just now";
}

// ============================================
// Shop API Functions
// ============================================

/**
 * Fetch shop products from PRISMAI/Fourthwall
 */
export async function getShopProducts(): Promise<ShopResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/shop/products`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[API] Failed to fetch shop products:", error);
    return {
      products: [],
      collections: [],
      storeUrl: "https://prozilli-shop.fourthwall.com",
      error: String(error),
    };
  }
}

/**
 * Format price for display
 */
export function formatPrice(
  price: { value: number; currency: string } | null,
  fallback: string = "N/A"
): string {
  if (!price) return fallback;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency || "USD",
  });

  // Fourthwall prices are typically in cents
  const amount = price.value >= 100 ? price.value / 100 : price.value;
  return formatter.format(amount);
}

/**
 * Format price from cents to display value
 */
export function formatPriceFromCents(
  cents: number,
  currency: string = "USD"
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(cents / 100);
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<{ product: ShopProduct | null; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/shop/products/${slug}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { product: null, error: "Product not found" };
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();
    return { product: data.product };
  } catch (error) {
    console.error("[API] Failed to fetch product:", error);
    return { product: null, error: String(error) };
  }
}

/**
 * Create cart on Fourthwall and get checkout URL
 */
export async function createCart(
  items: { variantId: string; quantity: number }[]
): Promise<CartResponse> {
  const response = await fetch(`${API_BASE_URL}/shop/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Failed to create cart: ${response.status}`);
  }

  return response.json();
}
