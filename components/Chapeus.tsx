import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Chapeus() {
  const products = await getHomeFeaturedProducts("chapeus");

  return (
    <HomeProductShelf
      badge="Selecao especial"
      title="Nossos chapeus"
      description="Os produtos marcados para a vitrine de chapeus no painel ficam aqui, sempre respeitando o limite de quatro."
      products={products}
    />
  );
}
