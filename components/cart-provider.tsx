"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { products } from "@/lib/catalog";

type CartLine = { productId: number; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  items: Array<{ product: Product; quantity: number }>;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "novin-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

const isCartLine = (value: unknown): value is CartLine => {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return Number.isInteger(line.productId) && Number.isInteger(line.quantity) && line.quantity > 0;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) setLines(parsed.filter(isCartLine));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const addItem = useCallback((productId: number) => {
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      return existing
        ? current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(line.quantity + 1, 20) } : line)
        : [...current, { productId, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setLines((current) => current.filter((line) => line.productId !== productId));
      return;
    }
    setLines((current) => current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(quantity, 20) } : line));
  }, []);

  const removeItem = useCallback((productId: number) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const items = useMemo(() => lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  }), [lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    items,
    totalItems: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    isOpen,
    addItem,
    setQuantity,
    removeItem,
    clearCart: () => setLines([]),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [addItem, isOpen, items, lines, removeItem, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
