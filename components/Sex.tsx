import Image from "next/image";
import Link from "next/link";

import femininoImage from "@/public/Feminino.avif";
import masculinoImage from "@/public/Masculino1.avif";

export default function Sex() {
  return (
    <>
      <section className="pt-10">
        <div className="maxW py-10">
          <article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/categorias/feminino" className="block cursor-pointer">
              <Image
                className="h-auto w-full"
                src={femininoImage}
                alt="Categoria Feminino"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <Link href="/categorias/masculino" className="block cursor-pointer">
              <Image
                className="h-auto w-full"
                src={masculinoImage}
                alt="Categoria Masculino"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
