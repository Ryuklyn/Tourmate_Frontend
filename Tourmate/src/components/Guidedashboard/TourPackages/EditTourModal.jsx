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

import { Upload, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function EditTourModal({ tour, onClose }) {
  const navigate = useNavigate();

  const [step, setStep] = useState("basic");
  const [image, setImage] = useState(tour.image);

  // ===== BASIC INFO =====
  const [title, setTitle] = useState(tour.title);
  const [location, setLocation] = useState(tour.location);
  const [duration, setDuration] = useState(tour.duration);
  const [maxGuests, setMaxGuests] = useState(tour.max);
  const [price, setPrice] = useState(tour.price.replace("$", ""));
  const [status, setStatus] = useState(tour.status);
  const [description, setDescription] = useState(tour.description);

  // ===== ITINERARY =====
  const [itinerary, setItinerary] = useState(tour.itinerary || []);
  const [stop, setStop] = useState({ time: "", title: "", desc: "" });

  // ===== DETAILS =====
  const [included, setIncluded] = useState(tour.included || []);
  const [excluded, setExcluded] = useState(tour.excluded || []);
  const [info, setInfo] = useState(tour.info || []);

  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [infoInput, setInfoInput] = useState("");

  // ===== HANDLERS =====
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const addStop = () => {
    if (!stop.time || !stop.title) return;
    setItinerary([...itinerary, stop]);
    setStop({ time: "", title: "", desc: "" });
  };

  const removeStop = (index) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const addItem = (value, list, setList, reset) => {
    if (!value.trim()) return;
    setList([...list, value.trim()]);
    reset("");
  };

  const removeItem = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const updatedTour = {
      title,
      location,
      duration,
      maxGuests,
      price,
      status,
      description,
      itinerary,
      included,
      excluded,
      info,
      image,
    };

    console.log("Updated Tour:", updatedTour);

    onClose();
    navigate("/dashboard/guide/tourpackages");
  };

  return (
    <Modal
      title="Edit Tour"
      subtitle="Update your tour package details."
      onClose={onClose}
    >
      <div className="flex flex-col h-[62vh]">
        {/* ===== TABS ===== */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4 text-sm shrink-0">
          {["basic", "itinerary", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStep(tab)}
              className={`flex-1 py-2 rounded-lg capitalize ${
                step === tab
                  ? "bg-[#0FAF94] text-white shadow"
                  : "text-gray-500"
              }`}
            >
              {tab === "basic" ? "Basic Info" : tab}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 overflow-y-auto pr-1">
          <form
            id="edit-tour-form"
            onSubmit={handleSaveChanges}
            className="space-y-4"
          >
            {/* ===== BASIC INFO ===== */}
            {step === "basic" && (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2"
                  />
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2"
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                >
                  <option>Draft</option>
                  <option>Active</option>
                </select>

                {/* Image */}
                <label className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer block">
                  {image ? (
                    <img
                      src={image}
                      className="h-40 w-full object-cover rounded-lg"
                      alt="Tour"
                    />
                  ) : (
                    <Upload className="mx-auto text-emerald-500" />
                  )}
                  <input type="file" hidden onChange={handleImage} />
                </label>

                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                />
              </>
            )}

            {/* ===== ITINERARY ===== */}
            {step === "itinerary" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Time"
                    value={stop.time}
                    onChange={(e) => setStop({ ...stop, time: e.target.value })}
                    className="border border-gray-300 rounded-xl px-4 py-2"
                  />
                  <input
                    placeholder="Title"
                    value={stop.title}
                    onChange={(e) =>
                      setStop({ ...stop, title: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl px-4 py-2"
                  />
                </div>

                <input
                  placeholder="Description"
                  value={stop.desc}
                  onChange={(e) => setStop({ ...stop, desc: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                />

                <button
                  type="button"
                  onClick={addStop}
                  className="text-sm text-emerald-600"
                >
                  + Add Stop
                </button>

                {itinerary.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-50 border rounded-xl px-4 py-3"
                  >
                    <p className="text-sm font-medium">
                      {item.time} — {item.title}
                    </p>
                    <Trash2
                      size={16}
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeStop(i)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ===== DETAILS ===== */}
            {step === "details" && (
              <div className="space-y-6">
                {[
                  {
                    title: "What's Included",
                    list: included,
                    setList: setIncluded,
                    input: includedInput,
                    setInput: setIncludedInput,
                    bg: "bg-green-50",
                  },
                  {
                    title: "Not Included",
                    list: excluded,
                    setList: setExcluded,
                    input: excludedInput,
                    setInput: setExcludedInput,
                    bg: "bg-red-50",
                  },
                  {
                    title: "Important Info",
                    list: info,
                    setList: setInfo,
                    input: infoInput,
                    setInput: setInfoInput,
                    bg: "bg-yellow-50",
                  },
                ].map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-medium">{section.title}</h3>
                    <div className="flex gap-3">
                      <input
                        className="flex-1 border rounded-xl px-4 py-2"
                        value={section.input}
                        onChange={(e) => section.setInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          addItem(
                            section.input,
                            section.list,
                            section.setList,
                            section.setInput
                          )
                        }
                        className="w-10 h-10 border rounded-xl"
                      >
                        +
                      </button>
                    </div>

                    {section.list.map((item, i) => (
                      <div
                        key={i}
                        className={`flex justify-between px-4 py-2 border rounded-lg ${section.bg}`}
                      >
                        <span className="text-sm">{item}</span>
                        <Trash2
                          size={14}
                          className="text-red-500 cursor-pointer"
                          onClick={() =>
                            removeItem(i, section.list, section.setList)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex justify-end gap-3 pt-4 border-t bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-tour-form"
            className="px-4 py-2 bg-[#0FAF94] text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
