"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiChevronRight, FiCreditCard, FiFilter, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";
import type { CategoryDefinition, Product } from "@/lib/products";

type CategoryListingViewProps = {
  category: CategoryDefinition;
  products: Product[];
};

function parsePrice(price: string) {
  return Number(
    price
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

export default function CategoryListingView({
  category,
  products,
}: CategoryListingViewProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("older");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const shouldShowCategoryFilter = ["masculino", "feminino", "infantil"].includes(
    category.slug
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    [products]
  );

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  );

  const colors = useMemo(
    () =>
      Array.from(
        new Map(
          products.map((product) => [
            product.color.name,
            { name: product.color.name, swatch: product.color.swatch },
          ])
        ).values()
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchCategory =
        !shouldShowCategoryFilter ||
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchColor =
        selectedColors.length === 0 ||
        selectedColors.includes(product.color.name);

      return matchBrand && matchCategory && matchColor;
    });

    switch (sortOrder) {
      case "price-asc":
        return [...result].sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
      case "price-desc":
        return [...result].sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [
    products,
    selectedBrands,
    selectedCategories,
    selectedColors,
    shouldShowCategoryFilter,
    sortOrder,
  ]);

  const activeFilterCount =
    selectedBrands.length + selectedCategories.length + selectedColors.length;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileFilterOpen]);

  function toggleItem(
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function resetFilters() {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedColors([]);
  }

  function renderFilters() {
    return (
      <div className="space-y-7">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#171717]">Marcas</h3>
            <span className="text-[20px] text-[#171717]">-</span>
          </div>
          <div className="max-h-[220px] space-y-3 overflow-auto pr-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 text-[15px] text-[#4e5968]"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleItem(brand, selectedBrands, setSelectedBrands)
                  }
                  className="size-4 accent-[#17345c]"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {shouldShowCategoryFilter && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-[#171717]">
                Categoria
              </h3>
              <span className="text-[20px] text-[#171717]">-</span>
            </div>
            <div className="max-h-[220px] space-y-3 overflow-auto pr-1">
              {categories.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-[#4e5968]"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item)}
                    onChange={() =>
                      toggleItem(item, selectedCategories, setSelectedCategories)
                    }
                    className="size-4 accent-[#17345c]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#171717]">Cor</h3>
            <span className="text-[20px] text-[#171717]">-</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const isSelected = selectedColors.includes(color.name);

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() =>
                    toggleItem(color.name, selectedColors, setSelectedColors)
                  }
                  aria-label={color.name}
                  className={`rounded-full border-2 p-1 transition-colors ${
                    isSelected
                      ? "border-[#17345c]"
                      : "border-transparent hover:border-[#8f5c3d]"
                  }`}
                >
                  <span
                    className="block size-9 rounded-full border border-black/10"
                    style={{ backgroundColor: color.swatch }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="maxW">
        <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden self-start xl:sticky xl:top-6 xl:block">
            <div className="rounded-[24px] border border-[#e5ddd5] bg-white p-5 shadow-[0_10px_28px_rgba(23,23,23,0.04)]">
              {renderFilters()}
            </div>
          </aside>

          <div>
            <div className="border-b border-[#e5ddd5] pb-5">
              <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6e7a89]">
                <Link href="/" className="hover:text-[#171717]">
                  Inicio
                </Link>
                <FiChevronRight className="text-[12px]" />
                <span className="font-medium text-[#171717]">{category.label}</span>
              </div>

              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <h1 className="text-[28px] leading-none font-semibold text-[#171717] sm:text-[30px]">
                    {category.title}
                  </h1>
                  <p className="mt-3 hidden text-[14px] leading-6 text-[#4e5968] sm:block">
                    {category.description}
                  </p>
                </div>

                <div className="hidden flex-wrap items-center gap-x-6 gap-y-3 xl:justify-end xl:flex">
                  <p className="text-[14px] text-[#5f6d80]">
                    Exibindo <span className="font-semibold text-[#17345c]">{filteredProducts.length}</span>{" "}
                    produtos
                  </p>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="sort-order"
                      className="text-[14px] font-semibold text-[#17345c]"
                    >
                      Ordenar por
                    </label>
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={(event) => setSortOrder(event.target.value)}
                      className="min-w-[236px] border border-[#cfd6dd] bg-white px-4 py-2 text-[13px] text-[#171717] outline-none"
                    >
                      <option value="older">Mais antigo ao mais novo</option>
                      <option value="price-asc">Menor preco</option>
                      <option value="price-desc">Maior preco</option>
                      <option value="name">Nome A-Z</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 xl:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#cfd6dd] bg-white px-4 py-3 text-[14px] font-semibold text-[#171717] shadow-[0_8px_18px_rgba(23,23,23,0.05)]"
                >
                  <FiFilter className="text-[16px]" />
                  <span>Filtrar</span>
                  {activeFilterCount > 0 && (
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#17345c] px-1.5 py-0.5 text-[11px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <select
                  aria-label="Ordenar produtos"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="ml-auto min-w-[170px] rounded-lg border border-[#cfd6dd] bg-white px-4 py-3 text-[14px] text-[#171717] outline-none"
                >
                  <option value="older">Nome do Produto</option>
                  <option value="price-asc">Menor preco</option>
                  <option value="price-desc">Maior preco</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid justify-items-center gap-4 md:mt-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.slug}
                  className="flex h-full w-full max-w-[238px] flex-col overflow-hidden border border-[#d8d8d8] bg-white p-2.5 shadow-[0_4px_14px_rgba(23,23,23,0.035)] md:max-w-[238px]"
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
                      className="h-[214px] w-full object-cover sm:h-[230px] xl:h-[214px]"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3 text-center">
                    <p className="text-[12px] font-medium text-[#171717]">
                      {product.brand}
                    </p>

                    <Link
                      href={`/produtos/${product.slug}`}
                      className="mx-auto mt-2 min-h-[58px] max-w-[200px] text-[13px] leading-[1.08] font-extrabold text-[#171717] transition-colors hover:text-[#8f5c3d]"
                    >
                      {product.cardTitle}
                    </Link>

                    <div className="mt-2.5 flex min-h-[30px] flex-wrap items-center justify-center gap-1">
                      {product.sizes.slice(0, 4).map((size) => (
                        <span
                          key={size}
                          className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#32537c] px-1 text-[10px] font-medium text-[#17345c]"
                        >
                          {size}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 min-h-[84px] border-t border-[#ededed] pt-3">
                      <p className="flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#0a6b3d]">
                        <SiPix className="text-[14px]" />
                        <span>{product.pixPrice} com Pix</span>
                      </p>

                      {product.originalPrice !== product.price && (
                        <p className="mt-1 text-[11px] text-[#8b93a0] line-through">
                          {product.originalPrice}
                        </p>
                      )}

                      <p className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-medium text-[#46566f]">
                        <FiCreditCard className="text-[12px]" />
                        <span>{product.installments}</span>
                      </p>
                    </div>

                    <Link
                      href={`/produtos/${product.slug}`}
                      className="mt-auto flex w-full items-center justify-center gap-1.5 bg-[#2fb15a] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#27984d]"
                    >
                      <FaWhatsapp className="text-[14px]" />
                      <span>Comprar</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-8 border border-dashed border-[#d9d0c7] bg-white px-6 py-12 text-center">
                <h2 className="text-[24px] font-semibold text-[#171717]">
                  Nenhum produto encontrado
                </h2>
                <p className="mt-3 text-[15px] text-[#5f6d80]">
                  Ajuste os filtros da sidebar para encontrar outras opcoes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[70] bg-[#171717]/45 px-4 py-6 xl:hidden">
          <div className="mx-auto flex h-full max-w-lg flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_28px_80px_rgba(23,23,23,0.22)]">
            <div className="flex items-center justify-between border-b border-[#e5ddd5] px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                  Filtros
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#171717]">
                  Refine sua busca
                </h2>
              </div>

              <button
                type="button"
                aria-label="Fechar filtros"
                onClick={() => setIsMobileFilterOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#d9d0c7] text-[20px] text-[#171717]"
              >
                <FiX />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {renderFilters()}
            </div>

            <div className="grid gap-3 border-t border-[#e5ddd5] px-5 py-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#17345c]"
              >
                Limpar
              </button>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
              >
                Ver produtos
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
