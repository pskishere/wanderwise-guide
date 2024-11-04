import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "ZARA 2024春季新款小香风粗花呢外套",
    price: "¥799",
    originalPrice: "¥999",
    description: "这是一款经典的小香风外套，采用高级粗花呢面料，手感柔软，保暖性能出色。",
    sales: "2.3k",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    ],
    shop: {
      name: "ZARA官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80"
    },
    tags: ["外套", "春装"],
    specs: [
      {
        name: "颜色",
        options: ["米白色", "黑色", "粉色"]
      },
      {
        name: "尺码",
        options: ["S", "M", "L", "XL"]
      }
    ]
  },
  {
    id: 2,
    title: "SK-II 神仙水精华液 230ml",
    price: "¥1599",
    sales: "5.1k",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    shop: {
      name: "SK-II官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1580000199018-64e587bcf5b7?w=200&q=80"
    },
    tags: ["护肤", "精华"],
    originalPrice: "¥1999",
    description: "经典护肤精华液，富含神仙水成分，深层滋润肌肤。",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      "https://images.unsplash.com/photo-1596007650459-589b183fd6c3?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 3,
    title: "Apple AirPods Pro 2代 主动降噪",
    price: "¥1799",
    sales: "8.8k",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
    shop: {
      name: "Apple官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1584514855720-840c3f4029e2?w=200&q=80"
    },
    tags: ["数码", "耳机"],
    originalPrice: "¥1999",
    description: "最新款AirPods Pro，支持主动噪声控制，音质更佳。",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
      "https://images.unsplash.com/photo-1600747757879-8c6f8cb4e61b?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 4,
    title: "星巴克 Pike Place 派克市场咖啡豆",
    price: "¥128",
    sales: "3.2k",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    shop: {
      name: "星巴克官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1554247049-d1a2c3a89e5e?w=200&q=80"
    },
    tags: ["咖啡", "进口"],
    originalPrice: "¥200",
    description: "来自华盛顿的经典咖啡豆，适合各种咖啡制备方法。",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
      "https://images.unsplash.com/photo-1601932627287-d0fc068d6913?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 5,
    title: "UNIQLO 设计师联名款印花T恤",
    price: "¥199",
    sales: "6.7k", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    shop: {
      name: "优衣库官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1597464858801-ff8ba071c5e7?w=200&q=80"
    },
    tags: ["服饰", "T恤"],
    originalPrice: "¥299",
    description: "设计师联名款，时尚印花设计，舒适面料。",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1603533711709-19e9405a1ab3?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 6,
    title: "蒂佳婷 DR.JART+ 补水面膜",
    price: "¥169",
    sales: "4.5k",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&q=80",
    shop: {
      name: "DR.JART+海外旗舰店",
      avatar: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=200&q=80"
    },
    tags: ["面膜", "护肤"],
    originalPrice: "¥230",
    description: "深层补水，舒缓敏感肌肤，适合各种肤质。",
    images: [
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&q=80",
      "https://images.unsplash.com/photo-1567721917510-0f6590a75c4e?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 7,
    title: "NIKE Air Force 1 经典小白鞋",
    price: "¥799",
    sales: "9.9k",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    shop: {
      name: "NIKE官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=80"
    },
    tags: ["运动", "鞋履"],
    originalPrice: "¥999",
    description: "经典款式，舒适设计，百搭之选。",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1584863645464-ab0497232784?w=800&q=80"
    ],
    specs: []
  },
  {
    id: 8,
    title: "无印良品 MUJI 简约双肩包",
    price: "¥299",
    sales: "7.8k",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    shop: {
      name: "MUJI无印良品旗舰店",
      avatar: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80"
    },
    tags: ["包包", "日系"],
    originalPrice: "¥399",
    description: "简约设计，轻便舒适，适合日常使用。",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1588101017976-ef99c3d2213b?w=800&q=80"
    ],
    specs: []
  }
];
