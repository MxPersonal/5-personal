import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop-catalog";
import { getCatalogProducts } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "همه محصولات منتخب نُوین در دسته‌های دیجیتال، اکسسوری، خانه و مد روزمره.",
  alternates: { canonical: "/shop" },
};

type ShopPageProps = { searchParams: Promise<{ q?: string; category?: string }> };

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [params, products] = await Promise.all([searchParams, getCatalogProducts()]);
  return (
    <div className="page-shell shell">
      <header className="page-hero"><p className="kicker">فروشگاه نُوین</p><h1>انتخاب‌های کم، دقیق و ماندگار.</h1><p>هر محصول با تمرکز بر کیفیت ساخت، کاربرد واقعی و طراحی ماندگار انتخاب شده است.</p></header>
      <ShopCatalog products={products} initialQuery={params.q ?? ""} initialCategory={params.category ?? "همه"}/>
    </div>
  );
}
