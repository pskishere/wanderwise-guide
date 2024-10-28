import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { TravelNotesSkeleton } from "./TravelNotesSkeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

interface TravelNote {
  id: number
  title: string
  content: string
  image: string
  likes: number
  comments: number
  author: {
    name: string
    avatar: string
  }
}

const fetchTravelNotes = async ({ pageParam = 1 }) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const notes = Array.from({ length: 10 }, (_, i) => ({
    id: pageParam * 10 + i,
    title: "京都和服体验｜超详细攻略",
    content: "今天给大家分享一下京都和服体验！和服体验是来日本旅游必打卡的项目之一...",
    image: `https://images.unsplash.com/photo-${1528360983277 + i}-13d401cdc186?w=800&q=80`,
    likes: 3421 + i,
    comments: 234 + i,
    author: {
      name: "樱花妹",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    }
  }))

  return {
    items: notes,
    nextPage: pageParam + 1,
    hasMore: pageParam < 3
  }
}

interface TravelNotesProps {
  viewMode?: "grid" | "list"
}

export const TravelNotes = ({ viewMode = "grid" }: TravelNotesProps) => {
  const { ref, inView } = useInView()

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['travelNotes'],
    queryFn: fetchTravelNotes,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allNotes = data?.pages.flatMap(page => page.items) || []

  if (isLoading) {
    return <TravelNotesSkeleton viewMode={viewMode} />
  }

  return (
    <>
      <div className={`grid gap-4 ${
        viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {allNotes.map((note) => (
          <Link to={`/posts/${note.id}`} key={note.id}>
            <Card className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${
              viewMode === "list" ? "flex gap-4" : ""
            }`}>
              <div className={viewMode === "list" ? "w-48 shrink-0" : ""}>
                <img
                  src={note.image}
                  alt={note.title}
                  className={`w-full object-cover ${
                    viewMode === "list" ? "h-32" : "aspect-[4/3]"
                  }`}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-2 mb-2">{note.title}</h3>
                {viewMode === "list" && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {note.content}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <img src={note.author.avatar} alt={note.author.name} />
                    </Avatar>
                    <span className="text-sm text-gray-500">{note.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
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
          </Link>
        ))}
      </div>

      <div
        ref={ref}
        className="flex justify-center py-8"
      >
        {isFetchingNextPage && (
          <TravelNotesSkeleton viewMode={viewMode} count={3} />
        )}
      </div>
    </>
  )
}