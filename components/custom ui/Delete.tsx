"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
    id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });
            if(res.ok){
                setLoading(false);
                window.location.href = "/categories";
                toast.success("Category is deleted");
            }
        } catch (error) {
            console.log("DELETE", error);
            toast.error("Oops! Something went wrong :(");
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="bg-[var(--color-powder-pink)] text-white cursor-pointer hover:saturate-200">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your category.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="cursor-pointer bg-[var(--color-olive-gray)] text-white">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Delete