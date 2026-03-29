import Image from "next/image";
import Link from "next/link";
import { FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";

const products = [
  {
    brand: "Tex Team",
    title: "Calca Tex Team Feminina Carpinteira Amaciada...",
    image: "/img-teste.jpg",
  },
  {
    brand: "Tex Team",
    title: "Calca Tex Team Feminina Carpinteira Preta Bordada...",
    image: "/img-teste.jpg",
  },
  {
    brand: "Tex Team",
    title: "Calca Tex Team Feminina Carpinteira Bordada Verde",
    image: "/img-teste.jpg",
  },
  {
    brand: "Tex Team",
    title: "Calca Tex Team Feminina Carpinteira Bordada Azul",
    image: "/img-teste.jpg",
  },
];

const sizes = ["34", "36", "38", "+9"];

export default function Chapeus() {
  return (
    <section className="py-10">
      <div className="maxW">
     

          <h3 className="text-center text-2xl font-semibold uppercase text-[#171717] sm:text-3xl">
            Promoções
          </h3>
   

        <div className="grid justify-items-center gap-5 pt-10 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.title}
              className="flex h-full w-full max-w-[320px] flex-col border border-[#d8d8d8] bg-white p-3 shadow-[0_6px_18px_rgba(23,23,23,0.04)]"
            >
              <div className="overflow-hidden border border-[#ececec] bg-[#f2f2f2]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={620}
                  height={760}
                  className="h-[295px] w-full object-cover sm:h-[340px] xl:h-[295px]"
                />
              </div>

              <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
                <p className="text-[13px] font-medium text-[#171717]">
                  {product.brand}
                </p>

                <h4 className="mx-auto mt-2 min-h-[78px] max-w-[240px] text-[18px] leading-[1.1] font-extrabold text-[#171717]">
                  {product.title}
                </h4>

                <div className="mt-3 flex min-h-[34px] flex-wrap items-center justify-center gap-1.5">
                  {sizes.map((size) => (
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
                    <span>R$161,91 com Pix</span>
                  </p>

                  <p className="mt-1 flex items-center justify-center gap-2 text-[13px] font-medium text-[#46566f] sm:text-[12px]">
                    <FiCreditCard className="text-[15px]" />
                    <span>3 x de R$59,97 sem juros</span>
                  </p>
                </div>

                <Link
                  href="#whatsapp"
                  className="mt-auto flex w-full items-center justify-center gap-2 bg-[#2fb15a] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#27984d]"
                >
                  <FaWhatsapp className="text-[18px]" />
                  <span>Comprar</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
