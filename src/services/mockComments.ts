export const mockComments = [
  {
    id: 1,
    author: {
      name: "旅行达人",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
    },
    content: "这个地方真的太美了！请问具体位置在哪里呢？",
    time: "3小时前",
    likes: 42,
    replies: [
      {
        id: 11,
        author: {
          name: "作者",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
        },
        content: "在京都岚山地区，建议早上去人少~",
        time: "2小时前",
        likes: 12
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "美食家",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
    },
    content: "拍摄手法很专业！",
    time: "5小时前",
    likes: 28
  }
];