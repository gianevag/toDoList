"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteTaskButton } from "./DeleteTask";

type TaskProps = {
  id?: string;
  type?: string;
  title: string;
  desciption?: string;
};

export function Task({ title, desciption, id, type }: TaskProps) {
  return (
    <Card className="min-w-[250px]">
      <CardHeader>
        <div className="flex flex-col justify-center grow">
          <CardTitle>{title}</CardTitle>
          {desciption && <CardDescription>{desciption}</CardDescription>}
        </div>
      </CardHeader>
    </Card>
  );
}
