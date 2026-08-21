import type { Metadata } from "next";
import { deleteAddressAction, saveAddressAction } from "@/app/auth-actions";
import { FormNotice } from "@/components/auth-shell";
import { DashboardHeader } from "@/components/dashboard-shell";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "آدرس‌های من", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ message?: string; error?: string }> };
export default async function AddressesPage({ searchParams }: Props) {
  const [user, notice] = await Promise.all([requireUser(), searchParams]);
  const supabase = await createClient();
  const { data: addresses } = await supabase.from("addresses").select("id, title, recipient_name, phone, province, city, postal_code, address_line").eq("user_id", user.id).order("created_at", { ascending: false });
  return <><DashboardHeader eyebrow="دفترچه آدرس" title="آدرس‌های ارسال" description="آدرس‌های خود را برای تکمیل سریع‌تر سفارش مدیریت کنید."/><FormNotice {...notice}/><div className="dashboard-columns"><section className="dashboard-panel"><h3>آدرس‌های ذخیره‌شده</h3>{addresses?.length ? <div className="address-list">{addresses.map((address) => <article key={address.id}><div><strong>{address.title}</strong><p>{address.recipient_name} · {address.phone}</p><p>{address.province}، {address.city}، {address.address_line}</p><small>کدپستی: {address.postal_code}</small></div><form action={deleteAddressAction}><input type="hidden" name="id" value={address.id}/><button className="danger-link" type="submit">حذف</button></form></article>)}</div> : <div className="panel-empty"><strong>آدرسی ثبت نشده است.</strong></div>}</section><section className="dashboard-panel"><h3>افزودن آدرس</h3><form className="panel-form compact" action={saveAddressAction}><label>عنوان<input name="title" placeholder="خانه یا محل کار" required/></label><label>تحویل‌گیرنده<input name="recipientName" autoComplete="name" required/></label><label>شماره تماس<input name="phone" inputMode="tel" autoComplete="tel" required/></label><div className="form-row"><label>استان<input name="province" required/></label><label>شهر<input name="city" required/></label></div><label>کدپستی<input name="postalCode" inputMode="numeric" autoComplete="postal-code" required/></label><label>نشانی کامل<textarea name="addressLine" rows={4} autoComplete="street-address" required/></label><button className="primary-button" type="submit">ثبت آدرس</button></form></section></div></>;
}
