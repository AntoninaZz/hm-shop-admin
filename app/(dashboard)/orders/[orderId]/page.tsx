import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";
import SentCheckBox from "@/components/custom ui/SentCheckBox";

const OrderDetails = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
  const { orderDetails, customer } = await res.json();
  return (
    <div className="p-10">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">Order № {orderDetails._id}</p>
        <p className="text-md">{format(orderDetails.createdAt, "eee dd.MM.yyy HH:mm")}</p>
      </div>
      <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
      <div className="flex w-full gap-3">
        <div className="flex flex-col gap-5 w-3/5">
          <p className="text-md"><span className="font-semibold">Delivery address:</span> {orderDetails.shippingAddress}</p>
          <p className="text-md"><span className="font-semibold">Total amount:</span> {orderDetails.totalAmount}₴</p>
          <p className="text-md"><span className="font-semibold">Comment:</span> {orderDetails.comment.length > 0 ? orderDetails.comment : '-'}</p>
          <div className="flex gap-25">
            <p className="text-md"><span className="font-semibold">Payment status:</span> {orderDetails.paymentStatus ? orderDetails.paymentStatus : 'not paid'}</p>
            <p className="flex gap-10 text-md">
              <span className="font-semibold">Sent:</span>
              <SentCheckBox id={orderDetails._id} initialData={orderDetails.isSent} />
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-2/5">
          <p className="text-md"><span className="font-semibold">Name:</span> {customer.name}</p>
          <p className="text-md"><span className="font-semibold">phone:</span> {customer.phone}</p>
          <p className="text-md"><span className="font-semibold">email:</span> {customer.email}</p>
        </div>
      </div>
      <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
    </div>
  )
}

export default OrderDetails;
export const dynamic = "force-dynamic";