import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { TravelNotesSkeleton } from "./TravelNotesSkeleton"
import { useState, useEffect } from "react"

export const TravelNotes = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <TravelNotesSkeleton />
  }

  const notes = [
    {
      id: 1,
      title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      author: {
        name: "樱花妹",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      likes: 3421,
      comments: 234
    },
    {
      id: 2,
      title: "巴厘岛乌布皇宫｜隐藏在热带雨林中的绝美秘境",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      author: {
        name: "旅行小菌",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80"
      },
      likes: 2892,
      comments: 156
    },
    {
      id: 3,
      title: "曼谷网红餐厅｜超高性价比的米其林餐厅推荐",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      author: {
        name: "美食探店",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80"
      },
      likes: 4567,
      comments: 345
    },
    {
      id: 4,
      title: "马尔代夫｜漂浮早餐&水下餐厅，蜜月天堂",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      author: {
        name: "蜜月旅行",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
      },
      likes: 6789,
      comments: 432
    },
    {
      id: 5,
      title: "巴黎铁塔｜绝美日落时分，教你拍出ins风照片",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80",
      author: {
        name: "摄影师小K",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&q=80"
      },
      likes: 5432,
      comments: 321
    },
    {
      id: 6,
      title: "迪拜帆船酒店｜奢华下午茶体验，性价比超高",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      author: {
        name: "探店达人",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
      },
      likes: 3678,
      comments: 267
    }
  ]

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="columns-2 gap-2 space-y-2">
        {notes.map((note) => (
          <Card key={note.id} className="mb-2 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <img
                src={note.image}
                alt={note.title}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium line-clamp-2 leading-snug mb-4">
                {note.title}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <img src={note.author.avatar} alt={note.author.name} className="object-cover" />
                  </Avatar>
                  <span className="text-xs text-gray-600">{note.author.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs text-gray-500">{note.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs text-gray-500">{note.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
