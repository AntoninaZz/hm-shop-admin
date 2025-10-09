"use client";
import { useEffect, useState } from "react";
import { SquareCheck, Square } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface SentCheckBoxProps {
    id: string;
    initialData: boolean;
}

const SentCheckBox: React.FC<SentCheckBoxProps> = ({ id, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(initialData);
    const onSent = async () => {
        const updatedStatus = !isSent;
        try {
            setLoading(true);
            const res = await fetch(`/api/orders/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ isSent: updatedStatus }),
            });
            if (res.ok) {
                setIsSent(updatedStatus);
                toast.success(`Order №${id} marked as ${updatedStatus ? "sent" : "not sent"}`);
            } else {
                const msg = await res.text();
                toast.error(`Failed: ${msg}`);
            }
        } catch (error) {
            console.log("[orderId_POST]", error);
            toast.error("Oops! Something went wrong :(");
        } finally {
            setLoading(false);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex">
                <button type="button" className="text-[var(--color-olive-gray)] hover:text-[var(--color-muted-green)] cursor-pointer">
                    {isSent ? <SquareCheck className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to mark this order as {isSent ? 'NOT SENT' : 'SENT'}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSent} className="cursor-pointer bg-[var(--color-olive-gray)] text-white">Mark as {isSent ? 'not sent' : 'sent'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default SentCheckBox;