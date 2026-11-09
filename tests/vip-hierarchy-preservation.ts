import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Invert only the approved DOM move and retired timer mount, retaining mixed newlines.
export function beforeVIPHierarchy(source: string) {
  const start = source.indexOf('      <section className={styles.sectionWhite}>');
  const end = source.indexOf('      <section className={styles.urgencyBand}>', start);
  const moved = source.slice(start, end);
  assert.equal(createHash('sha256').update(moved).digest('hex'), '811df3fcc74f043d7e36687a304bd8397a322dd86acae838ef2e881c81265b66');
  source = source.slice(0, start) + source.slice(end);
  source = source.replace('      <section className={styles.quoteBand}>', moved + '      <section className={styles.quoteBand}>');
  const marker = '            Masterclass replays.\r\n          </p>\r\n        </div>\r\n';
  assert.equal(source.split(marker).length, 2);
  source = 'import CountdownTimer from "./CountdownTimer";\n' + source.replace(marker, marker + '        <CountdownTimer />\r\n');
  assert.equal(createHash('sha256').update(source).digest('hex'), '81f9f9d053ba25fd88a85dec103cc76b63f0249d8b2dc7425ef1dfe602c80440');
  return source;
}
