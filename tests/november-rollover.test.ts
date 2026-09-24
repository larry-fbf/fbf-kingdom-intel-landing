import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const source = (file: string) => readFileSync(new URL('../' + file, import.meta.url), 'utf8');

test('active masterclass surfaces and metadata use November, not September', () => {
  for (const file of ['app/page.tsx', 'app/layout.tsx', 'app/thank-you/page.tsx', 'app/dashboard/page.tsx', 'app/dashboard/ShareMasterclassButton.tsx', 'app/vip/VIPUpsellPage.tsx', 'app/vip/page.tsx']) {
    assert.match(source(file), /Nov(?:ember)?/i, file);
    assert.doesNotMatch(source(file), /September|Sept\b/, file);
  }
  assert.match(source('app/lib/clarity-events.ts'), /kim_nov_2026/);
});

test('public dashboard is upcoming November with no replay embeds and the requested Mastery invitation', () => {
  const page = source('app/dashboard/page.tsx');
  assert.doesNotMatch(page, /<iframe|player\.vimeo\.com|Watch the Replay/);
  assert.match(page, /November 3-5 \| 12 PM Central/);
  assert.match(page, /November 4-5 \| 7 PM Central/);
  assert.match(page, /Ready for your next step\?/);
  assert.match(page, /Apply for Mastery/);
  assert.match(page, /https:\/\/fbfmastery\.com/);
  assert.doesNotMatch(page, /Your seat is ready/);
});

test('workbook explicitly qualifies November and promises only implemented dashboard features', () => {
  assert.ok(source('app/workbook/page.tsx').includes('November 3–5, 2026'));
  assert.ok(source('app/api/workbook/route.ts').includes('kim-november-2026-v1'));
  assert.equal(/add the event to your calendar|use the chat|You’re in/.test(source('app/workbook-thank-you/page.tsx')), false);
});

test('confirmation does not promise unverified Zoom delivery or encourage uncertain retries', () => {
 assert.equal(source('app/page.tsx').includes('Your information is still here—please retry.'),false);
 const thanks=source('app/thank-you/page.tsx');
 assert.ok(thanks.includes('Zoom access is confirmed only by Zoom'));
 assert.equal(thanks.includes('Your dashboard, workbook, VIP invite, and live Zoom link will come by email and text.'),false);
});

test('dashboard discloses the paid hold and actual workbook download path', () => {
 const page=source('app/dashboard/page.tsx');
 assert.ok(page.includes('November VIP checkout is not open yet.'));
 assert.ok(page.includes('Complete the November form to open your workbook download.'));
});
