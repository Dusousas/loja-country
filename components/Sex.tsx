"use client";

import Link from "next/link";
import React from "react";

export default function Sex() {
  return (
    <>
      <section className="pt-10">
        <div className="maxW py-10">
          <article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/categorias/feminino" className="block cursor-pointer">
              <img
                className="w-full cursor-pointer"
                src="/Feminino.avif"
                alt="Categoria Feminino"
              />
            </Link>
            <Link href="/categorias/masculino" className="block cursor-pointer">
              <img
                className="w-full cursor-pointer"
                src="/Masculino1.avif"
                alt="Categoria Masculino"
              />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
