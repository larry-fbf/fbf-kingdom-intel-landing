import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');
test('Mastery invitation follows the entire replay grid with the exact destination', () => {
  assert.match(page, /\)\)\}\s*<\/div>\s*<section className="community-strip mastery-section" aria-labelledby="mastery-title">/);
  assert.match(page, /<h2 className="community-title" id="mastery-title">Ready for your next step\?<\/h2>/);
  assert.match(page, /<a className="community-button mastery-button" href="https:\/\/fbfmastery\.com">\s*Apply for Mastery\s*<\/a>/);
  assert.equal((page.match(/https:\/\/fbfmastery\.com/g) || []).length, 1);
  assert.match(page, /\.mastery-button:focus-visible\s*\{\s*outline: 3px solid #fff;\s*outline-offset: 4px;/);
  for (const id of ['1227087561', '1227491620', '1227853840']) {
    assert.equal((page.match(new RegExp(id, 'g')) || []).length, 1);
  }
});
