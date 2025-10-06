"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
        cell: ({row}) => <Link href={`/products/${row.original._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.name}</Link>,
    },
    {
        accessorKey: "categories",
        header: "Category",
        cell: ({row}) => <p>{row.original.category.map((category) => category.name).join(", ")}</p>,
    },
    {
        accessorKey: "price",
        header: "Price (₴)",
    },
    {
        accessorKey: "expense",
        header: "Expense (₴)",
    },
    {
        accessorKey: "numberInStock",
        header: "In Stock",
    },
    {
        id: "actions",
        cell: ({row}) => <Delete item="product" id={row.original._id} />,
    },
]