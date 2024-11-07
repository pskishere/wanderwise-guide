import { Post, PageData } from '@/types/post';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const titles = [
  "东京和服体验｜超详细攻略",
  "京都赏樱一日游记，感受春日浪漫",
  "大阪美食地图｜带你吃遍关西必打卡的美食",
  "北海道温泉之旅",
  "富士山下的春日物语｜河口湖一日游完全攻略"
];

export const fetchPosts = async (cursor?: number): Promise<PageData<Post>> => {
  await delay(1000);
  
  const pageSize = 10;
  const allPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    content: "这是一段旅行日记的内容描述...",
    images: [`https://picsum.photos/seed/${i + 1}/400/600`],
    image: `https://picsum.photos/seed/${i + 1}/400/600`, // For backwards compatibility
    author: {
      id: 1,
      name: "旅行者",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    stats: {
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      favorites: Math.floor(Math.random() * 500)
    },
    likes: Math.floor(Math.random() * 1000), // For backwards compatibility
    comments: Math.floor(Math.random() * 100), // For backwards compatibility
    tags: ["旅行", "日本"],
    createdAt: new Date().toISOString()
  }));

  const start = cursor || 0;
  const items = allPosts.slice(start, start + pageSize);
  const nextCursor = start + pageSize < allPosts.length ? start + pageSize : undefined;

  return { items, nextCursor };
};