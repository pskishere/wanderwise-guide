import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleSelectAll } from "@/store/slices";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  onCheckout?: () => void;
}

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  
  const totalAmount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedCount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  const allSelected = items.length > 0 && items.every(item => item.selected);

  const handleSelectAll = (checked: boolean) => {
    dispatch(toggleSelectAll(checked));
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t p-3 sm:p-4">
      <div className="container mx-auto flex items-center justify-between max-w-3xl px-1">
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            className="border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 data-[state=checked]:text-white"
          />
          <div>
            <div className="text-sm text-gray-500">
              合计: <span className="text-lg sm:text-xl font-bold text-pink-500 ml-1">¥{totalAmount}</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              已选 {selectedCount} 件商品
            </div>
          </div>
        </div>
        <Button 
          className="bg-pink-500 hover:bg-[#E13E47] text-white rounded-full h-10 px-8 font-medium"
          onClick={handleCheckout}
          disabled={selectedCount === 0}
        >
          结算({selectedCount})
        </Button>
      </div>
    </div>
  );
};