"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { trackClarityEvent } from "../lib/clarity-events";

type TrackedVimeoVideoProps = {
  videoId: string;
  title: string;
  eventName: string;
  className?: string;
  style?: CSSProperties;
};

export default function TrackedVimeoVideo({ videoId, title, eventName, className, style }: TrackedVimeoVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={className} aria-label={title} style={style}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={`Play ${title}`}
      onClick={() => {
        trackClarityEvent(eventName);
        setPlaying(true);
      }}
      style={{
        ...style,
        display: "grid",
        placeItems: "center",
        color: "#ffffff",
        cursor: "pointer",
        background: "radial-gradient(circle at center, #292929 0%, #080808 72%)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "58px", lineHeight: 1, color: "#C9A55A", filter: "drop-shadow(0 5px 16px rgba(0,0,0,.7))" }}>
        ▶
      </span>
      <span style={{ position: "absolute", bottom: "22px", fontSize: "13px", fontWeight: 700, letterSpacing: ".08em" }}>
        PLAY WELCOME MESSAGE
      </span>
    </button>
  );
}