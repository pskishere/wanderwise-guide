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
import { useDispatch } from "react-redux"
import { deletePost } from "@/store/postSlice"
import { useNavigate } from "react-router-dom"

interface AdminPostsProps {
  posts: any[]
}

export const AdminPosts = ({ posts }: AdminPostsProps) => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    dispatch(deletePost(id))
    toast({
      description: "帖子已删除",
    })
  }

  const handleView = (id: number) => {
    navigate(`/posts/${id}`)
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => handleView(post.id)}
                >
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