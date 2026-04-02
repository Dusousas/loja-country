"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiChevronRight, FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";
import { isUploadedImage } from "@/lib/image-utils";
import type { Product } from "@/lib/products";

const STORE_WHATSAPP = "5537999514935";

type ProductDetailViewProps = {
  product: Product;
};

export default function ProductDetailView({
  product,
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] ?? product.color
  );

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      `Oi! Quero comprar ${product.name}. Cor: ${selectedColor.name}. Tamanho: ${selectedSize}.`
    );

    return `https://wa.me/${STORE_WHATSAPP}?text=${message}`;
  }, [product.name, selectedColor.name, selectedSize]);

  return (
    <section className="py-8 sm:py-10">
      <div className="maxW">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-5 lg:items-start lg:grid-cols-[88px_minmax(0,560px)_430px]">
            <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
              {product.gallery.map((image, index) => {
                const isActive = image === activeImage;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`relative overflow-hidden border bg-white transition-colors ${
                      isActive
                        ? "border-[#171717]"
                        : "border-[#d9d9d9] hover:border-[#8f5c3d]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} miniatura ${index + 1}`}
                      width={92}
                      height={118}
                      unoptimized={isUploadedImage(image)}
                      className="h-[94px] w-[72px] object-cover lg:h-[96px] lg:w-[76px]"
                    />
                  </button>
                );
              })}
            </div>

            <div className="order-1 self-start lg:order-2">
              <div className="relative overflow-hidden border border-[#e6ddd4] bg-white">
                <Image
                  src={activeImage}
                  alt={product.name}
                  width={980}
                  height={1180}
                  priority
                  unoptimized={isUploadedImage(activeImage)}
                  className="mx-auto h-auto w-full max-w-[560px] object-cover"
                />
              </div>
            </div>

            <div className="order-3 flex flex-col">
              <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#6e7a89]">
                {product.categoryTrail.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {index > 0 && <FiChevronRight className="text-[13px]" />}
                    {index === product.categoryTrail.length - 1 ? (
                      <span className="font-medium text-[#171717]">{item}</span>
                    ) : (
                      <Link href="#" className="hover:text-[#171717]">
                        {item}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>

              <h1 className="mt-4 text-xl leading-[1.02] font-medium text-[#171717] ">
                {product.name}
              </h1>

              <div className="mt-4 border-b border-[#ebe3da] pb-5">

                <div className="mt-1 flex flex-wrap items-end gap-3">
                  <p className="text-4xl leading-none font-bold text-[#171717]">
                    {product.price}
                  </p>
                </div>

                <p className="mt-2 flex items-center gap-2 text-[16px] font-bold text-[#0a6b3d] sm:text-[18px]">
                  <SiPix className="text-[17px]" />
                  <span>{product.pixPrice} com Pix</span>
                </p>

                <p className="mt-4 flex items-center gap-2 text-[14px] text-[#46566f]">
                  <FiCreditCard className="text-[15px]" />
                  <span>{product.installments}</span>
                </p>

                <p className="mt-1.5 text-[14px] font-semibold text-[#171717]">
                  {product.pixLabel} pagando com Pix
                </p>


              </div>

              <div className="mt-5">
                <p className="text-[14px] text-[#46566f]">
                  Tamanho:{" "}
                  <span className="font-semibold text-[#171717]">
                    {selectedSize}
                  </span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = size === selectedSize;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] border px-3 py-2 text-sm font-bold transition-colors ${
                          isSelected
                            ? "border-[#171717] bg-[#171717] text-white"
                            : "border-[#cfd6dd] bg-white text-[#171717] hover:border-[#171717]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[14px] text-[#46566f]">
                  Cor:{" "}
                  <span className="font-semibold text-[#171717]">
                    {selectedColor.name}
                  </span>
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected =
                      selectedColor.name === color.name &&
                      selectedColor.swatch === color.swatch;

                    return (
                      <button
                        key={`${color.name}-${color.swatch}`}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Cor ${color.name}`}
                        className={`rounded-full bg-white p-1 transition-colors ${
                          isSelected
                            ? "border-2 border-[#171717]"
                            : "border-2 border-transparent hover:border-[#8f5c3d]"
                        }`}
                      >
                        <span
                          className="block size-7 rounded-full border border-black/10"
                          style={{ backgroundColor: color.swatch }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 bg-[#2fb15a] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#27984d]"
                >
                  <FaWhatsapp className="text-[18px]" />
                  <span>Comprar</span>
                </Link>
              </div>

              <div className="mt-6 border border-[#e7ddd4] bg-white p-5">
                <h2 className="text-[22px] font-semibold text-[#171717]">
                  Descricao
                </h2>
                <div className="mt-4 border-t border-[#eee6de] pt-4">
                  <p className="text-[14px] leading-6 text-[#4c5a6c]">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
