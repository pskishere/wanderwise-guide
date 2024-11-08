import { Product } from "@/types/product"

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "日本和服浴衣套装",
    price: 299,
    originalPrice: 399,
    description: "传统日式和服，适合各种传统场合穿着",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?w=800&q=80",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
    ],
    shop: {
      id: 1,
      name: "日本传统服饰店",
      avatar: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=100&h=100&q=80"
    },
    tags: ["和服", "日本", "传统服饰"],
    specs: [
      {
        name: "尺码",
        options: ["S", "M", "L", "XL"]
      },
      {
        name: "颜色",
        options: ["红色", "蓝色", "黑色"]
      }
    ]
  },
  {
    id: 2,
    title: "抹茶点心礼盒",
    price: 129,
    originalPrice: 159,
    description: "精选抹茶制作的日式点心礼盒",
    images: [
      "https://images.unsplash.com/photo-1545221855-ed3cb9a419c0?w=800&q=80",
      "https://images.unsplash.com/photo-1545221855-6f4cb8d8a48f?w=800&q=80"
    ],
    shop: {
      id: 2,
      name: "京都茶屋",
      avatar: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=100&h=100&q=80"
    },
    tags: ["抹茶", "点心", "礼盒"],
    specs: [
      {
        name: "规格",
        options: ["8件装", "12件装", "16件装"]
      }
    ]
  }
]