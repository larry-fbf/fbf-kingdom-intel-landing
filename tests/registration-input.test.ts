import assert from "node:assert/strict";
import test from "node:test";

import { hasAffirmativeConsent } from "../app/lib/registration-input.ts";

test("accepts only literal boolean true as consent", () => {
  assert.equal(hasAffirmativeConsent(true), true);
  for (const value of [false, "true", "false", 1, 0, null, undefined, {}]) {
    assert.equal(hasAffirmativeConsent(value), false);
  }
});