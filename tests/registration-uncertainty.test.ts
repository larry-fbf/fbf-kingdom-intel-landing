import assert from "node:assert/strict";
import test from "node:test";
import { postJsonWithTimeout, RegistrationRequestError } from "../app/lib/post-json.ts";

for (const mode of ["network", "timeout", "malformed", "gateway"] as const) {
  test(`${mode} after dispatch is uncertain, never retryable, and never reposted`, async () => {
    let writes = 0;
    await assert.rejects(() => postJsonWithTimeout("/api/register", {}, async (_url, init) => {
      writes++; // Synthetic accepted write; its confirmation is lost.
      if (mode === "network") throw new TypeError("Failed to fetch");
      if (mode === "timeout") return await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      });
      return new Response("not-json", { status: mode === "gateway" ? 502 : 200 });
    }, 5), (error: unknown) => {
      assert.ok(error instanceof RegistrationRequestError);
      assert.equal(error.retryable, false);
      assert.equal(error.uncertain, true);
      assert.match(error.message, /check.*confirmation|confirmation.*check/i);
      assert.match(error.message, /support@fueledbyfire.com/);
      assert.doesNotMatch(error.message, /try again|retry/i);
      return true;
    });
    assert.equal(writes, 1);
  });
}

test("explicit server retryability and validation messages remain intact", async () => {
  for (const retryable of [true, false]) {
    await assert.rejects(() => postJsonWithTimeout("/api/register", {}, async () =>
      Response.json({ ok: false, error: "Server explanation", retryable }, { status: 503 })), (error: unknown) => {
      assert.ok(error instanceof RegistrationRequestError);
      assert.equal(error.retryable, retryable);
      assert.equal(error.message, "Server explanation");
      return true;
    });
  }
  await assert.rejects(() => postJsonWithTimeout("/api/register", {}, async () =>
    Response.json({ ok: false, error: "Consent is required" }, { status: 400 })), (error: unknown) => {
    assert.ok(error instanceof RegistrationRequestError);
    assert.equal(error.retryable, true);
    assert.equal(error.uncertain, false);
    assert.equal(error.message, "Consent is required");
    return true;
  });
});
