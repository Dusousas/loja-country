import type { Metadata } from "next";
import CategoryListingView from "@/components/category/CategoryListingView";
import { getCatalogProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type CatalogPageProps = {
  searchParams?: Promise<{ q?: string | string[] | undefined }>;
};

function getQueryValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return typeof value === "string" ? value.trim() : "";
}

export async function generateMetadata({
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {};
  const query = getQueryValue(params.q);

  if (!query) {
    return {
      title: "Catalogo | Country",
      description: "Explore todo o catalogo de produtos da Country.",
    };
  }

  return {
    title: `Busca por ${query} | Country`,
    description: `Resultados da busca por ${query} no catalogo da Country.`,
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = getQueryValue(params.q);
  const products = await getCatalogProducts({ query });

  return (
    <CategoryListingView
      products={products}
      title={query ? `Resultados para "${query}"` : "Catalogo"}
      description={
        query
          ? `Veja os produtos relacionados a "${query}" e refine a busca pelos filtros.`
          : "Explore todos os produtos cadastrados e use os filtros para refinar o catalogo."
      }
      breadcrumbItems={[
        { label: "Inicio", href: "/" },
        { label: "Catalogo", href: "/categorias" },
        ...(query ? [{ label: `Busca: ${query}` }] : []),
      ]}
      showCategoryFilter
      emptyDescription={
        query
          ? `Nao encontramos produtos para "${query}". Tente outro termo ou ajuste os filtros.`
          : "Nenhum produto cadastrado no catalogo no momento."
      }
    />
  );
}
