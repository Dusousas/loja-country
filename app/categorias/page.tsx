import type { Metadata } from "next";
import CategoryListingView from "@/components/category/CategoryListingView";
import { getCatalogProductsPage } from "@/lib/products";

export const dynamic = "force-dynamic";

type CatalogPageProps = {
  searchParams?: Promise<{
    q?: string | string[] | undefined;
    page?: string | string[] | undefined;
  }>;
};

function getQueryValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return typeof value === "string" ? value.trim() : "";
}

function getPageValue(value: string | string[] | undefined) {
  const page = Number(getQueryValue(value));
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
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
  const requestedPage = getPageValue(params.page);
  const catalog = await getCatalogProductsPage({
    query,
    page: requestedPage,
    pageSize: 12,
  });

  return (
    <CategoryListingView
      products={catalog.products}
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
      currentPage={catalog.page}
      totalPages={catalog.totalPages}
      totalCount={catalog.totalCount}
      paginationBasePath="/categorias"
      paginationQuery={query ? { q: query } : undefined}
    />
  );
}
