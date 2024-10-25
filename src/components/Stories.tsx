import { Avatar } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const stories = [
  {
    id: 1,
    name: "东京探店",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&q=80",
  },
  {
    id: 2,
    name: "巴厘岛游记",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&q=80",
  },
  {
    id: 3,
    name: "美食推荐",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&q=80",
  },
  {
    id: 4,
    name: "酒店探店",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&q=80",
  },
  {
    id: 5,
    name: "购物攻略",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&q=80",
  },
]

export const Stories = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1">
            <Avatar className="h-16 w-16 ring-2 ring-pink-500 ring-offset-2">
              <img src={story.image} alt={story.name} className="object-cover" />
            </Avatar>
            <span className="text-xs">{story.name}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}