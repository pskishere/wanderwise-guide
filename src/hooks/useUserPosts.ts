import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PostItem {
  id: number;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
}

interface PostsResponse {
  items: PostItem[];
  nextPage: number | null;
}

const fetchUserPosts = async ({ pageParam = 1 }): Promise<PostsResponse> => {
  const itemsPerPage = 10;
  const start = (pageParam - 1) * itemsPerPage;

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      images,
      profiles:user_id (
        nickname,
        avatar
      ),
      likes (count)
    `)
    .range(start, start + itemsPerPage - 1)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const items = data.map(post => ({
    id: post.id,
    title: post.title,
    image: post.images[0],
    author: {
      name: post.profiles.nickname,
      avatar: post.profiles.avatar
    },
    likes: post.likes?.[0]?.count || 0
  }));

  return {
    items,
    nextPage: items.length === itemsPerPage ? pageParam + 1 : null
  };
};

export const useUserPosts = () => {
  return useInfiniteQuery({
    queryKey: ['user-posts'],
    queryFn: fetchUserPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useDeletePost = () => {
  return async (id: number) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        description: "笔记已删除",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "删除失败，请重试",
      });
      
      return false;
    }
  };
};