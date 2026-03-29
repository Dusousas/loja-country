"use client";

import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { generateProductDescription } from "@/lib/product-description";

type Props = {
  formId: string;
};

function parseSizes(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getSelectLabel(form: HTMLFormElement, name: string) {
  const field = form.elements.namedItem(name);

  if (!(field instanceof HTMLSelectElement)) {
    return "";
  }

  return field.options[field.selectedIndex]?.text ?? "";
}

export default function AdminDescriptionAssistant({ formId }: Props) {
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const syncAvailability = () => {
      const formData = new FormData(form);
      const name = String(formData.get("name") ?? "").trim();
      const brand = String(formData.get("brand") ?? "").trim();

      setCanGenerate(Boolean(name || brand));
    };

    syncAvailability();
    form.addEventListener("input", syncAvailability);
    form.addEventListener("change", syncAvailability);

    return () => {
      form.removeEventListener("input", syncAvailability);
      form.removeEventListener("change", syncAvailability);
    };
  }, [formId]);

  function handleGenerate() {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const descriptionField = form.elements.namedItem("description");

    if (!(descriptionField instanceof HTMLTextAreaElement)) {
      return;
    }

    const formData = new FormData(form);
    const generatedDescription = generateProductDescription({
      brand: String(formData.get("brand") ?? ""),
      name: String(formData.get("name") ?? ""),
      primaryGroup: getSelectLabel(form, "primaryGroup"),
      category: getSelectLabel(form, "categorySlug"),
      colorName: String(formData.get("colorName") ?? ""),
      sizes: parseSizes(String(formData.get("sizes") ?? "")),
      homeSections: formData
        .getAll("homeSections")
        .filter((value): value is string => typeof value === "string"),
    });

    descriptionField.value = generatedDescription;
    descriptionField.dispatchEvent(new Event("input", { bubbles: true }));
    descriptionField.focus();
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#eadfd5] bg-white px-4 py-3">
      <p className="text-[13px] leading-6 text-[#68788a]">
        Gere uma descricao automatica com base no nome, marca, categoria, cor e tamanhos do produto.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8c9bb] bg-[#17345c] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:border-[#d9d9d9] disabled:bg-[#b8c4d3]"
      >
        <FiEdit3 className="text-[14px]" />
        <span>Gerar descricao</span>
      </button>
    </div>
  );
}
