import type { EntryFieldTypes, Asset } from 'contentful';
import { BLOCKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import type { BlogPost } from '../types';
import client, { previewClient } from './contentful';

// In-memory cache to avoid redundant API calls during a session
let cachedPosts: BlogPost[] | null = null;
let cachedPreviewPosts: BlogPost[] | null = null;

// Contentful content type skeleton
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
    meta: EntryFieldTypes.Text;   // SEO meta description
    body: EntryFieldTypes.RichText;
  };
}

// Map Contentful metadata tag IDs → display names
const TAG_MAP: Record<string, string> = {
  founderMindset: 'Founder Mindset',
  growth:         'Growth',
  product:        'Product',
  building:       'Building',
  lessons:        'Lessons',
  tech:           'Tech',
};

// Convert any string to a URL-safe slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // remove non-word chars except spaces and hyphens
    .trim()
    .replace(/[\s_]+/g, '-')    // replace spaces/underscores with hyphens
    .replace(/-+/g, '-');       // collapse multiple hyphens
}

// Extract image URL from a Contentful Asset
function getImageUrl(asset: unknown): string {
  const a = asset as Asset | undefined;
  const url = a?.fields?.file?.url;
  if (!url) return '';
  return typeof url === 'string' && url.startsWith('//') ? `https:${url}` : String(url);
}

// Map a Contentful entry to our BlogPost type
function mapEntry(item: {
  sys: { id: string; createdAt: string };
  metadata?: { tags?: Array<{ sys: { id: string } }> };
  fields: Record<string, unknown>;
}): BlogPost {
  const f = item.fields as {
    title?: string;
    slugs?: string;       // "slugs" in Contentful — may be title text, so we slugify it
    date?: string;
    category?: string;
    desc?: string;        // "desc" in Contentful
    image?: unknown;
    readTime?: string;
    featured?: boolean;
    author?: string;
    keywords?: string;
    meta?: string;        // "meta" in Contentful — SEO-only description
    body?: Document;
  };

  const title = f.title || 'Untitled';
  const rawSlug = f.slugs || title;
  const slug = slugify(rawSlug) || item.sys.id;

  // Read tags from Contentful metadata (the built-in taxonomy system)
  const tags = (item.metadata?.tags ?? [])
    .map(t => TAG_MAP[t.sys.id] ?? t.sys.id)
    .filter(Boolean);

  // Primary category badge = first tag, fallback to field or 'General'
  const category = tags[0] ?? f.category ?? 'General';

  return {
    slug,
    title,
    date: f.date || item.sys.createdAt,
    category,
    tags,
    excerpt: f.desc || '',
    metaDescription: f.meta || undefined,
    image: getImageUrl(f.image),
    readTime: f.readTime || '',
    featured: f.featured || false,
    author: f.author || 'Surya Narayan',
    keywords: f.keywords || '',
    content: f.body || { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
  };
}

// Fetch all blog posts, sorted by date (newest first)
export async function fetchAllPosts(preview = false): Promise<BlogPost[]> {
  if (!preview && cachedPosts) return cachedPosts;
  if (preview && cachedPreviewPosts) return cachedPreviewPosts;

  const activeClient = preview && previewClient ? previewClient : client;

  try {
    const res = await activeClient.getEntries<BlogPageEntrySkeleton>({
      content_type: 'blogPage',
      order: ['-sys.createdAt'],
      limit: 100,
    });

    const posts = res.items.map(mapEntry);
    // Sort by date field (newest first) since API ordering uses sys.createdAt
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (preview) cachedPreviewPosts = posts;
    else cachedPosts = posts;

    return posts;
  } catch (err) {
    console.error('Failed to fetch posts from Contentful:', err);
    return [];
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string, preview = false): Promise<BlogPost | undefined> {
  const posts = await fetchAllPosts(preview);
  return posts.find(p => p.slug === slug);
}

// Fetch featured posts
export async function fetchFeaturedPosts(preview = false): Promise<BlogPost[]> {
  const posts = await fetchAllPosts(preview);
  return posts.filter(p => p.featured);
}

// Fetch posts by category
export async function fetchPostsByCategory(category: string, preview = false): Promise<BlogPost[]> {
  const posts = await fetchAllPosts(preview);
  return posts.filter(p => p.category === category);
}

// Fetch all unique categories (from tags)
export async function fetchCategories(preview = false): Promise<string[]> {
  const posts = await fetchAllPosts(preview);
  return [...new Set(posts.flatMap(p => p.tags))];
}

// Invalidate cache (useful for preview/refresh)
export function invalidateCache(): void {
  cachedPosts = null;
  cachedPreviewPosts = null;
}
