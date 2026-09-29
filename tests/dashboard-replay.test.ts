import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');

test('public dashboard no longer mounts the replay library or players', () => {
  assert.doesNotMatch(source, /const replays\s*=|replays\.map|<iframe|player\.vimeo\.com|<section className="replays-section"|Replay Library|Session Replays|Watch the Replay/);
});

test('replay removal preserves the existing dashboard actions and schedule', () => {
  for (const marker of ['September 15-17 | 12 PM Central', 'September 16-17 | 7 PM Central', 'ShareMasterclassButton', 'Grab Your Workbook', 'VIP Upgrade', 'Join the Community', 'Join the Group', 'Enter the Live Room', 'Register with Zoom to receive your personal link by email.', 'kim_dashboard_visit', 'kim_dashboard_zoom_click']) {
    assert.ok(source.includes(marker), `Missing existing dashboard content: ${marker}`);
  }
});
