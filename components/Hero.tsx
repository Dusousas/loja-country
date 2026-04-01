import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="overflow-hidden">
        <Image
          src="/hero/main.jpg"
          alt="Banner principal da Country"
          width={1920}
          height={622}
          priority
          sizes="100vw"
          className="h-auto max-h-[622px] w-full object-cover"
        />
      </div>
    </section>
  );
}
