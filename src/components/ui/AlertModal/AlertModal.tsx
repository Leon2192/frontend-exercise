import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface AlertSnackbarProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  onClose,
  title,
  content,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000} // Duración de 2 segundos
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posición de la alerta
    >
      <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
        <strong>{title}</strong>: {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
