import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";

const CustomersPage = async () => {
    await connectToDB();
    const customers = await Customer.find().sort({ createdAt: -1 });
    return (
        <div className="px-10 py-5 ">
            <p className="text-2xl font-semibold">Customers</p>
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
    )
}

export default CustomersPage;
export const dynamic = "force-dynamic";