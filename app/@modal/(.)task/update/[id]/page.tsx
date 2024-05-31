"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { UpdateTask } from "../../../../ui/Task/update-task";
import { useEffect, useState } from "react";
import { Task } from "definitions";
import { fetchTask } from "@/data/tasks";

export default function Page({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      const task = await fetchTask(params.id);
      if (!!task) {
        setTask(task);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <UpdateTask task={task} />
      </DialogContent>
    </Dialog>
  );
}
