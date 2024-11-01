import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../utilities/hooks/useGlobalContext";
import { Modal, Box } from "@mui/material";
import TaskForm from "../../components/ui/TaskForm/TaskForm";

const TaskDetails = () => {
  const { id } = useParams();
  const { handleFetchTaskById } = useGlobalContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handleFetchTaskById(id);
      setOpenEditModal(true);
    }
  }, [id, handleFetchTaskById]);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    navigate("/");
  };

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
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
          <TaskForm onCancel={handleCloseEditModal} taskId={id} />
        </Box>
      </Modal>
    </>
  );
};

export default TaskDetails;
