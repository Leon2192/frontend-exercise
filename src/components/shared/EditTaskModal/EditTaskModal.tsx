import React from "react";
import { Modal, Box } from "@mui/material";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string; // ID de la tarea a editar
}

const EditTaskModal: React.FC<EditModalProps> = ({ open, onClose, taskId }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-task-modal-title"
      aria-describedby="edit-task-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <UpdateTaskForm taskId={taskId} onCancel={onClose} />
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
