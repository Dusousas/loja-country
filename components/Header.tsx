import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall, FiSearch } from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Navbar from "./subc/Navbar";

const socialActions = [
  {
    href: "#whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
  {
    href: "#instagram",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "#telefone",
    label: "Telefone",
    icon: FiPhoneCall,
  },
];

export default function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <section className="bg-[#171717] py-2">
        <p className="px-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-white sm:text-sm">
          Frete gratis para todo o Brasil
        </p>
      </section>

      <section className="border-b border-black/8">
        <div className="maxW">
          <div className="grid items-center gap-6 py-5 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
            <Link
              href="/"
              className="mx-auto flex w-fit items-center justify-center lg:mx-0"
              aria-label="Ir para a pagina inicial"
            >
              <Image
                src="/logo_star.png"
                alt="Logo Country"
                width={165}
                height={120}
                priority
                className="h-auto w-[132px] sm:w-[155px]"
              />
            </Link>

            <form
              className="mx-auto flex w-full max-w-3xl items-center rounded-full border border-black/15 bg-[#fbf8f4] px-5 py-3 shadow-[0_10px_25px_rgba(23,23,23,0.06)] transition-colors focus-within:border-[#171717]"
              role="search"
            >
              <FiSearch className="mr-3 shrink-0 text-[20px] text-[#171717]" />
              <input
                type="search"
                name="search"
                placeholder="O que voce procura?"
                className="w-full bg-transparent text-[15px] text-[#171717] outline-none placeholder:text-black/45"
                aria-label="Pesquisar produtos"
              />
              <button
                type="submit"
                className="ml-3 rounded-full bg-[#171717] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#2f2f2f]"
              >
                Buscar
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              {socialActions.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex size-12 items-center justify-center rounded-full border border-black/12 text-[20px] text-[#171717] transition-colors hover:border-[#171717] hover:bg-[#f5f1ea]"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="maxW">
          <Navbar />
        </div>
      </section>
    </header>
  );
}
