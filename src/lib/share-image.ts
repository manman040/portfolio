import { portfolio } from "@/data/portfolio";

export const shareImage = {
  url: `${portfolio.siteUrl ?? ""}/og.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${portfolio.name}, ${portfolio.headline}`,
};
