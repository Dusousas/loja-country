"use client";

import { useMemo, useRef, useState } from "react";
import { FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";

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
  savedColors?: ProductColor[];
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

function getNormalizedSwatch(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value.trim()) ? value.trim() : "#17345c";
}

function getColorKey(color: ProductColor) {
  return `${color.name.trim().toLowerCase()}::${getNormalizedSwatch(color.swatch).toLowerCase()}`;
}

export default function ColorFields({
  defaultColors = [],
  savedColors = [],
}: ColorFieldsProps) {
  const [colors, setColors] = useState(() => getInitialColors(defaultColors));
  const [draftName, setDraftName] = useState("");
  const [draftSwatch, setDraftSwatch] = useState("#17345c");
  const [editingId, setEditingId] = useState<string | null>(null);
  const nextIdRef = useRef(colors.length + 1);
  const reusableColors = useMemo(() => {
    const uniqueColors = new Map<string, ProductColor>();

    [
      ...presetColors.map((preset) => ({
        name: preset.label,
        swatch: preset.value,
      })),
      ...savedColors,
      ...defaultColors,
    ].forEach((color) => {
      const name = color.name.trim();

      if (!name) {
        return;
      }

      const normalizedColor = {
        name,
        swatch: getNormalizedSwatch(color.swatch),
      };

      uniqueColors.set(getColorKey(normalizedColor), normalizedColor);
    });

    return Array.from(uniqueColors.values());
  }, [defaultColors, savedColors]);

  function resetDraft() {
    setDraftName("");
    setDraftSwatch("#17345c");
    setEditingId(null);
  }

  function applyPreset(preset: { label: string; value: string }) {
    setDraftName((current) => (current.trim() ? current : preset.label));
    setDraftSwatch(preset.value);
  }

  function addColorToList(color: ProductColor) {
    const normalizedName = color.name.trim();

    if (!normalizedName) {
      return;
    }

    const normalizedColor = {
      name: normalizedName,
      swatch: getNormalizedSwatch(color.swatch),
    };
    const existingColor = colors.find(
      (item) => getColorKey(item) === getColorKey(normalizedColor)
    );

    if (existingColor) {
      selectColorForEditing(existingColor.id);
      return;
    }

    const nextId = `color-${nextIdRef.current}`;
    nextIdRef.current += 1;

    setColors((current) => [...current, { id: nextId, ...normalizedColor }]);
    resetDraft();
  }

  function saveDraftColor() {
    const normalizedName = draftName.trim();

    if (!normalizedName) {
      return;
    }

    if (editingId) {
      setColors((current) =>
        current.map((color) =>
          color.id === editingId
            ? {
                ...color,
                name: normalizedName,
                swatch: getNormalizedSwatch(draftSwatch),
              }
            : color
        )
      );
      resetDraft();
      return;
    }

    addColorToList({ name: normalizedName, swatch: draftSwatch });
  }

  function selectColorForEditing(id: string) {
    const color = colors.find((item) => item.id === id);

    if (!color) {
      return;
    }

    setDraftName(color.name);
    setDraftSwatch(color.swatch);
    setEditingId(color.id);
  }

  function removeColor(id: string) {
    setColors((current) => current.filter((color) => color.id !== id));

    if (editingId === id) {
      resetDraft();
    }
  }

  return (
    <div className="mt-5 rounded-2xl border border-[#ece3da] bg-white p-4">
      {colors.map((color, index) => (
        <div key={color.id}>
          <input type="hidden" name="colorNames" value={color.name} />
          <input type="hidden" name="colorSwatches" value={color.swatch} />
          {index === 0 && (
            <input
              type="text"
              readOnly
              required
              value={colors.map((item) => item.name).join(", ")}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#17345c]">Cores do produto</p>
          <p className="mt-1 text-[13px] leading-6 text-[#68788a]">
            Adicione uma ou mais cores para o mesmo item.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {presetColors.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => applyPreset(preset)}
            className="inline-flex items-center gap-2 rounded-full border border-[#dfd5ca] bg-[#fcfaf8] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#17345c] transition-colors hover:border-[#17345c]"
          >
            <span
              className="block size-4 rounded-full border border-black/10"
              style={{ backgroundColor: preset.value }}
            />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {reusableColors.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-[#17345c]">Cores salvas</p>
          <p className="mt-1 text-[13px] leading-6 text-[#68788a]">
            Clique em uma cor para reutilizar em outros produtos.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {reusableColors.map((color) => {
              const alreadyAdded = colors.some(
                (item) => getColorKey(item) === getColorKey(color)
              );

              return (
                <button
                  key={getColorKey(color)}
                  type="button"
                  onClick={() => addColorToList(color)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    alreadyAdded
                      ? "border-[#17345c] bg-[#f2f7fc] text-[#17345c]"
                      : "border-[#dfd5ca] bg-white text-[#17345c] hover:border-[#17345c]"
                  }`}
                >
                  <span
                    className="block size-4 rounded-full border border-black/10"
                    style={{ backgroundColor: color.swatch }}
                  />
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-[#ece3da] bg-[#fcfbfa] p-4">
        <div className="grid gap-5 md:grid-cols-[1fr_180px_160px_auto]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17345c]">
              Nome da cor
            </span>
            <input
              type="text"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
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
              value={draftSwatch}
              onChange={(event) => setDraftSwatch(event.target.value)}
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
                /^#[0-9a-fA-F]{6}$/.test(draftSwatch) ? draftSwatch : "#17345c"
              }
              onChange={(event) => setDraftSwatch(event.target.value)}
              className="h-[52px] w-full cursor-pointer rounded-2xl border border-[#d7dfe6] bg-white p-2"
            />
          </label>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={saveDraftColor}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#17345c] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#21497d]"
            >
              {editingId ? <FiCheck className="text-[14px]" /> : <FiPlus className="text-[14px]" />}
              <span>{editingId ? "Atualizar" : "Adicionar"}</span>
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetDraft}
                className="inline-flex h-[52px] items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#17345c] transition-colors hover:border-[#17345c]"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-semibold text-[#17345c]">
          Cores adicionadas
        </p>

        {colors.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isEditing = editingId === color.id;

              return (
                <div
                  key={color.id}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    isEditing
                      ? "border-[#17345c] bg-[#f2f7fc] text-[#17345c]"
                      : "border-[#dfd5ca] bg-white text-[#17345c]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectColorForEditing(color.id)}
                    className="inline-flex items-center gap-2"
                  >
                    <span
                      className="block size-4 rounded-full border border-black/10"
                      style={{ backgroundColor: color.swatch }}
                    />
                    <span>{color.name}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeColor(color.id)}
                    className="inline-flex size-5 items-center justify-center rounded-full text-[#8a3030] transition-colors hover:bg-[#fff1f1]"
                    aria-label={`Remover cor ${color.name}`}
                  >
                    <FiTrash2 className="text-[11px]" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[13px] leading-6 text-[#68788a]">
            Nenhuma cor adicionada ainda.
          </p>
        )}
      </div>
    </div>
  );
}
