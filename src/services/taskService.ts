import axios from "axios";
import { Task } from "../interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener todas las tareas
export const getTasksService = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw error;
  }
};

// Obtener una tarea por ID
export const getTaskByIdService = async (id: number): Promise<Task> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTaskService = async (
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Actualizar una tarea
export const updateTaskService = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la tarea con ID ${id}:`, error);
    throw error;
  }
};
