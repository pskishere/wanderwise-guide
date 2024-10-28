import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle, Heart } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { TravelNotesSkeleton } from "./TravelNotesSkeleton"

interface TravelNote {
  id: number
  title: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
}

export const TravelNotes = () => {
  const { data: notes, isLoading } = useQuery<TravelNote[]>({
    queryKey: ["travel-notes"],
    queryFn: () =>
      Promise.resolve([
        {
          id: 1,
          title: "日本购物退税攻略｜超详细步骤说明与注意事项",
          image: "https://source.unsplash.com/800x600/?japan-shopping",
          author: {
            name: "旅行者",
            avatar: "https://source.unsplash.com/100x100/?portrait",
          },
          likes: 555,
          comments: 62,
        },
        {
          id: 2,
          title: "奈良小鹿公园半日游，与萌鹿的悠闲午后时光",
          image: "https://source.unsplash.com/800x600/?nara-deer",
          author: {
            name: "旅行者",
            avatar: "https://source.unsplash.com/100x100/?portrait",
          },
          likes: 758,
          comments: 13,
        },
      ]),
  })

  if (isLoading) {
    return <TravelNotesSkeleton />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
      {notes?.map((note) => (
        <Card
          key={note.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white"
        >
          <div className="aspect-[4/3]">
            <img
              src={note.image}
              alt={note.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium line-clamp-2 mb-2 text-sm">
              {note.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <img
                    src={note.author.avatar}
                    alt={note.author.name}
                    className="object-cover"
                  />
                </Avatar>
                <span className="text-sm text-gray-600">{note.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{note.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{note.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}