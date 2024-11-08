import React from 'react';
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
      <PenLine className="w-10 h-10 text-pink-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">还没有笔记</h3>
    <p className="text-gray-500 text-center mb-6">
      记录旅行中的精彩时刻，分享你的所见所闻
    </p>
    <Link to="/create-post">
      <Button className="rounded-full bg-pink-500 hover:bg-pink-600">
        开始写笔记
      </Button>
    </Link>
  </div>
);