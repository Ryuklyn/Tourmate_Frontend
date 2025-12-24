// import { useState } from "react";
// import Modal from "./Modal";
// import { useNavigate } from "react-router-dom";

// export default function EditTourModal({ tour, onClose }) {
//   const navigate = useNavigate();
//   const [image, setImage] = useState(tour.image);

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) setImage(URL.createObjectURL(file));
//   };

//   const handleSaveChanges = (e) => {
//     e.preventDefault();

//     // ✅ Update logic / API call here
//     console.log("Tour updated");

//     // ✅ Close overlay
//     onClose();

//     // ✅ Navigate back
//     navigate("/dashboard/guide/tourpackages");
//   };

//   return (
//     <Modal
//       title="Edit Tour"
//       subtitle="Make changes to your tour package."
//       onClose={onClose}
//     >
//       <form onSubmit={handleSaveChanges} className="space-y-4">
//         <input
//           defaultValue={tour.title}
//           className="w-full border border-gray-400 rounded-lg px-3 py-2"
//           required
//         />

//         <div className="grid grid-cols-2 gap-3">
//           <input
//             defaultValue={tour.location}
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             required
//           />
//           <input
//             defaultValue={tour.duration}
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <input
//             defaultValue={tour.max}
//             type="number"
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             required
//           />
//           <input
//             defaultValue={tour.price.replace("$", "")}
//             type="number"
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             required
//           />
//         </div>

//         <select
//           defaultValue={tour.status}
//           className="w-full border border-gray-400 rounded-lg px-3 py-2"
//         >
//           <option value="Draft">Draft</option>
//           <option value="Active">Active</option>
//         </select>

//         {/* Image Upload */}
//         <label className="border-2 border-gray-400 border-dashed rounded-lg p-4 cursor-pointer block">
//           <img
//             src={image}
//             alt="Tour"
//             className="h-40 w-full object-cover rounded-lg"
//           />
//           <input type="file" accept="image/*" hidden onChange={handleImage} />
//         </label>

//         <textarea
//           defaultValue={tour.description}
//           rows="3"
//           className="w-full border border-gray-400 rounded-lg px-3 py-2"
//         />

//         <div className="flex justify-end gap-3 pt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-200 rounded-lg"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }



import { useState } from "react";
import Modal from "./Modal";
import { editTour } from "../../../services/tour/tourData";

export default function EditTourModal({ tour, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name: tour.name || "",
    location: tour.location || "",
    duration: tour.duration || "",
    maxGuests: tour.maxGuests || "",
    price: tour.price || "",
    status: tour.status || "DRAFTED",
    description: tour.description || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    tour.tourPic ? `data:image/jpeg;base64,${tour.tourPic}` : ""
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tour", JSON.stringify(form));

    if (imageFile) {
      formData.append("tourPic", imageFile);
    }

    const res = await editTour(tour.id, formData);

    if (res.status === "success") {
      onUpdated(res.data); // update card instantly
      onClose();
    } else {
      alert(res.message || "Update failed");
    }
  };

  return (
    <Modal title="Edit Tour" subtitle="Update your tour details" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="maxGuests"
            type="number"
            value={form.maxGuests}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="DRAFTED">Draft</option>
          <option value="POSTED">Active</option>
        </select>

        {/* Image upload */}
        <label className="border-2 border-dashed rounded-lg p-4 cursor-pointer block">
          {preview && (
            <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border rounded-lg px-3 py-2"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
