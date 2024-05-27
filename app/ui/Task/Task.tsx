"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TaskProps = {
  title: string;
  desciption?: string;
};

export function Task({ title, desciption }: TaskProps) {
  return (
    <Card className="min-w-[250px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {desciption && <CardDescription>{desciption}</CardDescription>}
      </CardHeader>
    </Card>
  );
}
