import { useEffect } from "react";
import { deleteTourById } from "../../../services/tour/tourData";
import Modal from "./Modal";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DeleteTourModal({ tour, onClose, onDeleted }) {
  const handleDelete = async () => {
    if (!tour) return;

    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    const res = await deleteTourById(tour.id);
    if (res.success) {
      toast.success("Tour deleted successfully!");
      onDeleted(tour.id); // notify parent to remove from state
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Modal
      title="Delete Tour"
      subtitle={`Are you sure you want to delete "${tour?.name}"?`}
      onClose={onClose}
    >
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
