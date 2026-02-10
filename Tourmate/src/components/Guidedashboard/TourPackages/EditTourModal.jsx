import { Upload, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { editTour } from "../../../services/tour/tourData";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/axiosInterceptor";

export default function EditTourModal({ tour, onClose, onUpdated }) {
  const navigate = useNavigate();

  // ===== BASIC INFO =====
  const [name, setName] = useState(tour.name || "");
  const [location, setLocation] = useState(tour.location || "");
  const [duration, setDuration] = useState(tour.duration || "");
  const [maxGuests, setMaxGuests] = useState(tour.maxGuests || "");
  const [price, setPrice] = useState(tour.price || "");
  const [status, setStatus] = useState(tour.status || "DRAFTED");
  const [description, setDescription] = useState(tour.description || "");

  // ===== IMAGE =====
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    tour.tourPic ? `data:image/jpeg;base64,${tour.tourPic}` : ""
  );

  // ===== UI =====
  const [step, setStep] = useState("basic");
  const [loading, setLoading] = useState(false);

  // ===== ITINERARY =====
  const [itineraries, setItineraries] = useState(tour.itineraries || []);
  const [stop, setStop] = useState({
    time: "",
    title: "",
    description: ""
  });

  // ===== DETAILS =====
  const [included, setIncluded] = useState(tour.included || []);
  const [notIncluded, setNotIncluded] = useState(tour.notIncluded || []);
  const [importantInformation, setImportantInformation] =
    useState(tour.importantInformation || []);
  const [languagesEnum, setLanguagesEnum] = useState([]);
  const [categoriesEnum, setCategoriesEnum] = useState([]);
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [infoInput, setInfoInput] = useState("");

  /* ================= ENUM SELECTION ================= */
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [langOpen, setLangOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  /* ================= HELPERS ================= */

useEffect(() => {
  const fetchEnums = async () => {
    try {
      const [langsRes, catsRes] = await Promise.all([
        api.get("/user/enums/languages"),
        api.get("/user/enums/categories"),
      ]);

      const mapEnum = (arr) =>
        arr.map(v => ({
          value: v,
          label: v
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase()),
        }));

      const langs = mapEnum(langsRes.data);
      const cats = mapEnum(catsRes.data);

      setLanguagesEnum(langs);
      setCategoriesEnum(cats);

      /* ===== PRESELECT FROM TOUR ===== */
      if (tour) {
        setSelectedLanguages(
          langs.filter(l => tour.languages?.includes(l.value))
        );

        setSelectedCategories(
          cats.filter(c => tour.categories?.includes(c.value))
        );
      }

    } catch (err) {
      console.error("Failed to fetch enums", err);
    }
  };

  fetchEnums();
}, [tour]);
  

  const toggleItem = (item, setter) => {
    setter(prev =>
      prev.some(i => i.value === item.value)
        ? prev.filter(i => i.value !== item.value)
        : [...prev, item]
    );
  };

  // ===== HANDLERS =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const addStop = () => {
    if (!stop.time || !stop.title) return;

    setItineraries([
      ...itineraries,
      {
        ...stop,
        stepNumber: itineraries.length + 1
      }
    ]);

    setStop({ time: "", title: "", description: "" });
  };

  const removeStop = (index) => {
    const updated = itineraries
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, stepNumber: i + 1 }));

    setItineraries(updated);
  };

  const addItem = (value, setter, reset) => {
    if (!value.trim()) return;
    setter((prev) => [...prev, value.trim()]);
    reset("");
  };

  const removeItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== SUBMIT =====
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTour = {
      name,
      location,
      duration,
      maxGuests: Number(maxGuests),
      price: Number(price),
      status,
      description,
      itineraries,
      included,
      notIncluded,
      importantInformation,
      languages: selectedLanguages.map(l => l.value),   // ✅
      categories: selectedCategories.map(c => c.value), // ✅
    };

    const formData = new FormData();
    formData.append("tour", JSON.stringify(updatedTour));
    if (imageFile) formData.append("tourPic", imageFile);

    try {
      const res = await editTour(tour.id, formData);
      if (res.status === "success") {
        onUpdated?.(res.data);
        onClose();
        navigate("/dashboard/guide/tourpackages");
      } else {
        alert(res.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Tour"
      subtitle="Update your tour package details."
      onClose={onClose}
    >
      <div className="flex flex-col h-[62vh]">

        {/* ===== TABS (MATCHED) ===== */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4 text-sm shrink-0">
          {["basic", "itinerary", "details"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStep(tab)}
              className={`flex-1 py-2 rounded-lg font-medium capitalize transition ${step === tab
                ? "bg-[#0FAF94] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
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

            {/* ===== BASIC ===== */}
            {step === "basic" && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm"
                  placeholder="Tour Name"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 text-sm"
                    placeholder="Location"
                  />
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 text-sm"
                    placeholder="Duration"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 text-sm"
                    placeholder="Max Guests"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-400 rounded-lg px-3 py-2 text-sm"
                    placeholder="Price"
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="DRAFTED">Draft</option>
                  <option value="POSTED">Active</option>
                </select>

                {/* Image */}
                <label className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer block">
                  {preview ? (
                    <img
                      src={preview}
                      className="h-40 w-full object-cover rounded-lg"
                      alt="Preview"
                    />
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 text-emerald-500" />
                      <p className="text-sm">Click to upload</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm"
                  placeholder="Tour description"
                />
              </>
            )}

            {/* ===== ITINERARY ===== */}
            {step === "itinerary" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    placeholder="Time"
                    value={stop.time}
                    onChange={(e) =>
                      setStop({ ...stop, time: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                  />
                  <input
                    placeholder="Title"
                    value={stop.title}
                    onChange={(e) =>
                      setStop({ ...stop, title: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                  />
                </div>

                <input
                  placeholder="Description"
                  value={stop.description}
                  onChange={(e) =>
                    setStop({ ...stop, description: e.target.value })
                  }

                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={addStop}
                  className="text-sm text-emerald-600"
                >
                  + Add Stop
                </button>

                {itineraries.map((item, i) => (
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
                {/* Languages */}
                <div className="relative space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Languages</h3>

                  <div
                    onClick={() => setLangOpen(!langOpen)}
                    className="border border-gray-300 rounded-xl px-4 py-2 cursor-pointer flex justify-between items-center text-sm bg-white"
                  >
                    <span className="text-gray-600 truncate">
                      {selectedLanguages.length
                        ? selectedLanguages.map(l => l.label).join(", ")
                        : "Select languages"}
                    </span>
                    <span className="text-gray-400">{langOpen ? "▲" : "▼"}</span>
                  </div>

                  {langOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-sm max-h-52 overflow-y-auto">
                      {languagesEnum.map(lang => (
                        <div
                          key={lang.value}
                          onClick={() => toggleItem(lang, setSelectedLanguages)}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selectedLanguages.some(l => l.value === lang.value)
                              ? "bg-gray-100 font-medium"
                              : ""
                            }`}
                        >
                          {lang.label}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedLanguages.map(lang => (
                      <div
                        key={lang.value}
                        className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{lang.label}</span>
                        <X
                          size={14}
                          className="cursor-pointer text-gray-500 hover:text-red-500"
                          onClick={() => toggleItem(lang, setSelectedLanguages)}
                        />
                      </div>
                    ))}
                  </div>
                </div>


                {/* Categories */}
                <div className="relative space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Tour Categories</h3>

                  <div
                    onClick={() => setCatOpen(!catOpen)}
                    className="border border-gray-300 rounded-xl px-4 py-2 cursor-pointer flex justify-between items-center text-sm bg-white"
                  >
                    <span className="text-gray-600 truncate">
                      {selectedCategories.length
                        ? selectedCategories.map(c => c.label).join(", ")
                        : "Select categories"}
                    </span>
                    <span className="text-gray-400">{catOpen ? "▲" : "▼"}</span>
                  </div>

                  {catOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-sm max-h-52 overflow-y-auto">
                      {categoriesEnum.map(cat => (
                        <div
                          key={cat.value}
                          onClick={() => toggleItem(cat, setSelectedCategories)}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selectedCategories.some(c => c.value === cat.value)
                              ? "bg-gray-100 font-medium"
                              : ""
                            }`}
                        >
                          {cat.label}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <div
                        key={cat.value}
                        className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{cat.label}</span>
                        <X
                          size={14}
                          className="cursor-pointer text-gray-500 hover:text-red-500"
                          onClick={() => toggleItem(cat, setSelectedCategories)}
                        />
                      </div>
                    ))}
                  </div>
                </div>


                {[
                  ["What's Included", included, setIncluded, includedInput, setIncludedInput, "bg-green-50"],
                  ["Not Included", notIncluded, setNotIncluded, excludedInput, setExcludedInput, "bg-red-50"],
                  ["Important Info", importantInformation, setImportantInformation, infoInput, setInfoInput, "bg-yellow-50"],
                ]
                  .map(([label, list, setList, input, setInput, bg]) => (
                    <div key={label} className="space-y-3">
                      <h3 className="text-sm font-medium">{label}</h3>

                      <div className="flex gap-3">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1 border rounded-xl px-4 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => addItem(input, setList, setInput)}
                          className="w-10 h-10 border rounded-xl"
                        >
                          +
                        </button>
                      </div>

                      {list.map((item, i) => (
                        <div
                          key={i}
                          className={`flex justify-between px-4 py-2 border rounded-lg ${bg}`}
                        >
                          <span className="text-sm">{item}</span>
                          <Trash2
                            size={14}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeItem(setList, i)}
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
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-tour-form"
            disabled={loading}
            className="px-4 py-2 bg-[#0FAF94] text-white rounded-lg text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
