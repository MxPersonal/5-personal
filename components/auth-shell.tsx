import Link from "next/link";

export function AuthShell({ eyebrow, title, description, children, footer }: { eyebrow: string; title: string; description: string; children: React.ReactNode; footer: React.ReactNode }) {
  return <div className="auth-page shell"><section className="auth-card"><Link className="auth-brand" href="/">نُوین<span>.</span></Link><p className="kicker">{eyebrow}</p><h1>{title}</h1><p className="auth-description">{description}</p>{children}<div className="auth-footer">{footer}</div></section><aside className="auth-aside"><span>حساب امن نُوین</span><h2>خرید، آدرس‌ها و سفارش‌ها؛ همه در یک جا.</h2><ul><li>مشاهده وضعیت سفارش‌ها</li><li>مدیریت آدرس‌های ارسال</li><li>حفاظت از داده‌ها با دسترسی سطح‌بندی‌شده</li></ul></aside></div>;
}

export function FormNotice({ message, error }: { message?: string; error?: string }) {
  if (!message && !error) return null;
  return <p className={error ? "form-notice error" : "form-notice success"} role={error ? "alert" : "status"}>{error ?? message}</p>;
}
