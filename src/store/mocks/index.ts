export const mockUsers = [
  {
    id: 1,
    name: "旅行达人",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80",
    userId: "xiaohongshu001",
    nickname: "环球旅行家",
    bio: "带你发现世界各地的美景和美食",
    isAdmin: false
  },
  {
    id: 2,
    name: "美食家",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80",
    userId: "xiaohongshu002",
    nickname: "寻味人生",
    bio: "探索世界各地的美食文化",
    isAdmin: false
  }
];

export const mockFollowers = [
  {
    id: 1,
    name: "美食家",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    bio: "探索舌尖上的美味",
    isFollowing: false
  }
];

export const mockFollowing = [
  {
    id: 1,
    name: "旅行达人",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    bio: "分享旅行中的美好时刻",
    isFollowing: true
  }
];

export const mockPosts = [
  {
    id: 1,
    title: "京都和服体验｜超详细攻略",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    author: {
      name: "樱花妹",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
    },
    likes: 3456
  }
];