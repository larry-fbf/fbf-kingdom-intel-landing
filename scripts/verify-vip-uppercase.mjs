import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:3127';
const query = '?utm_source=email&utm_medium=campaign&utm_campaign=VIP%20invite&tag=a&tag=b&empty=&encoded=%2F%2B';
async function chain(path) {
  let url = new URL(path, base); const hops = [];
  for (let i = 0; i < 6; i++) {
    const r = await fetch(url, { redirect: 'manual' });
    const location = r.headers.get('location');
    hops.push({ url: url.href, status: r.status, location });
    await r.body?.cancel();
    if (!location) return hops;
    url = new URL(location, url);
  }
  assert.fail('Redirect loop: ' + JSON.stringify(hops));
}
for (const path of ['/VIP', '/VIP' + query, '/VIP/' + query]) {
  const hops = await chain(path);
  console.log(JSON.stringify(hops));
  // The apex host may first apply its existing www redirect.
  const canonical = hops.find(h => h.status === 308 && new URL(h.location, h.url).pathname === '/vip');
  assert(canonical, 'Expected permanent /VIP -> /vip redirect');
  const last = hops.at(-1);
  assert.equal(last.status, 200);
  assert.equal(new URL(last.url).pathname, '/vip');
  assert.deepEqual([...new URL(last.url).searchParams], [...new URLSearchParams(path.includes('?') ? query : '')]);
}
for (const [path, status] of [['/vip',200],['/',200],['/dashboard',200],['/workbook',200],['/workshop',200],['/Vip',404],['/VIP/thank-you',404],['/draft',404]]) {
  const hops = await chain(path); console.log(JSON.stringify(hops));
  assert.equal(hops.at(-1).status, status, path);
  if (path === '/vip') assert(hops.every(h => h.location === null || new URL(h.location,h.url).hostname !== new URL(h.url).hostname), 'lowercase must not redirect to itself');
}
const thanks = await chain('/vip/thank-you');
console.log(JSON.stringify(thanks));
assert.equal(new URL(thanks.at(-1).url).pathname, '/vip/thank-you');
assert.equal(thanks.at(-1).status, 200);
const anonymous = await chain('/thank-you');
console.log(JSON.stringify(anonymous));
assert.equal(new URL(anonymous.at(-1).url).pathname, '/');
console.log('PASS: uppercase redirect, preserved query parameters, bounded chains, critical routes and anonymous registration guard');
