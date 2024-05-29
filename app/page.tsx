import TodoList from "./ui/TodoList/TodoList";
import { fetchTasks } from "@/data/tasks";
import { groupBy } from "@/lib/array";
import { Tasks } from "definitions";

export default async function Home() {
  const tasks_data = await fetchTasks();

  const groupedTasks = groupBy(tasks_data, "type") as Tasks;

  return (
    <main>
      <TodoList tasks={groupedTasks} />
    </main>
  );
}
