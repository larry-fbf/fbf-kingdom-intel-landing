import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function render(path:string){
 const source=readFileSync(path,'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const module={exports:{}};
 const context=vm.createContext({module,exports:module.exports,require:(name:string)=>name.endsWith('.css')?{default:{}}:require(name)});
 vm.runInContext(code,context);
 return String(vm.runInContext('require("react-dom/server").renderToStaticMarkup(require("react").createElement(module.exports.default))',context));
}
test('workshop presents approved title, subtitle and sole teacher with a non-submitting review CTA',()=>{
 const html=render('app/workshop/WorkshopLanding.tsx');
 assert.match(html,/Build Without Borrowing/);
 assert.ok(html.includes('Build your business through wise counsel, trusted relationships, and the resources you already have.'));
 assert.match(html,/payton-wallace-host.webp/);
 assert.match(html,/href="#registration"/);
 assert.match(html,/Registration is not open/);
 assert.match(html,/Preview · Event details pending/);
 assert.doesNotMatch(html,/Local review/);
 assert.doesNotMatch(html,/Andy|October|Oct 13|2026-10-13|Called But Stuck|\$997|\$197|<form|<iframe|type="submit"|Limited seats|Free live/i);
 assert.doesNotMatch(readFileSync('app/workshop/WorkshopLanding.tsx','utf8'),/fetch\(|\/api\/|window.location|trackClarity|fbq/);
});

test('invitation teases benefits without publishing teaching or membership pitch',()=>{
 const html=render('app/workshop/WorkshopLanding.tsx');
 assert.doesNotMatch(html,/OPM|OPW|seven.day|Network|Accelerator|B\.O\.O\.M|worksheet|black book|Leading the invitation|Rifle Focus|S\.W\.E\.E\.T/i);
 const words=html.replace(/<[^>]*>/g,' ').trim().split(/\s+/).length;
 assert.ok(words<600, `Invitation must be concise; found ${words} words`);
 assert.match(html,/Spirit-led wisdom/);
 assert.match(html,/Stewardship starts/);
 assert.match(html,/Registration is not open yet/);
 assert.doesNotMatch(html,/<button|<input|<form|heroStrip|Registration coming soon|To be confirmed|Implementation notes|Source phrase mapping/);
 assert.equal((html.match(/href="#registration"/g)||[]).length,2);
});
