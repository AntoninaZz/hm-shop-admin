import { Banknote, Wallet, Package, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSalesPerMonth, getTotalCustomers, getTotalSales } from "@/lib/actions/actions";
import SalesChart from "@/components/custom ui/SalesChart";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalProfit = await getTotalSales().then((data) => data.totalProfit);
  const totalCustomer = await getTotalCustomers();
  const graphData = await getSalesPerMonth();
  return (
    <div className="px-8 py-10">
      <p className="text-2xl font-semibold">Dashboard</p>
      <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10 md:gap-5">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <Banknote className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-right text-lg sm:text-2xl font-bold">{totalRevenue} ₴</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Profit</CardTitle>
            <Wallet className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-right text-lg sm:text-2xl font-bold">{totalProfit} ₴</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <Package className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-right text-lg sm:text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customers</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-right text-lg sm:text-2xl font-bold">{totalCustomer}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart (₴)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
export const dynamic = "force-dynamic";