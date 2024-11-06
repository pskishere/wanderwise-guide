import { OrderStatus } from "@/constants/orders"

export interface OrderItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  specs?: string[]
}

export interface Order {
  id: string
  status: string
  totalAmount: number
  items: OrderItem[]
  createdAt: string
}

const mockOrders = [
  {
    id: "ORD001",
    status: "待付款",
    totalAmount: 299,
    items: [
      {
        id: 1,
        title: "日本限定 Hello Kitty 樱花限定版玩偶",
        price: 299,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        quantity: 1,
        specs: ["粉色 40cm"]
      }
    ],
    createdAt: "2024-02-20 14:30:00"
  },
  {
    id: "ORD002",
    status: "已完成",
    totalAmount: 398,
    items: [
      {
        id: 2,
        title: "大阪环球影城限定 小黄人公仔套装",
        price: 199,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
        quantity: 2,
        specs: ["经典款 20cm"]
      }
    ],
    createdAt: "2024-02-18 09:15:00"
  },
  {
    id: "ORD003",
    status: "待发货",
    totalAmount: 599,
    items: [
      {
        id: 3,
        title: "东京迪士尼乐园限定 米奇挂饰",
        price: 599,
        image: "https://images.unsplash.com/photo-1620138546344-7b2c38516edf?w=800&q=80",
        quantity: 1,
        specs: ["金色 15cm"]
      }
    ],
    createdAt: "2024-02-17 16:45:00"
  }
];

export const fetchOrders = async ({ pageParam = 1, status = "all" }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const ordersPerPage = 5;
  const filteredOrders = status === "all" 
    ? mockOrders 
    : mockOrders.filter(order => {
        switch(status) {
          case "pending": return order.status === "待付款";
          case "processing": return order.status === "待发货";
          case "shipped": return order.status === "待收货";
          case "completed": return order.status === "已完成";
          case "cancelled": return order.status === "已取消";
          default: return true;
        }
      });

  const start = (pageParam - 1) * ordersPerPage;
  const end = start + ordersPerPage;
  const pageOrders = filteredOrders.slice(start, end);
  
  const statusCounts = mockOrders.reduce((acc, order) => {
    const status = order.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    orders: pageOrders || [],
    nextPage: pageOrders.length === ordersPerPage ? pageParam + 1 : undefined,
    hasMore: pageOrders.length === ordersPerPage,
    statusCounts
  };
};