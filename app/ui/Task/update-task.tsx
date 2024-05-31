"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { updateTask } from "@/data/tasks";
import { Task } from "definitions";

const initialState = {
  errors: {},
  message: null,
};

export const UpdateTask = ({ task }: { task: Task | null }) => {
  const updateTaskWithId = updateTask.bind(null, task?.id || "");
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);
  console.log("task", task);
  return (
    <form action={dispatch}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
          <Label htmlFor="taskName" className="text-right">
            Task Name
          </Label>
          <Input
            id="taskName"
            name="title"
            placeholder="Task Name"
            className="col-span-3"
            defaultValue={task?.title}
          />
          <div
            id="name-error"
            className={"col-start-2 col-span-3"}
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.title &&
              state.errors?.title.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            placeholder="write something about task"
            className="col-span-3"
            defaultValue={task?.description}
          />
        </div>
      </div>
      <div className="flex sm:justify-start gap-2">
        <Button variant="secondary">
          <Link href="/">Close</Link>
        </Button>
        <Button type={"submit"}>Edit</Button>
      </div>
    </form>
  );
};
