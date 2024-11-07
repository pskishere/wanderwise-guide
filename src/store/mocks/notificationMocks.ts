export const mockNotifications = [
  {
    id: 1,
    type: "like" as const,
    content: "小明赞了你的游记《东京美食探店》",
    time: "2分钟前",
    isRead: false,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    targetId: 1
  },
  {
    id: 2,
    type: "comment" as const,
    content: "小红评论了你的游记：好详细的攻略，收藏了！",
    time: "1小时前",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    targetId: 2
  },
  {
    id: 3,
    type: "follow" as const,
    content: "旅行达人关注了你",
    time: "2小时前",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
    targetId: 3
  }
];