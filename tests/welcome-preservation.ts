import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Narrow, hash-pinned inverse of the approved registration flow only.
// Immediate baseline: f9e545078f2be0aa6440041efd418b533263ab41.
export function beforeWelcome(path: 'app/dashboard/page.tsx' | 'app/page.tsx', source: string) {
  const fixture = readFileSync(new URL('./fixtures/dashboard-welcome-edits.json', import.meta.url),'utf8');
  const hash = (s: string) => createHash('sha256').update(s).digest('hex');
  assert.equal(hash(fixture),'5e244bebe18ca5be2772de813bd02c55e8c14f3f1e9c68d3c55d35206aa748ce');
  for (const {before,after} of JSON.parse(fixture)[path]) {
    assert.equal(source.split(after).length,2,'exact authorized edit occurs once');
    source=source.replace(after,before);
  }
  assert.equal(hash(source),path==='app/dashboard/page.tsx' ? 'bc128ae4631f5bb139fcf809ab30c32e9f595b612b0835578fc1435837b14ded' : 'e48075695c83c7faafe5a875f1f930fe967e49078b4d0dbb3f65f41cfd4e1a2f');
  return source;
}
