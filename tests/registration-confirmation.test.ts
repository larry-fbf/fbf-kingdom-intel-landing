import assert from "node:assert/strict";
import test from "node:test";

import {
  signRegistrationConfirmation,
  verifyRegistrationConfirmation,
} from "../app/lib/registration-confirmation.ts";

const SECRET = "test-secret-that-is-long-enough";
const NOW = 1_800_000_000_000;

test("verifies an untampered short-lived registration confirmation", () => {
  const token = signRegistrationConfirmation("registration-123", SECRET, NOW);

  assert.equal(verifyRegistrationConfirmation(token, SECRET, NOW + 30_000), true);
});

test("rejects forged, expired, or wrong-secret confirmation tokens", () => {
  const token = signRegistrationConfirmation("registration-123", SECRET, NOW);

  assert.equal(verifyRegistrationConfirmation(`${token}tampered`, SECRET, NOW + 30_000), false);
  assert.equal(verifyRegistrationConfirmation(token, "wrong-secret", NOW + 30_000), false);
  assert.equal(verifyRegistrationConfirmation(token, SECRET, NOW + 3_600_001), false);
});