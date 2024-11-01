import { useState, useEffect } from "react";
import { Task, Category } from "../../interfaces";
import { fetchTasks } from "../../actions/taskActions";
import { fetchCategories } from "../../actions/categoryActions";

export const useLoadData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      try {
        // Cargo tasks, verifico que esten en localstorage antes de fetch
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          const loadedTasks = await fetchTasks();
          setTasks(loadedTasks);
          localStorage.setItem("tasks", JSON.stringify(loadedTasks));
        }

        // Cargo categories, verifico que esten en localstorage antes de fetch
        const storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        } else {
          const loadedCategories = await fetchCategories();
          setCategories(loadedCategories);
          localStorage.setItem("categories", JSON.stringify(loadedCategories));
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar datos iniciales.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { tasks, categories, error, loading, setTasks, setCategories };
};
