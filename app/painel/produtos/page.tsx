import Link from "next/link";
import SubmitButton from "@/components/admin/SubmitButton";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import {
  defaultProducts,
  getCustomProducts,
  panelPrimaryCategoryOptions,
  panelProductCategoryOptions,
} from "@/lib/products";
import { createProductFromPanel, logoutFromAdminPanel } from "./actions";

export const dynamic = "force-dynamic";

type ProductAdminPageProps = {
  searchParams?: Promise<{ status?: string; slug?: string; message?: string }>;
};

export default async function ProductAdminPage({
  searchParams,
}: ProductAdminPageProps) {
  await requireAdminAuthentication();

  const params = searchParams ? await searchParams : {};
  const customProducts = await getCustomProducts();

  return (
    <section className="py-8 sm:py-10">
      <div className="maxW">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8f5c3d]">
              Painel de produtos
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#171717]">
              Cadastre novos produtos da loja
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#536273]">
              Este painel salva apenas produtos. As demais vitrines continuam
              sendo mantidas via codigo.
            </p>
          </div>

          <form action={logoutFromAdminPanel}>
            <SubmitButton
              pendingLabel="Saindo..."
              className="inline-flex items-center justify-center rounded-full border border-[#d5c7bb] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#171717] transition-colors hover:border-[#171717]"
            >
              Sair
            </SubmitButton>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[#eadfd5] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
              Produtos base
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#171717]">
              {defaultProducts.length}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#eadfd5] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
              Cadastrados no painel
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#171717]">
              {customProducts.length}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#eadfd5] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f5c3d]">
              Persistencia
            </p>
            <p className="mt-3 text-sm leading-7 text-[#536273]">
              O arquivo salvo pelo painel fica em <code>data/products.json</code>.
            </p>
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

        {params.status === "error" && params.message && (
          <div className="mt-6 rounded-[22px] border border-[#efc4c4] bg-[#fff1f1] px-5 py-4 text-sm leading-6 text-[#9e3d3d]">
            {params.message}
          </div>
        )}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[28px] border border-[#e5ddd5] bg-white p-6 shadow-[0_14px_42px_rgba(23,23,23,0.05)] sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#171717]">
                Novo produto
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-[#536273]">
                Use caminhos de imagem que ja existam em <code>public/</code>,
                por exemplo <code>/img-teste.jpg</code>.
              </p>
            </div>

            <form action={createProductFromPanel} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Marca
                  </span>
                  <input
                    type="text"
                    name="brand"
                    required
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Titulo do card
                  </span>
                  <input
                    type="text"
                    name="cardTitle"
                    placeholder="Se vazio, usa o nome do produto"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Categoria principal
                  </span>
                  <select
                    name="primaryGroup"
                    required
                    defaultValue="masculino"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  >
                    {panelProductCategoryOptions.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Preco original
                  </span>
                  <input
                    type="text"
                    name="originalPrice"
                    required
                    placeholder="R$189,90"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Label do Pix
                  </span>
                  <input
                    type="text"
                    name="pixLabel"
                    placeholder="5% OFF a vista no Pix"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
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
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Cor
                  </span>
                  <input
                    type="text"
                    name="colorName"
                    required
                    placeholder="Marinho"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Hex da cor
                  </span>
                  <input
                    type="text"
                    name="colorSwatch"
                    required
                    placeholder="#16365f"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Imagem principal
                  </span>
                  <input
                    type="text"
                    name="image"
                    required
                    placeholder="/img-teste.jpg"
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Tamanhos
                  </span>
                  <textarea
                    name="sizes"
                    required
                    rows={3}
                    placeholder={"P, M, G\nou um por linha"}
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                  Galeria
                </span>
                <textarea
                  name="gallery"
                  rows={4}
                  placeholder={"/img-teste.jpg\n/img-teste-2.jpg\nou separado por virgula"}
                  className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                  Descricao
                </span>
                <textarea
                  name="description"
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                />
              </label>

              <SubmitButton
                pendingLabel="Salvando produto..."
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:bg-[#9eb1c7]"
              >
                Cadastrar produto
              </SubmitButton>
            </form>
          </div>

          <div className="rounded-[28px] border border-[#e5ddd5] bg-white p-6 shadow-[0_14px_42px_rgba(23,23,23,0.05)] sm:p-8">
            <h2 className="text-2xl font-semibold text-[#171717]">
              Produtos cadastrados no painel
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#536273]">
              Estes itens vieram do arquivo persistente e podem ser acessados pela
              loja imediatamente.
            </p>

            <div className="mt-6 space-y-4">
              {customProducts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#d9d0c7] bg-[#fcfbfa] px-5 py-8 text-sm leading-6 text-[#536273]">
                  Nenhum produto cadastrado pelo painel ainda.
                </div>
              )}

              {customProducts.map((product) => (
                <article
                  key={product.slug}
                  className="rounded-2xl border border-[#ece3da] bg-[#fcfbfa] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                        {product.brand}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[#171717]">
                        {product.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c]">
                      {product.category}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-[#536273]">
                    <p>
                      <span className="font-semibold text-[#171717]">Slug:</span>{" "}
                      {product.slug}
                    </p>
                    <p>
                      <span className="font-semibold text-[#171717]">Preco:</span>{" "}
                      {product.price}
                    </p>
                    <p>
                      <span className="font-semibold text-[#171717]">Grupos:</span>{" "}
                      {product.navGroups.join(", ")}
                    </p>
                  </div>

                  <Link
                    href={`/produtos/${product.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[#17345c] transition-colors hover:text-[#8f5c3d]"
                  >
                    Ver produto na loja
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
