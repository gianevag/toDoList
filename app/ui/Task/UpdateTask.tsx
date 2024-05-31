"use client";

import { Button } from "@/components/ui/button";
import { deleteTask } from "@/data/tasks";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const UpdateTaskButton = ({ id }: { id: string }) => {
  return (
    <Button size={"sm"} variant={"link"} className="p-3">
      <Link href={`/task/update/${id}`}>
        <PencilIcon className="w-4 text-blue-300 hover:text-blue-500" />
      </Link>
    </Button>
  );
};
