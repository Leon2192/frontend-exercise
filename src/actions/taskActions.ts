import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService";
import { Task } from "../interfaces";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await getTasksService();
    return tasks;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    throw error;
  }
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  try {
    const task = await getTaskByIdService(id);
    return task;
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const newTask = await createTaskService(task);
    return newTask;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

export const editTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  try {
    const updatedTask = await updateTaskService(id, task);
    return updatedTask;
  } catch (error) {
    console.error(`Error al actualizar la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const removeTask = async (id: string): Promise<void> => {
  try {
    await deleteTaskService(id);
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error);
    throw error;
  }
};
