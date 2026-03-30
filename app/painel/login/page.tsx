import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/admin/SubmitButton";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { loginToAdminPanel } from "./actions";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/painel/produtos");
  }

  const params = searchParams ? await searchParams : {};
  const isConfigured = isAdminConfigured();

  return (
    <section className="py-10 sm:py-14">
      <div className="maxW">
        <div className="mx-auto max-w-[560px]">
          <div className="rounded-[28px] border border-[#e6ddd4] bg-white p-8 shadow-[0_16px_46px_rgba(23,23,23,0.05)] sm:p-10">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-[#171717] sm:text-3xl">
                Entrar no painel
              </h1>
              <p className="mt-3 text-[15px] leading-7 text-[#536273]">
                Use a senha definida em <code>ADMIN_PASSWORD</code>.
              </p>
            </div>

            {!isConfigured && (
              <div className="mt-6 rounded-2xl border border-[#f0c29a] bg-[#fff4ea] px-5 py-4 text-sm leading-6 text-[#8f4d22]">
                Configure a variavel <code>ADMIN_PASSWORD</code> antes de usar o
                painel em producao.
              </div>
            )}

            {params.status === "error" && (
              <div className="mt-6 rounded-2xl border border-[#efc4c4] bg-[#fff1f1] px-5 py-4 text-sm leading-6 text-[#9e3d3d]">
                Senha incorreta. Tente novamente.
              </div>
            )}

            {params.status === "setup" && (
              <div className="mt-6 rounded-2xl border border-[#f0c29a] bg-[#fff4ea] px-5 py-4 text-sm leading-6 text-[#8f4d22]">
                O painel ainda nao foi configurado. Defina <code>ADMIN_PASSWORD</code>.
              </div>
            )}

            <form action={loginToAdminPanel} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2.5 block text-sm font-semibold text-[#17345c]">
                  Senha
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  disabled={!isConfigured}
                  className="w-full rounded-2xl border border-[#d7dfe6] bg-[#fcfbfa] px-4 py-3 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#17345c]"
                />
              </label>

              <SubmitButton
                pendingLabel="Entrando..."
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#17345c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#21497d] disabled:cursor-not-allowed disabled:bg-[#9eb1c7]"
              >
                Entrar
              </SubmitButton>
            </form>

            <Link
              href="/"
              className="mt-6 inline-flex w-full justify-center text-sm font-semibold text-[#8f5c3d] transition-colors hover:text-[#171717]"
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
