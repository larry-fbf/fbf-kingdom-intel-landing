import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";

const file = "app/vip/VIPUpsellPage.tsx";
const page = readFileSync(file, "utf8");
const base = "d91cad832fb015864c9a052b78de6e0769fe0dcb";
const baseline = execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });

test("VIP spells out all seven Masterclass abbreviations, including wrapped JSX prose", () => {
  assert.equal((baseline.match(/K\.I\.\s+Masterclass/g) || []).length, 7);
  assert.doesNotMatch(page, /K\.I\.\s+Masterclass/);
  assert.equal((page.match(/Kingdom Intelligence\s+Masterclass/g) || []).length,
    (baseline.match(/Kingdom Intelligence\s+Masterclass/g) || []).length + 7);
});

test("VIP preserves every baseline byte except the seven approved name expansions", () => {
  const expected = baseline.replace(/K\.I\.(\s+)Masterclass/g, "Kingdom Intelligence$1Masterclass");
  assert.equal(page, expected);
});

test("VIP metadata and imported countdown and tracked links contain no abbreviated name", () => {
  for (const path of ["app/vip/page.tsx", "app/vip/CountdownTimer.tsx", "app/components/TrackedClarityLink.tsx", "app/layout.tsx"]) {
    assert.doesNotMatch(readFileSync(path, "utf8"), /K\.I\.\s+Masterclass/);
  }
});
