"use client";

import Link from "next/link";
import React from "react";

export default function Banner1() {
  return (
    <>
      <section>
        <div className="maxW">
          <div className="relative">
            <img
              className="w-full cursor-pointer"
              src="/chapeu-bones.jpg"
              alt="Categorias Chapeus e Bones"
            />
            <Link
              href="/categorias/chapeus"
              aria-label="Ir para a categoria Chapeus"
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
            />
            <Link
              href="/categorias/bones"
              aria-label="Ir para a categoria Bones"
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
}
