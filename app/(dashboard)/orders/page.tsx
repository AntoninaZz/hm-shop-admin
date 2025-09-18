"use client";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.log("[orders_GET]", error);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <p className="text-2xl font-semibold">Orders</p>
            <Separator className="mt-4 mb-7 bg-[var(--color-muted-green)]" />
            <DataTable columns={columns} data={orders} searchKey="_id" />
        </div>
    )
}

export default Orders;