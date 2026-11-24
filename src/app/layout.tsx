import type { Metadata } from "next";
import "@fontsource-variable/montserrat";
import { GeistMono } from "geist/font/mono";
import { portfolio } from "@/data/portfolio";
import "./globals.css";
import { IntroLoader } from "@/components/intro-loader";

const title = `${portfolio.name} | Software Developer Portfolio`;
const description = `Explore the portfolio of ${portfolio.name}, a software developer based in ${portfolio.location}, with experience in Laravel, Flutter, web development, and enterprise application support.`;
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
  },
  twitter: { card: "summary_large_image", title, description },
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
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
