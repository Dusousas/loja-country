import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListingView from "@/components/category/CategoryListingView";
import {
  getCategoryBySlug,
  getProductsForCategoryPage,
  type CategorySlug,
} from "@/lib/products";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string | string[] | undefined }>;
};

function getPageValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    value = value[0];
  }

  const page = Number(typeof value === "string" ? value.trim() : "");
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Categoria nao encontrada",
    };
  }

  return {
    title: `${category.title} | Country`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const queryParams = searchParams ? await searchParams : {};
  const requestedPage = getPageValue(queryParams.page);
  const catalog = await getProductsForCategoryPage(slug as CategorySlug, {
    page: requestedPage,
    pageSize: 12,
  });

  return (
    <CategoryListingView
      category={category}
      products={catalog.products}
      currentPage={catalog.page}
      totalPages={catalog.totalPages}
      totalCount={catalog.totalCount}
      paginationBasePath={`/categorias/${slug}`}
    />
  );
}
