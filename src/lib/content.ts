/*
  Lightweight markdown content loader using Vite's import.meta.glob.
  - Uses simple frontmatter parsing (--- ... ---) with key: value lines.
  - Supports tags inline: tags: [tag1, tag2]
  - Draft items (draft: true) are filtered out from lists.
*/

export type ContentMeta = {
  title: string;
  date?: string;
  tags?: string[];
  summary?: string;
  draft?: boolean;
  image?: string;
  location?: string;
};

export type ContentItem = {
  slug: string;
  meta: ContentMeta;
  body: string;
  readingTimeMin: number;
};

type FrontmatterParse = { meta: ContentMeta; body: string };

function parseFrontmatter(md: string): FrontmatterParse {
  const fmMatch = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) {
    // No frontmatter; attempt to infer title from first heading
    const titleMatch = md.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled";
    return { meta: { title }, body: md.trim() };
  }
  const raw = fmMatch[1];
  const body = md.slice(fmMatch[0].length).trim();
  const meta: Record<string, unknown> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      // very simple list parser: [a, b, c]
      const inner = value.slice(1, -1).trim();
      meta[key] = inner
        ? inner.split(',').map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        : [];
      continue;
    }
    if (/^(true|false)$/i.test(value)) {
      meta[key] = /^true$/i.test(value);
      continue;
    }
    // Keep as string by default
    meta[key] = value;
  }
  if (!meta.title) {
    const titleMatch = body.match(/^#\s+(.+)$/m);
    if (titleMatch) meta.title = String(titleMatch[1]).trim();
  }
  return { meta: meta as ContentMeta, body };
}

function calcReadingTimeMin(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function makeSlugFromPath(path: string): string {
  // path like /src/content/articles/example-article.md
  const base = path.split('/').pop() || path;
  return base.replace(/\.(md|mdx)$/i, '');
}

function summarize(body: string, fallback?: string): string {
  if (fallback && fallback.trim()) return fallback.trim();
  // Take first non-empty paragraph
  const paras = body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const first = paras[0] || '';
  // Limit to ~220 chars
  return first.length > 220 ? first.slice(0, 217) + '…' : first;
}

function buildFromFiles(files: Record<string, string>) {
  const index: Record<string, ContentItem> = {};
  for (const [path, raw] of Object.entries(files)) {
    const slug = makeSlugFromPath(path);
    const { meta, body } = parseFrontmatter(raw);
    const readingTimeMin = calcReadingTimeMin(body);
    index[slug] = { slug, meta, body, readingTimeMin };
  }
  const list = Object.values(index)
    .filter((item) => !item.meta.draft)
    .sort((a, b) => {
      const ad = a.meta.date ? Date.parse(a.meta.date) : 0;
      const bd = b.meta.date ? Date.parse(b.meta.date) : 0;
      return bd - ad;
    })
    .map((item) => ({
      ...item,
      meta: {
        ...item.meta,
        summary: summarize(item.body, item.meta.summary),
      },
    }));
  return { index, list };
}

// Articles collection
const articleFiles = import.meta.glob<string>('/src/content/articles/**/*.md', { query: '?raw', import: 'default', eager: true });
const { index: articlesIndex, list: articlesList } = buildFromFiles(articleFiles);
// Sidequests collection
const sidequestFiles = import.meta.glob<string>('/src/content/sidequests/**/*.md', { query: '?raw', import: 'default', eager: true });
const { index: sidequestsIndex, list: sidequestsList } = buildFromFiles(sidequestFiles);

export const articles = articlesList;
export const articlesBySlug = articlesIndex;

export const sidequests = sidequestsList;
export const sidequestsBySlug = sidequestsIndex;

