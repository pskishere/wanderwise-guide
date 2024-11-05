import { Button } from "@/components/ui/button"

interface OrderActionsProps {
  status: string
  onConfirmReceipt: () => void
}

export const OrderActions = ({ status, onConfirmReceipt }: OrderActionsProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
      <div className="container mx-auto max-w-3xl flex justify-end gap-3">
        <Button variant="outline" className="rounded-full px-6">
          联系客服
        </Button>
        {status === "待收货" && (
          <Button 
            className="rounded-full px-6 bg-pink-500 hover:bg-pink-600"
            onClick={onConfirmReceipt}
          >
            确认收货
          </Button>
        )}
      </div>
    </div>
  );
};