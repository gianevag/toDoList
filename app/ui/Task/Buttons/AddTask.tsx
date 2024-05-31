import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const AddTaskButton = () => {
  return (
    <Button size={"icon"} variant={"outline"}>
      <Link href="/task/create">
        <PlusIcon className="w-full" />
      </Link>
    </Button>
  );
};
