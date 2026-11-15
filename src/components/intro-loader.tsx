"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

const sessionKey = "af-portfolio-intro-v1";

export function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(sessionKey);
    } catch {
      /* Storage is optional. */
    }
    if (
      ![
        "/",
        process.env.NEXT_PUBLIC_BASE_PATH || "/",
        `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`,
      ].includes(pathname) ||
      seen ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const reset = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(reset);
    }
    let frame = 0;
    let start = 0;
    let ready = false;
    let cancelled = false;
    const fontReady = document.fonts?.ready ?? Promise.resolve();
    void fontReady.then(() => {
      ready = true;
    });
    function tick(time: number) {
      if (cancelled) return;
      if (!start) start = time;
      const elapsed = time - start;
      setVisible(true);
      // This is an entrance sequence, not a network/asset download percentage.
      setProgress(Math.min(100, Math.round(elapsed / 11)));
      if (elapsed >= 1350 && (ready || elapsed >= 2200)) {
        try {
          sessionStorage.setItem(sessionKey, "seen");
        } catch {}
        setVisible(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelled = true;
        cancelAnimationFrame(frame);
        try {
          sessionStorage.setItem(sessionKey, "seen");
        } catch {}
        setVisible(false);
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", dismiss);
    };
  }, [pathname]);

  function skip() {
    setVisible(false);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="intro-content">
            <p className="intro-kicker">
              {portfolio.initials}. / PERSONAL PORTFOLIO
            </p>
            <span className="intro-name">{portfolio.name}</span>
            <div className="intro-counter" aria-hidden="true">
              {String(progress).padStart(2, "0")}
              <span>/100</span>
            </div>
            <div className="intro-track" aria-hidden="true">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <p role="status">A little introduction.</p>
            <button type="button" onClick={skip}>
              Skip intro <span>↗</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
