import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Promocao() {
  const products = await getHomeFeaturedProducts("promocoes");

  return (
    <HomeProductShelf
      badge="Curadoria"
      title="Promocoes em destaque"
      description="Os quatro destaques mais recentes marcados no painel aparecem aqui automaticamente."
      products={products}
    />
  );
}
