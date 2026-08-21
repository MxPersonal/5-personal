"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="not-found shell"><span>خطا</span><h1>مشکلی در نمایش صفحه رخ داد.</h1><p>اتصال خود را بررسی کنید یا دوباره تلاش کنید.</p><div><button type="button" onClick={reset}>تلاش دوباره</button></div></div>;
}
