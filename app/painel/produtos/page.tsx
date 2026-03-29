import Image from "next/image";
import Link from "next/link";
import ColorFields from "@/components/admin/ColorFields";
import SubmitButton from "@/components/admin/SubmitButton";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import {
  getAdminDashboardSummary,
  getAdminProductCatalog,
  panelPrimaryCategoryOptions,
  panelProductCategoryOptions,
} from "@/lib/products";
import {
  createProductFromPanel,
  deleteProductFromPanel,
  logoutFromAdminPanel,
  toggleHomeSectionFromPanel,
} from "./actions";

export const dynamic = "force-dynamic";

type ProductAdminPageProps = {
  searchParams?: Promise<{
    status?: string;
    slug?: string;
    message?: string;
    q?: string;
    page?: string;
  }>;
};

const homeSectionLabels = {
  promocoes: "Promocoes",
  chapeus: "Chapeus",
  infantil: "Infantil",
} as const;

export default async function ProductAdminPage({
  searchParams,
}: ProductAdminPageProps) {
  await requireAdminAuthentication();

  const params = searchParams ? await searchParams : {};
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const requestedPage = Number(params.page);
  const page = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.floor(requestedPage)
    : 1;

  const [summary, catalog] = await Promise.all([
    getAdminDashboardSummary(),
    getAdminProductCatalog({
      page,
      pageSize: 8,
      query,
    }),
  ]);

  const adminProducts = catalog.products;
  const firstItemIndex =
    catalog.totalCount === 0 ? 0 : (catalog.page - 1) * catalog.pageSize + 1;
  const lastItemIndex =
    catalog.totalCount === 0
      ? 0
      : Math.min(catalog.page * catalog.pageSize, catalog.totalCount);

  function getCatalogHref(nextPage: number) {
    const hrefParams = new URLSearchParams();

    if (query) {
      hrefParams.set("q", query);
    }

    if (nextPage > 1) {
      hrefParams.set("page", String(nextPage));
    }

    const hrefQuery = hrefParams.toString();
    return hrefQuery ? `/painel/produtos?${hrefQuery}` : "/painel/produtos";
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="maxW">
        <div className="rounded-[34px] border border-[#e8ddd2] bg-[linear-gradient(135deg,#fffaf5_0%,#f7efe6_52%,#f2e6d7_100%)] p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5c3d]">
                Painel de produtos
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
                Cadastro dinamico com banco de dados, upload de imagens e vitrines da home.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-[#536273]">
                O cliente consegue cadastrar produtos, subir imagens direto do
                computador e marcar se o item deve aparecer em Promocoes,
                Chapeus ou Infantil. Cada vitrine mostra no maximo quatro
                produtos e os mais antigos saem automaticamente quando novos
                itens sao marcados.
              </p>
            </div>

            <form action={logoutFromAdminPanel}>
              <SubmitButton
                pendingLabel="Saindo..."
                className="inline-flex items-center justify-center rounded-full border border-[#d4c4b5] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#171717] transition-colors hover:border-[#171717]"
              >
                Sair
              </SubmitButton>
            </form>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Produtos
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {summary.totalProducts}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Promocoes
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {Math.min(summary.showcaseCounts.promocoes, 4)}/4
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Chapeus
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {Math.min(summary.showcaseCounts.chapeus, 4)}/4
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Infantil
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {Math.min(summary.showcaseCounts.infantil, 4)}/4
              </p>
            </div>
          </div>
        </div>

        {params.status === "created" && (
          <div className="mt-6 rounded-[22px] border border-[#c7e6cf] bg-[#eefaf1] px-5 py-4 text-sm leading-6 text-[#1d6a33]">
            Produto criado com sucesso. Confira em{" "}
            <Link
              href={`/produtos/${params.slug}`}
              className="font-semibold underline underline-offset-2"
            >
              /produtos/{params.slug}
            </Link>
            .
          </div>
        )}

        {params.status === "updated" && (
          <div className="mt-6 rounded-[22px] border border-[#c9dbef] bg-[#eff6fd] px-5 py-4 text-sm leading-6 text-[#1e5788]">
            Destaque da home atualizado com sucesso.
          </div>
        )}

        {params.status === "deleted" && (
          <div className="mt-6 rounded-[22px] border border-[#f0d2d2] bg-[#fff3f3] px-5 py-4 text-sm leading-6 text-[#8a3030]">
            Produto removido com sucesso.
          </div>
        )}

        {params.status === "error" && params.message && (
          <div className="mt-6 rounded-[22px] border border-[#efc4c4] bg-[#fff1f1] px-5 py-4 text-sm leading-6 text-[#9e3d3d]">
            {params.message}
          </div>
        )}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <div className="rounded-[30px] border border-[#e5ddd5] bg-white p-6 shadow-[0_16px_48px_rgba(23,23,23,0.05)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                  Cadastro
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
                  Novo produto
                </h2>
              </div>
              <p className="max-w-md text-right text-[13px] leading-6 text-[#68788a]">
                As imagens sobem direto para o servidor. Cores podem ser
                escolhidas por picker visual ou pelos atalhos prontos.
              </p>
            </div>

            <form
              action={createProductFromPanel}
              encType="multipart/form-data"
              className="mt-8 grid gap-8"
            >
              <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Informacoes principais
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Marca
                    </span>
                    <input
                      type="text"
                      name="brand"
                      required
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Nome do produto
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Titulo do card
                    </span>
                    <input
                      type="text"
                      name="cardTitle"
                      placeholder="Se vazio, usa o nome do produto"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Slug
                    </span>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Opcional, gerado automaticamente"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Organizacao da loja
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Categoria principal
                    </span>
                    <select
                      name="primaryGroup"
                      required
                      defaultValue="masculino"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    >
                      {panelPrimaryCategoryOptions.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Categoria do produto
                    </span>
                    <select
                      name="categorySlug"
                      required
                      defaultValue="blusas"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    >
                      {panelProductCategoryOptions.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Midia
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Imagem principal
                    </span>
                    <input
                      type="file"
                      name="mainImage"
                      accept="image/png,image/jpeg,image/webp,image/avif"
                      required
                      className="w-full rounded-2xl border border-dashed border-[#c9d4df] bg-white px-4 py-3 text-[14px] text-[#171717] file:mr-4 file:rounded-full file:border-0 file:bg-[#17345c] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#21497d]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Galeria adicional
                    </span>
                    <input
                      type="file"
                      name="galleryFiles"
                      accept="image/png,image/jpeg,image/webp,image/avif"
                      multiple
                      className="w-full rounded-2xl border border-dashed border-[#c9d4df] bg-white px-4 py-3 text-[14px] text-[#171717] file:mr-4 file:rounded-full file:border-0 file:bg-[#e7eef6] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#17345c] hover:file:bg-[#dce7f2]"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Precos, cor e tamanhos
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Preco original
                    </span>
                    <input
                      type="text"
                      name="originalPrice"
                      required
                      placeholder="R$189,90"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Preco de venda
                    </span>
                    <input
                      type="text"
                      name="price"
                      required
                      placeholder="R$170,43"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Preco Pix
                    </span>
                    <input
                      type="text"
                      name="pixPrice"
                      required
                      placeholder="R$161,91"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Label do Pix
                    </span>
                    <input
                      type="text"
                      name="pixLabel"
                      placeholder="5% OFF a vista no Pix"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Parcelamento
                    </span>
                    <input
                      type="text"
                      name="installments"
                      placeholder="Parcelamento em ate 12x com juros"
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                  </label>
                </div>

                <ColorFields />

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Tamanhos
                  </span>
                  <textarea
                    name="sizes"
                    required
                    rows={3}
                    placeholder={"P, M, G\nou um por linha"}
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Home e descricao
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {(["promocoes", "chapeus", "infantil"] as const).map((section) => (
                    <label
                      key={section}
                      className="flex items-center gap-3 rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-sm font-medium text-[#171717]"
                    >
                      <input
                        type="checkbox"
                        name="homeSections"
                        value={section}
                        className="size-4 accent-[#17345c]"
                      />
                      <span>{homeSectionLabels[section]}</span>
                    </label>
                  ))}
                </div>

                <p className="mt-3 text-[13px] leading-6 text-[#68788a]">
                  Cada vitrine da home mostra no maximo quatro produtos. Ao
                  marcar um novo, os mais antigos saem automaticamente.
                </p>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Descricao
                  </span>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <SubmitButton
                pendingLabel="Salvando produto..."
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:bg-[#9eb1c7]"
              >
                Cadastrar produto
              </SubmitButton>
            </form>
          </div>

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
              <div className="text-right text-[13px] leading-6 text-[#68788a]">
                <p>Busque, pagine e remova produtos sem deixar o painel gigante.</p>
                <p>
                  Exibindo {firstItemIndex}-{lastItemIndex} de {catalog.totalCount}.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-[#ece3da] bg-[#fcfbfa] p-4">
              <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                    Buscar no catalogo
                  </span>
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Nome, marca, slug ou categoria"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] sm:w-auto"
                  >
                    Buscar
                  </button>
                </div>

                <div className="flex items-end">
                  <Link
                    href="/painel/produtos"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#17345c] transition-colors hover:border-[#17345c] sm:w-auto"
                  >
                    Limpar
                  </Link>
                </div>
              </form>
            </div>

            <div className="mt-6 space-y-4">
              {catalog.totalCount === 0 && !query && (
                <div className="rounded-2xl border border-dashed border-[#d9d0c7] bg-[#fcfbfa] px-5 py-8 text-sm leading-6 text-[#536273]">
                  Nenhum produto cadastrado ainda.
                </div>
              )}

              {catalog.totalCount === 0 && query && (
                <div className="rounded-2xl border border-dashed border-[#d9d0c7] bg-[#fcfbfa] px-5 py-8 text-sm leading-6 text-[#536273]">
                  Nenhum produto encontrado para <span className="font-semibold">{query}</span>.
                </div>
              )}

              {adminProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-[24px] border border-[#ece3da] bg-[#fcfbfa] p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative hidden h-[112px] w-[92px] overflow-hidden rounded-[18px] border border-[#eadfd5] bg-white sm:block">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                            {product.brand}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-[#171717]">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-sm text-[#536273]">
                            {product.category} | {product.price}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/produtos/${product.slug}`}
                            className="inline-flex rounded-full border border-[#d8c9bb] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
                          >
                            Ver produto
                          </Link>

                          <form action={deleteProductFromPanel}>
                            <input type="hidden" name="productId" value={product.id} />
                            <input type="hidden" name="page" value={catalog.page} />
                            <input type="hidden" name="query" value={query} />
                            <SubmitButton
                              pendingLabel="Removendo..."
                              confirmMessage={`Remover "${product.name}" da loja e do painel?`}
                              className="inline-flex rounded-full border border-[#e1b8b8] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#a33d3d] transition-colors hover:border-[#a33d3d] hover:bg-[#fff5f5]"
                            >
                              Excluir produto
                            </SubmitButton>
                          </form>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.homeSections.length === 0 && (
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8c98a8]">
                            Sem destaque na home
                          </span>
                        )}

                        {product.homeSections.map((section) => (
                          <span
                            key={section}
                            className="rounded-full bg-[#17345c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                          >
                            {homeSectionLabels[section]}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        {(["promocoes", "chapeus", "infantil"] as const).map((section) => {
                          const isEnabled = product.homeSections.includes(section);

                          return (
                            <form key={section} action={toggleHomeSectionFromPanel}>
                              <input type="hidden" name="productId" value={product.id} />
                              <input type="hidden" name="section" value={section} />
                              <input type="hidden" name="page" value={catalog.page} />
                              <input type="hidden" name="query" value={query} />
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
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {catalog.totalPages > 1 && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[#ece3da] bg-[#fcfbfa] px-4 py-4">
                <p className="text-sm text-[#536273]">
                  Pagina {catalog.page} de {catalog.totalPages}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={getCatalogHref(catalog.page - 1)}
                    aria-disabled={catalog.page <= 1}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                      catalog.page <= 1
                        ? "pointer-events-none border border-[#e7ddd3] bg-white text-[#b6b0a9]"
                        : "border border-[#d8c9bb] bg-white text-[#17345c] transition-colors hover:border-[#17345c]"
                    }`}
                  >
                    Anterior
                  </Link>

                  <Link
                    href={getCatalogHref(catalog.page + 1)}
                    aria-disabled={catalog.page >= catalog.totalPages}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                      catalog.page >= catalog.totalPages
                        ? "pointer-events-none border border-[#e7ddd3] bg-white text-[#b6b0a9]"
                        : "border border-[#17345c] bg-[#17345c] text-white transition-colors hover:bg-[#21497d]"
                    }`}
                  >
                    Proxima
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
