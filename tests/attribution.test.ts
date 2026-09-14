import assert from "node:assert/strict";
import test from "node:test";

import { captureAttributionFromCurrentUrl, getStoredAttribution } from "../app/lib/attribution.ts";

function installWindow(url: string, referrer = "") {
  const store = new Map<string, string>();

  globalThis.window = {
    location: { href: url },
    localStorage: {
      getItem: (key: string) => store.get(key) || null,
      setItem: (key: string, value: string) => store.set(key, value),
    },
  } as unknown as Window & typeof globalThis;

  globalThis.document = { referrer } as Document;

  return store;
}

test("captures paid ad attribution from the current url", () => {
  installWindow(
    "https://www.kingdomintel.com/?utm_source=meta&utm_medium=paid&utm_campaign=sept2026&utm_content=cold&utm_term=120&utm_id=999&ad=postitnotevideo&fbclid=abc",
    "https://facebook.com/",
  );

  captureAttributionFromCurrentUrl();

  assert.deepEqual(getStoredAttribution(), {
    utmSource: "meta",
    utmMedium: "paid",
    utmCampaign: "sept2026",
    utmContent: "cold",
    utmTerm: "120",
    utmId: "999",
    ad: "postitnotevideo",
    fbclid: "abc",
    landingPage:
      "https://www.kingdomintel.com/?utm_source=meta&utm_medium=paid&utm_campaign=sept2026&utm_content=cold&utm_term=120&utm_id=999&ad=postitnotevideo&fbclid=abc",
    referrer: "https://facebook.com/",
    capturedAt: getStoredAttribution().capturedAt,
  });
});

test("keeps stored attribution when a later page has no ad params", () => {
  const store = installWindow("https://www.kingdomintel.com/?utm_source=meta&utm_campaign=sept2026&ad=image");
  captureAttributionFromCurrentUrl();

  globalThis.window = {
    location: { href: "https://www.kingdomintel.com/workbook" },
    localStorage: {
      getItem: (key: string) => store.get(key) || null,
      setItem: (key: string, value: string) => store.set(key, value),
    },
  } as unknown as Window & typeof globalThis;

  captureAttributionFromCurrentUrl();

  assert.equal(getStoredAttribution().utmSource, "meta");
  assert.equal(getStoredAttribution().ad, "image");
});
