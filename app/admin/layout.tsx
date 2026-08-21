import { DashboardShell } from "@/components/dashboard-shell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const items = [{ href: "/admin", label: "داشبورد" }, { href: "/admin/products", label: "محصولات" }, { href: "/admin/orders", label: "سفارش‌ها" }, { href: "/admin/customers", label: "مشتریان" }, { href: "/account", label: "حساب شخصی" }];
  return <DashboardShell title="مدیریت فروشگاه" subtitle={admin.fullName || admin.email} items={items}>{children}</DashboardShell>;
}
