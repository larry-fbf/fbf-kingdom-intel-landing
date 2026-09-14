export function normalizeTimeZone(value: unknown) {
  if (typeof value !== "string") return "";

  const timeZone = value.trim();
  if (!timeZone || timeZone.length > 64 || !/^[A-Za-z0-9_+\-/]+$/.test(timeZone)) return "";

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return "";
  }
}

export function registrationTimeZoneFromPayloadAndHeaders(payloadValue: unknown, headers: Headers) {
  return normalizeTimeZone(payloadValue) || normalizeTimeZone(headers.get("x-vercel-ip-timezone"));
}
