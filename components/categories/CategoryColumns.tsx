"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";

export const columns: ColumnDef<CategoryType>[] = [
    {
        accessorKey: "name",
        header: "Category Name",
        cell: ({row}) => <Link href={`/categories/${row.original._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.name}</Link>,
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({row}) => <p>{row.original.products.length}</p>,
    },
    {
        id: "actions",
        cell: ({row}) => <Delete id={row.original._id} />,
    },
]