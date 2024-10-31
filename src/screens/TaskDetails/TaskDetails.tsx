import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../utilities/hooks/useGlobalContext";
import EditTaskModal from "../../components/shared/EditTaskModal/EditTaskModal";
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
    <EditTaskModal
      open={openEditModal}
      onClose={handleCloseEditModal}
      taskId={id}
    />
  );
};

export default TaskDetails;
