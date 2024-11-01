import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/ui/TaskForm/TaskForm";
import { Modal } from "@mui/material";

const NewTask: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleCloseClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
      navigate("/");
    }
  };

  const handleCloseCancel = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseClickOutside}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        onClick={handleCloseClickOutside}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <TaskForm
          onCancel={handleCloseCancel}
          onCancelWithEvent={handleCloseClickOutside}
        />
      </div>
    </Modal>
  );
};

export default NewTask;
