import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";
import TextInput from "../../shared/TextInput/TextInput";
import SelectorInput from "../../shared/SelectorInput/SelectorInput";
import { TaskStatus } from "../../../types";

interface TaskFormProps {
  onCancel: () => void;
  onCancelWithEvent: (event: React.MouseEvent<HTMLElement>) => void;
  taskId?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onCancel,
  onCancelWithEvent,
  taskId,
}) => {
  const { categories, handleAddTask, handleEditTask, handleFetchTaskById } =
    useGlobalContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Pendiente");

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        const task = await handleFetchTaskById(taskId);
        if (task) {
          setTitle(task.title ?? "");
          setDescription(task.description ?? "");
          setCategoryId(task.category_id ?? "");
          setStatus(task.completed ? "Terminada" : "Pendiente");
        }
      };

      fetchTask();
    }
  }, [taskId, handleFetchTaskById]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isCompleted = status === "Terminada";
    if (taskId) {
      handleEditTask(taskId, {
        title,
        description,
        category_id: categoryId,
        completed: isCompleted,
      });
    } else {
      handleAddTask({
        title,
        description,
        category_id: categoryId,
        completed: false,
      });
    }
    onCancel();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "450px",
        padding: "20px",
        bgcolor: "background.paper",
        borderRadius: "4px",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" align="left" sx={{ mb: 2 }}>
        {taskId ? "Editar Tarea" : "Nueva Tarea"}
      </Typography>

      <TextInput
        label="Título"
        placeholder="Ingrese el título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={40}
      />
      <TextInput
        label="Descripción"
        placeholder="Ingrese la descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={100}
      />
      <SelectorInput
        label="Categoría"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value as string)}
        options={categories}
        required
      />
      {taskId && (
        <FormControl variant="outlined" size="small" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Estado
          </Typography>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            required
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Terminada">Terminada</MenuItem>
          </Select>
        </FormControl>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mt: 2,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#1976d2",
            borderColor: "#1976d2",
          }}
          onClick={onCancelWithEvent}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          {taskId ? "Actualizar" : "Crear"}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
