import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

interface PostContentProps {
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}

export const PostContent = ({ title, content, author, tags }: PostContentProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-12 w-12 ring-2 ring-pink-500/20">
          <img src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-base">{author.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">2024-02-20</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full px-6 border-pink-500 text-pink-500 hover:bg-pink-50"
        >
          关注
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-bold leading-relaxed">{title}</h1>
        <p className="text-gray-700 text-base leading-relaxed">
          {content}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}