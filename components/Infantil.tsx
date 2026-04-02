import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Infantil() {
  const products = await getHomeFeaturedProducts("infantil");

  return <HomeProductShelf title="Nossos Cintos" products={products} />;
}
