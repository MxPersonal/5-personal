import type { Metadata } from "next";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { FormNotice } from "@/components/auth-shell";
import { DashboardHeader } from "@/components/dashboard-shell";
import { formatPrice } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "مدیریت سفارش‌ها", robots: { index: false, follow: false } };
const statuses = [{ value: "pending", label: "در انتظار پرداخت" }, { value: "paid", label: "پرداخت‌شده" }, { value: "processing", label: "آماده‌سازی" }, { value: "shipped", label: "ارسال‌شده" }, { value: "delivered", label: "تحویل‌شده" }, { value: "cancelled", label: "لغوشده" }];
type Props = { searchParams: Promise<{ message?: string; error?: string }> };
export default async function AdminOrdersPage({ searchParams }: Props) {
  const [, notice] = await Promise.all([requireAdmin(), searchParams]);
  const supabase = await createClient();
  const { data: orders } = await supabase.from("orders").select("id, user_id, total_amount, status, created_at").order("created_at", { ascending: false });
  const userIds = [...new Set(orders?.map((order) => order.user_id) ?? [])];
  const { data: profiles } = userIds.length ? await supabase.from("profiles").select("id, full_name").in("id", userIds) : { data: [] };
  const names = new Map(profiles?.map((profile) => [profile.id, profile.full_name]));
  return <><DashboardHeader eyebrow="عملیات فروش" title="مدیریت سفارش‌ها" description="پس از اتصال درگاه، سفارش‌های پرداخت‌شده از همین‌جا وارد چرخه ارسال می‌شوند."/><FormNotice {...notice}/><section className="dashboard-panel">{orders?.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>سفارش</th><th>مشتری</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><code>{order.id.slice(0, 8)}</code></td><td>{names.get(order.user_id) || "—"}</td><td>{new Date(order.created_at).toLocaleDateString("fa-IR")}</td><td>{formatPrice(order.total_amount)}</td><td><form className="status-form" action={updateOrderStatusAction}><input type="hidden" name="id" value={order.id}/><select name="status" defaultValue={order.status}>{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><button type="submit">ذخیره</button></form></td></tr>)}</tbody></table></div> : <div className="panel-empty"><strong>هنوز سفارش واقعی ثبت نشده است.</strong><p>عمداً داده نمایشی ساخته نشده؛ پس از اتصال درگاه، فقط سفارش‌های معتبر اینجا خواهند بود.</p></div>}</section></>;
}
