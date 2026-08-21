import type { Metadata } from "next";
import { updateCustomerRoleAction } from "@/app/admin/actions";
import { FormNotice } from "@/components/auth-shell";
import { DashboardHeader } from "@/components/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "مدیریت مشتریان", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ message?: string; error?: string }> };
export default async function AdminCustomersPage({ searchParams }: Props) {
  const [, notice] = await Promise.all([requireAdmin(), searchParams]);
  const supabase = await createClient();
  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, phone, created_at").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id, role"),
  ]);
  const roleByUser = new Map(roles?.map((role) => [role.user_id, role.role]));
  return <><DashboardHeader eyebrow="مشتریان" title="حساب‌ها و دسترسی‌ها" description="سطح ادمین فقط از جدول محافظت‌شده نقش‌ها کنترل می‌شود و از metadata کاربر خوانده نمی‌شود."/><FormNotice {...notice}/><section className="dashboard-panel"><div className="data-table-wrap"><table className="data-table"><thead><tr><th>نام</th><th>تماس</th><th>عضویت</th><th>دسترسی</th></tr></thead><tbody>{profiles?.map((profile) => <tr key={profile.id}><td><strong>{profile.full_name || "بدون نام"}</strong><small><code>{profile.id.slice(0, 8)}</code></small></td><td>{profile.phone || "—"}</td><td>{new Date(profile.created_at).toLocaleDateString("fa-IR")}</td><td><form className="status-form" action={updateCustomerRoleAction}><input type="hidden" name="userId" value={profile.id}/><select name="role" defaultValue={roleByUser.get(profile.id) ?? "customer"}><option value="customer">مشتری</option><option value="admin">ادمین</option></select><button type="submit">ذخیره</button></form></td></tr>)}</tbody></table></div></section></>;
}
