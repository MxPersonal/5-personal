import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://templatee-1.vercel.app";
  const staticPages = ["", "/shop", "/shipping", "/returns", "/support"].map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : .7 }));
  const productPages = products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: .8 }));
  return [...staticPages, ...productPages];
}
