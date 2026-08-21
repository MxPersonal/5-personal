import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductArtwork } from "@/components/product-artwork";
import { ProductCard } from "@/components/product-card";
import { formatPrice, products as fallbackProducts } from "@/lib/catalog";
import { getCatalogProduct, getCatalogProducts } from "@/lib/catalog-data";
import { Icon } from "@/components/icon";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fallbackProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.shortDescription, type: "website", url: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getCatalogProduct(slug), getCatalogProducts()]);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const productJsonLd = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, sku: `NV-${product.id.toString().padStart(4, "0")}`, brand: { "@type": "Brand", name: "نُوین" }, offers: { "@type": "Offer", priceCurrency: "IRR", price: product.price * 10, availability: "https://schema.org/InStock", url: `https://templatee-1.vercel.app/products/${product.slug}` } };

  return (
    <div className="product-page shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}/>
      <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/shop">فروشگاه</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
      <section className="product-detail">
        <div className="product-detail-art"><ProductArtwork product={product} hero/><span>تصویرسازی اختصاصی محصول</span></div>
        <div className="product-detail-copy"><p className="kicker">{product.category} · {product.englishName}</p>{product.badge && <span className="detail-badge">{product.badge}</span>}<h1>{product.name}</h1><p className="lead">{product.description}</p><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div><ul className="feature-list">{product.features.map((feature) => <li key={feature}><Icon name="check" size={17}/>{feature}</li>)}</ul><AddToCartButton productId={product.id}/><div className="delivery-note"><span>ارسال: ۲ تا ۴ روز کاری</span><span>ضمانت: اصالت و بازگشت هفت‌روزه</span></div></div>
      </section>
      {related.length > 0 && <section className="related-products"><div className="section-heading"><div><p className="kicker">پیشنهادهای نزدیک</p><h2>شاید این‌ها را هم دوست داشته باشید.</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item}/>)}</div></section>}
    </div>
  );
}
