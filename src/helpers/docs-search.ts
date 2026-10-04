import type { DocPage, DocSearchItem, DocsContent } from '../types/docs.ts';

export function docHref(slug: string): string {
  return `/docs/${slug}`;
}

export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function searchDocs(items: DocSearchItem[], query: string): DocSearchItem[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return items.slice(0, 6);
  return items
    .map((item, index) => {
      const title = normalizeSearch(item.title);
      const summary = normalizeSearch(`${item.description} ${item.group}`);
      const body = normalizeSearch(item.text);
      const score = terms.every((term) => `${title} ${summary} ${body}`.includes(term))
        ? terms.reduce(
            (total, term) => total + (title.includes(term) ? 8 : summary.includes(term) ? 3 : 1),
            0,
          )
        : 0;
      return { item, score, index };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 12)
    .map(({ item }) => item);
}

export function createSearchIndex(content: DocsContent): DocSearchItem[] {
  return content.pages.map((page) => ({
    href: docHref(page.slug),
    title: page.title,
    description: page.description,
    group: content.groups.find((group) => group.id === page.group)?.title ?? '',
    text: page.sections
      .map((section) =>
        [
          section.title,
          ...section.paragraphs,
          ...(section.list ?? []),
          ...(section.table?.rows.flat() ?? []),
          section.code ?? '',
        ].join(' '),
      )
      .join(' '),
  }));
}

export function readingMinutes(page: DocPage): number {
  const words = [
    page.description,
    ...page.sections.map((section) =>
      [
        section.title,
        ...section.paragraphs,
        ...(section.list ?? []),
        ...(section.table?.rows.flat() ?? []),
      ].join(' '),
    ),
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 180));
}
