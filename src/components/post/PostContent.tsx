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
    <div className="p-4 relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10 ring-2 ring-pink-500/20">
          <img src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{author.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">2024-02-20</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full px-4 border-pink-500 text-pink-500 hover:bg-pink-50 text-xs"
        >
          关注
        </Button>
      </div>

      <div className="space-y-3">
        <h1 className="text-lg font-bold leading-relaxed">{title}</h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          {content}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}