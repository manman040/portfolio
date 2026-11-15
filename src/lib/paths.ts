// Next.js prefixes Link routes automatically; public file URLs need this helper.
export function publicPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    !basePath ||
    path.startsWith(`${basePath}/`)
  )
    return path;
  return `${basePath}${path}`;
}
