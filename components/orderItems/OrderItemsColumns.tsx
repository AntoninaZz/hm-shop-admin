"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { OrderItemType } from "@/lib/types";

export const columns: ColumnDef<OrderItemType>[] = [
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => <Link href={`/products/${row.original.product._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.product.name}</Link>,
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => <div className="flex items-center gap-3"><div className="h-3 w-3 rounded-full" style={{backgroundColor: row.original.color}}></div>{row.original.color}</div>,
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