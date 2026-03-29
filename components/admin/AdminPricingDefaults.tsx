"use client";

import { useEffect, useState } from "react";
import {
  calculatePixPrice,
  defaultInstallmentsLabel,
  defaultPixLabel,
} from "@/lib/product-pricing";

type AdminPricingDefaultsProps = {
  formId: string;
};

export default function AdminPricingDefaults({
  formId,
}: AdminPricingDefaultsProps) {
  const [pixPrice, setPixPrice] = useState("Calculado automaticamente");

  useEffect(() => {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const syncValues = () => {
      const formData = new FormData(form);
      const calculatedPixPrice = calculatePixPrice(String(formData.get("price") ?? ""));

      setPixPrice(calculatedPixPrice || "Calculado automaticamente");
    };

    syncValues();
    form.addEventListener("input", syncValues);
    form.addEventListener("change", syncValues);

    return () => {
      form.removeEventListener("input", syncValues);
      form.removeEventListener("change", syncValues);
    };
  }, [formId]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17345c]">
            Preco Pix
          </span>
          <input
            type="text"
            value={pixPrice}
            readOnly
            tabIndex={-1}
            className="w-full rounded-2xl border border-[#d7dfe6] bg-[#f7f3ee] px-4 py-3 text-[15px] text-[#7a6d61] outline-none"
          />
          <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
            Calculado automaticamente com 5% OFF sobre o preco de venda.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ece3da] bg-white px-4 py-4">
          <p className="text-sm font-semibold text-[#17345c]">Label do Pix</p>
          <p className="mt-2 text-[15px] font-medium text-[#171717]">
            {defaultPixLabel}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ece3da] bg-white px-4 py-4">
          <p className="text-sm font-semibold text-[#17345c]">Parcelamento</p>
          <p className="mt-2 text-[15px] font-medium text-[#171717]">
            {defaultInstallmentsLabel}
          </p>
          <p className="mt-2 text-[12px] leading-5 text-[#68788a]">
            Esse texto fica padrao em todos os produtos.
          </p>
        </div>
      </div>
    </>
  );
}
