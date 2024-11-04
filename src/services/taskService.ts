import axios from "axios";
import { Task } from "../interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener todas las tasks
export const getTasksService = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw error;
  }
};

// Obtener una task por ID
export const getTaskByIdService = async (id: string): Promise<Task> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva task
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

// Actualizar una task
export const updateTaskService = async (
  id: string,
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

// Eliminar una task
export const deleteTaskService = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error);
    throw error;
  }
};
