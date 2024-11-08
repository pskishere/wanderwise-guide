import { Post, PageData } from '@/types/post';
import { supabase } from "@/integrations/supabase/client";

export const fetchPosts = async (cursor?: number): Promise<PageData<Post>> => {
  const pageSize = 10;
  const start = cursor || 0;
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      images,
      tags,
      created_at,
      profiles!posts_user_id_fkey (
        id,
        nickname,
        avatar
      ),
      likes (count),
      comments (count)
    `)
    .range(start, start + pageSize - 1)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const items = data.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    images: post.images,
    image: post.images[0], // For backwards compatibility
    author: {
      id: post.profiles?.id || '',
      name: post.profiles?.nickname || 'Unknown User',
      avatar: post.profiles?.avatar || ''
    },
    stats: {
      likes: post.likes?.[0]?.count || 0,
      comments: post.comments?.[0]?.count || 0,
      favorites: 0 // TODO: Add favorites count when needed
    },
    likes: post.likes?.[0]?.count || 0, // For backwards compatibility
    comments: post.comments?.[0]?.count || 0, // For backwards compatibility
    tags: post.tags,
    createdAt: post.created_at
  }));

  const nextCursor = items.length === pageSize ? start + pageSize : undefined;

  return { items, nextCursor };
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      images,
      tags,
      location,
      created_at,
      profiles!posts_user_id_fkey (
        id,
        nickname,
        avatar
      ),
      likes (count),
      comments (count),
      favorites (count)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;

  if (!data) throw new Error('Post not found');

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    images: data.images,
    author: {
      id: data.profiles.id,
      name: data.profiles.nickname || 'Unknown User',
      avatar: data.profiles.avatar || ''
    },
    stats: {
      likes: data.likes?.[0]?.count || 0,
      comments: data.comments?.[0]?.count || 0,
      favorites: data.favorites?.[0]?.count || 0
    },
    tags: data.tags,
    location: data.location,
    createdAt: data.created_at
  };
};