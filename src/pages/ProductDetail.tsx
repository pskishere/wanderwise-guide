import { useParams } from "react-router-dom"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductGallery } from "@/components/product/ProductGallery"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Navigation } from "@/components/Navigation"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"

const fetchProduct = async (id: string) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id,
    title: "ZARA 2024春季新款小香风粗花呢外套",
    price: "¥799",
    originalPrice: "¥999",
    description: "这是一款经典的小香风外套，采用高级粗花呢面料，手感柔软，保暖性能出色。简约的设计风格，搭配金属纽扣，既能突出品质感，又不失优雅。",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80",
    ],
    shop: {
      name: "ZARA官方旗舰店",
      avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80"
    },
    specs: [
      { name: "颜色", value: "米白色" },
      { name: "尺码", value: "S/M/L" },
      { name: "材质", value: "羊毛混纺" },
      { name: "产地", value: "中国" }
    ]
  }
}

const ProductDetail = () => {
  const { id } = useParams()
  const { toast } = useToast()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || '1'),
  })

  if (isError) {
    toast({
      variant: "destructive",
      description: "加载商品信息失败，请稍后重试",
    })
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        <RelatedProducts />
      </div>
    </div>
  )
}

export default ProductDetail