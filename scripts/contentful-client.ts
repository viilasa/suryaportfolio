import 'dotenv/config';
import { createClient } from 'contentful';
import type { EntryFieldTypes, Asset } from 'contentful';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import type { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
});

export default client;

interface BlogPageEntrySkeleton {
  contentTypeId: 'blogPage';
  fields: {
    title: EntryFieldTypes.Text;
    slugs: EntryFieldTypes.Text;      // field is named "slugs" in Contentful
    date: EntryFieldTypes.Text;
    category: EntryFieldTypes.Text;
    desc: EntryFieldTypes.Text;       // field is named "desc" in Contentful
    image: EntryFieldTypes.AssetLink;
    readTime: EntryFieldTypes.Text;
    featured: EntryFieldTypes.Boolean;
    author: EntryFieldTypes.Text;
    keywords: EntryFieldTypes.Text;
    body: EntryFieldTypes.RichText;
  };
}

const TAG_MAP: Record<string, string> = {
  founderMindset: 'Founder Mindset',
  growth:         'Growth',
  product:        'Product',
  building:       'Building',
  lessons:        'Lessons',
  tech:           'Tech',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function getImageUrl(asset: unknown): string {
  const a = asset as Asset | undefined;
  const url = a?.fields?.file?.url;
  if (!url) return '';
  return typeof url === 'string' && url.startsWith('//') ? `https:${url}` : String(url);
}

export interface ScriptBlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string;
  readTime: string;
  featured: boolean;
  author: string;
  keywords: string;
  plainTextContent: string;
}

export async function fetchAllPosts(): Promise<ScriptBlogPost[]> {
  const res = await client.getEntries<BlogPageEntrySkeleton>({
    content_type: 'blogPage',
    order: ['-sys.createdAt'],
    limit: 100,
  });

  return res.items.map(item => {
    const f = item.fields as {
      title?: string;
      slugs?: string;
      date?: string;
      category?: string;
      desc?: string;
      image?: unknown;
      readTime?: string;
      featured?: boolean;
      author?: string;
      keywords?: string;
      body?: Document;
    };

    const meta = (item as unknown as { metadata?: { tags?: Array<{ sys: { id: string } }> } }).metadata;
    const tags = (meta?.tags ?? []).map(t => TAG_MAP[t.sys.id] ?? t.sys.id).filter(Boolean);

    const title = f.title || 'Untitled';
    const rawSlug = f.slugs || title;
    const slug = slugify(rawSlug) || item.sys.id;
    const category = tags[0] ?? f.category ?? 'General';

    return {
      slug,
      title,
      date: f.date || item.sys.createdAt,
      category,
      tags,
      excerpt: f.desc || '',
      image: getImageUrl(f.image),
      readTime: f.readTime || '',
      featured: f.featured || false,
      author: f.author || 'Surya Narayan',
      keywords: f.keywords || '',
      plainTextContent: f.body ? documentToPlainTextString(f.body) : '',
    };
  });
}
