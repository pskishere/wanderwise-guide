import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-blue-600">旅游攻略</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">首页</Button>
            <Button variant="ghost">目的地</Button>
            <Button variant="ghost">攻略</Button>
            <Button variant="ghost">社区</Button>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              登录
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};