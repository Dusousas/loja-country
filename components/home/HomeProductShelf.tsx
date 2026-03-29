import Image from "next/image";
import Link from "next/link";
import { FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";
import type { Product } from "@/lib/products";

type HomeProductShelfProps = {
  badge: string;
  title: string;
  description: string;
  products: Product[];
};

export default function HomeProductShelf({
  badge,
  title,
  description,
  products,
}: HomeProductShelfProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12">
      <div className="maxW">
        <div className="rounded-[32px] border border-[#eadfd5] bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe7_100%)] px-5 py-8 shadow-[0_20px_60px_rgba(23,23,23,0.05)] sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5c3d]">
              {badge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#171717] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#59687a]">
              {description}
            </p>
          </div>

          <div className="mt-10 grid justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.slug}
                className="flex h-full w-full max-w-[320px] flex-col rounded-[24px] border border-[#dfd5ca] bg-white p-3 shadow-[0_10px_24px_rgba(23,23,23,0.05)]"
              >
                <Link
                  href={`/produtos/${product.slug}`}
                  className="overflow-hidden rounded-[18px] border border-[#ececec] bg-[#f2f2f2]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={620}
                    height={760}
                    className="h-[295px] w-full object-cover sm:h-[340px] xl:h-[295px]"
                  />
                </Link>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
                  <p className="text-[13px] font-medium text-[#171717]">
                    {product.brand}
                  </p>

                  <Link
                    href={`/produtos/${product.slug}`}
                    className="mx-auto mt-2 min-h-[78px] max-w-[240px] text-[18px] leading-[1.1] font-extrabold text-[#171717] transition-colors hover:text-[#8f5c3d]"
                  >
                    {product.cardTitle}
                  </Link>

                  <div className="mt-3 flex min-h-[34px] flex-wrap items-center justify-center gap-1.5">
                    {product.sizes.slice(0, 4).map((size) => (
                      <span
                        key={size}
                        className="flex h-7 min-w-7 items-center justify-center rounded-full border border-[#32537c] px-1.5 text-[12px] font-medium text-[#17345c]"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 min-h-[78px] border-t border-[#ededed] pt-4">
                    <p className="flex items-center justify-center gap-2 text-[15px] font-bold text-[#0a6b3d] sm:text-[14px]">
                      <SiPix className="text-[18px]" />
                      <span>{product.pixPrice} com Pix</span>
                    </p>

                    <p className="mt-1 flex items-center justify-center gap-2 text-[13px] font-medium text-[#46566f] sm:text-[12px]">
                      <FiCreditCard className="text-[15px]" />
                      <span>{product.installments}</span>
                    </p>
                  </div>

                  <Link
                    href={`/produtos/${product.slug}`}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#2fb15a] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#27984d]"
                  >
                    <FaWhatsapp className="text-[18px]" />
                    <span>Comprar</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
