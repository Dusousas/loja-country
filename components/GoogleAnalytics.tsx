"use client";

import Script from "next/script";
import {
  useCookieConsent,
} from "@/lib/cookie-consent";

export default function GoogleAnalytics() {
  const enabled = useCookieConsent() === "accepted";

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
