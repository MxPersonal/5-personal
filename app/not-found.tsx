import Link from "next/link";

export default function NotFound() {
  return <div className="not-found shell"><span>۴۰۴</span><h1>این صفحه پیدا نشد.</h1><p>ممکن است آدرس تغییر کرده باشد یا صفحه موردنظر دیگر در دسترس نباشد.</p><div><Link href="/">صفحه اصلی</Link><Link href="/shop">فروشگاه</Link></div></div>;
}
