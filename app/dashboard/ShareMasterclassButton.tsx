"use client";

import { useId, useRef, useState } from "react";
import { trackClarityEvent } from "../lib/clarity-events";

const SHARE_TEXT =
  "Hey, I thought of you for this. Larry and Staci Wallace are hosting the free Kingdom Intelligence Masterclass September 15-17 at 12 PM Central. It is for faith-driven business owners who want to scale with clarity, peace, and Kingdom impact. You can register here: https://www.kingdomintel.com/";

export default function ShareMasterclassButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Blurb");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shareTextId = useId();

  async function copyShareText() {
    trackClarityEvent("kim_dashboard_share_copy");
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy Blurb"), 1800);
    } catch {
      textareaRef.current?.select();
      if (document.execCommand("copy")) {
        setCopyStatus("Copied");
        window.setTimeout(() => setCopyStatus("Copy Blurb"), 1800);
      } else {
        setCopyStatus("Select Text");
      }
    }
  }

  return (
    <>
      <button
        className="share-trigger"
        type="button"
        aria-label="Share the masterclass"
        title="Share the masterclass"
        onClick={() => {
          trackClarityEvent("kim_dashboard_share_open");
          setIsOpen(true);
        }}
      >
        <span className="share-trigger-text">Share</span>
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 10.6 6.8-4.2" />
          <path d="m8.6 13.4 6.8 4.2" />
        </svg>
      </button>

      {isOpen ? (
        <div className="share-modal" role="presentation" onClick={() => setIsOpen(false)}>
          <section
            className="share-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-panel-title"
            aria-describedby={shareTextId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="share-panel-head">
              <div>
                <p className="share-kicker">Share the masterclass</p>
                <h2 id="share-panel-title">Send This to a Friend</h2>
              </div>
              <button
                className="share-close"
                type="button"
                aria-label="Close share popup"
                title="Close"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.3"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <textarea
              id={shareTextId}
              ref={textareaRef}
              className="share-textarea"
              readOnly
              value={SHARE_TEXT}
              onFocus={(event) => event.currentTarget.select()}
            />
            <div className="share-panel-actions">
              <button className="share-copy" type="button" onClick={copyShareText}>
                {copyStatus}
              </button>
              <a
                className="share-link"
                href="https://www.kingdomintel.com/"
                onClick={() => trackClarityEvent("kim_dashboard_share_page_click")}
              >
                Open Page
              </a>
            </div>
          </section>
        </div>
      ) : null}

      <style jsx>{`
        .share-trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 104px;
          height: 46px;
          border: 1px solid #cc0000;
          border-radius: 999px;
          background: #cc0000;
          color: #fff;
          padding: 0 16px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.11);
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .share-trigger-text {
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1;
          text-transform: uppercase;
        }

        .share-trigger svg {
          flex: 0 0 auto;
        }

        .share-trigger:hover,
        .share-trigger:focus-visible {
          border-color: #cc0000;
          box-shadow: 0 16px 36px rgba(204, 0, 0, 0.24);
          outline: none;
          transform: translateY(-1px);
        }

        .share-modal {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 6, 6, 0.58);
          padding: 22px;
        }

        .share-panel {
          width: min(100%, 560px);
          border: 1px solid #d8d3c9;
          border-radius: 8px;
          background: #fff;
          color: #121212;
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.28);
          padding: 24px;
        }

        .share-panel-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }

        .share-kicker {
          margin: 0 0 6px;
          color: #cc0000;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .share-panel h2 {
          margin: 0;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(27px, 4vw, 38px);
          font-weight: 900;
          line-height: 1;
        }

        .share-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid #d8d3c9;
          border-radius: 999px;
          background: #f8f6f1;
          color: #121212;
          cursor: pointer;
          flex: 0 0 auto;
        }

        .share-textarea {
          display: block;
          width: 100%;
          min-height: 170px;
          resize: vertical;
          border: 1px solid #d8d3c9;
          border-radius: 8px;
          background: #fbfaf7;
          color: #171717;
          padding: 16px;
          font: 600 15px/1.65 'Work Sans', Arial, sans-serif;
        }

        .share-panel-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .share-copy,
        .share-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          border-radius: 5px;
          padding: 12px 18px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
        }

        .share-copy {
          border: 0;
          background: #cc0000;
          color: #fff;
          cursor: pointer;
        }

        .share-link {
          border: 1px solid #d8d3c9;
          background: #fff;
          color: #121212;
        }

        @media (max-width: 720px) {
          .share-trigger {
            gap: 6px;
            min-width: 82px;
            height: 42px;
            padding: 0 10px;
          }

          .share-trigger-text {
            font-size: 10px;
            letter-spacing: 0.06em;
          }

          .share-trigger svg {
            width: 18px;
            height: 18px;
          }

          .share-modal {
            align-items: flex-end;
            padding: 14px;
          }

          .share-panel {
            padding: 20px;
          }

          .share-panel-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .share-copy,
          .share-link {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
