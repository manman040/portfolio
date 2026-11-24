"use client";

import { BadgePortrait } from "./badge-portrait";
import { useReducedMotion } from "motion/react";
import { useCardPhysics } from "./use-card-physics";
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
  const { areaRef, bodyRef, cordRef, hintRef } = useCardPhysics();

  return (
    <div className="developer-card-scene">
      <div className="card-orbit" aria-hidden="true" />
      <div className="card-orbit card-orbit-outer" aria-hidden="true" />
      <div className="card-physics-area" ref={areaRef}>
        <svg
          className="physics-lanyard"
          aria-hidden="true"
          width="100%"
          height="100%"
        >
          <path ref={cordRef} className="physics-cord" />
        </svg>
        <div className="physics-anchor" aria-hidden="true" />
        <div className="physics-badge" ref={bodyRef}>
          <div className="physics-clip" aria-hidden="true" />
          <div className={`developer-card ${flipped ? "is-flipped" : ""}`}>
            <div
              className="developer-card-face developer-card-front"
              aria-hidden={flipped}
            >
              <div className="badge-hole" />
              <div className="badge-topline">
                <span>AIMAN.DEV</span>
                <Code2 size={17} />
              </div>
              <div className="badge-title">
                SOFTWARE
                <br />
                <span>DEVELOPER</span>
              </div>
              <div className="badge-portrait">
                <BadgePortrait />
              </div>
              <div className="badge-nameplate">
                <strong>{portfolio.name}</strong>
                <span>
                  <MapPin size={12} /> {portfolio.location}
                </span>
              </div>
              <div className="badge-footer">
                <span>Laravel / Flutter / Web</span>
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
        </div>
      </div>
      <div className="card-interaction-bar">
        <span ref={hintRef}>
          {reduced ? "A little more about me" : "Drag my ID card"}
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
