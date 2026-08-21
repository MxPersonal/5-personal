import { HomeStorefront } from "@/components/home-storefront";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function Home() {
  const products = await getCatalogProducts();
  return <HomeStorefront products={products} />;
}
