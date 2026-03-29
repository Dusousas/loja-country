"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiPhoneCall, FiSearch, FiX } from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Navbar, { navItems } from "./subc/Navbar";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="border-b border-black/10 bg-white">
      <section className="bg-[#171717] py-2">
        <p className="px-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-white sm:text-sm">
          Frete gratis para todo o Brasil
        </p>
      </section>

      <div className="lg:hidden">
        <section className="bg-white px-4 py-4 text-[#171717]">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="inline-flex size-11 items-center justify-center rounded-full text-[28px]"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link
              href="/"
              className="flex flex-1 items-center justify-center"
              aria-label="Ir para a pagina inicial"
            >
              <Image
                src="/logo_star.png"
                alt="Logo Country"
                width={120}
                height={86}
                priority
                className="h-auto w-[86px]"
              />
            </Link>

            <div className="size-11" />
          </div>
        </section>

        <section className="border-b border-black/8 bg-white px-4 py-4">
          <form
            className="flex w-full items-center border border-black/12 bg-white px-4 py-3"
            role="search"
          >
            <FiSearch className="mr-3 shrink-0 text-[18px] text-[#171717]" />
            <input
              type="search"
              name="search"
              placeholder="Pesquise aqui"
              className="w-full bg-transparent text-[15px] text-[#171717] outline-none placeholder:text-black/35"
              aria-label="Pesquisar produtos"
            />
          </form>
        </section>
      </div>

      <div className="hidden lg:block">
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
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden">
          <section className="bg-white px-4 py-4 text-[#171717]">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={closeMobileMenu}
                className="inline-flex size-11 items-center justify-center rounded-full text-[28px]"
              >
                <FiX />
              </button>

              <Link
                href="/"
                className="flex flex-1 items-center justify-center"
                aria-label="Ir para a pagina inicial"
                onClick={closeMobileMenu}
              >
                <Image
                  src="/logo_star.png"
                  alt="Logo Country"
                  width={120}
                  height={86}
                  priority
                  className="h-auto w-[86px]"
                />
              </Link>

              <div className="size-11" />
            </div>
          </section>

          <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
            <form
              className="mx-auto flex w-full max-w-md items-center border border-black/12 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(23,23,23,0.06)]"
              role="search"
            >
              <FiSearch className="mr-3 shrink-0 text-[18px] text-[#171717]" />
              <input
                type="search"
                name="search"
                placeholder="Pesquise aqui"
                className="w-full bg-transparent text-[15px] text-[#171717] outline-none placeholder:text-black/35"
                aria-label="Pesquisar produtos"
              />
            </form>

            <div className="mt-6 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8f5c3d]">
                Categorias
              </p>

              <ul className="mx-auto mt-4 grid max-w-md gap-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center border-b border-black/8 py-3 text-center text-[18px] font-semibold text-[#171717]"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              {socialActions.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  onClick={closeMobileMenu}
                  className="flex size-12 items-center justify-center rounded-full border border-black/12 text-[20px] text-[#171717] transition-colors hover:border-[#171717] hover:bg-[#f5f1ea]"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
