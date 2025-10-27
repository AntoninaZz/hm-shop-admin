"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
    item: string;
    id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
    const [loading, setLoading] = useState(false);
    const onDelete = async () => {
        try {
            setLoading(true);
            let itemType = '';
            switch (item) {
                case 'product':
                    itemType = 'products';
                    break;
                case 'category':
                    itemType = 'categories';
                    break;
                case 'banner':
                    itemType = 'banners';
                    break;
                default:
                    item = 'item';
                    itemType = 'items';
                    break;
            }
            const res = await fetch(`/api/${itemType}/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setLoading(false);
                window.location.href = `/${itemType}`;
                toast.success(`${item.charAt(0).toUpperCase() + item.slice(1)} is deleted`);
            }
        } catch (error) {
            console.log("DELETE", error);
            toast.error("Oops! Something went wrong :(");
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button type="button" className="bg-[var(--color-powder-pink)] text-white cursor-pointer hover:saturate-200">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {item}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} disabled={loading} className={`cursor-pointer bg-[var(--color-olive-gray)] text-white ${loading ? 'opacity-50' : ''}`}>{loading ? 'Deleting...' : 'Delete'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Delete