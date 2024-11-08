import { useInfiniteQuery } from "@tanstack/react-query";
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
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    items: [
      {
        id: 1,
        title: "京都和服体验｜超详细攻略",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        author: {
          name: "樱花妹",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
        },
        likes: 3456
      },
      // ... 其他帖子数据
    ],
    nextPage: pageParam < 3 ? pageParam + 1 : null
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
      // Mock API call for delete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        description: "笔记已删除",
      });
      
      // Return true to indicate successful deletion
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "删除失败，请重试",
      });
      
      // Return false to indicate failed deletion
      return false;
    }
  };
};