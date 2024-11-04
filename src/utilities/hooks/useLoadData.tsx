import { useEffect, useState } from "react";
import { fetchTasks } from "../../actions/taskActions";
import { fetchCategories } from "../../actions/categoryActions";
import useLocalStorage from "./useLocalStorage";

export const useLoadData = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", [], 12);
  const [categories, setCategories] = useLocalStorage("categories", [], 12);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (tasks.length === 0) {
          const loadedTasks = await fetchTasks();
          setTasks(loadedTasks);
        }

        if (categories.length === 0) {
          const loadedCategories = await fetchCategories();
          setCategories(loadedCategories);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar datos iniciales.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tasks, categories, setTasks, setCategories]);

  return { tasks, categories, error, loading, setTasks, setCategories };
};
