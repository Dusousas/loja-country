"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type LinkItem = {
  label: string;
  href: string;
  primary?: boolean;
};

const LINKS: LinkItem[] = [
  { label: "Nosso site", href: "https://lojastarcountry.com/", primary: true },
  { label: "Moda Masculina", href: "https://lojastarcountry.com/categorias/masculino" },
  { label: "Moda Feminina", href: "https://lojastarcountry.com/categorias/feminino" },
  { label: "Falar no WhatsApp", href: "https://api.whatsapp.com/send/?phone=5537999514935&text=Ol%C3%A1%21+Vi+a+Star+Country+e+gostaria+de+falar+com+um+vendedor+para+conhecer+os+produtos+%EF%BF%BD&type=phone_number&app_absent=0" },
];

export default function LinksPage() {
  const hatRef = useRef<HTMLImageElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const btnPrimaryRef = useRef<HTMLAnchorElement | null>(null);
  const btnsWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada
      gsap.set(cardRef.current, { opacity: 0, y: 18, scale: 0.985 });
      gsap.set(logoWrapRef.current, { opacity: 0, y: 10, scale: 0.9 });
      gsap.set(btnsWrapRef.current?.children ?? [], { opacity: 0, y: 10 });

      // Chapéu: some antes e começa acima
      gsap.set(hatRef.current, {
        y: -140,
        rotation: 35,
        scale: 0.9,
        opacity: 0,
        filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
      });

      // Shine dentro das letras: começa fora e vai "correndo"
      if (titleRef.current) {
        gsap.set(titleRef.current, { backgroundPosition: "-120% center" });
      }

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      })
        .to(
          logoWrapRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.6)",
          },
          "-=0.25"
        )
        .to(
          btnsWrapRef.current?.children ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // Chapéu aparece e cai no lugar exato
        .to(
          hatRef.current,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.12"
        )
        .to(
          hatRef.current,
          {
            y: 0,
            rotation: 20, // final igual ao rotate-20
            scale: 1,
            duration: 0.85,
            ease: "bounce.out",
            onComplete: () => {
              // sombra final
              gsap.to(hatRef.current, {
                filter:
                  "drop-shadow(0px 22px 20px rgba(0,0,0,0.55)) drop-shadow(0px 8px 8px rgba(0,0,0,0.35))",
                duration: 0.35,
                ease: "power2.out",
              });
              // micro balançadinha pós-queda (bem sutil)
              gsap.to(hatRef.current, {
                rotation: 18,
                duration: 0.35,
                ease: "sine.inOut",
                yoyo: true,
                repeat: 1,
              });
            },
          },
          "-=0.05"
        );

      // Botão principal balançando bem leve (loop)
      if (btnPrimaryRef.current) {
        gsap.to(btnPrimaryRef.current, {
          rotation: 0.8,
          y: -1,
          duration: 1.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
          delay: 1.2,
        });
      }

      // Brilho DENTRO das letras (infinito)
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          backgroundPosition: "220% center",
          duration: 2.2,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 2.2,
          delay: 0.9,
        });
      }

      // Hover suave GSAP nos botões (sem brigar com Tailwind)
      const buttons = Array.from(
        (btnsWrapRef.current?.querySelectorAll("a") ??
          []) as NodeListOf<HTMLAnchorElement>
      );

      const enterHandlers: Array<() => void> = [];
      const leaveHandlers: Array<() => void> = [];

      buttons.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, { scale: 1.04, duration: 0.18, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
        };

        enterHandlers.push(onEnter);
        leaveHandlers.push(onLeave);

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
      });

      return () => {
        buttons.forEach((btn, i) => {
          btn.removeEventListener("mouseenter", enterHandlers[i]);
          btn.removeEventListener("mouseleave", leaveHandlers[i]);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#331f06] via-[#2a1705] to-black relative overflow-hidden">
      {/* brilho decorativo */}
      <div className="absolute w-72 h-72 bg-[#c4ada7]/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-72 h-72 bg-[#c4ada7]/10 blur-3xl rounded-full bottom-10 right-10" />

      <div className="w-full max-w-md relative z-10">
        {/* CARD */}
        <div
          ref={cardRef}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Chapéu (posicionamento exato que você já acertou) */}
          <img
            ref={hatRef}
            className="absolute -top-24 -right-20 rotate-20 select-none pointer-events-none"
            src="/link.png"
            alt=""
            draggable={false}
          />

          {/* Logo + Título */}
          <div ref={logoWrapRef} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c4ada7] to-[#8b6f68] flex items-center justify-center text-[#331f06] text-3xl font-bold shadow-xl border-4 border-white/20 overflow-hidden">
              <img
                src="/logo_star.png"
                alt="Logo Star Country"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Brilho DENTRO das letras */}
            <h1
              ref={titleRef}
              className="
                mt-5 text-2xl font-bold tracking-wide uppercase
                bg-gradient-to-r from-white/60 via-white to-white/60
                bg-[length:220%_100%]
                bg-clip-text text-transparent
              "
            >
              STAR COUNTRY
            </h1>

            <p className="text-sm text-white/70 mt-2 text-center uppercase">
              Moda country feminina, masculina e infantil
            </p>
          </div>

          {/* LINKS */}
          <div
            ref={btnsWrapRef}
            className="mt-8 flex flex-col gap-4 uppercase"
          >
            {LINKS.map((item) => (
              <LinkButton
                key={item.label}
                ref={item.primary ? btnPrimaryRef : undefined}
                text={item.label}
                href={item.href}
                primary={item.primary}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  { text: string; href: string; primary?: boolean }
>(function LinkButton({ text, href, primary }, ref) {
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-full text-center py-3 rounded-xl font-semibold 
        transition-all duration-300
        active:scale-95
        ${
          primary
            ? "bg-[#c4ada7] text-[#331f06] hover:bg-[#d8c2bd]"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
        }
      `}
    >
      {text}
    </a>
  );
});