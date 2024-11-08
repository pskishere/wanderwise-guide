import React from 'react';
import { Navigation } from "@/components/Navigation";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserPosts, useDeletePost } from "@/hooks/useUserPosts";
import { PostCard } from "@/components/profile/PostCard";
import { EmptyState } from "@/components/profile/EmptyState";

const UserPosts: React.FC = () => {
  const { 
    data, 
    isLoading,
    isError, 
    fetchNextPage, 
    hasNextPage,
    refetch 
  } = useUserPosts();

  const deletePost = useDeletePost();

  const handleDelete = async (id: number) => {
    const success = await deletePost(id);
    if (success) {
      refetch();
    }
  };

  const allItems = data?.pages.flatMap(page => page.items) || [];
  const isEmpty = !isLoading && allItems.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">我的笔记</h1>
          <Link to="/create-post">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-pink-200 text-pink-500 hover:bg-pink-50"
            >
              <PenLine className="w-4 h-4 mr-1" />
              写笔记
            </Button>
          </Link>
        </div>
        
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allItems.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {hasNextPage && (
          <div className="mt-8 text-center">
            <Button onClick={() => fetchNextPage()} disabled={isLoading}>
              {isLoading ? '加载中...' : '加载更多'}
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default UserPosts;