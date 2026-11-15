"use client";
import { publicPath } from "@/lib/paths";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  Code2,
  FlipHorizontal2,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function DeveloperCard() {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 24 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 24 });

  return (
    <div className="developer-card-scene">
      <div className="card-orbit" aria-hidden="true" />
      <div className="card-orbit card-orbit-outer" aria-hidden="true" />
      <motion.div
        className="lanyard-assembly"
        drag={reduced ? false : "x"}
        dragConstraints={{ left: -35, right: 35 }}
        dragElastic={0.12}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 240, bounceDamping: 24 }}
        style={{ touchAction: "pan-y" }}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          tiltX.set(
            (-(event.clientY - rect.top - rect.height / 2) / rect.height) * 9,
          );
          tiltY.set(
            ((event.clientX - rect.left - rect.width / 2) / rect.width) * 12,
          );
        }}
        onPointerLeave={() => {
          tiltX.set(0);
          tiltY.set(0);
        }}
      >
        <div className="lanyard-strap" aria-hidden="true">
          <span>
            {portfolio.initials}. / ALWAYS BUILDING / {portfolio.initials}.
          </span>
        </div>
        <div className="lanyard-clip" aria-hidden="true" />
        <div className="lanyard-ring" aria-hidden="true" />
        <motion.div
          className="developer-card-tilt"
          style={reduced ? undefined : { rotateX, rotateY }}
        >
          <div className={`developer-card ${flipped ? "is-flipped" : ""}`}>
            <div
              className="developer-card-face developer-card-front"
              aria-hidden={flipped}
            >
              <div className="badge-hole" />
              <div className="badge-topline">
                <span>THE BUILDER PASS</span>
                <Code2 size={17} />
              </div>
              <div className="badge-title">
                SOFTWARE
                <br />
                <span>DEVELOPER</span>
              </div>
              <div className="badge-portrait">
                {portfolio.portrait ? (
                  <Image
                    src={publicPath(portfolio.portrait)}
                    alt={`${portfolio.name} portrait`}
                    fill
                    sizes="300px"
                  />
                ) : (
                  <>
                    <span className="badge-monogram">
                      {portfolio.initials}
                      <span>.</span>
                    </span>
                    <span className="portrait-caption">
                      CURIOUS MIND. BUILDER AT HEART.
                    </span>
                  </>
                )}
              </div>
              <div className="badge-nameplate">
                <strong>{portfolio.name}</strong>
                <span>
                  <MapPin size={12} /> {portfolio.location}
                </span>
              </div>
              <div className="badge-footer">
                <span>FLUTTER / WEB / BACKEND</span>
                <div className="badge-bars" aria-hidden="true" />
              </div>
            </div>
            <div
              className="developer-card-face developer-card-back"
              aria-hidden={!flipped}
            >
              <div className="badge-hole" />
              <span className="badge-back-logo">
                {portfolio.initials}
                <span>.</span>
              </span>
              <p className="eyebrow">THOUGHTFUL CODE.</p>
              <h3>
                Let’s build
                <br />
                <span>something useful.</span>
              </h3>
              <div className="badge-contact-links">
                {portfolio.email && (
                  <a
                    tabIndex={flipped ? 0 : -1}
                    href={`mailto:${portfolio.email}`}
                  >
                    <Mail size={16} /> Say hello <ArrowUpRight size={15} />
                  </a>
                )}
                {portfolio.github && (
                  <a
                    tabIndex={flipped ? 0 : -1}
                    href={portfolio.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore my GitHub <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
              <span className="badge-back-location">{portfolio.location}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="card-interaction-bar">
        <span>
          {reduced
            ? "A little more about me"
            : "Drag a little. Get to know me."}
        </span>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          aria-pressed={flipped}
          aria-label={
            flipped ? "Show front of developer card" : "Flip developer card"
          }
        >
          <FlipHorizontal2 size={15} /> {flipped ? "Front" : "Flip card"}
        </button>
      </div>
    </div>
  );
}
