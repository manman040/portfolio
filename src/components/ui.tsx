import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal heading>
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span>{number}</span> {label}
          </p>
          <h2>{title}</h2>
        </div>
        {description && <p className="section-description">{description}</p>}
      </div>
    </Reveal>
  );
}
export function Destination({
  href,
  children,
  className = "",
  download = false,
}: {
  href: string | null;
  children: ReactNode;
  className?: string;
  download?: boolean;
}) {
  if (!href)
    return (
      <span
        className={`unavailable ${className}`}
        title="Awaiting Aiman’s details"
      >
        {children}
        <span className="pending-label">Coming soon</span>
      </span>
    );
  const external = /^https?:/.test(href);
  return (
    <a
      className={className}
      href={href}
      download={download || undefined}
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
