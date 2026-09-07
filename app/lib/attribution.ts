export type AttributionPayload = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  utmId?: string;
  ad?: string;
  adId?: string;
  adset?: string;
  adsetId?: string;
  campaignId?: string;
  fbclid?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
};

const STORAGE_KEY = "kim_first_party_attribution";
const MAX_VALUE_LENGTH = 500;

const PARAM_MAP = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
  ["utm_id", "utmId"],
  ["ad", "ad"],
  ["ad_id", "adId"],
  ["adset", "adset"],
  ["adset_id", "adsetId"],
  ["campaign_id", "campaignId"],
  ["fbclid", "fbclid"],
  ["gclid", "gclid"],
] as const;

function cleanValue(value: string | null | undefined) {
  return (value || "").trim().slice(0, MAX_VALUE_LENGTH);
}

function readStoredAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AttributionPayload) : {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(attribution: AttributionPayload) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution is helpful, but form submission should not depend on browser storage.
  }
}

export function captureAttributionFromCurrentUrl() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const next: AttributionPayload = {};

  PARAM_MAP.forEach(([param, key]) => {
    const value = cleanValue(url.searchParams.get(param));
    if (value) next[key] = value;
  });

  const hasAdParams = Object.keys(next).length > 0;
  const stored = readStoredAttribution();

  if (!hasAdParams && stored.capturedAt) return;

  writeStoredAttribution({
    ...stored,
    ...next,
    landingPage: hasAdParams ? cleanValue(url.href) : stored.landingPage,
    referrer: stored.referrer || cleanValue(document.referrer),
    capturedAt: hasAdParams ? new Date().toISOString() : stored.capturedAt,
  });
}

export function getStoredAttribution() {
  return readStoredAttribution();
}
