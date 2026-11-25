import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Reveal heading>
      <div className="section-heading">
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </Reveal>
  );
}
export function Destination({
  href,
  children,
  className = "",
  download,
}: {
  href: string | null;
  children: ReactNode;
  className?: string;
  /** File name offered when downloading. */
  download?: string;
}) {
  if (!href)
    return (
      <span
        className={`unavailable ${className}`}
        title="Not available yet"
      >
        {children}
        <span className="pending-label">Not available</span>
      </span>
    );
  const external = /^https?:/.test(href);
  return (
    <a
      className={className}
      href={href}
      download={download}
      target={external && !download ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && !download && <ArrowUpRight size={14} aria-hidden="true" />}
    </a>
  );
}
export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
