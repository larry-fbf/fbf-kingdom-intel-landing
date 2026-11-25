import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
export function beforeFbfHandoff(path: string, current: Buffer): Buffer {
  if (path !== 'app/dashboard/RegistrationWelcome.tsx') return current;
  const addition = '      if (window.location.hash === "#bonus-heading") {\n        document.getElementById("bonus-heading")?.scrollIntoView({ behavior: "instant", block: "start" });\n      }\n';
  const source = current.toString();
  assert.equal(source.split(addition).length, 2, 'exactly one scoped handoff cleanup');
  const restored = Buffer.from(source.replace(addition, ''));
  assert.equal(createHash('sha256').update(restored).digest('hex'), '7921608b41ef9b711b86287e5034e961308463f18edcbfe96ba9fc348ed48929');
  return restored;
}
