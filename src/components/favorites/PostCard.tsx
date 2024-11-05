import React, { useState } from "react"; // Import useState here
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
}

export const PostCard = ({ id, title, image, author, likes }: PostCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Link to={`/posts/${id}`}>
      <Card className="mb-4 break-inside-avoid overflow-hidden border-none shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">图片加载失败</span>
            </div>
          )}
        </div>
        <div className="px-2 pt-4 pb-3">
          <h3 className="text-sm font-medium line-clamp-2 mb-4">{title}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs text-gray-500">{author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};