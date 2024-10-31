import React, { createContext, ReactNode, useState, useEffect } from "react";
import { IGlobalContext, Task, Category } from "../interfaces";
import {
  fetchTasks,
  addTask as addTaskAction,
  editTask as editTaskAction,
  fetchTaskById,
} from "../actions/taskActions";
import { fetchCategories } from "../actions/categoryActions";

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await fetchTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    const loadCategories = async () => {
      try {
        const loadedCategories = await fetchCategories();
        setCategories(loadedCategories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    loadTasks();
    loadCategories();
  }, []);

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      const newTask = await addTaskAction(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const handleEditTask = async (id: string, task: Partial<Task>) => {
    try {
      const updatedTask = await editTaskAction(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error(`Error al editar tarea con ID ${id}:`, error);
    }
  };

  const handleFetchTaskById = async (id: string): Promise<Task | undefined> => {
    try {
      return await fetchTaskById(id);
    } catch (error) {
      console.error(`Error al obtener tarea con ID ${id}:`, error);
      return undefined;
    }
  };

  console.log(tasks, "tasks");
  console.log(categories, "categories");

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        categories,
        handleAddTask,
        handleEditTask,
        handleFetchTaskById,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
