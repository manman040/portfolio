"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  heading = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  heading?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? undefined
          : {
              opacity: [0.3, 1],
              y: [heading ? 32 : 24, 0],
              ...(heading
                ? { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] }
                : {}),
            }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: heading ? 0.85 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: reduced ? scrollYProgress : progress }}
    />
  );
}
