import Image from "next/image";
import Link from "next/link";

import chapeusBanner from "@/public/chapeu-bones.jpg";

export default function Banner1() {
  return (
    <>
      <section>
        <div className="maxW">
          <div className="relative">
            <Image
              className="h-auto w-full"
              src={chapeusBanner}
              alt="Categorias Chapeus e Bones"
              sizes="100vw"
            />
            <Link
              href="/categorias/chapeus"
              aria-label="Ir para a categoria Bones e Chapeus"
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
            />
            <Link
              href="/categorias/chapeus"
              aria-label="Ir para a categoria Bones e Chapeus"
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
}
