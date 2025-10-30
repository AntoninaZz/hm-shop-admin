"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import SentCheckBox from "../custom ui/SentCheckBox";

export const columns: ColumnDef<OrderColumnType>[] = [
    {
        accessorKey: "_id",
        header: "Order",
        cell: ({ row }) => <Link href={`/orders/${row.original._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original._id}</Link>,
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount (₴)",
        cell: ({ row }) => row.original.totalAmount.toFixed(2),
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => <span style={["success", "sandbox"].includes(row.original.paymentStatus) ? { backgroundColor: 'var(--color-muted-green)' } : { backgroundColor: 'var(--color-powder-pink)' }} className="rounded-md px-2">{row.original.paymentStatus}</span>
    },
    {
        accessorKey: "isSent",
        header: "Is Sent",
        cell: ({ row }) => <SentCheckBox id={row.original._id} initialData={row.original.isSent} />
    },
    {
        accessorKey: "createdAt",
        header: "Placement Date",
    },
]