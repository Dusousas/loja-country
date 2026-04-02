"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import { deleteProductFromPanel, toggleHomeSectionFromPanel } from "@/app/painel/produtos/actions";
import { isUploadedImage } from "@/lib/image-utils";
import type { AdminProduct, HomeSection } from "@/lib/products";

type CatalogProps = {
  products: AdminProduct[];
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  query: string;
  initialIsOpen?: boolean;
  homeSectionLabels: Record<HomeSection, string>;
  compact?: boolean;
};

function buildHref(page: number, query: string, keepOpen = false) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  if (keepOpen) {
    params.set("catalog", "1");
  }

  const queryString = params.toString();
  return queryString ? `/painel/produtos?${queryString}` : "/painel/produtos";
}

export default function AdminProductCatalogModal({
  products,
  page,
  totalPages,
  totalCount,
  pageSize,
  query,
  initialIsOpen = false,
  homeSectionLabels,
  compact = false,
}: CatalogProps) {
  const primaryCategoryLabelMap: Record<string, string> = {
    masculino: "Masculino",
    feminino: "Feminino",
    infantil: "Infantil",
    acessorios: "Acessorios",
  };
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [selectedId, setSelectedId] = useState<number | null>(products[0]?.id ?? null);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  useEffect(() => {
    if (products.length === 0) {
      setSelectedId(null);
      return;
    }

    setSelectedId((current) =>
      current && products.some((product) => product.id === current)
        ? current
        : products[0].id
    );
  }, [products]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) ?? null,
    [products, selectedId]
  );

  const firstItemIndex = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItemIndex = totalCount === 0 ? 0 : Math.min(page * pageSize, totalCount);
  const primaryCategoryLabels = selectedProduct
    ? selectedProduct.navGroups
        .filter((group) =>
          ["masculino", "feminino", "infantil", "acessorios"].includes(group)
        )
        .map((group) => primaryCategoryLabelMap[group] ?? group)
    : [];

  return (
    <>
      {compact ? (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[#eadfd5] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(23,23,23,0.04)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
              Catalogo
            </p>
            <p className="mt-1 text-sm leading-6 text-[#536273]">
              {totalCount} produtos cadastrados. Abra a lista completa quando precisar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d]"
          >
            Abrir lista de produtos
          </button>
        </div>
      ) : (
        <div className="rounded-[30px] border border-[#e5ddd5] bg-white p-6 shadow-[0_16px_48px_rgba(23,23,23,0.05)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                Catalogo
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
                Produtos cadastrados
              </h2>
            </div>
            <p className="max-w-sm text-right text-[13px] leading-6 text-[#68788a]">
              Consulte, edite e acompanhe os produtos da loja sempre que precisar.
            </p>
          </div>

          <div className="mt-6 rounded-[26px] border border-[#ece3da] bg-[linear-gradient(180deg,#fcfbfa_0%,#f7f0e9_100%)] p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-white/70 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                  Total
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#171717]">{totalCount}</p>
              </div>
              <div className="rounded-[20px] border border-white/70 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                  Exibindo
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#171717]">
                  {firstItemIndex}-{lastItemIndex}
                </p>
              </div>
              <div className="rounded-[20px] border border-white/70 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                  Busca
                </p>
                <p className="mt-2 text-lg font-semibold text-[#171717]">
                  {query || "Tudo"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d]"
            >
              Abrir lista de produtos
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#171717]/55 px-4 py-6 backdrop-blur-sm sm:px-6">
          <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[30px] border border-[#e7ddd3] bg-[#fffaf5] shadow-[0_30px_90px_rgba(23,23,23,0.22)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#ebdfd4] px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                  Lista de produtos
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#171717]">
                  Clique em um item para ver os detalhes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#d9cabc] bg-white text-xl text-[#17345c] transition-colors hover:border-[#17345c]"
              >
                ×
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col xl:grid xl:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="flex max-h-[44vh] shrink-0 flex-col border-b border-[#ebdfd4] bg-white xl:max-h-none xl:min-h-0 xl:border-b-0 xl:border-r">
                <div className="border-b border-[#ebdfd4] p-4">
                  <form action="/painel/produtos" className="grid gap-3">
                    <input type="hidden" name="catalog" value="1" />
                    <input
                      type="search"
                      name="q"
                      defaultValue={query}
                      placeholder="Nome, marca, slug ou categoria"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#17345c] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d]"
                      >
                        Buscar
                      </button>
                      <Link
                        href={buildHref(1, "", true)}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#17345c] transition-colors hover:border-[#17345c]"
                      >
                        Limpar
                      </Link>
                    </div>
                  </form>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-3">
                  <div className="space-y-2">
                    {products.map((product) => {
                      const isActive = product.id === selectedProduct?.id;

                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setSelectedId(product.id)}
                          className={`w-full rounded-[22px] border p-3 text-left transition-colors ${
                            isActive
                              ? "border-[#17345c] bg-[#17345c] text-white"
                              : "border-[#ece3da] bg-[#fcfbfa] text-[#171717] hover:border-[#d4c4b5]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative h-16 w-14 overflow-hidden rounded-[14px] border border-black/5 bg-white">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                unoptimized={isUploadedImage(product.image)}
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                                  isActive ? "text-white/75" : "text-[#8f5c3d]"
                                }`}
                              >
                                {product.brand}
                              </p>
                              <p className="mt-1 line-clamp-2 text-sm font-semibold">
                                {product.name}
                              </p>
                              <p
                                className={`mt-1 text-xs ${
                                  isActive ? "text-white/75" : "text-[#536273]"
                                }`}
                              >
                                {product.category} | {product.price}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}

                    {products.length === 0 && (
                      <div className="rounded-[22px] border border-dashed border-[#d9d0c7] bg-[#fcfbfa] px-4 py-8 text-sm leading-6 text-[#536273]">
                        {query
                          ? `Nenhum produto encontrado para "${query}".`
                          : "Nenhum produto cadastrado ainda."}
                      </div>
                    )}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="border-t border-[#ebdfd4] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={buildHref(Math.max(page - 1, 1), query, true)}
                        aria-disabled={page <= 1}
                        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                          page <= 1
                            ? "pointer-events-none border border-[#e7ddd3] bg-white text-[#b6b0a9]"
                            : "border border-[#d8c9bb] bg-white text-[#17345c] transition-colors hover:border-[#17345c]"
                        }`}
                      >
                        Anterior
                      </Link>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                        {page}/{totalPages}
                      </span>
                      <Link
                        href={buildHref(Math.min(page + 1, totalPages), query, true)}
                        aria-disabled={page >= totalPages}
                        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                          page >= totalPages
                            ? "pointer-events-none border border-[#e7ddd3] bg-white text-[#b6b0a9]"
                            : "border border-[#17345c] bg-[#17345c] text-white transition-colors hover:bg-[#21497d]"
                        }`}
                      >
                        Proxima
                      </Link>
                    </div>
                  </div>
                )}
              </aside>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#fffaf5_0%,#f6efe7_100%)] p-4 sm:p-6">
                {selectedProduct ? (
                  <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-6">
                    <div className="overflow-hidden rounded-[28px] border border-[#dfd5ca] bg-white p-3 shadow-[0_10px_24px_rgba(23,23,23,0.05)]">
                      <div className="overflow-hidden rounded-[20px] border border-[#ececec] bg-[#f2f2f2]">
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          width={720}
                          height={900}
                          unoptimized={isUploadedImage(selectedProduct.image)}
                          className="h-[260px] w-full object-cover sm:h-[340px]"
                        />
                      </div>

                      <div className="px-2 pb-2 pt-4 text-center">
                        <p className="text-[13px] font-medium text-[#171717]">
                          {selectedProduct.brand}
                        </p>
                        <h4 className="mx-auto mt-2 min-h-[64px] max-w-[240px] text-[18px] leading-[1.1] font-extrabold text-[#171717] sm:min-h-[78px]">
                          {selectedProduct.cardTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#e8ddd2] bg-white/90 p-5 shadow-[0_16px_38px_rgba(23,23,23,0.05)] sm:p-6">
                      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                            Detalhes
                          </p>
                          <h4 className="mt-2 text-2xl font-semibold text-[#171717]">
                            {selectedProduct.name}
                          </h4>
                          <p className="mt-2 text-sm text-[#536273]">
                            {selectedProduct.category} | slug: {selectedProduct.slug}
                          </p>
                        </div>
                        <Link
                          href={`/produtos/${selectedProduct.slug}`}
                          className="inline-flex w-full items-center justify-center rounded-full border border-[#d8c9bb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c] sm:w-auto"
                        >
                          Ver produto
                        </Link>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[20px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                            Preco
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#171717]">
                            {selectedProduct.price}
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                            Pix
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#171717]">
                            {selectedProduct.pixPrice}
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                            {selectedProduct.colors.length > 1 ? "Cores" : "Cor"}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {selectedProduct.colors.map((color) => (
                              <span
                                key={`${color.name}-${color.swatch}`}
                                className="block size-5 rounded-full border border-black/10"
                                style={{ backgroundColor: color.swatch }}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-lg font-semibold text-[#171717]">
                            {selectedProduct.colors.map((color) => color.name).join(", ")}
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                            Categorias principais
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#171717]">
                            {primaryCategoryLabels.join(", ")}
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f5c3d]">
                            Categoria do produto
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#171717]">
                            {selectedProduct.category}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {selectedProduct.homeSections.length === 0 && (
                          <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8c98a8]">
                            Sem destaque
                          </span>
                        )}
                        {selectedProduct.homeSections.map((section) => (
                          <span
                            key={section}
                            className="rounded-full bg-[#17345c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                          >
                            {homeSectionLabels[section]}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-2 sm:grid-cols-3">
                        {(["promocoes", "chapeus", "infantil"] as const).map((section) => {
                          const isEnabled = selectedProduct.homeSections.includes(section);

                          return (
                            <form key={section} action={toggleHomeSectionFromPanel}>
                              <input type="hidden" name="productId" value={selectedProduct.id} />
                              <input type="hidden" name="section" value={section} />
                              <input type="hidden" name="page" value={page} />
                              <input type="hidden" name="query" value={query} />
                              <input type="hidden" name="catalog" value="1" />
                              <input
                                type="hidden"
                                name="enabled"
                                value={isEnabled ? "false" : "true"}
                              />
                              <SubmitButton
                                pendingLabel="Atualizando..."
                                className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                                  isEnabled
                                    ? "border border-[#17345c] bg-[#17345c] text-white hover:bg-[#21497d]"
                                    : "border border-[#d8c9bb] bg-white text-[#17345c] hover:border-[#17345c]"
                                }`}
                              >
                                {isEnabled
                                  ? `Remover ${homeSectionLabels[section]}`
                                  : `Destacar ${homeSectionLabels[section]}`}
                              </SubmitButton>
                            </form>
                          );
                        })}
                      </div>

                      <div className="mt-5 rounded-[22px] border border-[#ece3da] bg-[#fcfbfa] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                          Descricao
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#536273]">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes.map((size) => (
                            <span
                              key={size}
                              className="rounded-full border border-[#d8c9bb] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c]"
                            >
                              {size}
                            </span>
                          ))}
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                          <Link
                            href={`/painel/produtos/${selectedProduct.id}`}
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#17345c] transition-colors hover:border-[#17345c] sm:w-auto"
                          >
                            Editar produto
                          </Link>

                          <form action={deleteProductFromPanel}>
                            <input type="hidden" name="productId" value={selectedProduct.id} />
                            <input type="hidden" name="page" value={page} />
                            <input type="hidden" name="query" value={query} />
                            <input type="hidden" name="catalog" value="1" />
                            <SubmitButton
                              pendingLabel="Removendo..."
                              confirmMessage={`Remover "${selectedProduct.name}" da loja e do painel?`}
                              className="inline-flex w-full items-center justify-center rounded-2xl border border-[#e1b8b8] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#a33d3d] transition-colors hover:border-[#a33d3d] hover:bg-[#fff5f5] sm:w-auto"
                            >
                              Excluir produto
                            </SubmitButton>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-[#d9d0c7] bg-white/70 p-10 text-center text-sm leading-7 text-[#536273]">
                    Selecione um produto na lista para ver os detalhes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
