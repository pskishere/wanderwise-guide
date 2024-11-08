import { supabase } from "@/integrations/supabase/client"

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

interface OrderResponse {
  orders: Order[]
  nextPage?: number
  hasMore: boolean
  statusCounts: Record<string, number>
}

export const fetchOrders = async ({ 
  pageParam = 1, 
  status = "all",
  limit = 5 
}): Promise<OrderResponse> => {
  try {
    let query = supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        created_at,
        order_items (
          id,
          title,
          price,
          quantity,
          specs,
          products (
            images
          )
        )
      `)
      .order('created_at', { ascending: false })
      .range((pageParam - 1) * limit, pageParam * limit - 1)

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: orders, error } = await query

    if (error) throw error

    // Get status counts
    const { data: statusCounts, error: countError } = await supabase
      .from('orders')
      .select('status', { count: 'exact' })
      .group_by('status')

    if (countError) throw countError

    const formattedOrders = orders.map(order => ({
      id: order.id.toString(),
      status: order.status,
      totalAmount: order.total_amount,
      createdAt: order.created_at,
      items: order.order_items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.products.images[0] || '',
        quantity: item.quantity,
        specs: item.specs
      }))
    }))

    const counts = statusCounts.reduce((acc, curr) => {
      acc[curr.status] = parseInt(curr.count)
      return acc
    }, {} as Record<string, number>)

    return {
      orders: formattedOrders,
      nextPage: orders.length === limit ? pageParam + 1 : undefined,
      hasMore: orders.length === limit,
      statusCounts: counts
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw new Error("Failed to fetch orders")
  }
}