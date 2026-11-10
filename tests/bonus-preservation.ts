import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import { beforeDay1 } from './day1-preservation.ts';

// Exact inverse of the bonus mount against main 28b82d3a9aec3ebe19e33912131f8b157f5dba2d.
export function beforeBonus(source: string) {
  source = beforeDay1(source);
  for (const addition of ['import BonusContent from "./BonusContent";\r\n', '      <BonusContent />\r\n\r\n']) {
    assert.equal(source.split(addition).length, 2);
    source = source.replace(addition, '');
  }
  assert.equal(createHash('sha256').update(source).digest('hex'), 'de3b309d5e8621a9d84fdc97e12fe085b17b26830fc3f87c96d384a0a8fdf21b');
  return source;
}
