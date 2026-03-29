import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "#masculino", label: "Masculino" },
  { href: "#feminino", label: "Feminino" },
  { href: "#infantil", label: "Infantil" },
  { href: "#destaques", label: "Destaques" },
];

const socialItems = [
  { href: "#instagram", label: "Instagram", icon: FaInstagram },
  { href: "#whatsapp", label: "WhatsApp", icon: FaWhatsapp },
  { href: "mailto:contato@country.com", label: "Email", icon: FiMail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 bg-[#161211] text-white">
      <section className="border-b border-white/10">
        <div className="maxW">
          <div className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b79a82]">
                Loja Country
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Estilo que vem da raiz
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-7 text-white/72">
                Atendimento direto no WhatsApp, produtos selecionados e envio
                para todo o Brasil com uma curadoria feita para quem vive o
                country de verdade.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#whatsapp"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#161211] transition-transform hover:-translate-y-0.5"
              >
                Comprar Agora
              </Link>
              <Link
                href="#categorias"
                className="inline-flex items-center justify-center rounded-xl border border-white/18 px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Ver Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="maxW">
          <div className="grid gap-10 py-12 md:grid-cols-2 xl:grid-cols-[1.1fr_0.8fr_1fr]">
            <div className="max-w-md">
              <Link
                href="/"
                className="inline-flex items-center gap-4"
                aria-label="Ir para a pagina inicial"
              >
                <Image
                  src="/logo_star.png"
                  alt="Logo Country"
                  width={84}
                  height={64}
                  className="h-auto w-[72px]"
                />
                <div>
                  <h3 className="text-2xl font-semibold">Country</h3>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#b79a82]">
                    Moda e tradicao
                  </p>
                </div>
              </Link>

              <p className="mt-5 text-[16px] leading-7 text-white/72">
                Moda country com personalidade. Botas, cintos, fivelas,
                acessorios e selecao especial para o seu estilo.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {socialItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-white/14 text-[19px] text-white transition-colors hover:border-[#b79a82] hover:bg-[#b79a82] hover:text-[#161211]"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b79a82]">
                Navegacao
              </p>
              <nav className="mt-5">
                <ul className="space-y-4 text-[17px] text-white/78">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 transition-colors hover:text-white"
                      >
                        <FiArrowRight className="text-[15px] text-[#b79a82]" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b79a82]">
                Atendimento
              </p>

              <div className="mt-5 space-y-4 text-[16px] leading-7 text-white/78">
                <p>
                  Segunda a Sabado
                  <br />
                  09h as 18h
                </p>
                <p>
                  Suporte rapido para pedidos, tamanhos, disponibilidade e
                  compras direto no WhatsApp.
                </p>
              </div>

              <Link
                href="#whatsapp"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#161211] transition-transform hover:-translate-y-0.5"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="maxW">
          <div className="flex flex-col items-center justify-between gap-3 py-6 text-center text-sm text-white/58 md:flex-row md:text-left">
            <p>&copy; {year} Country. Todos os direitos reservados.</p>
            <p>Desenvolvido para uma vitrine country com venda direta.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
