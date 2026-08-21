import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormNotice } from "@/components/auth-shell";
import { requestPasswordResetAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "بازیابی رمز عبور", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ message?: string; error?: string }> };
export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  return <AuthShell eyebrow="بازیابی حساب" title="رمز تازه بسازید." description="ایمیل حساب را وارد کنید تا لینک امن بازیابی ارسال شود." footer={<Link href="/login">بازگشت به ورود</Link>}><FormNotice {...params}/><form className="auth-form" action={requestPasswordResetAction}><label>ایمیل<input name="email" type="email" inputMode="email" autoComplete="email" required/></label><button className="primary-button" type="submit">ارسال لینک بازیابی</button></form></AuthShell>;
}
