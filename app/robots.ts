import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/checkout"] }, sitemap: "https://templatee-1.vercel.app/sitemap.xml", host: "https://templatee-1.vercel.app" };
}
