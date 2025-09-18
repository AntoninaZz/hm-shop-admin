import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);
  const { orderDetails, customer } = await res.json();
  console.log(orderDetails, customer);
  return (
    <div className="p-10">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">Замовлення № {orderDetails._id}</p>
        <p className="text-md">{format(orderDetails.createdAt, "eee dd.MM.yyy HH:mm")}</p>
      </div>
      <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
      <div className="flex w-full">
        <div className="flex flex-col gap-5 w-3/5">
          <p className="text-md"><span className="font-semibold">Адреса доставки:</span> {orderDetails.shippingAddress}</p>
          <p className="text-md"><span className="font-semibold">Сума:</span> {orderDetails.totalAmount}₴</p>
          <p className="text-md"><span className="font-semibold">Коментар:</span> {orderDetails.comment}</p>
        </div>
        <div className="flex flex-col gap-5 w-2/5">
          <p className="text-md"><span className="font-semibold">Ім'я:</span> {customer.name}</p>
          <p className="text-md"><span className="font-semibold">тел:</span> {customer.phone}</p>
          <p className="text-md"><span className="font-semibold">email:</span> {customer.email}</p>
        </div>
      </div>
      <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
    </div>
  )
}

export default OrderDetails;