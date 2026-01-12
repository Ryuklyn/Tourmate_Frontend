import { Upload, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function CreateTourModal({ onClose }) {
  const [step, setStep] = useState("basic");
  const [image, setImage] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  // ================= DETAILS STATE =================
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [infoInput, setInfoInput] = useState("");

  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [info, setInfo] = useState([]);

  // ================= HANDLERS =================
  const addIncluded = () => {
    if (!includedInput.trim()) return;
    setIncluded([...included, includedInput.trim()]);
    setIncludedInput("");
  };

  const removeIncluded = (index) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const addExcluded = () => {
    if (!excludedInput.trim()) return;
    setExcluded([...excluded, excludedInput.trim()]);
    setExcludedInput("");
  };

  const removeExcluded = (index) => {
    setExcluded(excluded.filter((_, i) => i !== index));
  };

  const addInfo = () => {
    if (!infoInput.trim()) return;
    setInfo([...info, infoInput.trim()]);
    setInfoInput("");
  };

  const removeInfo = (index) => {
    setInfo(info.filter((_, i) => i !== index));
  };

  const [stop, setStop] = useState({ time: "", title: "", desc: "" });
  const navigate = useNavigate();

  const handleCreateTour = (e) => {
    e.preventDefault();
    console.log("Tour created");
    onClose();
    navigate("/dashboard/guide/tourpackages");
  };

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

  return (
    <Modal
      title="Create New Tour"
      subtitle="Add a new tour package to your offerings."
      onClose={onClose}
    >
      {/* Outer flex column with max height */}
      <div className="flex flex-col h-[62vh]">
        {/* Tabs (fixed) */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4 text-sm shrink-0">
          {["basic", "itinerary", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStep(tab)}
              className={`flex-1 py-2 rounded-lg font-medium capitalize ${
                step === tab
                  ? "bg-[#0FAF94] shadow text-white font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab === "basic" ? "Basic Info" : tab}
            </button>
          ))}
        </div>

        {/* Scrollable form content */}
        <div className="flex-1 overflow-y-auto pr-1">
          <form
            id="create-tour-form"
            onSubmit={handleCreateTour}
            className="space-y-4"
          >
            {/* ================= BASIC INFO ================= */}
            {step === "basic" && (
              <>
                <label className="block font-medium mb-1">Tour Name</label>
                <input
                  className="w-full border border-gray-400 rounded-lg px-3 py-2"
                  placeholder="Enter tour name"
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                      className="border border-gray-400 rounded-lg px-3 py-2 w-full"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Duration</label>
                    <input
                      className="border border-gray-400 rounded-lg px-3 py-2 w-full"
                      placeholder="e.g. 4 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Max Guests</label>
                    <input
                      type="number"
                      className="border border-gray-400 rounded-lg px-3 py-2 w-full"
                      placeholder="Max Guests"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Price ($)</label>
                    <input
                      type="number"
                      className="border border-gray-400 rounded-lg px-3 py-2 w-full"
                      placeholder="Price ($)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Status</label>
                  <select className="w-full border border-gray-400 rounded-lg px-3 py-2">
                    <option>Draft</option>
                    <option>Active</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block font-medium mb-2">Tour Image</label>
                  <label className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer block">
                    {image ? (
                      <img
                        src={image}
                        className="h-40 w-full object-cover rounded-lg"
                        alt="Tour preview"
                      />
                    ) : (
                      <>
                        <Upload className="mx-auto mb-2 text-emerald-500" />
                        <p>Click to upload</p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-2">
                    Tour Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-400 rounded-lg px-3 py-2"
                    placeholder="Describe your tour experience..."
                  />
                </div>
              </>
            )}

            {/* ================= ITINERARY ================= */}
            {step === "itinerary" && (
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Add Itinerary Stop</h3>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Time (e.g., 09:00 AM)"
                    value={stop.time}
                    onChange={(e) => setStop({ ...stop, time: e.target.value })}
                  />
                  <input
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Location/Title"
                    value={stop.title}
                    onChange={(e) =>
                      setStop({ ...stop, title: e.target.value })
                    }
                  />
                </div>

                <input
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Description (optional)"
                  value={stop.desc}
                  onChange={(e) => setStop({ ...stop, desc: e.target.value })}
                />

                {/* Add Button */}
                <button
                  type="button"
                  onClick={addStop}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
                >
                  <span className="text-lg leading-none">+</span>
                  Add Stop
                </button>

                {/* ================= EMPTY STATE ================= */}
                {itinerary.length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    <p className="text-sm font-medium">
                      No itinerary stops added yet
                    </p>
                    <p className="text-xs mt-1">
                      Add stops to show the tour timeline
                    </p>
                  </div>
                )}

                {/* ================= ITINERARY LIST ================= */}
                {itinerary.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Tour Itinerary
                    </h4>

                    {itinerary.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
                      >
                        <div className="flex items-start gap-3">
                          {/* Number Circle */}
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center font-medium">
                            {i + 1}
                          </div>

                          {/* Text */}
                          <div>
                            <p className="text-sm font-medium text-emerald-600">
                              {item.time} — {item.title}
                            </p>
                            {item.desc && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Delete */}
                        <Trash2
                          size={16}
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                          onClick={() => removeStop(i)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= DETAILS ================= */}
            {step === "details" && (
              <div className="space-y-6">
                {/* ========== WHAT'S INCLUDED ========== */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">What's Included</h3>

                  <div className="flex items-center gap-3">
                    <input
                      className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g., Professional licensed guide"
                      value={includedInput}
                      onChange={(e) => setIncludedInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addIncluded}
                      className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:text-emerald-600"
                    >
                      +
                    </button>
                  </div>

                  {included.length > 0 && (
                    <ul className="space-y-2">
                      {included.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between bg-green-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                        >
                          <span>{item}</span>
                          <Trash2
                            size={14}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeIncluded(i)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ========== NOT INCLUDED ========== */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Not Included</h3>

                  <div className="flex items-center gap-3">
                    <input
                      className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g., Food and drinks"
                      value={excludedInput}
                      onChange={(e) => setExcludedInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addExcluded}
                      className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:text-emerald-600"
                    >
                      +
                    </button>
                  </div>

                  {excluded.length > 0 && (
                    <ul className="space-y-2">
                      {excluded.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between bg-red-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                        >
                          <span>{item}</span>
                          <Trash2
                            size={14}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeExcluded(i)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ========== IMPORTANT INFO ========== */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Important Information</h3>

                  <div className="flex items-center gap-3">
                    <input
                      className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g., Comfortable walking shoes required"
                      value={infoInput}
                      onChange={(e) => setInfoInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addInfo}
                      className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:text-emerald-600"
                    >
                      +
                    </button>
                  </div>

                  {info.length > 0 && (
                    <ul className="space-y-2">
                      {info.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between bg-yellow-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                        >
                          <span>{item}</span>
                          <Trash2
                            size={14}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeInfo(i)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* ================= FIXED FOOTER ================= */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-tour-form"
            className="px-4 py-2 bg-[#0FAF94] text-white rounded-lg"
          >
            Create Tour
          </button>
        </div>
      </div>
    </Modal>
  );
}
