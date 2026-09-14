import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');

test('live-room CTA retains registration and tracking, with the exact small grey email note directly beneath it', () => {
  assert.match(source, /const ZOOM_URL = "https:\/\/us02web\.zoom\.us\/webinar\/register\/WN_36fBt-YSQ5qZgI0h8waQcQ";/);
  assert.match(source, /eventName="kim_dashboard_zoom_click"\s+eventTags=\{\{ destination: "zoom" \}\}\s+href=\{ZOOM_URL\}\s+target="_blank"\s+rel="noopener noreferrer"/);
  assert.match(source, /Enter the Live Room\s*<\/TrackedClarityLink>\s*<p style=\{\{ margin: "8px 0 0", color: "#a3a3a3", fontSize: "12px", lineHeight: 1\.5, textAlign: "center" \}\}>\s*Register with Zoom to receive your personal link by email\.\s*<\/p>/);
  assert.equal(source.split('Register with Zoom to receive your personal link by email.').length - 1, 1);
});
