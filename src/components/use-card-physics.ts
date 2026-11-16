"use client";

import { useEffect, useRef } from "react";
import {
  CARD_PHYSICS as config,
  clamp,
  constrainBody,
  restingBody,
  restPosition,
  stepCard,
  type CardSpace,
} from "@/lib/card-physics";

export function useCardPhysics() {
  const areaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const area = areaRef.current,
      element = bodyRef.current,
      cord = cordRef.current;
    if (!area || !element || !cord) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let space: CardSpace = { width: 0, height: 0, cardWidth: 0, cardHeight: 0 };
    let body = restingBody(space);
    let frame = 0,
      lastFrame = 0,
      inView = true;
    let drag: {
      id: number;
      dx: number;
      dy: number;
      time: number;
      moved: boolean;
    } | null = null;
    let suppressClick = false;

    function paint() {
      element!.style.left = "0";
      element!.style.top = "0";
      element!.style.transform = `translate3d(${body.x - space.cardWidth / 2}px, ${body.y - config.attachmentY}px, 0) rotate(${body.angle}rad) rotateY(${clamp(body.vx * 0.008, -5, 5)}deg)`;
      const rest = restPosition(space);
      const slack = Math.max(
        0,
        rest.y -
          config.anchorY -
          Math.hypot(body.x - rest.x, body.y - config.anchorY),
      );
      cord!.setAttribute(
        "d",
        `M ${rest.x} ${config.anchorY} Q ${(rest.x + body.x) / 2 + Math.min(20, slack * 0.4)} ${(config.anchorY + body.y) / 2} ${body.x} ${body.y}`,
      );
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    }
    function tick(time: number) {
      frame = 0;
      const active = stepCard(
        body,
        space,
        lastFrame ? (time - lastFrame) / 1000 : 1 / 60,
      );
      lastFrame = time;
      paint();
      if (active && !drag && !media.matches && inView && !document.hidden)
        frame = requestAnimationFrame(tick);
      else lastFrame = 0;
    }
    function wake() {
      if (!frame && !drag && !media.matches && inView && !document.hidden)
        frame = requestAnimationFrame(tick);
    }
    function release() {
      if (!drag) return;
      const id = drag.id;
      // A held-still badge should not remember an earlier fast gesture.
      if (performance.now() - drag.time > 90) {
        body.vx = 0;
        body.vy = 0;
      }
      suppressClick = drag.moved;
      drag = null;
      element!.removeAttribute("data-dragging");
      if (element!.hasPointerCapture(id)) element!.releasePointerCapture(id);
      wake();
    }
    function reset() {
      release();
      stop();
      space = {
        width: area!.clientWidth,
        height: area!.clientHeight,
        cardWidth: element!.offsetWidth,
        cardHeight: element!.offsetHeight,
      };
      body = restingBody(space);
      paint();
    }
    function down(event: PointerEvent) {
      if (
        media.matches ||
        !event.isPrimary ||
        event.button !== 0 ||
        (event.target as HTMLElement).closest("a, button")
      )
        return;
      stop();
      const rect = area!.getBoundingClientRect();
      drag = {
        id: event.pointerId,
        dx: event.clientX - rect.left - body.x,
        dy: event.clientY - rect.top - body.y,
        time: performance.now(),
        moved: false,
      };
      suppressClick = false;
      element!.setPointerCapture(event.pointerId);
      element!.setAttribute("data-dragging", "true");
      body.vx = 0;
      body.vy = 0;
    }
    function move(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.id) return;
      const rect = area!.getBoundingClientRect(),
        time = performance.now();
      const oldX = body.x,
        oldY = body.y;
      body.x = event.clientX - rect.left - drag.dx;
      body.y = event.clientY - rect.top - drag.dy;
      constrainBody(body, space);
      const dt = Math.max(1 / 120, (time - drag.time) / 1000);
      body.vx = clamp((body.x - oldX) / dt, -config.maxSpeed, config.maxSpeed);
      body.vy = clamp((body.y - oldY) / dt, -config.maxSpeed, config.maxSpeed);
      const angle = clamp(
        -(body.x - space.width / 2) * 0.002,
        -config.maxAngle,
        config.maxAngle,
      );
      body.omega = clamp(
        (angle - body.angle) / dt,
        -config.maxAngularSpeed,
        config.maxAngularSpeed,
      );
      body.angle = angle;
      constrainBody(body, space);
      if (Math.hypot(body.x - oldX, body.y - oldY) > 2) {
        drag.moved = true;
        hintRef.current?.setAttribute("data-used", "true");
      }
      drag.time = time;
      paint();
    }
    function click(event: MouseEvent) {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }
    }
    function visibility() {
      if (document.hidden) {
        release();
        stop();
      } else wake();
    }
    const resize = new ResizeObserver(reset);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) {
        release();
        stop();
      } else wake();
    });
    reset();
    resize.observe(area);
    resize.observe(element);
    intersection.observe(area);
    media.addEventListener("change", reset);
    document.addEventListener("visibilitychange", visibility);
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", release);
    element.addEventListener("pointercancel", release);
    element.addEventListener("lostpointercapture", release);
    element.addEventListener("click", click, true);
    return () => {
      release();
      stop();
      resize.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", visibility);
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", release);
      element.removeEventListener("pointercancel", release);
      element.removeEventListener("lostpointercapture", release);
      element.removeEventListener("click", click, true);
    };
  }, []);
  return { areaRef, bodyRef, cordRef, hintRef };
}
