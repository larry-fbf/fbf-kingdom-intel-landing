import { readFileSync } from "node:fs";

const checks = [
  {
    file: "app/page.tsx",
    mustInclude: [
      "July 28&ndash;30, 2026",
      "July 28–30 @ 12 PM Central",
      "July 28\\u201330, 2026",
    ],
    mustNotMatch: [/June\s*9/i, /June\s*10/i, /June\s*11/i, /June\s*9\s*(?:-|–|&ndash;|\\u2013)\s*11/i],
  },
  {
    file: "app/vip/page.tsx",
    mustInclude: ["July 30th at 7pm CT on Zoom"],
    mustNotMatch: [/Fast-action bonuses/i, /Plus, you get these resources included/i, /bonus resources/i],
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
