import { Upload } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function CreateTourModal({ onClose }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCreateTour = (e) => {
    e.preventDefault();

    // 1️⃣ API call / save logic
    console.log("Tour created");

    onClose();

    // 2️⃣ Navigate back
    navigate("/dashboard/guide/tourpackages");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <Modal
      title="Create New Tour"
      subtitle="Add a new tour package to your offerings."
      onClose={onClose}
    >
      <form onSubmit={handleCreateTour} className="space-y-4">
        <input
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          placeholder="Enter tour name"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="City, Country"
            required
          />
          <input
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="e.g. 4 hours"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Max Guests"
            required
          />
          <input
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Price ($)"
            required
          />
        </div>

        <select className="w-full border border-gray-400 rounded-lg px-3 py-2">
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
        </select>

        {/* Image Upload */}
        <label className="border-2 border-gray-400 border-dashed rounded-lg p-6 text-center cursor-pointer block">
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="h-40 w-full object-cover rounded-lg"
            />
          ) : (
            <>
              <Upload className="mx-auto mb-2 text-emerald-500" />
              <p>Click to upload image</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </>
          )}
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </label>

        <textarea
          rows="3"
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          placeholder="Describe your tour experience..."
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
            Create Tour
          </button>
        </div>
      </form>
    </Modal>
  );
}
