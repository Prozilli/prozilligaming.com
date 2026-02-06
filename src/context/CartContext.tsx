"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { createCart, type CartItem } from "@/lib/api";

const CART_STORAGE_KEY = "prozilli-cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart to storage:", error);
      }
    }
  }, [items, isHydrated]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.variantId === newItem.variantId
      );

      if (existingIndex >= 0) {
        // Update quantity if item already exists
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      // Add new item
      return [...current, newItem];
    });

    // Open cart drawer when item is added
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((current) => current.filter((item) => item.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.variantId !== variantId));
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      const cartItems = items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const response = await createCart(cartItems);

      // Clear cart after successful checkout creation
      clearCart();
      setIsOpen(false);

      // Redirect to Fourthwall checkout
      window.location.href = response.checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }, [items, clearCart]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      checkout,
      isCheckingOut,
      itemCount,
      subtotal,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      checkout,
      isCheckingOut,
      itemCount,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
