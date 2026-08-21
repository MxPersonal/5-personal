"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";

export function CheckoutPreview() {
  const { items, subtotal } = useCart();
  if (!items.length) return <div className="empty-state checkout-empty"><Icon name="bag" size={46}/><h1>سبد خرید شما خالی است.</h1><p>برای ادامه، ابتدا یک محصول انتخاب کنید.</p><Link href="/shop">رفتن به فروشگاه</Link></div>;

  return (
    <div className="checkout-page shell">
      <header className="page-hero compact"><p className="kicker">تکمیل خرید</p><h1>اطلاعات ارسال و پرداخت</h1><p>ساختار Checkout آماده است؛ اتصال سفارش، پرداخت و موجودی در مرحله دیتابیس فعال می‌شود.</p></header>
      <div className="checkout-grid">
        <section className="checkout-form" aria-labelledby="shipping-heading"><h2 id="shipping-heading">اطلاعات تحویل</h2><div className="form-grid"><label>نام و نام خانوادگی<input disabled placeholder="در مرحله اتصال دیتابیس فعال می‌شود"/></label><label>شماره همراه<input disabled inputMode="tel" placeholder="۰۹xxxxxxxxx"/></label><label className="full">نشانی<input disabled placeholder="استان، شهر و نشانی کامل"/></label></div><div className="phase-note"><Icon name="check" size={18}/><div><strong>این صفحه عمداً سفارش آزمایشی ثبت نمی‌کند.</strong><p>در مرحله بعد Supabase، اعتبارسنجی، ثبت سفارش و درگاه پرداخت به همین جریان متصل می‌شوند.</p></div></div></section>
        <aside className="order-summary"><h2>خلاصه سفارش</h2>{items.map(({product,quantity})=><div className="summary-line" key={product.id}><span>{product.name} × {new Intl.NumberFormat("fa-IR").format(quantity)}</span><strong>{formatPrice(product.price*quantity)}</strong></div>)}<div className="summary-total"><span>جمع کالاها</span><strong>{formatPrice(subtotal)}</strong></div><Link href="/shop">ویرایش سبد و ادامه خرید</Link></aside>
      </div>
    </div>
  );
}
