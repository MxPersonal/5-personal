import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "ارسال و تحویل", description: "روش‌ها، زمان‌بندی و شرایط ارسال سفارش‌های نُوین." };

export default function ShippingPage() {
  return <InfoPage kicker="راهنمای خرید" title="ارسال روشن و قابل پیگیری." intro="سفارش‌ها پس از کنترل کیفیت و بسته‌بندی امن برای ارسال آماده می‌شوند." sections={[{title:"آماده‌سازی",body:"سفارش‌های موجود معمولاً در یک روز کاری بررسی، بسته‌بندی و تحویل شرکت حمل می‌شوند."},{title:"زمان تحویل",body:"زمان معمول تحویل برای مراکز استان ۲ تا ۴ روز کاری و برای سایر شهرها ۳ تا ۶ روز کاری است."},{title:"پیگیری",body:"پس از اتصال سامانه سفارش، کد رهگیری از طریق حساب کاربری و پیامک در دسترس خواهد بود."}]}/>;
}
