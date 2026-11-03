"use client";

import { useEffect, useRef, useState } from "react";
import TrackedVimeoVideo from "../components/TrackedVimeoVideo";
import TrackedClarityLink from "../components/TrackedClarityLink";
import { FUNNEL_EVENTS } from "../lib/funnel-events";

export default function RegistrationWelcome({ confirmedRegistration }: { confirmedRegistration: boolean }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!confirmedRegistration) return;
    try {
      if (window.sessionStorage.getItem("kim_registration_welcome") !== "true") return;
      // Consume on display, not on close: refresh/back must not reopen it.
      window.sessionStorage.removeItem("kim_registration_welcome");
      setOpen(true);
    } catch {
      // Privacy-restricted storage fails closed; the manual link remains usable.
    }
  }, [confirmedRegistration]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) setOpen(false); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const y = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const saved = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: root.style.overflow };
    // Native modal dialog makes the background inert and contains keyboard focus.
    dialog.showModal();
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    root.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      body.style.position = saved.position;
      body.style.top = saved.top;
      body.style.width = saved.width;
      root.style.overflow = saved.overflow;
      window.scrollTo({ top: y, behavior: "instant" });
      const target = previousFocus && previousFocus !== body && previousFocus.isConnected ? previousFocus : openerRef.current;
      target?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <div className="registration-welcome">
      <button ref={openerRef} type="button" className="welcome-reopen" onClick={() => setOpen(true)}>
        Watch the welcome video
      </button>
      <dialog ref={dialogRef} className="registration-welcome-dialog" aria-labelledby="registration-welcome-title" aria-modal="true"
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}>
        {open && <>
          <span className="welcome-focus-boundary" tabIndex={0} onFocus={() => dialogRef.current?.querySelector<HTMLAnchorElement>(".welcome-community-cta")?.focus()} />
          <div className="welcome-close-row">
            <button ref={closeRef} type="button" className="welcome-close" aria-label="Close welcome video" onClick={() => setOpen(false)}>Close ×</button>
          </div>
          <div className="welcome-content">
            <p className="welcome-eyebrow">You&apos;re Registered!</p>
            <h2 id="registration-welcome-title">One More Thing Before You Go.</h2>
            <p className="welcome-community-heading">Join the free FBF community.</p>
            <p className="welcome-caption">A message from Staci</p>
            <TrackedVimeoVideo
              className="dashboard-welcome-video"
              videoId="1194072208"
              title="KIM Final Registration Welcome"
              eventName={FUNNEL_EVENTS.thankYouVideoPlay}
              posterSrc="https://i.vimeocdn.com/video/2159632141-aa8ea218a6b473a15a56edfe1c759da4f16ad53355c9eb5ed5390d9634503eef-d_1280x720?region=us"
              posterAlt="Staci Wallace in the welcome video"
            />
            <TrackedClarityLink href="https://www.facebook.com/groups/fueledbyfirecommunity/" target="_blank" rel="noopener noreferrer"
              className="welcome-community-cta" eventName={FUNNEL_EVENTS.thankYouCommunityClick} eventTags={{ placement: "dashboard_welcome" }}>
              Join the FBF Community
            </TrackedClarityLink>
          </div>
          <span className="welcome-focus-boundary" tabIndex={0} onFocus={() => closeRef.current?.focus()} />
        </>}
      </dialog>
      <style>{`
        .registration-welcome { order: 2; text-align: center; margin: -8px 0 20px; }
        .welcome-reopen { border: 0; background: none; color: #635a4d; font: inherit; font-size: 13px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; padding: 8px; }
        .registration-welcome-dialog { position: fixed; inset: 0; margin: auto; width: min(640px, calc(100% - 24px)); max-height: calc(100dvh - 24px); padding: 0; overflow-y: auto; overscroll-behavior: contain; border: 1px solid #c9a55a; border-radius: 12px; background: #080808; color: #fff; text-align: center; box-shadow: 0 24px 80px #0008; }
        .welcome-focus-boundary { position: fixed; width: 1px; height: 1px; overflow: hidden; opacity: 0; }
        .registration-welcome-dialog::backdrop { background: rgba(0,0,0,.78); }
        .welcome-close-row { position: sticky; top: 0; z-index: 2; display: flex; justify-content: flex-end; padding: 8px 12px; background: #080808; }
        .welcome-close { min-height: 44px; padding: 8px 12px; border: 1px solid #777; border-radius: 6px; background: #171717; color: #fff; cursor: pointer; font: inherit; font-size: 14px; }
        .welcome-content { padding: 0 24px 28px; }
        .welcome-eyebrow, .welcome-caption { color: #c9a55a; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin: 0 0 12px; }
        #registration-welcome-title { color: #fff; font-family: 'Anton', Arial, sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 400; line-height: 1.12; text-transform: uppercase; margin: 0 0 12px; }
        .welcome-community-heading { color: #e8d080; font-family: 'Frank Ruhl Libre', Georgia, serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; }
        .dashboard-welcome-video { position: relative; display: block; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid #c9a55a66; border-radius: 8px; margin: 0 0 20px; }
        .welcome-community-cta { display: inline-block; max-width: 100%; padding: 16px 24px; border-radius: 6px; background: linear-gradient(135deg,#c9a55a,#e8d080,#bb945a); color: #120800; font-weight: 800; font-size: 14px; text-transform: uppercase; }
        .registration-welcome :focus-visible { outline: 3px solid #cc0000; outline-offset: 3px; }
        @media (max-width: 480px) { .welcome-content { padding: 0 16px 24px; } }
      `}</style>
    </div>
  );
}
