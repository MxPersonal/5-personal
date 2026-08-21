"use client";

import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";
import { ProductArtwork } from "./product-artwork";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link className="product-visual" href={`/products/${product.slug}`} aria-label={`مشاهده ${product.name}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <ProductArtwork product={product}/>
        <span className="view-product">مشاهده محصول</span>
      </Link>
      <div className="product-info">
        <div><small>{product.category}</small><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3></div>
        <p>{product.shortDescription}</p>
        <div className="product-bottom">
          <div className="price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
          <button className="quick-add" type="button" onClick={() => addItem(product.id)} aria-label={`افزودن ${product.name} به سبد خرید`}><Icon name="plus"/></button>
        </div>
      </div>
    </article>
  );
}
