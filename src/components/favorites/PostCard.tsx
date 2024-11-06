import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface PostCardProps {
  post: {
    id: number
    title: string
    content: string
    image: string
    author: {
      name: string
      avatar: string
    }
    likes: number
  }
}

export const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate()
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <div className="p-4 flex gap-4">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="font-medium line-clamp-2">{post.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{post.content}</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <img src={post.author.avatar} alt={post.author.name} />
            </Avatar>
            <span className="text-sm text-gray-500">{post.author.name}</span>
            <div className="flex items-center gap-1 ml-auto">
              <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
              <span className="text-sm text-gray-500">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}