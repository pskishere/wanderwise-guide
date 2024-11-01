import { Image } from "@/components/ui/image"

interface Product {
  id: string
  title: string
  price: number
  quantity: number
  image: string
  specs?: string[]
}

interface CheckoutProductsProps {
  products: Product[]
  totalAmount: number
  freight?: number
}

export const CheckoutProducts = ({ products, totalAmount, freight = 0 }: CheckoutProductsProps) => {
  return (
    <div className="bg-white rounded-xl divide-y">
      {products.map((item) => (
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
            <h3 className="text-sm font-medium leading-tight line-clamp-2">
              {item.title}
            </h3>
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
      
      <div className="px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">商品总价</span>
          <span>¥{totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">运费</span>
          <span>{freight ? `¥${freight}` : "免运费"}</span>
        </div>
      </div>
    </div>
  )
}