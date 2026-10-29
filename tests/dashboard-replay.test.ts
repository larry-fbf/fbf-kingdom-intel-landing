import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';

const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');

test('only exact historical placeholder blocks are added to the pinned dashboard bytes', () => {
  // Reverse only the approved calendar substitution before the legacy whole-page guard.
  const oldCard = readFileSync(new URL('./fixtures/dashboard-whatsapp-card.txt', import.meta.url), 'utf8');
  assert.equal(createHash('sha256').update(oldCard).digest('hex'), '00f9f1df27d3f291ab343a8b373ee922783a00fc782b48710c8f18e06fa71bf6');
  const editsText = readFileSync(new URL('./fixtures/dashboard-workflow-edits.json', import.meta.url), 'utf8');
  assert.equal(createHash('sha256').update(editsText).digest('hex'), 'f0ed85132667b943715ea47659a5edd1176a7c25ef6c5f317533bb538ce0fdb5');
  const edits = JSON.parse(editsText);
  assert.equal(edits.base, '8a23de71bbc164d592509aaf3872310689026226');
  let baseline = source;
  for (const { before, after } of edits.changes) {
    assert.equal(baseline.split(after).length, 2, 'exact approved transformation occurs once');
    baseline = baseline.replace(after, before);
  }
  assert.equal(createHash('sha256').update(baseline).digest('hex'), edits.pageSha256);
  const original = baseline
    .replace('import AddToCalendar from "./AddToCalendar";\r\n', '')
    .replace('            <AddToCalendar />', oldCard)
    .replace('const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirecommunity/";\r\n', 'const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirecommunity/";\r\nconst WHATSAPP_URL = "https://whatsapp.com/channel/0029VbDiXJN7T8bbQGSxqt2H";\r\n');
  assert.equal(createHash('sha256').update(original).digest('hex'), '08f0feb0ac8dd67eb0b8a77591df94f3e6a5de011af58e112b09b738dafeabf7');
  // Historical placeholder: cf4d8c0d54f416befe40fadef1cdabd6104f077a.
  // Immediate production/main baseline: 6670a7f3ab67ae91351649eec48837ee571ccd2f.
  // Preserve mixed CRLF/LF bytes, including all existing styles, CTA placement and dates.
  const hash = (value: string) => createHash('sha256').update(value).digest('hex');
  const data = source.slice(source.indexOf('const replays = ['), source.indexOf('export default function'));
  const section = source.slice(source.indexOf('      <section className="replays-section">'), source.indexOf('      <footer'));
  assert.equal(hash(data), '47e58cd2240e32fcb0a396357d75ca2c412e9762edfa091efe15f07ff9b01569');
  assert.equal(hash(section), '5b450ce21443ada2193f757468c0d2c219dd4fea4dde4c2ac420141ea24564cd');
  assert.equal(hash(original.replace(data, '').replace(section, '')), '83ec9d239cc2d52c4daa7e19249176d18ffa105578f271e8d607031cd05bf842');
});

test('public dashboard restores the three historical coming-soon placeholders without players', () => {
  assert.match(source, /<section className="replays-section">/);
  assert.match(source, /<p className="section-label">Replay Library<\/p>/);
  assert.match(source, /<h2 className="section-title">Coming Soon<\/h2>/);
  assert.match(source, /Replays will be posted here after each live session is processed\./);
  const replays = source.match(/const replays = \[([\s\S]*?)\];/)?.[1] ?? '';
  assert.deepEqual([...replays.matchAll(/day: "([^"]+)"/g)].map(match => match[1]), ['Day 1', 'Day 2', 'Day 3']);
  assert.equal([...replays.matchAll(/title: "Replay Coming Soon"/g)].length, 3);
  assert.match(source, /replays\.map/);
  assert.doesNotMatch(source, /<iframe|<video|videoUrl|player\.vimeo\.com|Session Replays|Watch the Replay/);
});

test('replay placeholders preserve the existing dashboard actions and schedule', () => {
  for (const marker of ['November 10-12 | 12 PM Central', 'November 11-12 | 7 PM Central', 'ShareMasterclassButton', 'Grab Your Workbook', 'VIP Upgrade', 'Join the Community', '<AddToCalendar />', 'Enter the Live Room', 'Register with Zoom to receive your personal link by email.', 'kim_dashboard_visit', 'kim_dashboard_zoom_click']) {
    assert.ok(source.includes(marker), `Missing existing dashboard content: ${marker}`);
  }
});
