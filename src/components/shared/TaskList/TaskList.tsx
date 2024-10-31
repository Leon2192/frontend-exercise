import React, { useState } from "react";
import { Box, Typography, Paper, Divider, Checkbox } from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { useNavigate } from "react-router-dom";

const TaskList: React.FC = () => {
  const { tasks, categories } = useGlobalContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Sin categoría";
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentTaskId(null);
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
          maxWidth: 500,
          alignSelf: "center",
          textAlign: "left",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Tareas
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
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
              maxWidth: 500,
              padding: 2,
              textAlign: "left",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={false}
                onChange={() => handleTaskClick(task.id)}
                inputProps={{ "aria-label": "checkbox for task" }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description || "Sin descripción"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {getCategoryName(task.category_id)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No hay tareas pendientes.</Typography>
      )}

      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
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
              maxWidth: 500,
              padding: 2,
              marginBottom: 2,
              textAlign: "left",
              backgroundColor: "#e0f7fa",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={true}
                onChange={() => handleTaskClick(task.id)}
                inputProps={{ "aria-label": "checkbox for completed task" }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description || "Sin descripción"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {getCategoryName(task.category_id)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No hay tareas completadas.</Typography>
      )}

      <EditTaskModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        taskId={currentTaskId as string}
      />
    </Box>
  );
};

export default TaskList;
