declare module "definitions" {
  export type Task = {
    title: string;
  };

  export type Tasks = {
    todo: Task[];
    doing: Task[];
    done: Task[];
  };

  export type Containers = keyof Tasks;
}
