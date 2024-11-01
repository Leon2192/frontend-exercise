import axios from "axios";
import { Category } from "../interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategoriesService = async (): Promise<Category[]> => {
  const storageCategories = localStorage.getItem("categories");

  if (storageCategories) {
    return JSON.parse(storageCategories);
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    localStorage.setItem("categories", JSON.stringify(response.data)); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};
