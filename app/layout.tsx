import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteChrome from "@/components/layout/SiteChrome";
import { getAnnouncementMessages } from "@/lib/site-settings";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://lojastarcountry.com";

const seoKeywords = [
  "moda country",
  "loja country",
  "roupas country",
  "moda country feminina",
  "moda country masculina",
  "moda country infantil",
  "roupa country feminina",
  "roupa country masculina",
  "roupa country infantil",
  "camisa country",
  "blusa country",
  "calca country",
  "calca jeans country",
  "vestido country",
  "bone country",
  "chapeu country",
  "cinto country",
  "acessorios country",
  "look country",
  "roupas para rodeio",
  "moda para rodeio",
  "roupa western",
  "estilo western",
  "loja de roupas country",
  "star country",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "STAR COUNTRY - Moda country feminina, masculina e infantil",
    template: "%s | STAR COUNTRY",
  },
  description:
    "Moda country feminina, masculina e infantil com estilo e tradicao. Encontre roupas e acessorios country para rodeios, festas e dia a dia.",
  keywords: seoKeywords,
  applicationName: "STAR COUNTRY",
  category: "fashion",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "STAR COUNTRY",
    locale: "pt_BR",
    title: "STAR COUNTRY - Moda country feminina, masculina e infantil",
    description:
      "Encontre roupas country femininas, masculinas e infantis com estilo western para rodeios, eventos e dia a dia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STAR COUNTRY - Moda country feminina, masculina e infantil",
    description:
      "Roupas country e acessorios com estilo western para quem vive o country de verdade.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcementMessages = await getAnnouncementMessages();

  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#171717]">
        <GoogleAnalytics />
        <SiteChrome announcementMessages={announcementMessages}>
          {children}
        </SiteChrome>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
