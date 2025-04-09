"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";

export const columns: ColumnDef<BannerType>[] = [
    {
        accessorKey: "title",
        header: "Banner Title",
        cell: ({ row }) => <Link href={`/banners/${row.original._id}`} className="hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200">{row.original.title}</Link>,
    },
    {
        accessorKey: "url",
        header: "URL",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="banner" id={row.original._id} />,
    },
]