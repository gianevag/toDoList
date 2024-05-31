import TodoList from "@/app/ui/TodoList/TodoList";
import { fetchTasks } from "@/data/tasks";
import { groupBy } from "@/lib/array";
import { Tasks } from "definitions";
import { AddTaskButton } from "@/app/ui/Task/Buttons/AddTask";

export default async function Home() {
  const tasks_data = await fetchTasks();

  const groupedTasks = groupBy(tasks_data, "type") as Tasks;

  return (
    <main>
      <div className="m-auto pt-10 max-w-[1100px]">
        <div className="flex justify-end pb-4">
          <AddTaskButton />
        </div>
        <TodoList tasks={groupedTasks} />
      </div>
    </main>
  );
}
