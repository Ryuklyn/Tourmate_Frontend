// import { Upload } from "lucide-react";
// import { useState } from "react";
// import Modal from "./Modal";
// import { useNavigate } from "react-router-dom";

// export default function CreateTourModal({ onClose }) {
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleCreateTour = (e) => {
//     e.preventDefault();

//     // 1️⃣ API call / save logic
//     console.log("Tour created");

//     onClose();

//     // 2️⃣ Navigate back
//     navigate("/dashboard/guide/tourpackages");
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) setImage(URL.createObjectURL(file));
//   };

//   return (
//     <Modal
//       title="Create New Tour"
//       subtitle="Add a new tour package to your offerings."
//       onClose={onClose}
//     >
//       <form onSubmit={handleCreateTour} className="space-y-4">
//         <input
//           className="w-full border border-gray-400 rounded-lg px-3 py-2"
//           placeholder="Enter tour name"
//           required
//         />

//         <div className="grid grid-cols-2 gap-3">
//           <input
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             placeholder="City, Country"
//             required
//           />
//           <input
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             placeholder="e.g. 4 hours"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <input
//             type="number"
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             placeholder="Max Guests"
//             required
//           />
//           <input
//             type="number"
//             className="border border-gray-400 rounded-lg px-3 py-2"
//             placeholder="Price ($)"
//             required
//           />
//         </div>

//         <select className="w-full border border-gray-400 rounded-lg px-3 py-2">
//           <option value="Draft">Draft</option>
//           <option value="Active">Active</option>
//         </select>

//         {/* Image Upload */}
//         <label className="border-2 border-gray-400 border-dashed rounded-lg p-6 text-center cursor-pointer block">
//           {image ? (
//             <img
//               src={image}
//               alt="Preview"
//               className="h-40 w-full object-cover rounded-lg"
//             />
//           ) : (
//             <>
//               <Upload className="mx-auto mb-2 text-emerald-500" />
//               <p>Click to upload image</p>
//               <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
//             </>
//           )}
//           <input type="file" accept="image/*" hidden onChange={handleImage} />
//         </label>

//         <textarea
//           rows="3"
//           className="w-full border border-gray-400 rounded-lg px-3 py-2"
//           placeholder="Describe your tour experience..."
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
//             Create Tour
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }


import { Upload } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { createTour } from "../../../services/tour/tourData";

export default function CreateTourModal({ onClose, onTourCreated }) {
  const [status, setStatus] = useState("DRAFTED");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [tourPic, setTourPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setTourPic(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !description || !location) {
      alert("Please fill in all required fields");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    const tourObj = {
      name,
      description,
      location,
      price: Number(price),
      duration,
      maxGuests: Number(maxGuests),
      status,
    };
  
    formData.append("tour", JSON.stringify(tourObj));
    if (tourPic) formData.append("tourPic", tourPic);
  
    try {
      const res = await createTour(formData);
      if (res.status === "success") {
        alert(res.message);
        onTourCreated?.(res.data);

        onClose();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create tour");
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <Modal
      title="Create New Tour"
      subtitle="Add a new tour package to your offerings."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          type="text"
          placeholder="Tour Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="e.g. 4 hours"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Max Guests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
          <input
            type="number"
            className="border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <select
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="DRAFTED">Draft</option>
          <option value="POSTED">Active</option>
        </select>

        {/* Image Upload */}
        <label className="border-2 border-gray-400 border-dashed rounded-lg p-6 text-center cursor-pointer block">
          {tourPic ? (
            <img
              src={URL.createObjectURL(tourPic)}
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
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
        </label>

        <textarea
          rows="3"
          className="w-full border border-gray-400 rounded-lg px-3 py-2"
          placeholder="Describe your tour experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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




