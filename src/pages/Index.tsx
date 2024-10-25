import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plane, Map, Hotel, Search } from "lucide-react";
import { PopularDestinations } from "@/components/PopularDestinations";
import { TravelGuides } from "@/components/TravelGuides";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">探索世界的每个角落</h1>
          <p className="text-xl mb-8 text-center">发现令人惊叹的目的地，获取专业的旅游攻略</p>
          <div className="flex w-full max-w-md gap-2 bg-white p-2 rounded-lg">
            <Input placeholder="搜索目的地..." className="flex-1" />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              搜索
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Plane className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>精选路线</CardTitle>
              <CardDescription>探索专业规划的旅游路线</CardDescription>
            </CardHeader>
            <CardContent>
              发现最受欢迎的旅游路线，让您的旅程更加完美。
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>目的地指南</CardTitle>
              <CardDescription>详尽的目的地攻略</CardDescription>
            </CardHeader>
            <CardContent>
              获取最新的目的地信息，包括美食、景点和文化体验。
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Hotel className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>住宿推荐</CardTitle>
              <CardDescription>精选优质住宿</CardDescription>
            </CardHeader>
            <CardContent>
              从经济实惠到豪华享受，找到最适合您的住宿选择。
            </CardContent>
          </Card>
        </div>
      </div>

      <PopularDestinations />
      <TravelGuides />
    </div>
  );
};

export default Index;