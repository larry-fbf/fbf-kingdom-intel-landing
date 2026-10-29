import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('both top regular dates link directly to the shared Google series with safe accessible anchors', () => {
  assert.match(page, /import \{ googleCalendarUrl \} from ['"]\.\/calendar['"]/);
  for (const name of ['schedule-pill', 'date-pill']) {
    const anchor = page.match(new RegExp('<a\\s+className="' + name + '"[\\s\\S]*?</a>'))?.[0] ?? '';
    assert.match(anchor, /href=\{googleCalendarUrl\(\)\}/);
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noopener noreferrer"/);
    assert.match(anchor, /aria-label="[^"]*Google Calendar[^"]*new tab[^"]*"/);
    assert.match(anchor, /November 10(?:-| to )12 \| 12 PM Central/);
  }
  assert.match(page, /\.schedule-pill:focus-visible,\s*\.date-pill:focus-visible\s*\{\s*outline: 3px solid #cc0000;\s*outline-offset: 4px;/);
  assert.match(page, /<div className="action-date">November 11-12 \| 7 PM Central<\/div>/);
});

const page = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');
const calendar = readFileSync(new URL('../app/dashboard/AddToCalendar.tsx', import.meta.url), 'utf8');

test('workflow renders Calendar, Workbook, Community, VIP in document order with steps 1–4', () => {
  const workflow = page.slice(page.indexOf('<div className="workflow-grid"'), page.indexOf('<section className="replays-section"'));
  const expanded = workflow.replace('<AddToCalendar />', calendar.slice(calendar.indexOf('<div className="action-card')));
  assert.deepEqual([...expanded.matchAll(/className="action-card ([^"]+)"/g)].map(m => m[1]), ['calendar-card', 'workbook-card', 'community-card', 'vip-card']);
  assert.deepEqual([...expanded.matchAll(/className="action-step">(Step \d)/g)].map(m => m[1]), ['Step 1', 'Step 2', 'Step 3', 'Step 4']);
});
