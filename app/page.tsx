import Banner1 from "@/components/Banner1";
import Blusas from "@/components/Blusas";
import Chapeus from "@/components/Chapeus";
import Hero from "@/components/Hero";
import Infantil from "@/components/Infantil";
import Instagram from "@/components/Instagram";
import LineIcons from "@/components/LineIcons";
import Promocao from "@/components/Promocao";
import Sex from "@/components/Sex";

export default function Home() {
  return (
    <>
      <Hero />
      <Promocao />
      <LineIcons />
      <Sex />
      <Chapeus />
      <Banner1 />
      <Blusas />
      <Infantil />
      <Instagram />
    </>
  );
}
