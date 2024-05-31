import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateTask } from "@/app/ui/Task/Forms/create-task";

export default function Page() {
  return (
    <Card className="m-auto max-w-[450px]">
      <CardHeader>
        <CardTitle>Add Task</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateTask />
      </CardContent>
    </Card>
  );
}
