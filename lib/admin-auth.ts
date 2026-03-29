import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "country-admin-session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function getAdminPasswordHash() {
  const password = getAdminPassword();

  if (!password) {
    return "";
  }

  return createHash("sha256").update(password).digest("hex");
}

export function isAdminConfigured() {
  return getAdminPassword().length > 0;
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return session === getAdminPasswordHash();
}

export async function requireAdminAuthentication() {
  if (!(await isAdminAuthenticated())) {
    redirect("/painel/login");
  }
}

export async function createAdminSession(password: string) {
  if (!isAdminConfigured()) {
    return { ok: false as const, reason: "not-configured" as const };
  }

  if (password !== getAdminPassword()) {
    return { ok: false as const, reason: "invalid-password" as const };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminPasswordHash(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return { ok: true as const };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
