import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require=createRequire(import.meta.url);
// The old submission/October confirmation contract is intentionally retired.
// Provider adapter tests remain unchanged; this preview must never mount that flow.
test('direct workshop confirmation URL is honest pending review, not a saved seat',()=>{
 const source=readFileSync('app/workshop/thank-you/page.tsx','utf8');
 const module={exports:{}};
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const ctx=vm.createContext({module,exports:module.exports,require:(name:string)=>name.endsWith('.css')?{default:{}}:require(name)});
 vm.runInContext(code,ctx);
 const html=String(vm.runInContext('require("react-dom/server").renderToStaticMarkup(require("react").createElement(module.exports.default))',ctx));
 assert.match(html,/Registration is not open/);
 assert.match(html,/Build Without Borrowing/);
 assert.match(html,/href="\/workshop#registration"/);
 assert.doesNotMatch(html,/October|Andy|You Are Registered|Seat Is Saved|Zoom access|<form/);
 assert.doesNotMatch(source,/fetch\(|useEffect|use client/);
 assert.equal(vm.runInContext('module.exports.metadata.robots.index',ctx),false);
});
test('metadata identifies the new workshop and cannot inherit obsolete dates or share artwork',()=>{
 const source=readFileSync('app/workshop/page.tsx','utf8');
 assert.match(source,/Build Without Borrowing/);
 assert.match(source,/index: false/);
 assert.match(source,/images: \[\]/);
 assert.doesNotMatch(source,/Called but Stuck|October|Oct 13|2026-10-13|workshop-og.jpg|free live/i);
});
