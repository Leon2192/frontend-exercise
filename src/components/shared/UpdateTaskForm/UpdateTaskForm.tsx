import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useGlobalContext } from "../../../utilities/hooks/useGlobalContext";
import TextInput from "../../ui/TextInput/TextInput";
import SelectorInput from "../../ui/SelectorInput/SelectorInput";

interface UpdateTaskFormProps {
  taskId: string;
  onCancel: () => void;
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  taskId,
  onCancel,
}) => {
  const { categories, handleEditTask, handleFetchTaskById } =
    useGlobalContext();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      const task = await handleFetchTaskById(taskId);
      if (task) {
        setTitle(task.title ?? "");
        setDescription(task.description ?? "");
        setCategoryId(task.category_id ?? "");
      }
    };

    fetchTask();
  }, [taskId, handleFetchTaskById]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleEditTask(taskId, {
      title,
      description,
      category_id: categoryId,
    });
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
        Editar Tarea
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
          onClick={onCancel}
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
          Actualizar
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateTaskForm;
