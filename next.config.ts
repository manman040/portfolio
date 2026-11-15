import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  basePath,
  ...(githubPages
    ? { output: "export", trailingSlash: true, distDir: ".next-pages" }
    : {}),
  images: { unoptimized: githubPages },
};

export default config;
