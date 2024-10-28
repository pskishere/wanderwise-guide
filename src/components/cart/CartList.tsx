import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toggleSelectItem, updateQuantity, removeItem } from "@/store/cartSlice"
import { CartItemCard } from "./CartItemCard"
import { CartSkeleton } from "./CartSkeleton"

export const CartList = ({ isLoading }: { isLoading: boolean }) => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)

  const handleQuantityChange = (id: number, type: 'increase' | 'decrease' | 'input', value?: number) => {
    let newQuantity: number
    
    if (type === 'input' && value !== undefined) {
      newQuantity = Math.max(1, Math.min(99, value))
    } else {
      const currentItem = items.find(item => item.id === id)
      const currentQuantity = currentItem?.quantity || 1
      newQuantity = type === 'increase' ? currentQuantity + 1 : currentQuantity - 1
    }

    if (newQuantity >= 1 && newQuantity <= 99) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleCheckboxChange = (id: number, checked: boolean) => {
    dispatch(toggleSelectItem(id))
  }

  const handleDelete = (id: number) => {
    dispatch(removeItem(id))
    toast({
      description: "商品已从购物车中移除",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array(2).fill(0).map((_, i) => (
          <CartSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onSelect={handleCheckboxChange}
          onQuantityChange={handleQuantityChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}