import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const fixture=JSON.parse(readFileSync('tests/fixtures/workshop-mobile-edits.json','utf8'));
import {beforeBannerHero} from './workshop-banner-preservation.ts';
export function beforeMobileHero(path:string,bytes:Buffer){bytes=beforeBannerHero(path,bytes);if(!fixture[path])return bytes;assert.equal(createHash('sha256').update(bytes).digest('hex'),fixture[path].sha256,path);return Buffer.from(fixture[path].before);}
