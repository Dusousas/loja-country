export const defaultPixLabel = "5% OFF a vista no Pix";
export const defaultInstallmentsLabel = "Parcelamento em ate 12x com juros";

function normalizeText(value: string) {
  return value.trim();
}

function parseCurrencyToCents(value: string) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return null;
  }

  const digits = normalized.replace(/[^\d]/g, "");

  if (!digits) {
    return null;
  }

  return Number(digits);
}

function formatCentsToCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function calculatePixPrice(price: string) {
  const cents = parseCurrencyToCents(price);

  if (cents === null) {
    return "";
  }

  return formatCentsToCurrency(Math.round(cents * 0.95));
}
