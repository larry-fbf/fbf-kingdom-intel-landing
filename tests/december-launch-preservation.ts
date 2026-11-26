import {readFileSync} from 'node:fs';
import {beforeMobileHero} from './workshop-mobile-preservation.ts';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const fixture=JSON.parse(readFileSync('tests/fixtures/december-launch-edits.json','utf8'));
const noah=JSON.parse(readFileSync('tests/fixtures/workshop-noah-edits.json','utf8'));
export function beforeDecember(path:string,bytes:Buffer){bytes=beforeMobileHero(path,bytes);if(noah[path]){assert.equal(createHash('sha256').update(bytes).digest('hex'),noah[path].sha256,path);bytes=Buffer.from(noah[path].before);}if(!fixture[path])return bytes;assert.equal(createHash('sha256').update(bytes).digest('hex'),fixture[path].sha256,path);return Buffer.from(fixture[path].before);}
