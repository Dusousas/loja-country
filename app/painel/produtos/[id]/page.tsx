import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminDescriptionAssistant from "@/components/admin/AdminDescriptionAssistant";
import AdminGalleryFilesField from "@/components/admin/AdminGalleryFilesField";
import AdminProductLivePreview from "@/components/admin/AdminProductLivePreview";
import AdminPricingDefaults from "@/components/admin/AdminPricingDefaults";
import ColorFields from "@/components/admin/ColorFields";
import SubmitButton from "@/components/admin/SubmitButton";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import { isUploadedImage } from "@/lib/image-utils";
import {
  getAdminProductById,
  panelPrimaryCategoryOptions,
  panelProductCategoryOptions,
} from "@/lib/products";
import { updateProductFromPanel } from "../actions";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ status?: string }>;
};

const homeSectionLabels = {
  promocoes: "Nossos Destaques",
  chapeus: "Nossas Calças",
  infantil: "Nossos Cintos",
} as const;

function getProductCategorySlug(label: string) {
  return (
    panelProductCategoryOptions.find((category) => category.label === label)?.slug ??
    "blusas"
  );
}

function getPrimaryGroupSlugs(navGroups: string[]) {
  const selectedGroups = panelPrimaryCategoryOptions
    .filter((category) => navGroups.includes(category.slug))
    .map((category) => category.slug);

  return selectedGroups.length > 0 ? selectedGroups : ["masculino"];
}

function getAdditionalGalleryImages(image: string, gallery: string[]) {
  return gallery.filter((galleryImage) => galleryImage !== image);
}

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  await requireAdminAuthentication();

  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    notFound();
  }

  const product = await getAdminProductById(parsedId);

  if (!product) {
    notFound();
  }

  const routeSearchParams = searchParams ? await searchParams : {};
  const additionalGallery = getAdditionalGalleryImages(product.image, product.gallery);
  const primaryGroupSlugs = getPrimaryGroupSlugs(product.navGroups);
  const productCategorySlug = getProductCategorySlug(product.category);

  return (
    <section className="py-8 sm:py-10">
      <div className="maxW">
        <div className="rounded-[34px] border border-[#e8ddd2] bg-[linear-gradient(135deg,#fffaf5_0%,#f7efe6_52%,#f2e6d7_100%)] p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5c3d]">
                Edicao
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
                Atualize o produto sem recriar do zero
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-[#536273]">
                Edite as informacoes principais, troque a imagem de capa,
                acrescente novas fotos na galeria e mantenha o produto pronto
                para venda.
              </p>
            </div>

            <Link
              href="/painel/produtos"
              className="inline-flex items-center justify-center rounded-full border border-[#d4c4b5] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#171717] transition-colors hover:border-[#171717]"
            >
              Voltar ao painel
            </Link>
          </div>
        </div>

        {routeSearchParams.status === "updated" && (
          <div className="mt-6 rounded-[22px] border border-[#c9dbef] bg-[#eff6fd] px-5 py-4 text-sm leading-6 text-[#1e5788]">
            Produto atualizado com sucesso.
          </div>
        )}

        <div className="mt-8 rounded-[30px] border border-[#e5ddd5] bg-white p-6 shadow-[0_16px_48px_rgba(23,23,23,0.05)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                Produto
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
                {product.name}
              </h2>
            </div>
            <Link
              href={`/produtos/${product.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-[#d8c9bb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
            >
              Ver na loja
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <form
              id="product-edit-form"
              action={updateProductFromPanel}
              encType="multipart/form-data"
              className="grid gap-8"
            >
              <input type="hidden" name="productId" value={product.id} />

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
                      defaultValue={product.brand}
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
                      defaultValue={product.name}
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
                      defaultValue={product.cardTitle}
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
                      defaultValue={product.slug}
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
                    <div className="grid gap-3 rounded-2xl border border-[#d7dfe6] bg-white p-4">
                      {panelPrimaryCategoryOptions.map((category) => (
                        <label
                          key={category.slug}
                          className="flex items-center gap-3 rounded-2xl border border-[#ece3da] bg-[#fcfbfa] px-4 py-3 text-sm font-medium text-[#171717]"
                        >
                          <input
                            type="checkbox"
                            name="primaryGroups"
                            value={category.slug}
                            defaultChecked={primaryGroupSlugs.includes(category.slug)}
                            className="size-4 accent-[#17345c]"
                          />
                          <span>{category.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
                      Marque todas as categorias principais em que o produto deve aparecer.
                    </p>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                      Categoria do produto
                    </span>
                    <select
                      name="categorySlug"
                      required
                      defaultValue={productCategorySlug}
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
                <div className="mt-5 grid gap-5">
                  <div className="rounded-2xl border border-[#ece3da] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                      Imagem principal atual
                    </p>
                    <div className="mt-3 flex items-start gap-4">
                      <div className="overflow-hidden rounded-[18px] border border-[#e5ddd5] bg-[#f2f2f2]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={180}
                          height={220}
                          unoptimized={isUploadedImage(product.image)}
                          className="h-[160px] w-[132px] object-cover"
                        />
                      </div>
                      <label className="block flex-1">
                        <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                          Trocar imagem principal
                        </span>
                        <input
                          type="file"
                          name="mainImage"
                          accept="image/png,image/jpeg,image/webp,image/avif"
                          className="w-full rounded-2xl border border-dashed border-[#c9d4df] bg-white px-4 py-3 text-[14px] text-[#171717] file:mr-4 file:rounded-full file:border-0 file:bg-[#17345c] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#21497d]"
                        />
                        <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
                          Se enviar uma nova imagem, ela substitui a capa atual.
                        </p>
                      </label>
                    </div>
                  </div>

                  {additionalGallery.length > 0 && (
                    <div className="rounded-2xl border border-[#ece3da] bg-white p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                            Galeria atual
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#536273]">
                            Essas imagens adicionais continuam no produto ate voce limpar a galeria.
                          </p>
                        </div>

                        <label className="inline-flex items-center gap-2 rounded-full border border-[#d8c9bb] bg-[#fcfaf8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c]">
                          <input
                            type="checkbox"
                            name="clearExistingGallery"
                            value="true"
                            className="size-4 accent-[#17345c]"
                          />
                          <span>Limpar galeria atual</span>
                        </label>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {additionalGallery.map((image) => (
                          <div
                            key={image}
                            className="overflow-hidden rounded-[18px] border border-[#e5ddd5] bg-[#f2f2f2]"
                          >
                            <Image
                              src={image}
                              alt={`Imagem adicional de ${product.name}`}
                              width={220}
                              height={220}
                              unoptimized={isUploadedImage(image)}
                              className="aspect-square h-auto w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                      defaultValue={product.price}
                      className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                    />
                    <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
                      Esse e o valor cheio. O Pix com 5% OFF e calculado automaticamente.
                    </p>
                  </label>
                </div>

                <div className="mt-5">
                  <AdminPricingDefaults formId="product-edit-form" />
                </div>

                <ColorFields defaultColors={product.colors} />

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Tamanhos
                  </span>
                  <textarea
                    name="sizes"
                    required
                    rows={3}
                    defaultValue={product.sizes.join(", ")}
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
                        defaultChecked={product.homeSections.includes(section)}
                        className="size-4 accent-[#17345c]"
                      />
                      <span>{homeSectionLabels[section]}</span>
                    </label>
                  ))}
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                    Descricao
                  </span>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    defaultValue={product.description}
                    className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                  />
                </label>

                <AdminDescriptionAssistant formId="product-edit-form" />
              </div>

              <SubmitButton
                pendingLabel="Salvando alteracoes..."
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:bg-[#9eb1c7]"
              >
                Salvar alteracoes
              </SubmitButton>
            </form>

            <AdminProductLivePreview
              formId="product-edit-form"
              primaryOptions={panelPrimaryCategoryOptions.map((category) => ({
                slug: category.slug,
                label: category.label,
              }))}
              productOptions={panelProductCategoryOptions.map((category) => ({
                slug: category.slug,
                label: category.label,
              }))}
              homeSectionLabels={homeSectionLabels}
              fallbackImageUrl={product.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
