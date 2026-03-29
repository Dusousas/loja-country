import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STAR COUNTRY - Moda country Feminina, Masculina e Infantil",
   description:
    "Moda country feminina, masculina e infantil com estilo e tradição. Encontre roupas, botas e acessórios country para rodeios, festas e dia a dia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#171717]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
