import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPosts, Post, PageData } from "@/services/api"
import { TravelNotesSkeleton } from "./TravelNotesSkeleton"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "./ui/skeleton"

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
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {allPosts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Card className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="relative">
              <ImageWithSkeleton src={post.image} alt={post.title} />
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium line-clamp-2 mb-4 leading-snug">
                {post.title}
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <img src={post.author.avatar} alt={post.author.name} />
                  </Avatar>
                  <span className="text-sm text-gray-600">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}

      <div
        ref={ref}
        className="col-span-full flex justify-center py-4"
      >
        {isFetchingNextPage && <TravelNotesSkeleton />}
      </div>
    </div>
  )
}

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <Skeleton className="w-full aspect-[3/4] absolute inset-0" />
      )}
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        onLoad={() => setIsLoading(false)}
        style={{ minHeight: isLoading ? '300px' : 'auto' }}
      />
    </>
  )
}
