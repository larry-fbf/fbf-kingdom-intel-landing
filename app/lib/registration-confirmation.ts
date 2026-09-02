import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE_MS = 60 * 60 * 1000;

export const REGISTRATION_CONFIRMATION_COOKIE = "kim_registration_confirmation";

export function getRegistrationConfirmationSecret() {
  return (
    process.env.REGISTRATION_CONFIRMATION_SECRET ||
    process.env.ATTIO_API_KEY ||
    process.env.BREVO_API_KEY ||
    ""
  );
}

function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signRegistrationConfirmation(registrationId: string, secret: string, now = Date.now()) {
  if (!secret) throw new Error("Registration confirmation secret is not configured");
  const payload = `${now}.${registrationId}`;
  return `${payload}.${signature(payload, secret)}`;
}

export function verifyRegistrationConfirmation(token: string, secret: string, now = Date.now()) {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestamp, registrationId, suppliedSignature] = parts;
  const issuedAt = Number(timestamp);
  if (!Number.isFinite(issuedAt) || issuedAt > now || now - issuedAt > MAX_AGE_MS || !registrationId) return false;

  const expectedSignature = signature(`${timestamp}.${registrationId}`, secret);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}