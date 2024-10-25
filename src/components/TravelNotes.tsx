import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPosts, Post, PageData } from "@/services/api"
import { TravelNotesSkeleton } from "./TravelNotesSkeleton"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export const TravelNotes = () => {
  const { ref, inView } = useInView()
  const { toast } = useToast()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery<PageData<Post>>({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isError) {
    toast({
      variant: "destructive",
      description: "加载游记失败，请稍后重试",
    })
  }

  if (isLoading) {
    return <TravelNotesSkeleton />
  }

  const allPosts = data?.pages.flatMap(page => page.items) || []

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="columns-2 gap-2 space-y-2">
        {allPosts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <Card className="mb-2 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
              />
              <div className="px-2 pt-4 pb-3">
                <h3 className="text-sm font-medium line-clamp-2 mb-4">
                  {post.title}
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <img src={post.author.avatar} alt={post.author.name} />
                    </Avatar>
                    <span className="text-xs text-gray-500">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div
        ref={ref}
        className="flex justify-center py-4"
      >
        {isFetchingNextPage && <TravelNotesSkeleton />}
      </div>
    </div>
  )
}