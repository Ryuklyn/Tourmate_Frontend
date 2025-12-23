import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function DeleteTourModal({ onClose }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    // ❌ Delete logic / API call here
    console.log("Tour deleted");
    // ❌ Close overlay
    onClose();

    // ❌ Navigate back
    navigate("/dashboard/guide/tourpackages");
  };
  return (
    <Modal
      title="Delete Tour"
      subtitle="Are you sure you want to delete this tour?"
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
