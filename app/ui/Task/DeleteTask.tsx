"use client";

import { Button } from "@/components/ui/button";
import { deleteTask } from "@/data/tasks";
import { TrashIcon } from "@heroicons/react/24/outline";

export const DeleteTaskButton = ({ id }: { id: string }) => {
  return (
    <Button
      onClick={() => deleteTask(id)}
      size={"icon"}
      variant={"link"}
      style={{ position: "relative", right: "45px" }}
    >
      <TrashIcon className="w-4 text-red-300 hover:text-red-500" />
    </Button>
  );
};
