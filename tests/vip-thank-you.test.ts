import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
function load(path: string): any {
  const module = { exports: {} as any };
  vm.runInNewContext(ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, {
    module, exports: module.exports, require: (id: string) => {
      if (id.endsWith('.css')) return new Proxy({}, { get: (_target, key) => String(key) });
      if (id.includes('ClarityPageViewEvent')) return { default: () => null };
      if (id.includes('ShareMasterclassSection')) return load('app/components/ShareMasterclassSection.tsx');
      return require(id);
    },
  });
  return module.exports;
}
const render = () => require('react-dom/server').renderToStaticMarkup(require('react').createElement(load('app/vip/thank-you/page.tsx').default));
test('VIP next steps render before the optional regular-masterclass invitation', () => {
  const html = render();
  const labels = ['Get ready for your VIP Business Mastermind.', 'Your VIP experience includes', 'Watch your inbox.', 'Prepare your question.', 'Join us with your camera on.', 'Share the masterclass with a friend.'];
  let previous = -1;
  for (const label of labels) {
    const index = html.indexOf(label);
    assert.ok(index > previous, `${label} must appear in DOM order`);
    previous = index;
  }
  assert.match(html, /<ol[^>]*>/);
  assert.match(html, /Zoom and bonus links will be emailed closer to the sessions/);
  assert.match(html, /Reply to your VIP welcome email/);
  assert.match(html, /What is your biggest challenge/);
  assert.match(html, /What would overcoming it look like/);
  assert.match(html, /What specific question would you like us to answer/);
  assert.match(html, /Questions sent in advance get priority/);
  assert.match(html, /Wednesday, November 11/);
  assert.match(html, /Thursday, November 12, 2026/);
  assert.match(html, /7 PM Central/);
  assert.match(html, /href="\/dashboard"/);
  assert.match(html, /value="https:\/\/www.kingdomintel.com\/"/);
  assert.equal((html.match(/This page does not verify payment/g) || []).length, 1);
  assert.doesNotMatch(html, /zoom\.us|invitation_token|payment confirmed|seat confirmed|<form|reserve my seat/i);
});
