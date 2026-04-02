import Link from "next/link";
import AdminProductCatalogModal from "@/components/admin/AdminProductCatalogModal";
import AdminDescriptionAssistant from "@/components/admin/AdminDescriptionAssistant";
import AdminGalleryFilesField from "@/components/admin/AdminGalleryFilesField";
import AdminProductLivePreview from "@/components/admin/AdminProductLivePreview";
import AdminPricingDefaults from "@/components/admin/AdminPricingDefaults";
import ColorFields from "@/components/admin/ColorFields";
import SubmitButton from "@/components/admin/SubmitButton";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import {
  getAdminDashboardSummary,
  getAdminProductCatalog,
  panelPrimaryCategoryOptions,
  panelProductCategoryOptions,
} from "@/lib/products";
import { getAnnouncementMessages } from "@/lib/site-settings";
import {
  createProductFromPanel,
  logoutFromAdminPanel,
  updateAnnouncementMessagesFromPanel,
} from "./actions";

export const dynamic = "force-dynamic";

type ProductAdminPageProps = {
  searchParams?: Promise<{
    status?: string;
    slug?: string;
    message?: string;
    q?: string;
    page?: string;
    catalog?: string;
  }>;
};

const homeSectionLabels = {
  promocoes: "Nossos Destaques",
  chapeus: "Nossas Calças",
  infantil: "Nossos Cintos",
} as const;

export default async function ProductAdminPage({
  searchParams,
}: ProductAdminPageProps) {
  await requireAdminAuthentication();

  const params = searchParams ? await searchParams : {};
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const requestedPage = Number(params.page);
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const [summary, catalog, announcementMessages] = await Promise.all([
    getAdminDashboardSummary(),
    getAdminProductCatalog({
      page,
      pageSize: 8,
      query,
    }),
    getAnnouncementMessages(),
  ]);

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
                Cadastre e organize os produtos da loja em um so lugar.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-[#536273]">
                Adicione novos produtos, revise as informacoes antes de salvar
                e acompanhe tudo em uma lista pratica para manter a loja sempre
                atualizada.
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
                Nossos Destaques
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {Math.min(summary.showcaseCounts.promocoes, 4)}/4
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Nossas Calças
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#171717]">
                {Math.min(summary.showcaseCounts.chapeus, 4)}/4
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
                Nossos Cintos
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

        {params.status === "announcements-updated" && (
          <div className="mt-6 rounded-[22px] border border-[#c9dbef] bg-[#eff6fd] px-5 py-4 text-sm leading-6 text-[#1e5788]">
            Avisos do topo atualizados com sucesso.
          </div>
        )}

        {params.status === "error" && params.message && (
          <div className="mt-6 rounded-[22px] border border-[#efc4c4] bg-[#fff1f1] px-5 py-4 text-sm leading-6 text-[#9e3d3d]">
            {params.message}
          </div>
        )}

        <div className="mt-8 rounded-[30px] border border-[#e5ddd5] bg-white p-6 shadow-[0_16px_48px_rgba(23,23,23,0.05)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                Avisos do topo
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
                Faixa animada do header
              </h2>
            </div>
            <p className="max-w-md text-right text-[13px] leading-6 text-[#68788a]">
              Adicione uma frase por linha para exibir na faixa preta que passa no topo do site.
            </p>
          </div>

          <form action={updateAnnouncementMessagesFromPanel} className="mt-6 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                Frases da faixa
              </span>
              <textarea
                name="announcementMessages"
                defaultValue={announcementMessages.join("\n")}
                rows={5}
                className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] leading-7 text-[#171717] outline-none transition-colors focus:border-[#17345c]"
              />
            </label>

            <p className="text-[13px] leading-6 text-[#68788a]">
              Exemplo: Frete gratis para todo o Brasil, 5% OFF a vista no Pix, novidades toda semana.
            </p>

            <div>
              <SubmitButton
                pendingLabel="Salvando avisos..."
                className="inline-flex items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d]"
              >
                Salvar avisos do topo
              </SubmitButton>
            </div>
          </form>
        </div>

        <AdminProductCatalogModal
          products={catalog.products}
          page={catalog.page}
          totalPages={catalog.totalPages}
          totalCount={catalog.totalCount}
          pageSize={catalog.pageSize}
          query={catalog.query}
          initialIsOpen={params.catalog === "1"}
          homeSectionLabels={homeSectionLabels}
          compact
        />

        <div className="mt-8">
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
                Preencha os dados do produto com mais facilidade e confira tudo
                antes de publicar.
              </p>
            </div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <form
                id="product-create-form"
                action={createProductFromPanel}
                encType="multipart/form-data"
                className="grid gap-8"
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
                  <h3 className="text-lg font-semibold text-[#171717]">Midia</h3>
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

                    <AdminGalleryFilesField />
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#eee4da] bg-[#fcfaf8] p-5">
                  <h3 className="text-lg font-semibold text-[#171717]">
                    Precos, cor e tamanhos
                  </h3>
                  <div className="mt-5 grid gap-5">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                        Valor do produto
                      </span>
                      <input
                        type="text"
                        name="price"
                        required
                        placeholder="R$189,90"
                        className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                      />
                      <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
                        Esse e o valor cheio. O Pix com 5% OFF e calculado automaticamente.
                      </p>
                    </label>
                  </div>

                  <div className="mt-5">
                    <AdminPricingDefaults formId="product-create-form" />
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

                  <AdminDescriptionAssistant formId="product-create-form" />
                </div>

                <SubmitButton
                  pendingLabel="Salvando produto..."
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:bg-[#9eb1c7]"
                >
                  Cadastrar produto
                </SubmitButton>
              </form>

              <AdminProductLivePreview
                formId="product-create-form"
                primaryOptions={panelPrimaryCategoryOptions.map((category) => ({
                  slug: category.slug,
                  label: category.label,
                }))}
                productOptions={panelProductCategoryOptions.map((category) => ({
                  slug: category.slug,
                  label: category.label,
                }))}
                homeSectionLabels={homeSectionLabels}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
