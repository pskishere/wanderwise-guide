import { useParams } from "react-router-dom"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { Navigation } from "@/components/Navigation"

const PostDetail = () => {
  const { id } = useParams()
  
  // 模拟帖子数据
  const post = {
    id: 1,
    title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
    content: `来到京都，体验和服是必不可少的环节。本篇攻略将为大家详细介绍和服体验的全过程。

首先要选择合适的和服店。我推荐位于祇园区的"京都和服体验馆"，他们家的和服款式多样，工作人员也都会说中文。

预约建议提前3天，旺季要提前一周。价格从3000日元起，包含和服租赁、专业搭配、发型设计等服务。

穿和服的过程大约需要45分钟。建议选择舒适的款式，因为要穿着步行好几个小时。拍照地点推荐：清水寺、二年坂、三年坂等古街。

小贴士：
1. 穿和服前不要吃太饱
2. 建议选择平底的日式木屐
3. 夏天选择浴衣会更舒适
4. 记得带充电宝，拍照很耗电

希望这篇攻略对大家有帮助！`,
    images: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?w=800&q=80",
    ],
    author: {
      name: "樱花妹",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    likes: 3421,
    comments: [
      {
        id: 1,
        author: {
          name: "旅行者A",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80"
        },
        content: "非常详细的攻略，请问价格是否包含妆容？",
        time: "2小时前"
      },
      {
        id: 2,
        author: {
          name: "小明",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80"
        },
        content: "已收藏！下个月去京都一定要体验一下",
        time: "3小时前"
      }
    ],
    publishTime: "2024-02-20"
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <Card className="overflow-hidden">
          {/* 帖子标题 */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Avatar className="h-8 w-8">
                <img src={post.author.avatar} alt={post.author.name} className="object-cover" />
              </Avatar>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.publishTime}</div>
              </div>
            </div>
          </div>

          {/* 图片轮播 */}
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {post.images.map((image, index) => (
                <div key={index} className="flex-none w-full snap-center">
                  <img src={image} alt="" className="w-full aspect-[4/3] object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 帖子内容 */}
          <div className="p-4">
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                <Heart className="h-6 w-6" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                <MessageCircle className="h-6 w-6" />
                <span>{post.comments.length}</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* 评论区 */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">评论 {post.comments.length}</h2>
          <div className="space-y-4">
            {post.comments.map(comment => (
              <Card key={comment.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <img src={comment.author.avatar} alt={comment.author.name} className="object-cover" />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-gray-500">{comment.time}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail