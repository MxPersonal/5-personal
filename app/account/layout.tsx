import { DashboardShell } from "@/components/dashboard-shell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const items = [{ href: "/account", label: "نمای کلی" }, { href: "/account/orders", label: "سفارش‌ها" }, { href: "/account/addresses", label: "آدرس‌ها" }];
  if (user.role === "admin") items.push({ href: "/admin", label: "پنل مدیریت" });
  return <DashboardShell title="حساب من" subtitle={user.fullName || user.email} items={items}>{children}</DashboardShell>;
}
