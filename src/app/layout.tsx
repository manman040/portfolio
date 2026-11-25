import type { Metadata } from "next";
import "@fontsource-variable/montserrat";
import { GeistMono } from "geist/font/mono";
import { portfolio } from "@/data/portfolio";
import { shareImage } from "@/lib/share-image";
import "./globals.css";
import "./sections.css";

const title = `${portfolio.name} | ${portfolio.headline}`;
const description = `${portfolio.headline} in ${portfolio.location}. Computer Technology graduate with Flutter, Java, PHP, and Laravel projects, a programming internship, and application support experience.`;
export const metadata: Metadata = {
  title,
  description,
  applicationName: `${portfolio.name} Portfolio`,
  metadataBase: new URL(
    portfolio.siteUrl ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  authors: [{ name: portfolio.name }],
  ...(portfolio.siteUrl
    ? { alternates: { canonical: portfolio.siteUrl } }
    : {}),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_MY",
    siteName: `${portfolio.name} Portfolio`,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={GeistMono.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
