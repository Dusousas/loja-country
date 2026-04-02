import Image from "next/image";
import Link from "next/link";

import blusasImage from "@/public/Blusas.avif";
import calcasImage from "@/public/Jeans.avif";

export default function Blusas() {
  return (
    <>
      <section className="pt-10">
        <div className="maxW">
          <article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/categorias/blusas" className="block cursor-pointer">
              <Image
                className="h-auto w-full"
                src={blusasImage}
                alt="Categoria Blusas"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <Link href="/categorias/calcas" className="block cursor-pointer">
              <Image
                className="h-auto w-full"
                src={calcasImage}
                alt="Categoria Calcas"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
