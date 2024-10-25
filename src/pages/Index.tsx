import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle, Share2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { TravelNotes } from "@/components/TravelNotes";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex w-full gap-2">
            <Input 
              placeholder="搜索目的地、美食、攻略..." 
              className="flex-1 bg-gray-100"
              prefix={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <Button variant="outline" className="rounded-full whitespace-nowrap">全部</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">旅行</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">美食</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">酒店</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">购物</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">文化</Button>
        </div>
      </div>

      <TravelNotes />
    </div>
  );
};

export default Index;