import type { Metadata } from "next";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "داشبورد مدیریت", robots: { index: false, follow: false } };
export default async function AdminPage() {
  await requireAdmin();
  const supabase = await createClient();
  const [products, orders, customers, pending] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).in("status", ["paid", "processing"]),
  ]);
  const stats = [{ label: "محصول", value: products.count ?? 0, href: "/admin/products" }, { label: "سفارش", value: orders.count ?? 0, href: "/admin/orders" }, { label: "مشتری", value: customers.count ?? 0, href: "/admin/customers" }, { label: "نیازمند اقدام", value: pending.count ?? 0, href: "/admin/orders" }];
  return <><DashboardHeader eyebrow="مرکز عملیات" title="وضعیت فروشگاه در یک نگاه" description="داده‌ها مستقیماً از پایگاه داده و مطابق سطح دسترسی ادمین خوانده می‌شوند."/><div className="stat-grid">{stats.map((stat) => <Link href={stat.href} key={stat.label}><strong>{new Intl.NumberFormat("fa-IR").format(stat.value)}</strong><span>{stat.label}</span></Link>)}</div><section className="dashboard-panel"><h3>اقدام‌های سریع</h3><div className="quick-links"><Link href="/admin/products#new-product">افزودن محصول</Link><Link href="/admin/orders">مدیریت سفارش‌ها</Link><Link href="/shop">مشاهده فروشگاه</Link></div></section></>;
}
