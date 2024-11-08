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
      profiles:user_id (
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
      id: post.profiles.id,
      name: post.profiles.nickname,
      avatar: post.profiles.avatar
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