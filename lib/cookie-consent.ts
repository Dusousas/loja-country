import { useSyncExternalStore } from "react";

export const COOKIE_CONSENT_KEY = "cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type CookieConsent = "accepted" | "rejected";

function isCookieConsent(value: string | null): value is CookieConsent {
  return value === "accepted" || value === "rejected";
}

function readConsentCookie(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const consentCookie = cookies.find((cookie) =>
    cookie.startsWith(`${COOKIE_CONSENT_KEY}=`)
  );

  if (!consentCookie) return null;

  const value = consentCookie.slice(COOKIE_CONSENT_KEY.length + 1);
  return isCookieConsent(value) ? value : null;
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (isCookieConsent(storedValue)) return storedValue;
  } catch {
    // Some browsers or privacy modes can block localStorage access.
  }

  return readConsentCookie();
}

export function writeCookieConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  } catch {
    // Keep the UI responsive even if persistent storage is unavailable.
  }

  document.cookie = `${COOKIE_CONSENT_KEY}=${consent}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  };
}

export function useCookieConsent() {
  return useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null
  );
}
