"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

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
        header: "Total Amount",
    },
    {
        accessorKey: "createdAt",
        header: "Placement Date",
    },
]