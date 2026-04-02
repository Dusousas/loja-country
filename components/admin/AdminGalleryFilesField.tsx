"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { shouldDisableImageOptimization } from "@/lib/image-utils";

type GalleryPreview = {
  id: string;
  name: string;
  url: string;
};

export default function AdminGalleryFilesField() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filesRef = useRef<File[]>([]);
  const [previews, setPreviews] = useState<GalleryPreview[]>([]);
  const previousUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      previousUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function syncInputFiles(files: File[]) {
    if (!inputRef.current) {
      return;
    }

    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
      dataTransfer.items.add(file);
    });

    inputRef.current.files = dataTransfer.files;
  }

  function updatePreviews(files: File[]) {
    previousUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    const nextPreviews = files.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    previousUrlsRef.current = nextPreviews.map((preview) => preview.url);
    setPreviews(nextPreviews);
  }

  function mergeFiles(currentFiles: File[], incomingFiles: File[]) {
    const merged = [...currentFiles];

    incomingFiles.forEach((file) => {
      const alreadyIncluded = merged.some(
        (currentFile) =>
          currentFile.name === file.name &&
          currentFile.size === file.size &&
          currentFile.lastModified === file.lastModified
      );

      if (!alreadyIncluded) {
        merged.push(file);
      }
    });

    return merged;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.target.files ?? []);
    const nextFiles = mergeFiles(filesRef.current, incomingFiles);

    filesRef.current = nextFiles;
    syncInputFiles(nextFiles);
    updatePreviews(nextFiles);
  }

  function handleRemove(id: string) {
    const nextFiles = filesRef.current.filter((file, index) => {
      const fileId = `${file.name}-${file.lastModified}-${index}`;
      return fileId !== id;
    });

    filesRef.current = nextFiles;
    syncInputFiles(nextFiles);
    updatePreviews(nextFiles);
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#17345c]">
        Galeria adicional
      </span>
      <input
        ref={inputRef}
        type="file"
        name="galleryFiles"
        accept="image/png,image/jpeg,image/webp,image/avif"
        multiple
        onChange={handleChange}
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
        className="w-full rounded-2xl border border-dashed border-[#c9d4df] bg-white px-4 py-3 text-[14px] text-[#171717] file:mr-4 file:rounded-full file:border-0 file:bg-[#e7eef6] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#17345c] hover:file:bg-[#dce7f2]"
      />

      <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
        Voce pode selecionar varias fotos de uma vez ou ir adicionando uma por uma. As novas selecoes ficam acumuladas.
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
                    sizes="(max-width: 640px) 50vw, 160px"
                    unoptimized={shouldDisableImageOptimization(preview.url)}
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <p className="truncate text-[11px] text-[#536273]">
                    {preview.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemove(preview.id)}
                    aria-label={`Remover ${preview.name}`}
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[#eadfd5] text-[#8a3030] transition-colors hover:border-[#8a3030] hover:bg-[#fff1f1]"
                  >
                    <FiTrash2 className="text-[13px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </label>
  );
}
