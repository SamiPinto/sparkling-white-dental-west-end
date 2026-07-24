"use client";

import { useState } from "react";
import Image from "next/image";
import { MEDIA } from "../app/data";

// Click-to-play: shows a lightweight poster until the visitor chooses to
// watch, so the page loads faster and the video never autoplays unbidden.
export function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-frame reveal in">
        <iframe
          src={`https://player.vimeo.com/video/${MEDIA.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title="West End — Sparkling White Dental"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="video-frame video-poster reveal"
      onClick={() => setPlaying(true)}
      aria-label="Play the Sparkling White Dental West End video"
    >
      <Image
        src={MEDIA.videoPoster}
        alt="Sparkling White Dental clinic on Boundary Street, West End"
        fill
        sizes="(max-width: 900px) 92vw, 960px"
        style={{ objectFit: "cover" }}
      />
      <span className="video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="video-caption">Watch: inside our West End practice</span>
    </button>
  );
}
