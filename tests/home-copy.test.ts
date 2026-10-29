import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";

const page = readFileSync("app/page.tsx", "utf8");
const first = "For 7- and 8-figure business owners and leaders ready to grow without compromising how God has called them to lead.";
const second = "Combine spirit-led strategy, operational excellence, and AI-powered execution to build your next stage of growth.";

test("homepage hero uses the exact requested paragraph and retains gold bold second sentence", () => {
  assert.ok(page.includes(`${first}{" "}<span style={{ color: "#BB945A", fontWeight: 700 }}>${second}</span>`));
});

const oldC = '{ letter: "C", label: "Culture Architecture", tagline: "CULTURE ARCHITECTURE", description: "Create an environment that attracts, develops, and multiplies leaders who carry the vision without you becoming the bottleneck." }';
const newC = '{ letter: "C", label: "Clarity Of Vision", tagline: "CLARITY OF VISION", description: "Clarify and communicate your God-given vision so your leaders can carry it forward without you becoming the bottleneck." }';

test("ECHO C describes clarity of vision with no conflicting culture label", () => {
  assert.ok(page.includes(newC));
  assert.doesNotMatch(page, /culture architecture/i);
});

test("homepage preserves every baseline byte outside the requested hero and C copy", () => {
  const baseline = execFileSync("git", ["show", "619fedcd4d2aa86756ec80188933165f53c45365:app/page.tsx"], { encoding: "utf8" });
  assert.equal(page.replace(first, first.replace(" and leaders", "")).replace(newC, oldC), baseline);
});
