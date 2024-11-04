import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Image } from "@/components/ui/image"
import { Eye, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminPostsProps {
  posts: any[]
}

export const AdminPosts = ({ posts }: AdminPostsProps) => {
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    toast({
      description: "帖子已删除",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>封面</TableHead>
            <TableHead>标题</TableHead>
            <TableHead>作者</TableHead>
            <TableHead>点赞数</TableHead>
            <TableHead>评论数</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Image 
                  src={post.image} 
                  alt={post.title}
                  className="h-12 w-12 object-cover rounded"
                />
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="truncate">{post.title}</p>
              </TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>{post.likes}</TableCell>
              <TableCell>{post.comments}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="h-4 w-4 mr-1" />
                  查看
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}