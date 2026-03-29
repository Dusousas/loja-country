"use server";

import { redirect } from "next/navigation";
import { createAdminSession } from "@/lib/admin-auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginToAdminPanel(formData: FormData) {
  const password = getString(formData, "password");
  const result = await createAdminSession(password);

  if (!result.ok) {
    if (result.reason === "not-configured") {
      redirect("/painel/login?status=setup");
    }

    redirect("/painel/login?status=error");
  }

  redirect("/painel/produtos");
}
