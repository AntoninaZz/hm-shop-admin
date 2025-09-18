"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderItemType>[] = [
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => <Link href={`/products/${row.original.product._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.product.name}</Link>,
    },
    {
        accessorKey: "color",
        header: "Color",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
]