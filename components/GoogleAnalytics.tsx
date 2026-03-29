"use client";

import Script from "next/script";
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

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(() => readConsent() === "accepted");

  useEffect(() => {
    function syncConsent() {
      setEnabled(readConsent() === "accepted");
    }

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener(CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(CONSENT_EVENT, syncConsent);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-59586QT99B"
        strategy="afterInteractive"
      />

      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-59586QT99B');
        `}
      </Script>
    </>
  );
}
