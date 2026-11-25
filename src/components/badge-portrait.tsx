"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { publicPath } from "@/lib/paths";

export function BadgePortrait() {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  // The image can fail before hydration, when onError is not attached yet.
  useEffect(() => {
    const element = image.current;
    if (!element) return;
    const onError = () => setFailed(true);
    element.addEventListener("error", onError);
    if (element.complete && element.naturalWidth === 0)
      queueMicrotask(onError);
    return () => element.removeEventListener("error", onError);
  }, []);

  if (!portfolio.portrait || failed)
    return (
      <>
        <span className="badge-monogram">
          {portfolio.initials}
          <span>.</span>
        </span>
      </>
    );

  const base = publicPath(portfolio.portrait);
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      {/* Above the fold, so it is loaded eagerly. */}
      <img
        ref={image}
        src={`${base}.jpg`}
        alt={`Portrait of ${portfolio.name}`}
        width={600}
        height={400}
        draggable={false}
      />
    </picture>
  );
}
