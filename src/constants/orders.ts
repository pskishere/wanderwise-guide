export const ORDER_STATUSES = [
  { value: "all", label: "全部", count: 0 },
  { value: "pending", label: "待付款", count: 0 },
  { value: "processing", label: "待发货", count: 0 },
  { value: "shipped", label: "待收货", count: 0 },
  { value: "completed", label: "已完成", count: 0 },
  { value: "cancelled", label: "已取消", count: 0 }
];

export interface OrderStatus {
  value: string;
  label: string;
  count: number;
}