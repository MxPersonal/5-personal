import type { Metadata } from "next";
import { updateProfileAction } from "@/app/auth-actions";
import { DashboardHeader } from "@/components/dashboard-shell";
import { FormNotice } from "@/components/auth-shell";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "حساب من", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ message?: string; error?: string }> };
export default async function AccountPage({ searchParams }: Props) {
  const [user, notice] = await Promise.all([requireUser(), searchParams]);
  return <><DashboardHeader eyebrow="پروفایل مشتری" title={`سلام${user.fullName ? `، ${user.fullName}` : ""}`} description="اطلاعات تماس را برای تجربه سریع‌تر در خریدهای بعدی به‌روز نگه دارید."/><FormNotice {...notice}/><section className="dashboard-panel"><h3>اطلاعات حساب</h3><form className="panel-form" action={updateProfileAction}><label>نام و نام خانوادگی<input name="fullName" defaultValue={user.fullName} autoComplete="name" minLength={2} required/></label><label>ایمیل<input value={user.email} disabled aria-describedby="email-help"/><small id="email-help">تغییر ایمیل پس از فعال‌سازی تأیید دومرحله‌ای ارائه می‌شود.</small></label><label>شماره تماس<input name="phone" defaultValue={user.phone} inputMode="tel" autoComplete="tel"/></label><button className="primary-button" type="submit">ذخیره تغییرات</button></form></section></>;
}
