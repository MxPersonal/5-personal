"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";
import { ProductArtwork } from "./product-artwork";

export function CartDrawer() {
  const { items, subtotal, totalItems, isOpen, closeCart, setQuantity, removeItem } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    closeButtonRef.current?.focus();
    dialog?.addEventListener("keydown", onKeyDown);
    return () => {
      dialog?.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <button className="cart-overlay" type="button" onClick={closeCart} aria-label="بستن سبد خرید" />
      <aside ref={dialogRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-head">
          <div>
            <p className="kicker">خرید شما</p>
            <h2 id="cart-title">سبد خرید <span>({new Intl.NumberFormat("fa-IR").format(totalItems)})</span></h2>
          </div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={closeCart} aria-label="بستن سبد خرید"><Icon name="close" /></button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty"><Icon name="bag" size={44}/><p>سبد خرید شما خالی است.</p><button type="button" onClick={closeCart}>ادامه خرید</button></div>
          ) : items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <div className="cart-art"><ProductArtwork product={product}/></div>
              <div className="cart-item-copy">
                <Link href={`/products/${product.slug}`} onClick={closeCart}>{product.name}</Link>
                <small>{formatPrice(product.price)}</small>
                <div className="quantity-control" aria-label={`تعداد ${product.name}`}>
                  <button type="button" onClick={() => setQuantity(product.id, quantity - 1)} aria-label={`کاهش تعداد ${product.name}`}><Icon name="minus" size={14}/></button>
                  <span aria-live="polite">{new Intl.NumberFormat("fa-IR").format(quantity)}</span>
                  <button type="button" onClick={() => setQuantity(product.id, quantity + 1)} aria-label={`افزایش تعداد ${product.name}`}><Icon name="plus" size={14}/></button>
                </div>
              </div>
              <button className="remove-item" type="button" onClick={() => removeItem(product.id)} aria-label={`حذف ${product.name}`}><Icon name="trash" size={18}/></button>
            </article>
          ))}
        </div>

        <div className="cart-footer">
          <div><span>جمع کالاها</span><strong>{formatPrice(subtotal)}</strong></div>
          <small>هزینه ارسال در مرحله بعد محاسبه می‌شود.</small>
          <Link className={items.length ? "checkout-link" : "checkout-link disabled"} href={items.length ? "/checkout" : "#"} aria-disabled={!items.length} onClick={() => items.length && closeCart()}>ادامه فرایند خرید <Icon name="arrow" size={18}/></Link>
          <div className="secure-note"><Icon name="check" size={15}/> خرید امن و ضمانت بازگشت هفت‌روزه</div>
        </div>
      </aside>
    </>
  );
}
