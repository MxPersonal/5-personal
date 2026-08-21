import { products as fallbackProducts, type Product } from "@/lib/catalog";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  english_name: string;
  category: Product["category"];
  price: number;
  compare_at_price: number | null;
  badge: string | null;
  accent: string;
  accent_soft: string;
  artwork: Product["artwork"];
  short_description: string;
  description: string;
  features: string[];
};

const mapProduct = (row: ProductRow): Product => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  englishName: row.english_name,
  category: row.category,
  price: row.price,
  compareAtPrice: row.compare_at_price ?? undefined,
  badge: row.badge ?? undefined,
  accent: row.accent,
  accentSoft: row.accent_soft,
  artwork: row.artwork,
  shortDescription: row.short_description,
  description: row.description,
  features: row.features,
});

export async function getCatalogProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig) return fallbackProducts;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("id, slug, name, english_name, category, price, compare_at_price, badge, accent, accent_soft, artwork, short_description, description, features").eq("is_active", true).order("id");
    if (error || !data?.length) return fallbackProducts;
    return (data as ProductRow[]).map(mapProduct);
  } catch {
    return fallbackProducts;
  }
}

export async function getCatalogProduct(slug: string) {
  const catalog = await getCatalogProducts();
  return catalog.find((product) => product.slug === slug);
}
