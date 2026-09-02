import assert from "node:assert/strict";
import test from "node:test";

import { postJsonWithTimeout, RegistrationRequestError } from "../app/lib/post-json.ts";

test("returns the parsed result for an accepted registration", async () => {
  const result = await postJsonWithTimeout(
    "/api/register",
    { email: "person@example.com" },
    async () => new Response(JSON.stringify({ ok: true, degraded: false }), { status: 200 }),
  );

  assert.deepEqual(result, { ok: true, degraded: false });
});

test("throws a typed error for an unsuccessful response", async () => {
  await assert.rejects(
    () =>
      postJsonWithTimeout(
        "/api/register",
        { email: "person@example.com" },
        async () => new Response(JSON.stringify({ ok: false, error: "Registration could not be saved" }), { status: 503 }),
      ),
    (error: unknown) => {
      assert.ok(error instanceof RegistrationRequestError);
      assert.equal(error.status, 503);
      assert.equal(error.message, "Registration could not be saved");
      return true;
    },
  );
});

test("rejects a 200 response that does not explicitly confirm success", async () => {
  for (const body of [JSON.stringify({ ok: false }), JSON.stringify({}), "null", "not-json"]) {
    await assert.rejects(
      () => postJsonWithTimeout("/api/register", {}, async () => new Response(body, { status: 200 })),
      (error: unknown) => {
        assert.ok(error instanceof RegistrationRequestError);
        assert.equal(error.kind, "server");
        return true;
      },
    );
  }
});

test("classifies an aborted request as a timeout", async () => {
  await assert.rejects(
    () =>
      postJsonWithTimeout(
        "/api/register",
        {},
        async (_url, init) => {
          await new Promise((resolve, reject) => {
            init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
            setTimeout(resolve, 50);
          });
          return new Response("{}", { status: 200 });
        },
        5,
      ),
    (error: unknown) => {
      assert.ok(error instanceof RegistrationRequestError);
      assert.equal(error.kind, "timeout");
      return true;
    },
  );
});