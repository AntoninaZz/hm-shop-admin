"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import { ProductType } from "@/lib/types";

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => <Link href={`/products/${row.original._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.name}</Link>,
    },
    {
        accessorKey: "categories",
        header: "Category",
        cell: ({ row }) => <p>{row.original.category.map((category) => category.name).join(", ")}</p>,
    },
    {
        accessorKey: "price",
        header: "Price (₴)",
        cell: ({ row }) => row.original.price.toFixed(2),
    },
    {
        accessorKey: "expense",
        header: "Expense (₴)",
        cell: ({ row }) => row.original.expense.toFixed(2),
    },
    {
        accessorKey: "numberInStock",
        header: "In Stock",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="product" id={row.original._id} />,
    },
]