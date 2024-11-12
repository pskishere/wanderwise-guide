import { Product } from "@/types/product";

// Define a simpler type for mock data input
interface MockProductInput {
  id: number;
  title: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  tags: string[];
}

// Mock data with simpler structure
const mockProductInputs: MockProductInput[] = [
  {
    id: 1,
    title: "日式和风连衣裙",
    price: 299,
    stock: 100,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    description: "简约日式风格，舒适面料，适合日常穿着",
    tags: ["clothing"]
  },
  {
    id: 2,
    title: "复古手工编织包",
    price: 199,
    stock: 50,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    description: "手工编织，复古风格，实用美观",
    tags: ["accessories"]
  },
  {
    id: 3,
    title: "真皮小白鞋",
    price: 399,
    stock: 80,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    description: "头层牛皮，舒适透气，百搭款式",
    tags: ["shoes"]
  }
];

// Convert mock inputs to full Product type
export const mockProducts: Product[] = mockProductInputs.map(p => ({
  id: p.id,
  title: p.title,
  price: `¥${p.price}`,
  originalPrice: `¥${Math.round(p.price * 1.2)}`,
  description: p.description || "",
  image: p.image,
  images: [p.image],
  tags: p.tags,
  sales: "0",
  shop: {
    name: "默认店铺",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=shop"
  },
  specs: []
}));