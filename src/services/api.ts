// 模拟商品数据获取延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Product {
  id: number;
  title: string;
  price: string;
  sales: string;
  image: string;
  shop: string;
  tags: string[];
}

export const fetchProducts = async (category: string = 'all'): Promise<Product[]> => {
  // 模拟 API 延迟
  await delay(1000);
  
  const products = [
    {
      id: 1,
      title: "法式复古连衣裙",
      price: "¥299",
      sales: "2.3k",
      image: "https://source.unsplash.com/800x800/?dress",
      shop: "巴黎时尚",
      tags: ["连衣裙", "法式"]
    },
    {
      id: 2,
      title: "韩国进口面膜套装",
      price: "¥168",
      sales: "5.1k",
      image: "https://source.unsplash.com/800x800/?cosmetics",
      shop: "韩妆精选",
      tags: ["面膜", "护肤"]
    },
    {
      id: 3,
      title: "无线蓝牙耳机",
      price: "¥499",
      sales: "1.8k",
      image: "https://source.unsplash.com/800x800/?headphones",
      shop: "数码旗舰店",
      tags: ["耳机", "数码"]
    },
    {
      id: 4,
      title: "手工曲奇礼盒",
      price: "¥128",
      sales: "3.2k",
      image: "https://source.unsplash.com/800x800/?cookies",
      shop: "甜心烘焙",
      tags: ["零食", "伴手礼"]
    }
  ];

  if (category === 'all') {
    return products;
  }
  
  return products.filter(product => 
    product.tags.some(tag => tag.includes(category)) ||
    product.title.includes(category)
  );
};