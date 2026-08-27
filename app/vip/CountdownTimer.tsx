"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const OFFER_DURATION_MS = 15 * 60 * 1000;
const STORAGE_KEY = "kingdom-intel-vip-offer-expires-at";

function getExpiry() {
  const fallbackExpiry = Date.now() + OFFER_DURATION_MS;

  if (typeof window === "undefined") {
    return fallbackExpiry;
  }

  const savedExpiry = Number(window.localStorage.getItem(STORAGE_KEY));

  if (Number.isFinite(savedExpiry) && savedExpiry > Date.now()) {
    return savedExpiry;
  }

  window.localStorage.setItem(STORAGE_KEY, String(fallbackExpiry));
  return fallbackExpiry;
}

function formatTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function CountdownTimer() {
  const [remaining, setRemaining] = useState(OFFER_DURATION_MS);

  useEffect(() => {
    const expiry = getExpiry();

    function tick() {
      setRemaining(expiry - Date.now());
    }

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const time = formatTime(remaining);

  return (
    <div className={styles.countdown} aria-label="Limited time offer countdown">
      <p>HURRY! This offer disappears when the timer hits 00:00!</p>
      <div className={styles.countdownNumbers}>
        <span>
          <strong>{time.hours}</strong>
          <small>Hours</small>
        </span>
        <b>:</b>
        <span>
          <strong>{time.minutes}</strong>
          <small>Minutes</small>
        </span>
        <b>:</b>
        <span>
          <strong>{time.seconds}</strong>
          <small>Seconds</small>
        </span>
      </div>
    </div>
  );
}
