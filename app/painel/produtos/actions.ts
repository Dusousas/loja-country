"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSession, requireAdminAuthentication } from "@/lib/admin-auth";
import {
  createProduct,
  type HomeSection,
  type ProductFormInput,
  updateProductHomeSection,
} from "@/lib/products";
import { saveUploadedImage } from "@/lib/uploads";

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

function getHomeSections(formData: FormData) {
  return formData
    .getAll("homeSections")
    .filter((value): value is string => typeof value === "string")
    .filter((value): value is HomeSection =>
      ["promocoes", "chapeus", "infantil"].includes(value)
    );
}

function getUploadedFiles(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function revalidateProductExperience(slug: string, navGroups: string[]) {
  revalidatePath("/");
  revalidatePath("/painel/produtos");
  revalidatePath(`/produtos/${slug}`);

  for (const group of navGroups) {
    revalidatePath(`/categorias/${group}`);
  }
}

export async function createProductFromPanel(formData: FormData) {
  await requireAdminAuthentication();

  try {
    const name = getString(formData, "name");
    const brand = getString(formData, "brand");
    const mainImageFile = formData.get("mainImage");

    if (!(mainImageFile instanceof File) || mainImageFile.size === 0) {
      throw new Error("Selecione a imagem principal do produto.");
    }

    const image = await saveUploadedImage(mainImageFile, `${brand}-${name}-capa`);
    const galleryFiles = getUploadedFiles(formData, "galleryFiles");
    const gallery = await Promise.all(
      galleryFiles.map((file, index) =>
        saveUploadedImage(file, `${brand}-${name}-galeria-${index + 1}`)
      )
    );

    const input: ProductFormInput = {
      brand,
      name,
      cardTitle: getString(formData, "cardTitle"),
      slug: getString(formData, "slug"),
      image,
      gallery,
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
      homeSections: getHomeSections(formData),
    };

    const product = await createProduct(input);

    revalidateProductExperience(product.slug, product.navGroups);
    redirect(`/painel/produtos?status=created&slug=${product.slug}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel cadastrar o produto.";

    redirect(`/painel/produtos?status=error&message=${encodeURIComponent(message)}`);
  }
}

export async function toggleHomeSectionFromPanel(formData: FormData) {
  await requireAdminAuthentication();

  try {
    const productId = Number(getString(formData, "productId"));
    const section = getString(formData, "section") as HomeSection;
    const enabled = getString(formData, "enabled") === "true";

    if (!Number.isFinite(productId) || productId <= 0) {
      throw new Error("Produto invalido.");
    }

    if (!["promocoes", "chapeus", "infantil"].includes(section)) {
      throw new Error("Vitrine invalida.");
    }

    const product = await updateProductHomeSection(productId, section, enabled);
    revalidateProductExperience(product.slug, product.navGroups);
    redirect("/painel/produtos?status=updated");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel atualizar a vitrine.";

    redirect(`/painel/produtos?status=error&message=${encodeURIComponent(message)}`);
  }
}

export async function logoutFromAdminPanel() {
  await clearAdminSession();
  redirect("/painel/login");
}
