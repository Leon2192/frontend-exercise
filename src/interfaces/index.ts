export interface Category {
  id: string;
  name: string;
  color?: string | null;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category_id: string;
  completed: boolean;
}

export interface IGlobalContext {
  tasks: Task[];
  categories: Category[];
  handleAddTask: (task: Omit<Task, "id">) => Promise<void>;
  handleEditTask: (id: number, task: Partial<Task>) => Promise<void>;
  handleFetchTaskById: (id: number) => Promise<Task | undefined>;
}
