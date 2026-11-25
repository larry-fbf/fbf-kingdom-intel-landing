import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('approved Noah invitation conceals the answer and preserves the event',()=>{
 const landing=readFileSync('app/workshop/WorkshopLanding.tsx','utf8');
 const metadata=readFileSync('app/workshop/page.tsx','utf8');
 for(const text of ['Debt shouldn’t stop your God-sized vision.','Do you have a business to build but feel like debt is the only way?','What other people say.','Consider your growth decisions through faith and stewardship.','See a different way forward.','Explore possibilities for your business before making debt the plan.']) assert.ok(landing.includes(text),text);
 assert.ok(metadata.includes('Debt shouldn’t stop your God-sized vision.'));
 assert.doesNotMatch(landing+metadata,/wise counsel|trusted relationships|building relationships|Build with counsel|Not in isolation|OPW|Other People’s Wisdom|—/i);
 assert.match(landing,/Your business is a mission field. How you build it matters./);
 assert.match(landing,/Commit your work to the LORD, and your plans will be established./);
 const css=readFileSync('app/workshop/build-without-borrowing.module.css','utf8');
 assert.ok(css.includes('.conviction { padding:64px 20px; background:linear-gradient(115deg,#350606 0%,#6b0808 100%);'));
 assert.ok(!css.includes('.dark .button,'));
});
