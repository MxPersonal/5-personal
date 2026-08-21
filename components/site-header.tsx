"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";

const navigation = [
  { href: "/shop", label: "فروشگاه" },
  { href: "/#story", label: "داستان ما" },
  { href: "/#services", label: "خدمات" },
  { href: "/#contact", label: "تماس" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <>
      <a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
      <div className="announcement">ارسال رایگان برای خریدهای بالای ۲ میلیون تومان <span>•</span> ضمانت بازگشت هفت‌روزه</div>
      <header className="site-header">
        <div className="shell header-inner">
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="باز کردن منو" aria-expanded={menuOpen} aria-controls="main-navigation"><Icon name={menuOpen ? "close" : "menu"}/></button>
          <Link className="logo" href="/" aria-label="صفحه اصلی نُوین">نُوین<span>.</span></Link>
          <nav id="main-navigation" className={menuOpen ? "main-nav open" : "main-nav"} aria-label="منوی اصلی">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <form className="header-search" action="/shop" role="search">
              <label className="sr-only" htmlFor="header-query">جست‌وجوی محصول</label>
              <input id="header-query" name="q" placeholder="جست‌وجوی محصول" autoComplete="off"/>
              <button type="submit" aria-label="جست‌وجو"><Icon name="search" size={18}/></button>
            </form>
            <button className="cart-button" type="button" onClick={openCart} aria-label={`سبد خرید، ${totalItems} کالا`}>
              <Icon name="bag"/><span>{new Intl.NumberFormat("fa-IR").format(totalItems)}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
