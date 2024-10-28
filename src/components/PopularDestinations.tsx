import { Card } from "@/components/ui/card"

export const PopularDestinations = () => {
  const destinations = [
    { id: 1, name: "东京", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&q=80" },
    { id: 2, name: "巴厘岛", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&q=80" },
    { id: 3, name: "巴黎", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&q=80" },
  ]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-medium mb-3">热门目的地</h2>
      <div className="space-y-3">
        {destinations.map((destination) => (
          <Card 
            key={destination.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium">{destination.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}