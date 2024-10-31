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
  const { tasks, setTasks, categories } = useGlobalContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Sin categoría";
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  const handleEditClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
        pendingTasks.map((task) => (
          <Paper
            key={task.id}
            sx={{
              width: "100%",
              maxWidth: 800,
              padding: 2,
              marginBottom: 2, 
              textAlign: "left",
              border: selectedTaskId === task.id ? "2px solid #1976d2" : "none",
              backgroundColor:
                selectedTaskId === task.id ? "#e3f2fd" : "inherit",
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
                  {getCategoryName(task.category_id)}:{" "}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    Finalizar
                  </Button>
                </Box>
              )}
            </Box>
            
          </Paper>
        ))
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
        completedTasks.map((task) => (
          <Paper
            key={task.id}
            sx={{
              width: "100%",
              maxWidth: 800,
              padding: 2,
              marginBottom: 2, // Agregar margen inferior
              textAlign: "left",
              border: selectedTaskId === task.id ? "2px solid #1976d2" : "none",
              backgroundColor:
                selectedTaskId === task.id ? "#e0f7fa" : "#f1f8e9",
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
                  {getCategoryName(task.category_id)}:{" "}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    Marcar como Pendiente
                  </Button>
                </Box>
              )}
            </Box>
            
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No hay tareas completadas.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
