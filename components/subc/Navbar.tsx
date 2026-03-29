"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { href: "/categorias/masculino", label: "Masculino" },
  { href: "/categorias/feminino", label: "Feminino" },
  { href: "/categorias/infantil", label: "Infantil" },
  { href: "/categorias/acessorios", label: "Acessorios" },
  { href: "/categorias/blusas", label: "Blusas" },
  { href: "/categorias/bones", label: "Bones" },
  { href: "/categorias/calcas", label: "Calcas" },
  { href: "/categorias/casacos", label: "Casacos" },
  { href: "/categorias/chapeus", label: "Chapeus" },
  { href: "/categorias/cintos", label: "Cintos" },
  { href: "/categorias/pijamas", label: "Pijamas" },
  { href: "/categorias/vestidos", label: "Vestidos" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-3 text-[#171717]">
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">
          Categorias
        </p>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-black/12 text-[20px] transition-colors hover:border-[#171717] hover:bg-[#f5f1ea]"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <ul className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-[13px] font-semibold uppercase tracking-[0.14em] lg:flex">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative inline-flex py-2 transition-colors hover:text-[#8f5c3d] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#8f5c3d] after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div className="mt-4 rounded-[24px] border border-black/10 bg-white p-4 shadow-[0_14px_34px_rgba(23,23,23,0.08)] lg:hidden">
          <ul className="grid gap-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex rounded-2xl border border-black/8 px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#8f5c3d] hover:text-[#8f5c3d]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
