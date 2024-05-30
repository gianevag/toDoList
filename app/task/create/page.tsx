import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { CreateTask } from "../../ui/Task/create-task";

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
