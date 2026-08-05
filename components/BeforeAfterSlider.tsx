"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

// The gallery's before/after treatment.
//
// Caveat worth keeping in view when new pairs come in: the wipe jumps rather
// than morphs unless both shots of a pair come off a fixed setup — same camera
// distance, framing and background. Match the crops before adding a pair.
//
// Drag-to-reveal before/after card. The two photos are stacked and the top
// (before) layer is clipped horizontally, so the wipe only lines up if both
// shots of a pair are framed the same way.
//
// The range input is the real control — it carries the drag, the tap-to-jump
// and the keyboard arrows for free. The visible handle is decoration on top.
export function BeforeAfterSlider({
  before,
  after,
  label,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  label: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(100);
  const wrap = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  // Play the wipe once when the card scrolls into view — without it a static
  // pair of photos reads as an image, not something you can drag.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setPos(50);
      return;
    }

    let raf = 0;
    const animate = () => {
      const start = performance.now();
      const from = 100;
      const to = 45;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        // easeInOutCubic
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setPos(from + (to - from) * e);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // A manual drag cancels the intro animation rather than fighting it.
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    played.current = true;
    setPos(Number(e.target.value));
  };

  return (
    <div className="ba" ref={wrap}>
      <div className="ba-layer">
        <Image
          src={after}
          alt={afterAlt ?? `${label} — after porcelain veneers`}
          fill
          sizes="(max-width: 880px) 92vw, 478px"
          quality={92}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        className="ba-layer ba-before"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt ?? `${label} — before porcelain veneers`}
          fill
          sizes="(max-width: 880px) 92vw, 478px"
          quality={92}
          style={{ objectFit: "cover" }}
        />
      </div>

      <span
        className="ba-lbl ba-lbl--before"
        style={{ opacity: pos > 18 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="ba-lbl ba-lbl--after"
        style={{ opacity: pos < 82 ? 1 : 0 }}
      >
        After
      </span>

      <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba-grip">
          <Icon name="wipe" width={20} height={20} />
        </span>
      </div>

      <input
        type="range"
        className="ba-range"
        min={0}
        max={100}
        step={0.1}
        value={pos}
        onChange={onInput}
        aria-label={`${label} — drag to reveal the result after porcelain veneers`}
      />
    </div>
  );
}
