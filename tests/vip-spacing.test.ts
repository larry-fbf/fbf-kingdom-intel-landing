import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const css=readFileSync('app/vip/page.module.css','utf8');
test('VIP has one subtle short gold separator and a compact title/support gap',()=>{
 assert.match(css,/\.heroCopy:has\(> p\.supportingLine\) h1 \{ margin-bottom: 8px; \}/);
 assert.match(css,/\.heroCopy:has\(> p\.supportingLine\) \.goldUnderline \{ margin-bottom: 0; padding-bottom: 0; \}/);
 assert.match(css,/\.heroCopy:has\(> p\.supportingLine\) \.goldUnderline::after \{\s*content: "";\s*display: block;\s*width: 64px;\s*height: 2px;\s*margin: 10px auto 0;\s*background: #e6c979;\s*\}/);
 assert.match(css,/\.heroCopy > p\.supportingLine \{ margin-top: 0; \}/);
});
test('only mobile coaching top padding overrides the global mobile section rule',()=>{
 assert.match(css,/@media \(max-width: 768px\) \{\s*\/\*[^]*?\*\/\s*\.coachingLight \{ padding-top: 32px !important; \}\s*\}\s*$/);
});
