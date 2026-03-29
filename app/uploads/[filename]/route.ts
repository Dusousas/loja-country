import { readFile } from "node:fs/promises";
import path from "node:path";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

type UploadRouteProps = {
  params: Promise<{ filename: string }>;
};

export async function GET(_: Request, { params }: UploadRouteProps) {
  const { filename } = await params;

  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "data", "uploads", filename);
  const extension = path.extname(filename).toLowerCase();

  try {
    const file = await readFile(filePath);

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": mimeTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
