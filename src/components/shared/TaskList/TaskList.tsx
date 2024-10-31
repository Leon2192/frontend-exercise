import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import statusTasks from "../../../constants/status.json";

const TaskList: React.FC = () => {
  const { tasks, setTasks, categories } = useGlobalContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const getCategory = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || {
      name: "Sin categoría",
      color: "#f0f0f0", 
    };
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  const handleEditClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  const handleChangeStatus = (taskId: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
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
        pendingTasks.map((task) => {
          const { color } = getCategory(task.category_id);
          return (
            <Paper
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: 800,
                padding: 2,
                marginBottom: 2,
                textAlign: "left",
                border: selectedTaskId === task.id ? "2px solid #1976d2" : "none",
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
                    {getCategory(task.category_id).name}:{" "}
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
                    <FormControl variant="outlined" size="small">
                      <Select
                        labelId={`status-select-label-${task.id}`}
                        value={task.completed ? "completed" : "pending"}
                        onChange={(e) =>
                          handleChangeStatus(
                            task.id,
                            e.target.value === "completed"
                          )
                        }
                      >
                        {statusTasks.statuses.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
          const { color } = getCategory(task.category_id);
          return (
            <Paper
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: 800,
                padding: 2,
                marginBottom: 2,
                textAlign: "left",
                border: selectedTaskId === task.id ? "2px solid #1976d2" : "none",
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
                    {getCategory(task.category_id).name}:{" "}
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
                    <FormControl variant="outlined" size="small">
                      <Select
                        labelId={`status-select-label-${task.id}`}
                        value={task.completed ? "completed" : "pending"}
                        onChange={(e) =>
                          handleChangeStatus(
                            task.id,
                            e.target.value === "completed"
                          )
                        }
                      >
                        {statusTasks.statuses.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
