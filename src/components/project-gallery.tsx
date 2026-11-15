"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { ProjectScreenshot } from "@/data/projects";

export function ProjectGallery({
  screenshots,
}: {
  screenshots: ProjectScreenshot[];
}) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = selected === null ? null : screenshots[selected];
  const open = selected !== null;
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  function move(direction: number) {
    setSelected((index) =>
      index === null
        ? null
        : (index + direction + screenshots.length) % screenshots.length,
    );
  }
  return (
    <div className="project-gallery">
      <div
        className="gallery-filters"
        role="group"
        aria-label="Filter screenshots by application role"
      >
        {["All", "Rider", "Driver", "Admin"].map((group) => (
          <button
            type="button"
            key={group}
            aria-pressed={filter === group}
            onClick={() => setFilter(group)}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {screenshots.map((image, index) =>
          filter !== "All" && image.group !== filter ? null : (
            <figure
              key={image.src}
              className={`card gallery-figure gallery-${image.group.toLowerCase()}`}
            >
              <button
                type="button"
                className="gallery-image-button"
                onClick={() => setSelected(index)}
                aria-label={`Enlarge ${image.title} screenshot`}
              >
                <Image
                  src={image.src}
                  alt={`${image.title}: ${image.caption}`}
                  width={image.width}
                  height={image.height}
                  sizes={
                    image.group === "Admin"
                      ? "(max-width: 760px) 90vw, 950px"
                      : "(max-width: 520px) 85vw, 300px"
                  }
                />
                <span className="gallery-expand">
                  <Expand size={17} /> View full screen
                </span>
              </button>
              <figcaption>
                <span className="eyebrow">{image.group} · REPORT CAPTURE</span>
                <h3>{image.title}</h3>
                <p>{image.caption}</p>
              </figcaption>
            </figure>
          ),
        )}
      </div>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-labelledby="screenshot-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="dialog-content">
          {current && (
            <>
              <div className="dialog-heading">
                <h3 id="screenshot-title">{current.title}</h3>
                <button
                  type="button"
                  aria-label="Close screenshot"
                  onClick={() => setSelected(null)}
                >
                  <X size={22} />
                </button>
              </div>
              <div className="dialog-image">
                <Image
                  src={current.src}
                  alt={current.caption}
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                />
              </div>
              <p>{current.caption}</p>
              <div className="dialog-navigation">
                <button type="button" onClick={() => move(-1)}>
                  <ArrowLeft size={18} /> Previous
                </button>
                <span>
                  {(selected ?? 0) + 1} / {screenshots.length}
                </span>
                <button type="button" onClick={() => move(1)}>
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
