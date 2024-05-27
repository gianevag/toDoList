import TodoList from "./ui/TodoList/TodoList";
import { tasks } from "../lib/data";

export default function Home() {
  return (
    <main>
      <TodoList tasks={tasks} />
    </main>
  );
}
