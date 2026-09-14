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
  posterSrc?: string;
  posterAlt?: string;
};

export default function TrackedVimeoVideo({
  videoId,
  title,
  eventName,
  className,
  style,
  posterSrc,
  posterAlt,
}: TrackedVimeoVideoProps) {
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
        backgroundColor: "#080808",
        backgroundImage: posterSrc
          ? `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.34)), url("${posterSrc}")`
          : "radial-gradient(circle at center, #292929 0%, #080808 72%)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {posterSrc ? (
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          {posterAlt ?? title}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        style={{
          display: "grid",
          placeItems: "center",
          width: "74px",
          height: "74px",
          borderRadius: "999px",
          background: "rgba(8,8,8,0.72)",
          border: "1px solid rgba(201,165,90,0.6)",
          boxShadow: "0 12px 34px rgba(0,0,0,0.45)",
        }}
      >
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: "14px solid transparent",
            borderBottom: "14px solid transparent",
            borderLeft: "22px solid #C9A55A",
            marginLeft: "6px",
          }}
        />
      </span>
      <span
        style={{
          position: "absolute",
          left: "18px",
          right: "18px",
          bottom: "18px",
          padding: "10px 14px",
          borderRadius: "6px",
          background: "rgba(8,8,8,0.72)",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        PLAY WELCOME MESSAGE
      </span>
    </button>
  );
}
