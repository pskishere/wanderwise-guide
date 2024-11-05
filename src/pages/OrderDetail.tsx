import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useParams } from "react-router-dom"
import { Image } from "@/components/ui/image"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setLoading, setError, setCurrentOrder, updateOrderStatus } from "@/store/orderSlice"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { OrderStatus } from "@/components/order/detail/OrderStatus"
import { OrderAddress } from "@/components/order/detail/OrderAddress"
import { OrderTimeline } from "@/components/order/detail/OrderTimeline"
import { OrderActions } from "@/components/order/detail/OrderActions"
import { Card } from "@/components/ui/card"
import { Package, Truck, MapPin } from "lucide-react"

const mockOrder = {
  id: "ORD001",
  status: "待收货",
  totalAmount: 299,
  freight: 0,
  address: {
    name: "张三",
    phone: "138****8888",
    detail: "浙江省杭州市西湖区文三路 123 号"
  },
  timeline: [
    {
      time: "2024-02-20 14:30:00",
      status: "订单创建成功"
    },
    {
      time: "2024-02-20 14:35:00",
      status: "支付成功"
    },
    {
      time: "2024-02-21 10:00:00",
      status: "商品已发货"
    }
  ],
  items: [
    {
      id: 1,
      title: "日本限定 Hello Kitty 樱花限定版玩偶",
      price: 299,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      quantity: 1,
      specs: ["粉色 40cm"]
    }
  ]
};

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentOrder, loading } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(setLoading(true));
    // 模拟API调用
    setTimeout(() => {
      dispatch(setCurrentOrder(mockOrder));
      dispatch(setLoading(false));
    }, 1000);

    return () => {
      dispatch(setCurrentOrder(null));
    };
  }, [dispatch, id]);

  const handleConfirmReceipt = () => {
    dispatch(updateOrderStatus("已完成"));
    toast({
      description: "已确认收货",
    });
  };

  if (!currentOrder || loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl space-y-4">
        <OrderStatus 
          status={currentOrder.status}
          id={currentOrder.id}
          createdAt={currentOrder.timeline[0].time}
        />

        <OrderAddress {...currentOrder.address} />

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Package className="h-4 w-4" />
            <span className="text-sm">商品信息</span>
          </div>

          {currentOrder.items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  fallback="https://placehold.co/600x600/png?text=商品图片"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.title}</h3>
                {item.specs && item.specs.length > 0 && (
                  <div className="mt-1">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-50 rounded-sm text-gray-900">
                      {item.specs[0]}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">¥</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="text-sm text-gray-500">x{item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">商品总价</span>
              <span>¥{currentOrder.totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">运费</span>
              <span>{currentOrder.freight ? `¥${currentOrder.freight}` : "免运费"}</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t">
              <span className="font-medium">实付款</span>
              <span className="font-medium text-pink-600">¥{currentOrder.totalAmount + currentOrder.freight}</span>
            </div>
          </div>
        </Card>

        <OrderTimeline events={currentOrder.timeline} />

        <OrderActions 
          status={currentOrder.status}
          onConfirmReceipt={handleConfirmReceipt}
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default OrderDetail;