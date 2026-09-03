import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeTimeZone,
  registrationTimeZoneFromPayloadAndHeaders,
} from "../app/lib/registration-timezone.ts";

test("normalizes valid IANA timezone strings", () => {
  assert.equal(normalizeTimeZone(" America/Chicago "), "America/Chicago");
  assert.equal(normalizeTimeZone("Etc/GMT+6"), "Etc/GMT+6");
});

test("rejects invalid timezone values", () => {
  for (const value of ["", "Central", "America/Chicago<script>", "A".repeat(65), null, undefined, 42]) {
    assert.equal(normalizeTimeZone(value), "");
  }
});

test("prefers browser timezone and falls back to Vercel header", () => {
  const headers = new Headers({ "x-vercel-ip-timezone": "America/New_York" });

  assert.equal(registrationTimeZoneFromPayloadAndHeaders("America/Los_Angeles", headers), "America/Los_Angeles");
  assert.equal(registrationTimeZoneFromPayloadAndHeaders("", headers), "America/New_York");
});

test("returns empty when browser and Vercel timezone values are invalid", () => {
  const headers = new Headers({ "x-vercel-ip-timezone": "Not/AZone" });

  assert.equal(registrationTimeZoneFromPayloadAndHeaders("Central", headers), "");
});
