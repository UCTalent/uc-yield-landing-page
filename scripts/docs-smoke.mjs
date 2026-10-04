import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:3100';
const content = JSON.parse(
  readFileSync(new URL('../messages/docs/vi.json', import.meta.url), 'utf8'),
);
const paths = ['/docs', ...content.pages.map((page) => `/docs/${page.slug}`)];
let checked = 0;
for (const prefix of ['', '/en']) {
  for (const path of paths) {
    const route = `${prefix}${path}`;
    const response = await fetch(`${base}${route}`, { headers: { 'Accept-Language': 'vi' } });
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
    assert.ok(
      html.includes(`rel="canonical" href="https://ucyield.com${route}"`),
      `${route}: canonical`,
    );
    assert.ok(html.includes(`href="https://ucyield.com${path}"`), `${route}: vi alternate`);
    assert.ok(html.includes(`href="https://ucyield.com/en${path}"`), `${route}: en alternate`);
    assert.ok(html.includes('name="twitter:title"'), `${route}: social metadata`);
    checked += 1;
  }
}
for (const route of ['/docs/unknown-document', '/en/docs/api/unknown-child']) {
  const response = await fetch(`${base}${route}`, { headers: { 'Accept-Language': 'vi' } });
  assert.equal(response.status, 404, route);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const prefix of ['', '/en'])
  for (const path of paths)
    assert.ok(sitemap.includes(`https://ucyield.com${prefix}${path}</loc>`));
assert.ok(!sitemap.includes('https://ucyield.com/vi</loc>'));
console.log(
  `PASS: ${checked} localized documentation routes, metadata, unknown routes, and sitemap.`,
);
