import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const css=readFileSync('app/vip/page.module.css','utf8');
test('VIP supporting line inherits the same body font as its banner without changing size or spacing',()=>{
 assert.match(css,/\.heroCopy > p\.supportingLine \{ margin: -12px auto 24px; font-family: inherit; font-size: clamp\(20px, 2vw, 28px\); \}/);
});
