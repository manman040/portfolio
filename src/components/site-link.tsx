import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { publicPath } from "@/lib/paths";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Static hosts use ordinary document navigation, avoiding server-only router prefetches.
export function SiteLink({ href, children, ...props }: Props) {
  if (process.env.GITHUB_PAGES === "true") {
    const [route, hash] = href.split("#");
    const pathname = route.endsWith("/") ? route : `${route}/`;
    return (
      <a href={publicPath(`${pathname}${hash ? `#${hash}` : ""}`)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
