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

export default function Task({title, desciption }: TaskProps) {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {desciption && <CardDescription>{desciption}</CardDescription>}
      </CardHeader>
    </Card>
  );
}
