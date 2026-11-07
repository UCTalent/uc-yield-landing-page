export interface DocSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  code?: string;
  language?: string;
}

export interface DocPage {
  slug: string;
  group: string;
  title: string;
  description: string;
  sources: string[];
  notice?: string;
  sections: DocSection[];
}

export interface DocsContent {
  groups: { id: string; title: string }[];
  pages: DocPage[];
}

export interface DocSearchItem {
  href: string;
  title: string;
  description: string;
  group: string;
  text: string;
}
