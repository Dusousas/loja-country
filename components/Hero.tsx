import { getImageProps } from "next/image";

import heroDesktop from "@/public/hero/main.jpg";
import heroMobile from "@/public/hero/hero1_mobile.jpg";

export default function Hero() {
  const common = {
    alt: "Banner principal da Country",
    sizes: "100vw",
    fetchPriority: "high" as const,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: heroDesktop,
  });

  const { props: mobileImageProps } = getImageProps({
    ...common,
    src: heroMobile,
  });

  return (
    <section>
      <div className="overflow-hidden">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            alt="Banner principal da Country"
            className="h-[400px] w-full object-cover object-right lg:h-[622px]"
          />
        </picture>
      </div>
    </section>
  );
}
