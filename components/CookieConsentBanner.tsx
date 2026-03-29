"use client";

import { useEffect, useState } from "react";

const KEY = "cookie_consent";
const CONSENT_EVENT = "cookie-consent-change";
type Consent = "accepted" | "rejected";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  function handleConsent(nextConsent: Consent) {
    localStorage.setItem(KEY, nextConsent);
    setConsent(nextConsent);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-[#e7ddd3] bg-white p-5 shadow-[0_24px_70px_rgba(23,23,23,0.16)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
              Cookies
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#171717] sm:text-2xl">
              Podemos usar cookies para medir acessos e melhorar sua experiencia.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#536273] sm:text-[15px]">
              Usamos cookies de analise para entender como o site e utilizado e
              melhorar campanhas e navegacao. Voce pode aceitar ou recusar esse
              rastreamento.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleConsent("rejected")}
              className="inline-flex items-center justify-center rounded-2xl border border-[#d8c9bb] bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#17345c] transition-colors hover:border-[#17345c]"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => handleConsent("accepted")}
              className="inline-flex items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#21497d]"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
