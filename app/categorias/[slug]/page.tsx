import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListingView from "@/components/category/CategoryListingView";
import {
  categoryDefinitions,
  getCategoryBySlug,
  getProductsForCategory,
  type CategorySlug,
} from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categoryDefinitions.map((category) => ({
    slug: category.slug,
  }));
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsForCategory(slug as CategorySlug);

  return <CategoryListingView category={category} products={products} />;
}
