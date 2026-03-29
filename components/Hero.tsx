import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-h-[calc(100vh-300px)]">
      <div>
        <Image
          src="/hero/hero1.webp"
          alt="Banner principal da Country"
          width={1920}
          height={622}
          priority
          className="max-h-[622px] w-full object-cover"
        />
      </div>
    </section>
  );
}
