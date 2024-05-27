declare module "definitions" {
  export type Task = {
    id: string;
    title: string;
    description?: string;
  };

  export type Tasks = {
    todo: Task[];
    doing: Task[];
    done: Task[];
  };

  export type Containers = keyof Tasks;
}
