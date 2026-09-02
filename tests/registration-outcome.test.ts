import assert from "node:assert/strict";
import test from "node:test";

import { captureIntegration, classifyRegistrationResults } from "../app/lib/registration-outcome.ts";

test("accepts a registration when both durable contact systems succeed", () => {
  const result = classifyRegistrationResults({
    attio: { ok: true },
    brevo: { ok: true },
    simpleTexting: { ok: true },
  });

  assert.deepEqual(result, {
    accepted: true,
    degraded: false,
    failedIntegrations: [],
  });
});

test("accepts but marks degraded when exactly one durable contact system succeeds", () => {
  const result = classifyRegistrationResults({
    attio: { ok: false, error: "Attio integration failed" },
    brevo: { ok: true },
    simpleTexting: { ok: false, error: "SimpleTexting integration failed" },
  });

  assert.deepEqual(result, {
    accepted: true,
    degraded: true,
    failedIntegrations: ["attio", "simpleTexting"],
  });
});

test("rejects a registration when neither durable contact system succeeds", () => {
  const result = classifyRegistrationResults({
    attio: { ok: false, error: "Attio integration failed" },
    brevo: { ok: false, error: "Brevo integration failed" },
    simpleTexting: { ok: true },
  });

  assert.deepEqual(result, {
    accepted: false,
    degraded: true,
    failedIntegrations: ["attio", "brevo"],
  });
});

test("treats a skipped integration as unavailable rather than successful", async () => {
  const result = await captureIntegration("brevo", () => Promise.resolve({ skipped: true, reason: "missing credentials" }), 50);

  assert.deepEqual(result, {
    ok: false,
    skipped: true,
    error: "missing credentials",
    value: { skipped: true, reason: "missing credentials" },
  });
});

test("captures a successful integration result", async () => {
  const result = await captureIntegration("attio", () => Promise.resolve({ id: "person-1" }), 50);

  assert.deepEqual(result, {
    ok: true,
    value: { id: "person-1" },
  });
});

test("bounds a stalled integration with a timeout", async () => {
  const result = await captureIntegration("attio", () => new Promise(() => undefined), 5);

  assert.deepEqual(result, {
    ok: false,
    error: "attio timed out",
  });
});