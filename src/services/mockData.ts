export const posts = [
  {
    id: "1",
    title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
    content: "今天给大家分享一下京都和服体验！和服体验是来日本旅游必打卡的项目之一，可以说是来日本旅游的必备体验。今天我就给大家详细介绍一下在京都体验和服的全过程，包括选择店铺、预约方式、价格、穿着过程等等...",
    author: {
      name: "樱花妹",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    likes: 3421,
    comments: [
      {
        id: 1,
        author: {
          name: "旅行达人",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
        },
        content: "太详细了！请问预约是在哪个网站呢？",
        time: "2小时前",
        likes: 45,
        replies: [
          {
            id: 3,
            author: {
              name: "樱花妹",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
            },
            content: "可以直接在官网预约哦，我待会发链接给你~",
            time: "1小时前",
            likes: 12
          }
        ]
      }
    ],
    tags: ["旅行", "日本", "京都", "和服"]
  }
];