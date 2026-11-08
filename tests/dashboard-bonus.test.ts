import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeBonus } from './bonus-preservation.ts';

const require = createRequire(import.meta.url);
test('bonus renders the exact private-link embed, accessible controls and plain PDF status', () => {
  const module = { exports: {} as any };
  vm.runInNewContext(ts.transpileModule(readFileSync('app/dashboard/BonusContent.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
  }).outputText, { module, exports: module.exports, require });
  const html = renderToStaticMarkup(module.exports.default());
  assert.match(html, /<h2[^>]*>Bonus Content<\/h2>/);
  assert.match(html, /<h3[^>]*>The Five Phases of Business<\/h3>/);
  assert.match(html, /<p class="bonus-pdf">PDF coming soon<\/p>/);
  assert.match(html, /src="https:\/\/player.vimeo.com\/video\/1242889325\?h=89d8926d2a"/);
  assert.match(html, /title="The Five Phases of Business" loading="lazy"/);
  assert.match(html, /allowFullScreen=""/);
  assert.doesNotMatch(html, /autoplay|<a\b|<button\b|download|\.pdf/);
  assert.equal((html.match(/<iframe/g) ?? []).length, 1);
  beforeBonus(page);
});

const page = readFileSync('app/dashboard/page.tsx', 'utf8');
test('bonus content is mounted immediately after replay library and before footer', () => {
  assert.match(page, /import BonusContent from "\.\/BonusContent";/);
  assert.match(page, /<\/section>\s*<BonusContent \/>\s*<footer className="footer">/);
  assert.equal(page.split('<BonusContent />').length, 2);
  assert.ok(existsSync('app/dashboard/BonusContent.tsx'));
});
