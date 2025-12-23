import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function EditTourModal({ tour, onClose }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(tour.image);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    // ✅ Update logic / API call here
    console.log("Tour updated");

    // ✅ Close overlay
    onClose();

    // ✅ Navigate back
    navigate("/dashboard/guide/tourpackages");
  };

  return (
    <Modal
      title="Edit Tour"
      subtitle="Make changes to your tour package."
      onClose={onClose}
    >
      <form onSubmit={handleSaveChanges} className="space-y-4">
        <input
          defaultValue={tour.title}
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            defaultValue={tour.location}
            className="border border-gray-400 rounded-lg px-3 py-2"
            required
          />
          <input
            defaultValue={tour.duration}
            className="border border-gray-400 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            defaultValue={tour.max}
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            required
          />
          <input
            defaultValue={tour.price.replace("$", "")}
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            required
          />
        </div>

        <select
          defaultValue={tour.status}
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
        </select>

        {/* Image Upload */}
        <label className="border-2 border-gray-400 border-dashed rounded-lg p-4 cursor-pointer block">
          <img
            src={image}
            alt="Tour"
            className="h-40 w-full object-cover rounded-lg"
          />
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </label>

        <textarea
          defaultValue={tour.description}
          rows="3"
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
