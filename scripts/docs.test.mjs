import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createSearchIndex, searchDocs, readingMinutes } from '../src/helpers/docs-search.ts';

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const vi = read('../messages/docs/vi.json');
const en = read('../messages/docs/en.json');

test('both languages expose identical routes, groups, and section anchors', () => {
  assert.deepEqual(
    vi.groups.map((g) => g.id),
    en.groups.map((g) => g.id),
  );
  assert.deepEqual(
    vi.pages.map((p) => p.slug),
    en.pages.map((p) => p.slug),
  );
  for (const [index, page] of vi.pages.entries()) {
    assert.deepEqual(
      page.sections.map((s) => s.id),
      en.pages[index].sections.map((s) => s.id),
    );
  }
  assert.deepEqual(
    Object.keys(read('../messages/vi.json').Docs).sort(),
    Object.keys(read('../messages/en.json').Docs).sort(),
  );
});

for (const [locale, content] of [
  ['vi', vi],
  ['en', en],
]) {
  test(`${locale}: all articles have unique routes, valid sections, and source attribution`, () => {
    assert.equal(new Set(content.pages.map((p) => p.slug)).size, content.pages.length);
    for (const page of content.pages) {
      assert.match(page.slug, /^[a-z]+(?:-[a-z]+)*$/);
      assert.ok(content.groups.some((g) => g.id === page.group));
      assert.ok(page.sources.length > 0);
      assert.ok(page.sections.length > 0);
      assert.equal(new Set(page.sections.map((s) => s.id)).size, page.sections.length);
      for (const section of page.sections) {
        assert.match(section.id, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
        assert.ok(section.paragraphs.length || section.list?.length || section.table?.rows.length);
        if (section.table)
          for (const row of section.table.rows)
            assert.equal(row.length, section.table.headers.length);
      }
      assert.ok(readingMinutes(page) >= 2);
    }
  });
}

test('Vietnamese search is accent insensitive and normalizes đ', () => {
  const results = searchDocs(createSearchIndex(vi), 'TU KIEM CHUNG BANG CHUNG');
  assert.equal(results[0]?.href, '/docs/independent-verification');
  assert.ok(searchDocs(createSearchIndex(vi), 'du lieu').length > 0);
});

test('search includes body text and all query terms, with titles ranked first', () => {
  assert.equal(searchDocs(createSearchIndex(en), 'hashing')[0]?.href, '/docs/hashing');
  assert.ok(
    searchDocs(createSearchIndex(en), 'periodAnchorCount').some(
      (item) => item.href === '/docs/smart-contracts',
    ),
  );
  assert.equal(searchDocs(createSearchIndex(en), 'xxxxxxxxxxxxxxxxx').length, 0);
  assert.ok(searchDocs(createSearchIndex(en), 'finalized issuer').length > 0);
});

test('search offers starting points for empty input and bounds results', () => {
  assert.equal(searchDocs(createSearchIndex(vi), '').length, 6);
  assert.ok(searchDocs(createSearchIndex(en), 'record').length <= 12);
});
