import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TravelGuides = () => {
  const guides = [
    {
      id: 1,
      title: "东京3日游完全攻略",
      author: "旅行达人",
      date: "2024-02-20",
      image: "https://source.unsplash.com/800x600/?tokyo-street"
    },
    {
      id: 2,
      title: "巴厘岛深度游攻略",
      author: "背包客",
      date: "2024-02-19",
      image: "https://source.unsplash.com/800x600/?bali-beach"
    },
    {
      id: 3,
      title: "巴黎必去景点推荐",
      author: "美食家",
      date: "2024-02-18",
      image: "https://source.unsplash.com/800x600/?paris-street"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">最新攻略</h2>
        <Button variant="outline">查看更多</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-xl">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{guide.author}</span>
                <span>{guide.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};