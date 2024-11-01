import React, { createContext, ReactNode, useState } from "react";
import { IGlobalContext, Task } from "../interfaces";
import {
  addTask as addTaskAction,
  editTask as editTaskAction,
  fetchTaskById,
  removeTask,
} from "../actions/taskActions";
import AlertModal from "../components/shared/AlertModal/AlertModal";
import { useLoadData } from "../utilities/hooks/useLoadData";
import Loader from "../components/shared/Loader/Loader";

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { tasks, categories, error, loading, setTasks } = useLoadData();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

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
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
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
      const tasksInStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasksInStorage = tasksInStorage.map((t: Task) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasksInStorage));
      handleOpenSnackbar("Tarea editada exitosamente.");
    } catch (error) {
      console.error(`Error al editar tarea con ID ${id}:`, error);
      handleOpenSnackbar(`Error al editar tarea con ID ${id}.`);
    }
  };

  const handleFetchTaskById = async (id: string): Promise<Task | undefined> => {
    const tasksInStorage = localStorage.getItem("tasks");
    if (tasksInStorage) {
      const tasks: Task[] = JSON.parse(tasksInStorage);
      const task = tasks.find((t) => t.id === id);
      if (task) {
        return task;
      }
    }
    // Si no se encuentran cacheadas en el local hago la solicitud
    try {
      return await fetchTaskById(id);
    } catch (error) {
      console.error(`Error al obtener tarea con ID ${id}:`, error);
      return undefined;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await removeTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks.filter((task) => task.id !== id))
      );
      handleOpenSnackbar("Tarea eliminada exitosamente.");
    } catch (error) {
      console.error(`Error al eliminar la tarea con ID ${id}:`, error);
      handleOpenSnackbar("Error al eliminar tarea.");
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
        handleDeleteTask,
      }}
    >
      {loading ? <Loader message="Cargando datos..." /> : children}
      <AlertModal
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        title="Mensaje:"
        content={error || snackbarMessage}
      />
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
