import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-shell";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = { title: "سفارش‌های من", robots: { index: false, follow: false } };
const status: Record<string, string> = { pending: "در انتظار پرداخت", paid: "پرداخت‌شده", processing: "در حال آماده‌سازی", shipped: "ارسال‌شده", delivered: "تحویل‌شده", cancelled: "لغوشده" };
export default async function OrdersPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: orders } = await supabase.from("orders").select("id, status, total_amount, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
  return <><DashboardHeader eyebrow="تاریخچه خرید" title="سفارش‌های من" description="وضعیت سفارش‌های واقعی پس از راه‌اندازی پرداخت در این بخش نمایش داده می‌شود."/><section className="dashboard-panel">{orders?.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>شماره سفارش</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><code>{order.id.slice(0, 8)}</code></td><td>{new Date(order.created_at).toLocaleDateString("fa-IR")}</td><td>{formatPrice(order.total_amount)}</td><td><span className="status-pill">{status[order.status] ?? order.status}</span></td></tr>)}</tbody></table></div> : <div className="panel-empty"><strong>هنوز سفارشی ثبت نشده است.</strong><p>پس از اتصال درگاه پرداخت، سفارش‌های نهایی و قابل پیگیری اینجا قرار می‌گیرند.</p></div>}</section></>;
}
