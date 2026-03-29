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
        <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-[#171717] p-8 text-white shadow-[0_24px_80px_rgba(23,23,23,0.14)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f2d2b3]">
              Painel Country
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Gerencie os produtos da loja sem mexer no codigo.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/76">
              O painel cadastra apenas produtos. Banners, secoes da home e
              outras vitrines continuam controlados pelo codigo, como voce
              pediu.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Banco
                </p>
                <p className="mt-3 text-sm leading-6 text-white/82">
                  Os produtos ficam no Postgres e as imagens no volume <code>/app/data</code>.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Deploy
                </p>
                <p className="mt-3 text-sm leading-6 text-white/82">
                  No Easypanel, monte um volume persistente em <code>/app/data</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#e6ddd4] bg-white p-8 shadow-[0_16px_46px_rgba(23,23,23,0.05)] sm:p-10">
            <h2 className="text-2xl font-semibold text-[#171717]">
              Entrar no painel
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#536273]">
              Use a senha definida em <code>ADMIN_PASSWORD</code>.
            </p>

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
              className="mt-6 inline-flex text-sm font-semibold text-[#8f5c3d] transition-colors hover:text-[#171717]"
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
