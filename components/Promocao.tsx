import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Promocao() {
  const products = await getHomeFeaturedProducts("promocoes");

  return <HomeProductShelf title="Promocoes" products={products} />;
}
