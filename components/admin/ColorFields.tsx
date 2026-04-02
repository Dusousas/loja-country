"use client";

import { useRef, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import type { ProductColor } from "@/lib/products";

const presetColors = [
  { label: "Marinho", value: "#17345c" },
  { label: "Caramelo", value: "#8b5a34" },
  { label: "Terracota", value: "#b65e4c" },
  { label: "Caqui", value: "#b7976a" },
  { label: "Vinho", value: "#7b2333" },
  { label: "Preto", value: "#262626" },
];

type ColorFieldsProps = {
  defaultColors?: ProductColor[];
};

function getInitialColors(defaultColors: ProductColor[]) {
  if (defaultColors.length > 0) {
    return defaultColors.map((color, index) => ({
      id: `color-${index + 1}`,
      name: color.name,
      swatch: color.swatch,
    }));
  }

  return [{ id: "color-1", name: "", swatch: "#17345c" }];
}

export default function ColorFields({
  defaultColors = [],
}: ColorFieldsProps) {
  const [colors, setColors] = useState(() => getInitialColors(defaultColors));
  const nextIdRef = useRef(colors.length + 1);

  function updateColor(
    id: string,
    field: "name" | "swatch",
    value: string
  ) {
    setColors((current) =>
      current.map((color) =>
        color.id === id ? { ...color, [field]: value } : color
      )
    );
  }

  function applyPreset(id: string, preset: { label: string; value: string }) {
    setColors((current) =>
      current.map((color) =>
        color.id === id
          ? {
              ...color,
              name: color.name.trim() ? color.name : preset.label,
              swatch: preset.value,
            }
          : color
      )
    );
  }

  function addColor() {
    const nextId = `color-${nextIdRef.current}`;
    nextIdRef.current += 1;

    setColors((current) => [
      ...current,
      { id: nextId, name: "", swatch: "#17345c" },
    ]);
  }

  function removeColor(id: string) {
    setColors((current) =>
      current.length > 1 ? current.filter((color) => color.id !== id) : current
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-[#ece3da] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#17345c]">Cores do produto</p>
          <p className="mt-1 text-[13px] leading-6 text-[#68788a]">
            Adicione uma ou mais cores para o mesmo item.
          </p>
        </div>

        <button
          type="button"
          onClick={addColor}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8c9bb] bg-[#fcfaf8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
        >
          <FiPlus className="text-[14px]" />
          <span>Adicionar cor</span>
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {colors.map((color, index) => (
          <div
            key={color.id}
            className="rounded-2xl border border-[#ece3da] bg-[#fcfbfa] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
                Cor {index + 1}
              </p>

              <button
                type="button"
                onClick={() => removeColor(color.id)}
                disabled={colors.length === 1}
                className="inline-flex items-center gap-2 rounded-full border border-[#eadfd5] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a3030] transition-colors hover:border-[#8a3030] disabled:cursor-not-allowed disabled:border-[#ebe6e1] disabled:text-[#c0b2a8]"
              >
                <FiTrash2 className="text-[13px]" />
                <span>Remover</span>
              </button>
            </div>

            <div className="mt-4 grid gap-5 md:grid-cols-[1fr_180px_160px]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                  Nome da cor
                </span>
                <input
                  type="text"
                  name="colorNames"
                  required={index === 0}
                  placeholder="Marinho"
                  value={color.name}
                  onChange={(event) =>
                    updateColor(color.id, "name", event.target.value)
                  }
                  className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                  Hex
                </span>
                <input
                  type="text"
                  name="colorSwatches"
                  required={index === 0}
                  value={color.swatch}
                  onChange={(event) =>
                    updateColor(color.id, "swatch", event.target.value)
                  }
                  className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#17345c]">
                  Seletor visual
                </span>
                <input
                  type="color"
                  value={
                    /^#[0-9a-fA-F]{6}$/.test(color.swatch)
                      ? color.swatch
                      : "#17345c"
                  }
                  onChange={(event) =>
                    updateColor(color.id, "swatch", event.target.value)
                  }
                  className="h-[52px] w-full cursor-pointer rounded-2xl border border-[#d7dfe6] bg-white p-2"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {presetColors.map((preset) => (
                <button
                  key={`${color.id}-${preset.value}`}
                  type="button"
                  onClick={() => applyPreset(color.id, preset)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dfd5ca] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
                >
                  <span
                    className="block size-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
