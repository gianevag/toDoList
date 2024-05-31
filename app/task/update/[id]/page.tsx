import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { UpdateTask } from "@/app/ui/Task/Forms/update-task";
import { fetchTask } from "@/data/tasks";

export default async function Page({ params }: { params: { id: string } }) {
  const task = await fetchTask(params.id);

  return (
    <Card className="m-auto max-w-[450px]">
      <CardHeader>
        <CardTitle>Add Task</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateTask task={task} />
      </CardContent>
    </Card>
  );
}
