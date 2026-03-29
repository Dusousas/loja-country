import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListingView from "@/components/category/CategoryListingView";
import {
  getCategoryBySlug,
  getProductsForCategory,
  type CategorySlug,
} from "@/lib/products";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsForCategory(slug as CategorySlug);

  return <CategoryListingView category={category} products={products} />;
}
