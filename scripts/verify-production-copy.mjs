import { readFileSync } from "node:fs";

const checks = [
  {
    file: "app/page.tsx",
    mustInclude: [
      "September 15&ndash;17, 2026",
      "September 15&ndash;17 @ 12 PM Central",
      "September 15\\u201317, 2026",
    ],
    mustNotMatch: [
      /June\s*9/i,
      /June\s*10/i,
      /June\s*11/i,
      /June\s*9\s*(?:-|&ndash;|\\u2013)\s*11/i,
      /July\s*28/i,
      /August\s*18/i,
    ],
  },
  {
    file: "app/vip/VIPUpsellPage.tsx",
    mustInclude: [
      "September 16th and 17th",
      "Lifetime access to the K.I. Masterclass replays",
      "The S.W.E.E.T. Spot Audit",
      "VIP rooms",
    ],
    mustNotMatch: [/Top 10 CEO leadership hacks/i, /July\s*30/i],
  },
];

let failed = false;

for (const check of checks) {
  const source = readFileSync(check.file, "utf8");

  for (const text of check.mustInclude) {
    if (!source.includes(text)) {
      failed = true;
      console.error(`[copy guard] ${check.file} is missing required copy: ${text}`);
    }
  }

  for (const pattern of check.mustNotMatch) {
    if (pattern.test(source)) {
      failed = true;
      console.error(`[copy guard] ${check.file} contains forbidden copy matching: ${pattern}`);
    }
  }
}

if (failed) {
  console.error("[copy guard] Refusing to build because production event copy looks wrong.");
  process.exit(1);
}

console.log("[copy guard] Production event copy verified.");
