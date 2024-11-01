import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Checkbox,
  Button,
} from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const TaskList: React.FC = () => {
  const { tasks, categories } = useGlobalContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const findCategory = (categoryId: string) =>
    categories.find((cat) => cat.id === categoryId) || {
      name: "Sin categoría",
      color: "#f0f0f0",
    };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const handleEditClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  // Si se quiere probar la implementacion de delete se descomentan estas lineas de abajo
  //   y se debe traer del contexto la funcion handleDeleteTask
  //    y por ultimo descomentar el button que deje comentado en el return
  //    const handleDeleteClick = async (taskId: string) => {
  //   if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
  //       await handleDeleteTask(taskId);
  //   };

  const renderTaskList = (taskList: typeof tasks, title: string) => (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "left",
          marginBottom: 3,
          maxWidth: 750,
          width: "100%",
        }}
      >
        {title}
      </Typography>

      {taskList.length > 0 ? (
        taskList.map((task) => {
          const { color } = findCategory(task.category_id);
          const isSelected = selectedTaskId === task.id;

          return (
            <Paper
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: 750,
                padding: 1,
                marginBottom: 2,
                textAlign: "left",
                border: isSelected ? "2px solid #1976d2" : "none",
                backgroundColor: isSelected ? "#e3f2fd" : color,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleSelectTask(task.id)}
                  inputProps={{ "aria-label": "checkbox for task" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ textAlign: "left" }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {findCategory(task.category_id).name}:{" "}
                    {task.description || "Sin descripción"}
                  </Typography>
                </Box>
                {isSelected && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(task.id)}
                    >
                      Editar
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Eliminar
                    </Button> */}
                  </Box>
                )}
              </Box>
            </Paper>
          );
        })
      ) : (
        <Typography variant="h5" align="left">
          No hay tareas{" "}
          {title === "Tareas Pendientes" ? "pendientes" : "completadas"}.
        </Typography>
      )}
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 750,
          alignSelf: "center",
          textAlign: "left",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Lista de Tareas
        </Typography>
      </Box>

      {renderTaskList(pendingTasks, "Pendientes")}

      <Divider sx={{ my: 4 }} />

      {renderTaskList(completedTasks, "Completadas")}
    </Box>
  );
};

export default TaskList;
