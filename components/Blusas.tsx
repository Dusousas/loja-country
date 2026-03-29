"use client";

import Link from "next/link";
import React from "react";

export default function Blusas() {
  return (
    <>
      <section className="pt-10">
        <div className="maxW">
          <article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/categorias/blusas" className="block cursor-pointer">
              <img
                className="w-full cursor-pointer"
                src="/Blusas.avif"
                alt="Categoria Blusas"
              />
            </Link>
            <Link href="/categorias/calcas" className="block cursor-pointer">
              <img
                className="w-full cursor-pointer"
                src="/Jeans.avif"
                alt="Categoria Calcas"
              />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
