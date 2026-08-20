import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نُوین شاپ | فروشگاه آنلاین",
  description: "تمپلیت ساده، سریع و واکنش‌گرای فروشگاهی با Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
