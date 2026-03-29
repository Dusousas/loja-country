"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";

type HomeProductShelfProduct = {
  slug: string;
  brand: string;
  name: string;
  cardTitle: string;
  image: string;
  pixPrice: string;
  installments: string;
  sizes: string[];
};

type HomeProductShelfProps = {
  title: string;
  products: HomeProductShelfProduct[];
};

export default function HomeProductShelf({
  title,
  products,
}: HomeProductShelfProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const trackLeft = track.getBoundingClientRect().left;

      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    handleScroll();
    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, [products.length]);

  function scrollToCard(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;

    if (!track || !card) {
      return;
    }

    track.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    scrollToCard(Math.max(activeIndex - 1, 0));
  }

  function handleNext() {
    scrollToCard(Math.min(activeIndex + 1, products.length - 1));
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="maxW">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-center text-2xl font-semibold uppercase text-[#171717] sm:text-3xl">
            {title}
          </h3>

          {products.length > 1 && (
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Produto anterior"
                className="inline-flex size-11 items-center justify-center rounded-full border border-black/12 bg-white text-[18px] text-[#171717] transition-colors hover:border-[#171717] hover:bg-[#f5f1ea]"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Proximo produto"
                className="inline-flex size-11 items-center justify-center rounded-full border border-black/12 bg-white text-[18px] text-[#171717] transition-colors hover:border-[#171717] hover:bg-[#f5f1ea]"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <article
              key={product.slug}
              className="flex h-full w-[84vw] max-w-[320px] shrink-0 snap-start flex-col border border-[#d8d8d8] bg-white p-3 shadow-[0_6px_18px_rgba(23,23,23,0.04)] sm:w-[320px]"
            >
              <Link
                href={`/produtos/${product.slug}`}
                className="overflow-hidden border border-[#ececec] bg-[#f2f2f2]"
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
                  className="mx-auto mt-2 min-h-[78px] max-w-[240px] text-[18px] leading-[1.1] font-extrabold text-[#171717]"
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
                  className="mt-auto flex w-full items-center justify-center gap-2 bg-[#2fb15a] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#27984d]"
                >
                  <FaWhatsapp className="text-[18px]" />
                  <span>Comprar</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {products.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {products.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                aria-label={`Ir para o produto ${index + 1}`}
                onClick={() => scrollToCard(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-[#17345c]" : "w-2.5 bg-black/18"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
