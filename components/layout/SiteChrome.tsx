"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type SiteChromeProps = {
  children: React.ReactNode;
};

const chromeLessRoutes = new Set(["/links"]);

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const shouldHideChrome = pathname ? chromeLessRoutes.has(pathname) : false;

  if (shouldHideChrome) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
