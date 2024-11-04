import axios from "axios";
import { Category } from "../interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener todas las categorias
export const getCategoriesService = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};
