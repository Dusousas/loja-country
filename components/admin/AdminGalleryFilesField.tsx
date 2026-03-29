"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryPreview = {
  id: string;
  name: string;
  url: string;
};

export default function AdminGalleryFilesField() {
  const [previews, setPreviews] = useState<GalleryPreview[]>([]);
  const previousUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      previousUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    previousUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const files = Array.from(event.target.files ?? []);
    const nextPreviews = files.map((file, index) => ({
      id: `${file.name}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    previousUrlsRef.current = nextPreviews.map((preview) => preview.url);
    setPreviews(nextPreviews);
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#17345c]">
        Galeria adicional
      </span>
      <input
        type="file"
        name="galleryFiles"
        accept="image/png,image/jpeg,image/webp,image/avif"
        multiple
        onChange={handleChange}
        className="w-full rounded-2xl border border-dashed border-[#c9d4df] bg-white px-4 py-3 text-[14px] text-[#171717] file:mr-4 file:rounded-full file:border-0 file:bg-[#e7eef6] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#17345c] hover:file:bg-[#dce7f2]"
      />

      <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
        Voce pode selecionar varias fotos de uma vez para montar a galeria do produto.
      </p>

      {previews.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[#ece3da] bg-[#fcfbfa] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
            {previews.length} foto{previews.length > 1 ? "s" : ""} selecionada
            {previews.length > 1 ? "s" : ""}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previews.map((preview) => (
              <div
                key={preview.id}
                className="overflow-hidden rounded-[18px] border border-[#e5ddd5] bg-white"
              >
                <div className="relative aspect-square">
                  <Image
                    src={preview.url}
                    alt={preview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="truncate px-3 py-2 text-[11px] text-[#536273]">
                  {preview.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </label>
  );
}
