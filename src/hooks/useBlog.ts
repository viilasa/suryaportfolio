import { useState, useEffect } from 'react';
import type { BlogPost } from '../types';
import { fetchAllPosts, fetchPostBySlug, fetchCategories } from '../utils/blogLoader';

interface UseAllPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

interface UsePostResult {
  post: BlogPost | undefined;
  loading: boolean;
  error: string | null;
}

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
}

export function useAllPosts(): UseAllPostsResult {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllPosts()
      .then(data => {
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch posts');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { posts, loading, error };
}

export function usePostBySlug(slug: string): UsePostResult {
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPostBySlug(slug)
      .then(data => {
        if (!cancelled) {
          setPost(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch post');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCategories()
      .then(data => {
        if (!cancelled) {
          setCategories(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch categories');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
