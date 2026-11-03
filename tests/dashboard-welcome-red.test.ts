import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const source = readFileSync('app/dashboard/RegistrationWelcome.tsx', 'utf8');
const rule = (selector: string) => {
  const start = source.indexOf(`${selector} {`);
  assert.notEqual(start, -1, selector);
  return source.slice(start, source.indexOf('}', start));
};
test('welcome uses brand red accents with readable neutral text and scoped video overrides', () => {
  assert.match(rule('.registration-welcome-dialog'), /border: 1px solid #CC0000;/);
  assert.match(rule('.registration-welcome-dialog'), /background: #080808;/);
  assert.match(rule('.welcome-eyebrow, .welcome-caption'), /color: #fff;/);
  assert.match(rule('.welcome-community-heading'), /color: #CC0000;/);
  assert.match(rule('.dashboard-welcome-video'), /border: 1px solid #CC0000;/);
  assert.match(rule('.welcome-community-cta'), /background: #CC0000; color: #fff;/);
  assert.match(rule('.dashboard-welcome-video > span[aria-hidden="true"]'), /border-color: #CC0000 !important;/);
  assert.match(rule('.dashboard-welcome-video > span[aria-hidden="true"] > span'), /border-left-color: #CC0000 !important;/);
  assert.doesNotMatch(source, /c9a55a|e8d080|bb945a|120800/i);
});
test('welcome behavior, content, tracking, video and links remain byte-identical to released main', () => {
  assert.equal(createHash('sha256').update(source.split('<style>')[0]).digest('hex'), '289507dfbadb476f08b3b698e2e71e3bc8b600b466198cd5e77639172838f9d2');
});
