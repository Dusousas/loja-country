"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";
import {
  calculatePixPrice,
  defaultInstallmentsLabel,
  defaultPixLabel,
} from "@/lib/product-pricing";

type HomeSection = "promocoes" | "chapeus" | "infantil";

type CategoryOption = {
  slug: string;
  label: string;
};

type PreviewProps = {
  formId: string;
  primaryOptions: CategoryOption[];
  productOptions: CategoryOption[];
  homeSectionLabels: Record<HomeSection, string>;
  fallbackImageUrl?: string;
};

type PreviewState = {
  brand: string;
  name: string;
  cardTitle: string;
  primaryGroup: string;
  category: string;
  imageUrl: string;
  price: string;
  pixPrice: string;
  colorName: string;
  colorSwatch: string;
  sizes: string[];
  description: string;
  homeSections: HomeSection[];
};

const defaultImage = "/img-teste.jpg";

const initialState: PreviewState = {
  brand: "Sua marca",
  name: "Nome do produto",
  cardTitle: "Nome do produto",
  primaryGroup: "Masculino",
  category: "Blusas",
  imageUrl: defaultImage,
  price: "R$189,90",
  pixPrice: "R$180,41",
  colorName: "Marinho",
  colorSwatch: "#17345c",
  sizes: ["P", "M", "G"],
  description:
    "A descricao digitada no formulario aparece aqui para validar o visual antes de salvar.",
  homeSections: [],
};

function parseSizes(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getOptionLabel(options: CategoryOption[], slug: string, fallback: string) {
  return options.find((option) => option.slug === slug)?.label ?? fallback;
}

function getValidSwatch(value: FormDataEntryValue | null) {
  const swatch = String(value ?? "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(swatch) ? swatch : "#17345c";
}

export default function AdminProductLivePreview({
  formId,
  primaryOptions,
  productOptions,
  homeSectionLabels,
  fallbackImageUrl = defaultImage,
}: PreviewProps) {
  const [preview, setPreview] = useState<PreviewState>(initialState);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const syncPreview = () => {
      const formData = new FormData(form);
      const mainImage = formData.get("mainImage");
      let imageUrl = fallbackImageUrl;

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      if (mainImage instanceof File && mainImage.size > 0) {
        imageUrl = URL.createObjectURL(mainImage);
        objectUrlRef.current = imageUrl;
      }

      const sizes = parseSizes(formData.get("sizes"));
      const homeSections = formData
        .getAll("homeSections")
        .filter((value): value is HomeSection =>
          typeof value === "string" &&
          ["promocoes", "chapeus", "infantil"].includes(value)
        );

      const name = String(formData.get("name") ?? "").trim();

      setPreview({
        brand: String(formData.get("brand") ?? "").trim() || initialState.brand,
        name: name || initialState.name,
        cardTitle:
          String(formData.get("cardTitle") ?? "").trim() || name || initialState.cardTitle,
        primaryGroup: getOptionLabel(
          primaryOptions,
          String(formData.get("primaryGroup") ?? "masculino"),
          initialState.primaryGroup
        ),
        category: getOptionLabel(
          productOptions,
          String(formData.get("categorySlug") ?? "blusas"),
          initialState.category
        ),
        imageUrl,
        price: String(formData.get("price") ?? "").trim() || initialState.price,
        pixPrice:
          calculatePixPrice(String(formData.get("price") ?? "")) || initialState.pixPrice,
        colorName:
          String(formData.get("colorName") ?? "").trim() || initialState.colorName,
        colorSwatch: getValidSwatch(formData.get("colorSwatch")),
        sizes: sizes.length > 0 ? sizes.slice(0, 4) : initialState.sizes,
        description:
          String(formData.get("description") ?? "").trim() || initialState.description,
        homeSections,
      });
    };

    syncPreview();
    form.addEventListener("input", syncPreview);
    form.addEventListener("change", syncPreview);

    return () => {
      form.removeEventListener("input", syncPreview);
      form.removeEventListener("change", syncPreview);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [formId, primaryOptions, productOptions]);

  return (
    <aside className="rounded-[28px] border border-[#e8ddd2] bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe7_100%)] p-5 shadow-[0_18px_38px_rgba(23,23,23,0.06)] xl:sticky xl:top-6 xl:h-fit">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
            Previa
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[#171717]">
            Como vai ficar
          </h3>
        </div>
        <span className="rounded-full border border-[#eadfd5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#17345c]">
          Ao vivo
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-[24px] border border-[#dfd5ca] bg-white p-3 shadow-[0_10px_24px_rgba(23,23,23,0.05)]">
        <div className="overflow-hidden rounded-[18px] border border-[#ececec] bg-[#f2f2f2]">
          <Image
            src={preview.imageUrl}
            alt={preview.name}
            width={620}
            height={760}
            className="h-[295px] w-full object-cover"
          />
        </div>

        <div className="px-2 pb-2 pt-4 text-center">
          <p className="text-[13px] font-medium text-[#171717]">{preview.brand}</p>

          <h4 className="mx-auto mt-2 min-h-[78px] max-w-[240px] text-[18px] leading-[1.1] font-extrabold text-[#171717]">
            {preview.cardTitle}
          </h4>

          <div className="mt-3 flex min-h-[34px] flex-wrap items-center justify-center gap-1.5">
            {preview.sizes.map((size) => (
              <span
                key={size}
                className="flex h-7 min-w-7 items-center justify-center rounded-full border border-[#32537c] px-1.5 text-[12px] font-medium text-[#17345c]"
              >
                {size}
              </span>
            ))}
          </div>

          <div className="mt-4 min-h-[78px] border-t border-[#ededed] pt-4">
            <p className="flex items-center justify-center gap-2 text-[15px] font-bold text-[#0a6b3d] sm:text-[14px]">
              <SiPix className="text-[18px]" />
              <span>{preview.pixPrice} com Pix</span>
            </p>

            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8f5c3d]">
              {defaultPixLabel}
            </p>

            <p className="mt-1 flex items-center justify-center gap-2 text-[13px] font-medium text-[#46566f] sm:text-[12px]">
              <FiCreditCard className="text-[15px]" />
              <span>{defaultInstallmentsLabel}</span>
            </p>
          </div>

          <div className="mt-4 flex w-full items-center justify-center gap-2 bg-[#2fb15a] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.06em] text-white">
            <FaWhatsapp className="text-[18px]" />
            <span>Comprar</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] border border-[#eadfd5] bg-white/85 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#f5efe8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8f5c3d]">
            {preview.primaryGroup}
          </span>
          <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#17345c]">
            {preview.category}
          </span>
          {preview.homeSections.map((section) => (
            <span
              key={section}
              className="rounded-full bg-[#17345c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              {homeSectionLabels[section]}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span
            className="block size-7 rounded-full border border-black/10"
            style={{ backgroundColor: preview.colorSwatch }}
          />
          <div>
            <p className="text-sm font-semibold text-[#171717]">{preview.colorName}</p>
            <p className="text-xs text-[#68788a]">Valor cheio do produto</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#536273]">{preview.description}</p>

        <div className="mt-4 rounded-2xl border border-[#ece3da] bg-[#fcfbfa] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5c3d]">
            Valor do produto
          </p>
          <p className="mt-1 text-2xl font-semibold text-[#171717]">{preview.price}</p>
        </div>
      </div>
    </aside>
  );
}
