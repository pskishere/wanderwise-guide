import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/services/productsApi"
import { Skeleton } from "@/components/ui/skeleton"

export const RelatedProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "related"],
    queryFn: () => fetchProducts(undefined, 0, 4),
  })

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">相关推荐</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data?.items.length) return null

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">相关推荐</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.items.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                <p className="text-pink-600 font-medium mt-2">¥{product.price}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}