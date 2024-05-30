"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { CreateTask } from "../../../ui/Task/create-task";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={() => {
        router.push("/");
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <CreateTask />
      </DialogContent>
    </Dialog>
  );
}
