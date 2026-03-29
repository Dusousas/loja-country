"use client";

import { useState } from "react";

const presetColors = [
  { label: "Marinho", value: "#17345c" },
  { label: "Caramelo", value: "#8b5a34" },
  { label: "Terracota", value: "#b65e4c" },
  { label: "Caqui", value: "#b7976a" },
  { label: "Vinho", value: "#7b2333" },
  { label: "Preto", value: "#262626" },
];

export default function ColorFields() {
  const [colorSwatch, setColorSwatch] = useState("#17345c");

  return (
    <div className="mt-5 rounded-2xl border border-[#ece3da] bg-white p-4">
      <div className="grid gap-5 md:grid-cols-[1fr_180px_160px]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17345c]">
            Nome da cor
          </span>
          <input
            type="text"
            name="colorName"
            required
            placeholder="Marinho"
            className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17345c]">
            Hex
          </span>
          <input
            type="text"
            name="colorSwatch"
            required
            value={colorSwatch}
            onChange={(event) => setColorSwatch(event.target.value)}
            className="w-full rounded-2xl border border-[#d7dfe6] bg-white px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17345c]">
            Seletor visual
          </span>
          <input
            type="color"
            value={colorSwatch}
            onChange={(event) => setColorSwatch(event.target.value)}
            className="h-[52px] w-full cursor-pointer rounded-2xl border border-[#d7dfe6] bg-white p-2"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => setColorSwatch(color.value)}
            className="inline-flex items-center gap-2 rounded-full border border-[#dfd5ca] bg-[#fcfaf8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
          >
            <span
              className="block size-4 rounded-full border border-black/10"
              style={{ backgroundColor: color.value }}
            />
            <span>{color.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
