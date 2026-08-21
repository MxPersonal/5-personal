"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { categories, type Category, type Product } from "@/lib/catalog";
import { Icon } from "./icon";
import { ProductCard } from "./product-card";

export function ShopCatalog({ products, initialQuery = "", initialCategory = "همه" }: { products: Product[]; initialQuery?: string; initialCategory?: string }) {
  const validCategory = categories.includes(initialCategory as Category) ? initialCategory as Category : "همه";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Category>(validCategory);
  const deferredQuery = useDeferredValue(query.trim());

  const filtered = useMemo(() => products.filter((product) => {
    const categoryMatches = category === "همه" || product.category === category;
    const queryMatches = !deferredQuery || `${product.name} ${product.englishName} ${product.category}`.toLocaleLowerCase("fa").includes(deferredQuery.toLocaleLowerCase("fa"));
    return categoryMatches && queryMatches;
  }), [category, deferredQuery, products]);

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-search"><Icon name="search" size={18}/><label className="sr-only" htmlFor="catalog-query">جست‌وجو در محصولات</label><input id="catalog-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام یا دسته محصول"/></div>
        <span aria-live="polite">{new Intl.NumberFormat("fa-IR").format(filtered.length)} محصول</span>
      </div>
      <div className="filters" aria-label="فیلتر دسته‌بندی">{categories.map((item) => <button type="button" aria-pressed={category === item} className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      {filtered.length ? <div className="product-grid shop-grid">{filtered.map((product) => <ProductCard product={product} key={product.id}/>)}</div> : <div className="empty-state"><span>۰ نتیجه</span><h2>محصولی پیدا نشد.</h2><p>عبارت جست‌وجو یا دسته‌بندی را تغییر دهید.</p><button type="button" onClick={() => { setQuery(""); setCategory("همه"); }}>پاک‌کردن فیلترها</button></div>}
    </>
  );
}
