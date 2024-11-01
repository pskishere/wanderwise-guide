import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useParams } from "react-router-dom"
import { Image } from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import { Package, Truck, MapPin } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setLoading, setError, setCurrentOrder, updateOrderStatus } from "@/store/orderSlice"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

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
    // 模拟API调用
    dispatch(setLoading(true));
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

  if (!currentOrder) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl space-y-4">
        {/* 订单状态 */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-6 w-6" />
            <span className="text-lg font-medium">{currentOrder.status}</span>
          </div>
          <div className="text-pink-100 text-sm space-y-1">
            <p>订单号：{currentOrder.id}</p>
            <p>下单时间：{currentOrder.timeline[0].time}</p>
          </div>
        </div>

        {/* 收货地址 */}
        <div className="bg-white rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">收货地址</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="font-medium">{currentOrder.address.name}</span>
              <span className="text-gray-500">{currentOrder.address.phone}</span>
            </div>
            <p className="text-gray-600 text-sm">{currentOrder.address.detail}</p>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="bg-white rounded-xl">
          {currentOrder.items.map((item) => (
            <div key={item.id} className="flex gap-3 p-4">
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
          
          <div className="border-t px-4 py-3 space-y-2">
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
        </div>

        {/* 物流时间线 */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <Truck className="h-4 w-4" />
            <span className="text-sm">物流信息</span>
          </div>
          <div className="space-y-4">
            {currentOrder.timeline.map((event, index) => (
              <div key={index} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? "bg-pink-500" : "bg-gray-300"}`} />
                  {index !== currentOrder.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm text-gray-600">{event.status}</p>
                  <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
          <div className="container mx-auto max-w-3xl flex justify-end gap-3">
            <Button variant="outline" className="rounded-full px-6">
              联系客服
            </Button>
            {currentOrder.status === "待收货" && (
              <Button 
                className="rounded-full px-6 bg-pink-500 hover:bg-pink-600"
                onClick={handleConfirmReceipt}
              >
                确认收货
              </Button>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default OrderDetail;