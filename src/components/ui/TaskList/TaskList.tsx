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

  const findCategory = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: "Sin categoría",
        color: "#f0f0f0",
      }
    );
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  const handleEditClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  // Si se quiere probar la implementacion de delete se descomentan estas lineas de abajo
  // y se debe traer del contexto la funcion handleDeleteTask
  // y por ultimo descomentar el button que deje comentado en el return
  // const handleDeleteClick = async (taskId: string) => {
  //   if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
  //     await handleDeleteTask(taskId);
  //   }
  // };

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
          maxWidth: 800,
          alignSelf: "center",
          textAlign: "left",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Tareas
        </Typography>
      </Box>

      {/* Tareas Pendientes */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          alignSelf: "center",
          textAlign: "left",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Tareas Pendientes
        </Typography>
      </Box>
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => {
          const { color } = findCategory(task.category_id);
          return (
            <Paper
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: 800,
                padding: 2,
                marginBottom: 2,
                textAlign: "left",
                border:
                  selectedTaskId === task.id ? "2px solid #1976d2" : "none",
                backgroundColor: selectedTaskId === task.id ? "#e3f2fd" : color,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectedTaskId === task.id}
                  onChange={() => handleSelectTask(task.id)}
                  inputProps={{ "aria-label": "checkbox for task" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {findCategory(task.category_id).name}:{" "}
                    {task.description || "Sin descripción"}
                  </Typography>
                </Box>
                {selectedTaskId === task.id && (
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
        <Typography variant="body1">No hay tareas pendientes.</Typography>
      )}

      <Divider sx={{ my: 4 }} />
      {/* Tareas Completadas */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          alignSelf: "center",
          textAlign: "left",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Tareas Completadas
        </Typography>
      </Box>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => {
          const { color } = findCategory(task.category_id);
          return (
            <Paper
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: 800,
                padding: 2,
                marginBottom: 2,
                textAlign: "left",
                border:
                  selectedTaskId === task.id ? "2px solid #1976d2" : "none",
                backgroundColor: selectedTaskId === task.id ? "#e0f7fa" : color,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectedTaskId === task.id}
                  onChange={() => handleSelectTask(task.id)}
                  inputProps={{ "aria-label": "checkbox for completed task" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {findCategory(task.category_id).name}:{" "}
                    {task.description || "Sin descripción"}
                  </Typography>
                </Box>
                {selectedTaskId === task.id && (
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
        <Typography variant="body1">No hay tareas completadas.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
