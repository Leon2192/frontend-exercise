import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";

const TaskList: React.FC = () => {
  const { tasks } = useGlobalContext();

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
      <Typography variant="h4" gutterBottom>
        Lista de Tareas
      </Typography>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Paper
            key={task.id}
            sx={{
              width: "100%",
              maxWidth: 500,
              padding: 2,
              marginBottom: 2,
              textAlign: "left",
            }}
          >
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description || "Sin descripción"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categoría: {task.category_id}
            </Typography>
            <Divider sx={{ mt: 1 }} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No hay tareas disponibles.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
