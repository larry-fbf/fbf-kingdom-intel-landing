import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
import { createHash } from 'node:crypto';
import { beforeBonus } from './bonus-preservation.ts';

const require = createRequire(import.meta.url);
test('bonus renders the exact private-link embed, accessible controls and real roadmap download', () => {
  const module = { exports: {} as any };
  vm.runInNewContext(ts.transpileModule(readFileSync('app/dashboard/BonusContent.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
  }).outputText, { module, exports: module.exports, require });
  const html = renderToStaticMarkup(module.exports.default());
  assert.match(html, /<h2[^>]*>Bonus Content<\/h2>/);
  assert.match(html, /<h3[^>]*>The Five Phases of Business<\/h3>/);
  assert.match(html, /href="\/downloads\/3-step-clarity-roadmap.pdf" download="3-step-clarity-roadmap.pdf"/);
  assert.match(html, /Download the Clarity Roadmap \(PDF\)/);
  assert.match(html, /3 Step Clarity Roadmap/);
  assert.match(html, /src="https:\/\/player.vimeo.com\/video\/1242889325\?h=89d8926d2a"/);
  assert.match(html, /title="The Five Phases of Business" loading="lazy"/);
  assert.match(html, /allowFullScreen=""/);
  assert.doesNotMatch(html, /autoplay|<button\b|coming soon/);
  assert.equal((html.match(/<iframe/g) ?? []).length, 1);
  assert.match(html, /\.dashboard-bonus \{ background: #080808;/);
  assert.match(html, /aspect-ratio: 9 \/ 16/);
  assert.match(html, /grid-template-columns: minmax\(0, 338px\) minmax\(0, 1fr\)/);
  assert.match(html, /@media \(max-width: 720px\)/);
  assert.ok(html.indexOf('<iframe') < html.indexOf('<div class="bonus-copy"'));
  beforeBonus(page);
});

test('published roadmap preserves the supplied original PDF bytes', () => {
  const pdf = readFileSync('public/downloads/3-step-clarity-roadmap.pdf');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.equal(createHash('sha256').update(pdf).digest('hex'), 'c839a4fcba022c54f9e0b3b0bf0ec4f335264929bca3730339ec79aa7e74b205');
});

const page = readFileSync('app/dashboard/page.tsx', 'utf8');
test('bonus content is mounted immediately after replay library and before footer', () => {
  assert.match(page, /import BonusContent from "\.\/BonusContent";/);
  assert.match(page, /<\/section>\s*<BonusContent \/>\s*<footer className="footer">/);
  assert.equal(page.split('<BonusContent />').length, 2);
  assert.ok(existsSync('app/dashboard/BonusContent.tsx'));
});
