import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/ui/TaskForm/TaskForm";
import { Modal } from "@mui/material";

const NewTask: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false); 
    navigate("/"); 
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <TaskForm onCancel={handleClose} />
      </div>
    </Modal>
  );
};

export default NewTask;
