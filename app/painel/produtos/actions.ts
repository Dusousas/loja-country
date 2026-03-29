"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSession, requireAdminAuthentication } from "@/lib/admin-auth";
import { createProduct, type ProductFormInput } from "@/lib/products";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getList(formData: FormData, key: string) {
  return getString(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createProductFromPanel(formData: FormData) {
  await requireAdminAuthentication();

  const input: ProductFormInput = {
    brand: getString(formData, "brand"),
    name: getString(formData, "name"),
    cardTitle: getString(formData, "cardTitle"),
    slug: getString(formData, "slug"),
    image: getString(formData, "image"),
    gallery: getList(formData, "gallery"),
    originalPrice: getString(formData, "originalPrice"),
    price: getString(formData, "price"),
    pixPrice: getString(formData, "pixPrice"),
    pixLabel: getString(formData, "pixLabel"),
    installments: getString(formData, "installments"),
    sizes: getList(formData, "sizes"),
    colorName: getString(formData, "colorName"),
    colorSwatch: getString(formData, "colorSwatch"),
    primaryGroup: getString(formData, "primaryGroup") as ProductFormInput["primaryGroup"],
    categorySlug: getString(formData, "categorySlug") as ProductFormInput["categorySlug"],
    description: getString(formData, "description"),
  };

  try {
    const product = await createProduct(input);

    revalidatePath("/painel/produtos");
    revalidatePath(`/produtos/${product.slug}`);

    for (const group of product.navGroups) {
      revalidatePath(`/categorias/${group}`);
    }

    redirect(`/painel/produtos?status=created&slug=${product.slug}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel cadastrar o produto.";

    redirect(`/painel/produtos?status=error&message=${encodeURIComponent(message)}`);
  }
}

export async function logoutFromAdminPanel() {
  await clearAdminSession();
  redirect("/painel/login");
}
