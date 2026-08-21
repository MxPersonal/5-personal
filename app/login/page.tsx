import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormNotice } from "@/components/auth-shell";
import { googleLoginAction, loginAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "ورود به حساب", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ message?: string; error?: string; next?: string }> };
export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  return <AuthShell eyebrow="خوش آمدید" title="ورود به حساب" description="برای مدیریت سفارش‌ها و اطلاعات حساب وارد شوید." footer={<>حساب ندارید؟ <Link href="/register">ثبت‌نام کنید</Link></>}><FormNotice message={params.message} error={params.error}/>{googleEnabled && <><form action={googleLoginAction}><button className="oauth-button" type="submit">ادامه با Google</button></form><div className="form-divider"><span>یا</span></div></>}<form className="auth-form" action={loginAction}><input type="hidden" name="next" value={params.next ?? "/account"}/><label>ایمیل<input name="email" type="email" inputMode="email" autoComplete="email" required/></label><label>رمز عبور<input name="password" type="password" autoComplete="current-password" minLength={8} required/></label><Link className="inline-link" href="/forgot-password">رمز عبور را فراموش کرده‌اید؟</Link><button className="primary-button" type="submit">ورود امن</button></form></AuthShell>;
}
