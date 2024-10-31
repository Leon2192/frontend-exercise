import React, { createContext, ReactNode, useState, useEffect } from "react";
import { IGlobalContext, Task, Category } from "../interfaces";
import {
  fetchTasks,
  addTask as addTaskAction,
  editTask as editTaskAction,
  fetchTaskById,
} from "../actions/taskActions";
import { fetchCategories } from "../actions/categoryActions";
import AlertSnackbar from "../components/ui/AlertModal/AlertModal";

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

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

  // Toasts
  const handleOpenSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      const newTask = await addTaskAction(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      handleOpenSnackbar("Tarea agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      handleOpenSnackbar("Error al agregar tarea.");
    }
  };

  const handleEditTask = async (id: string, task: Partial<Task>) => {
    try {
      const updatedTask = await editTaskAction(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      handleOpenSnackbar("Tarea editada exitosamente.");
    } catch (error) {
      console.error(`Error al editar tarea con ID ${id}:`, error);
      handleOpenSnackbar(`Error al editar tarea con ID ${id}.`);
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

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        categories,
        handleAddTask,
        handleEditTask,
        handleFetchTaskById,
      }}
    >
      {children}
      <AlertSnackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        title="Mensaje:"
        content={snackbarMessage}
      />
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
