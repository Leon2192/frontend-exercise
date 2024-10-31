import { getCategoriesService } from "../services/categoryService";
import { Category } from "../interfaces";
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getCategoriesService();
    return categories;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
