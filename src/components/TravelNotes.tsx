import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export const TravelNotes = () => {
  const notes = [
    {
      id: 1,
      title: "东京浅草寺｜绝美夜景与传统小吃的完美邂逅",
      image: "https://source.unsplash.com/800x600/?tokyo-temple",
      author: {
        name: "旅行达人",
        avatar: "https://source.unsplash.com/100x100/?portrait"
      },
      likes: 2341,
      comments: 89
    },
    {
      id: 2,
      title: "巴厘岛乌布｜隐藏在雨林中的网红秋千",
      image: "https://source.unsplash.com/800x600/?bali-swing",
      author: {
        name: "背包客",
        avatar: "https://source.unsplash.com/100x100/?face"
      },
      likes: 1892,
      comments: 156
    },
    {
      id: 3,
      title: "巴黎铁塔｜最浪漫的日落时分",
      image: "https://source.unsplash.com/800x600/?paris-eiffel",
      author: {
        name: "美食家",
        avatar: "https://source.unsplash.com/100x100/?woman"
      },
      likes: 3421,
      comments: 234
    }
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="overflow-hidden border-none shadow-sm">
            <img
              src={note.image}
              alt={note.title}
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
            <div className="p-2">
              <p className="text-sm font-medium line-clamp-2">{note.title}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <img src={note.author.avatar} alt={note.author.name} />
                  </Avatar>
                  <span className="text-xs text-gray-600">{note.author.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{note.likes}</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{note.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};