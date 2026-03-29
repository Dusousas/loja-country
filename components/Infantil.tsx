import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export default async function Infantil() {
  const products = await getHomeFeaturedProducts("infantil");

  return (
    <HomeProductShelf
      badge="Linha especial"
      title="Linha infantil"
      description="Os destaques infantis ficam centralizados aqui e os mais antigos saem automaticamente quando novos itens sao marcados."
      products={products}
    />
  );
}
