import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
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

export const fetchTaskById = async (id: number): Promise<Task> => {
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
  id: number,
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
