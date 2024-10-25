import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PopularDestinations = () => {
  const destinations = [
    { id: 1, name: "巴厘岛", image: "https://source.unsplash.com/800x600/?bali", description: "印尼最受欢迎的旅游胜地" },
    { id: 2, name: "东京", image: "https://source.unsplash.com/800x600/?tokyo", description: "现代与传统交融的大都市" },
    { id: 3, name: "巴黎", image: "https://source.unsplash.com/800x600/?paris", description: "浪漫之都，艺术的殿堂" },
    { id: 4, name: "马尔代夫", image: "https://source.unsplash.com/800x600/?maldives", description: "梦幻般的海岛天堂" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">热门目的地</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{destination.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{destination.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};