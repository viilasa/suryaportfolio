import { defineCollection, z } from 'astro:content';

const blogs = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.string(),
        image: z.string(),
        category: z.string(),
        readTime: z.string().optional(),
        keywords: z.string().optional(),
        author: z.string().optional().default('Surya Narayan'),
    }),
});

export const collections = {
    blogs,
};
