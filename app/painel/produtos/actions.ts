"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { assertDatabaseConfigured } from "@/lib/db";
import { clearAdminSession, requireAdminAuthentication } from "@/lib/admin-auth";
import {
  createProduct,
  deleteProduct,
  getAdminProductById,
  type HomeSection,
  type ProductFormInput,
  updateProduct,
  updateProductHomeSection,
} from "@/lib/products";
import { updateAnnouncementMessages } from "@/lib/site-settings";
import { deleteUploadedAssets, saveUploadedImage } from "@/lib/uploads";

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

function getBoolean(formData: FormData, key: string) {
  return getString(formData, key) === "true";
}

function buildPanelUrl(formData: FormData, extraParams?: Record<string, string>) {
  const params = new URLSearchParams();
  const query = getString(formData, "query");
  const page = getString(formData, "page");
  const catalog = getString(formData, "catalog");

  if (query) {
    params.set("q", query);
  }

  if (page) {
    params.set("page", page);
  }

  if (catalog === "1") {
    params.set("catalog", "1");
  }

  for (const [key, value] of Object.entries(extraParams ?? {})) {
    if (value) {
      params.set(key, value);
    }
  }

  const queryString = params.toString();
  return queryString ? `/painel/produtos?${queryString}` : "/painel/produtos";
}

function revalidateProductExperience(slug: string, navGroups: string[]) {
  revalidatePath("/");
  revalidatePath("/painel/produtos");
  revalidatePath(`/produtos/${slug}`);

  if (navGroups.some((group) => ["bones", "chapeus"].includes(group))) {
    revalidatePath("/categorias/chapeus");
  }

  for (const group of navGroups) {
    revalidatePath(`/categorias/${group}`);
  }
}

function getAdditionalGalleryImages(image: string, gallery: string[]) {
  return gallery.filter((galleryImage) => galleryImage !== image);
}

export async function createProductFromPanel(formData: FormData) {
  await requireAdminAuthentication();
  let redirectPath = "";

  try {
    assertDatabaseConfigured();

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
      price: getString(formData, "price"),
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
    redirectPath = `/painel/produtos?status=created&slug=${product.slug}`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel cadastrar o produto.";

    redirect(`/painel/produtos?status=error&message=${encodeURIComponent(message)}`);
  }

  redirect(redirectPath);
}

export async function toggleHomeSectionFromPanel(formData: FormData) {
  await requireAdminAuthentication();
  let redirectPath = "";

  try {
    assertDatabaseConfigured();

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
    redirectPath = buildPanelUrl(formData, { status: "updated" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel atualizar a vitrine.";

    redirect(
      buildPanelUrl(formData, {
        status: "error",
        message,
      })
    );
  }

  redirect(redirectPath);
}

export async function deleteProductFromPanel(formData: FormData) {
  await requireAdminAuthentication();
  let redirectPath = "";

  try {
    assertDatabaseConfigured();

    const productId = Number(getString(formData, "productId"));

    if (!Number.isFinite(productId) || productId <= 0) {
      throw new Error("Produto invalido.");
    }

    const product = await deleteProduct(productId);
    await deleteUploadedAssets([product.image, ...product.gallery]);
    revalidateProductExperience(product.slug, product.navGroups);

    redirectPath = buildPanelUrl(formData, { status: "deleted" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel remover o produto.";

    redirect(
      buildPanelUrl(formData, {
        status: "error",
        message,
      })
    );
  }

  redirect(redirectPath);
}

export async function logoutFromAdminPanel() {
  await clearAdminSession();
  redirect("/painel/login");
}

export async function updateAnnouncementMessagesFromPanel(formData: FormData) {
  await requireAdminAuthentication();
  let redirectPath = "";

  try {
    assertDatabaseConfigured();

    const messages = getString(formData, "announcementMessages")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    await updateAnnouncementMessages(messages);
    revalidatePath("/");
    revalidatePath("/painel/produtos");

    redirectPath = "/painel/produtos?status=announcements-updated";
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Nao foi possivel atualizar os avisos do topo.";

    redirect(
      `/painel/produtos?status=error&message=${encodeURIComponent(message)}`
    );
  }

  redirect(redirectPath);
}

export async function updateProductFromPanel(formData: FormData) {
  await requireAdminAuthentication();
  let redirectPath = "";

  try {
    assertDatabaseConfigured();

    const productId = Number(getString(formData, "productId"));

    if (!Number.isFinite(productId) || productId <= 0) {
      throw new Error("Produto invalido.");
    }

    const currentProduct = await getAdminProductById(productId);

    if (!currentProduct) {
      throw new Error("Produto nao encontrado.");
    }

    const name = getString(formData, "name");
    const brand = getString(formData, "brand");
    const mainImageFile = formData.get("mainImage");
    const galleryFiles = getUploadedFiles(formData, "galleryFiles");
    const shouldClearExistingGallery = getBoolean(formData, "clearExistingGallery");

    let image = currentProduct.image;
    let oldMainImageToDelete: string | null = null;

    if (mainImageFile instanceof File && mainImageFile.size > 0) {
      image = await saveUploadedImage(mainImageFile, `${brand}-${name}-capa`);
      oldMainImageToDelete = currentProduct.image;
    }

    const newGalleryImages = await Promise.all(
      galleryFiles.map((file, index) =>
        saveUploadedImage(file, `${brand}-${name}-galeria-${index + 1}`)
      )
    );

    const currentAdditionalGallery = getAdditionalGalleryImages(
      currentProduct.image,
      currentProduct.gallery
    );

    const nextAdditionalGallery = shouldClearExistingGallery
      ? newGalleryImages
      : [...currentAdditionalGallery, ...newGalleryImages];

    const input: ProductFormInput = {
      brand,
      name,
      cardTitle: getString(formData, "cardTitle"),
      slug: getString(formData, "slug"),
      image,
      gallery: nextAdditionalGallery,
      price: getString(formData, "price"),
      sizes: getList(formData, "sizes"),
      colorName: getString(formData, "colorName"),
      colorSwatch: getString(formData, "colorSwatch"),
      primaryGroup: getString(formData, "primaryGroup") as ProductFormInput["primaryGroup"],
      categorySlug: getString(formData, "categorySlug") as ProductFormInput["categorySlug"],
      description: getString(formData, "description"),
      homeSections: getHomeSections(formData),
    };

    const updatedProduct = await updateProduct(productId, input);

    const assetsToDelete = [
      ...(oldMainImageToDelete ? [oldMainImageToDelete] : []),
      ...(shouldClearExistingGallery ? currentAdditionalGallery : []),
    ];

    if (assetsToDelete.length > 0) {
      await deleteUploadedAssets(assetsToDelete);
    }

    revalidatePath("/");
    revalidatePath("/painel/produtos");
    revalidatePath(`/produtos/${currentProduct.slug}`);
    revalidatePath(`/produtos/${updatedProduct.slug}`);

    if (
      [...currentProduct.navGroups, ...updatedProduct.navGroups].some((group) =>
        ["bones", "chapeus"].includes(group)
      )
    ) {
      revalidatePath("/categorias/chapeus");
    }

    for (const group of currentProduct.navGroups) {
      revalidatePath(`/categorias/${group}`);
    }

    for (const group of updatedProduct.navGroups) {
      revalidatePath(`/categorias/${group}`);
    }

    redirectPath = `/painel/produtos/${updatedProduct.id}?status=updated`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel atualizar o produto.";

    redirect(
      `/painel/produtos?status=error&message=${encodeURIComponent(message)}`
    );
  }

  redirect(redirectPath);
}
