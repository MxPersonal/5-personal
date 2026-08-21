import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormNotice } from "@/components/auth-shell";
import { updatePasswordAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "رمز عبور جدید", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ error?: string }> };
export default async function UpdatePasswordPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return <AuthShell eyebrow="امنیت حساب" title="رمز عبور جدید" description="یک رمز قوی و منحصربه‌فرد برای حساب خود انتخاب کنید." footer={<Link href="/account">بازگشت به حساب</Link>}><FormNotice error={error}/><form className="auth-form" action={updatePasswordAction}><label>رمز عبور جدید<input name="password" type="password" autoComplete="new-password" minLength={8} required/></label><button className="primary-button" type="submit">ذخیره رمز جدید</button></form></AuthShell>;
}
