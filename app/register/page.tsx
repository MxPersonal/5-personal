import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormNotice } from "@/components/auth-shell";
import { googleLoginAction, registerAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "ساخت حساب", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ error?: string }> };
export default async function RegisterPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  return <AuthShell eyebrow="عضویت در نُوین" title="حساب شما، آماده در یک دقیقه." description="اطلاعات سفارش و آدرس‌ها با حساب شخصی شما همگام می‌مانند." footer={<>قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login">وارد شوید</Link></>}><FormNotice error={error}/>{googleEnabled && <><form action={googleLoginAction}><input type="hidden" name="source" value="register"/><button className="oauth-button" type="submit">ادامه با Google</button></form><div className="form-divider"><span>یا</span></div></>}<form className="auth-form" action={registerAction}><label>نام و نام خانوادگی<input name="fullName" autoComplete="name" minLength={2} maxLength={100} required/></label><label>ایمیل<input name="email" type="email" inputMode="email" autoComplete="email" required/></label><label>رمز عبور<input name="password" type="password" autoComplete="new-password" minLength={8} required/><small>حداقل ۸ کاراکتر</small></label><button className="primary-button" type="submit">ساخت حساب</button></form></AuthShell>;
}
