import React from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FabTasks: React.FC = () => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/new-task");
  };

  return (
    <div>
      <Fab
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#0ea5e9",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        aria-label="Agregar tarea"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          style={{ width: "24px", height: "24px", color: "#fff" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Fab>
    </div>
  );
};

export default FabTasks;
