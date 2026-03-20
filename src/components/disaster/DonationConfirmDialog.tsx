
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IndianRupee } from "lucide-react";

interface DonationConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  onConfirm: () => void;
}

export function DonationConfirmDialog({
  open,
  onOpenChange,
  amount,
  onConfirm,
}: DonationConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Donation</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to donate{" "}
            <span className="font-semibold text-primary flex items-center inline-flex">
              <IndianRupee className="h-4 w-4 mr-1" />
              {parseInt(amount).toLocaleString()}
            </span>{" "}
            towards disaster relief. This amount will be used to provide immediate assistance
            to affected areas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">
            Confirm Donation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
