import Banner1 from "@/components/Banner1";
import Blusas from "@/components/Blusas";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import LineIcons from "@/components/LineIcons";
import Sex from "@/components/Sex";
import HomeProductShelf from "@/components/home/HomeProductShelf";
import { getHomeFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [promocoesProducts, chapeusProducts, infantilProducts] = await Promise.all([
    getHomeFeaturedProducts("promocoes"),
    getHomeFeaturedProducts("chapeus"),
    getHomeFeaturedProducts("infantil"),
  ]);

  return (
    <>
      <Hero />
      <HomeProductShelf title="Nossos Destaques" products={promocoesProducts} />
      <LineIcons />
      <Sex />
      <HomeProductShelf title="Nossas Calças" products={chapeusProducts} />
      <Banner1 />
      <Blusas />
      <HomeProductShelf title="Nossos Cintos" products={infantilProducts} />
      <Instagram />
    </>
  );
}
