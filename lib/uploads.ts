import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const uploadDirectory = path.join(process.cwd(), "data", "uploads");

const mimeTypeToExtension: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

function sanitizeBasename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveUploadedImage(file: File, prefix: string) {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Selecione uma imagem valida.");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Cada imagem pode ter no maximo 8MB.");
  }

  const extension =
    mimeTypeToExtension[file.type] ||
    path.extname(file.name || "").toLowerCase() ||
    ".jpg";

  if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(extension)) {
    throw new Error("Formato de imagem nao suportado. Use JPG, PNG, WEBP ou AVIF.");
  }

  await mkdir(uploadDirectory, { recursive: true });

  const fileName = `${sanitizeBasename(prefix) || "produto"}-${randomUUID()}${extension}`;
  const filePath = path.join(uploadDirectory, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}
