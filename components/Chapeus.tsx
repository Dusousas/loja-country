import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Chapeus() {
  const products = await getHomeFeaturedProducts("chapeus");

  return <HomeProductShelf title="Nossas Calças" products={products} />;
}
