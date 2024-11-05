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
        likes: 12,
        replies: [
          {
            id: 111,
            author: {
              name: "旅行达人",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
            },
            content: "谢谢分享！我下个月就去京都，一定要去看看",
            time: "1小时前",
            likes: 5
          }
        ]
      },
      {
        id: 12,
        author: {
          name: "摄影师小王",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&q=80"
        },
        content: "请问用什么相机拍摄的呢？照片很清晰",
        time: "1小时前",
        likes: 8
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "美食家",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
    },
    content: "拍摄手法很专业！构图很棒",
    time: "5小时前",
    likes: 28,
    replies: [
      {
        id: 21,
        author: {
          name: "作者",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
        },
        content: "谢谢夸奖，我也是在学习中~",
        time: "4小时前",
        likes: 6
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "小明",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&q=80"
    },
    content: "好想去日本旅游，攻略写得很详细，收藏了！",
    time: "6小时前",
    likes: 15,
    replies: [
      {
        id: 31,
        author: {
          name: "作者",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
        },
        content: "谢谢支持，后续会更新更多日本旅游攻略~",
        time: "5小时前",
        likes: 3
      },
      {
        id: 32,
        author: {
          name: "旅行爱好者",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80"
        },
        content: "我也想去！一起约起来",
        time: "4小时前",
        likes: 2
      },
      {
        id: 33,
        author: {
          name: "小红",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80"
        },
        content: "求一起组队！",
        time: "3小时前",
        likes: 1
      }
    ]
  }
];