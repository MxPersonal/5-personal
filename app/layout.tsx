import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatee-1.vercel.app"),
  title: { default: "نُوین | انتخاب‌های بهتر برای زندگی روزمره", template: "%s | نُوین" },
  description: "فروشگاه محصولات مینیمال و کاربردی برای خانه، کار و زندگی روزمره؛ با انتخاب دقیق، ضمانت اصالت و امکان بازگشت هفت‌روزه.",
  applicationName: "نُوین",
  category: "shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نُوین",
    title: "نُوین | انتخاب‌های بهتر برای زندگی روزمره",
    description: "محصولات مینیمال و کاربردی که با دقت برای زندگی روزمره انتخاب شده‌اند.",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "نُوین", description: "انتخاب‌های بهتر برای زندگی روزمره" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#18221f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
