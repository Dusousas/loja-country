import Link from "next/link";

export const navItems = [
  { href: "/categorias/masculino", label: "Masculino" },
  { href: "/categorias/feminino", label: "Feminino" },
  { href: "/categorias/infantil", label: "Infantil" },
  { href: "/categorias/acessorios", label: "Acessorios" },
  { href: "/categorias/blusas", label: "Blusas" },
  { href: "/categorias/calcas", label: "Calcas" },
  { href: "/categorias/shorts", label: "Shorts" },
  { href: "/categorias/casacos", label: "Casacos" },
  { href: "/categorias/chapeus", label: "Bones e Chapeus" },
  { href: "/categorias/cintos", label: "Cintos" },
  { href: "/categorias/pijamas", label: "Pijamas" },
  { href: "/categorias/vestidos", label: "Vestidos" },
];

export default function Navbar() {
  return (
    <nav className="py-3 text-[#171717]">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-[13px] font-semibold uppercase tracking-[0.14em]">
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
    </nav>
  );
}
