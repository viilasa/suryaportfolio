// Blog posts data - parsed from markdown files at build time
// Using a simple frontmatter parser that works in the browser

// Import all markdown files from the content/blogs directory
const blogModules = import.meta.glob('/content/blogs/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

// Simple frontmatter parser (browser-compatible)
const parseFrontmatter = (content) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content: content };
    }

    const frontmatterStr = match[1];
    const body = match[2];

    // Parse YAML-like frontmatter
    const data = {};
    frontmatterStr.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // Parse boolean
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            data[key] = value;
        }
    });

    return { data, content: body };
};

// Parse all blog posts
export const getAllPosts = () => {
    const posts = Object.entries(blogModules).map(([path, rawContent]) => {
        const { data, content } = parseFrontmatter(rawContent);
        const slug = path.replace('/content/blogs/', '').replace('.md', '');

        return {
            slug: data.slug || slug,
            ...data,
            content: content
        };
    });

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get a single post by slug
export const getPostBySlug = (slug) => {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug);
};

// Get featured posts
export const getFeaturedPosts = () => {
    return getAllPosts().filter(post => post.featured);
};

// Get posts by category
export const getPostsByCategory = (category) => {
    return getAllPosts().filter(post => post.category === category);
};

// Get all unique categories
export const getCategories = () => {
    const posts = getAllPosts();
    const categories = [...new Set(posts.map(post => post.category))];
    return categories;
};

export default {
    getAllPosts,
    getPostBySlug,
    getFeaturedPosts,
    getPostsByCategory,
    getCategories
};
