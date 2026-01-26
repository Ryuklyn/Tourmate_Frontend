import { Upload, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { createTour } from "../../../services/tour/tourData";
import axios from "axios";
import CONFIG from "../../../../config";
export default function CreateTourModal({ onClose, onTourCreated }) {
  const navigate = useNavigate();

  /* ================= BASIC INFO ================= */
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("DRAFTED");
  const [description, setDescription] = useState("");
  const [tourPic, setTourPic] = useState(null);

  /* ================= UI ================= */
  const [step, setStep] = useState("basic");
  const [loading, setLoading] = useState(false);

  /* ================= ITINERARY ================= */
  const [itineraries, setItinerary] = useState([]);
  const [stop, setStop] = useState({
    time: "",
    title: "",
    description: ""
  });

  /* ================= DETAILS ================= */
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [infoInput, setInfoInput] = useState("");
  const [languagesEnum, setLanguagesEnum] = useState([]);
  const [categoriesEnum, setCategoriesEnum] = useState([]);


  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [info, setInfo] = useState([]);

  /* ================= ENUM SELECTION ================= */
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [langOpen, setLangOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  /* ================= HELPERS ================= */
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    const fetchEnums = async () => {
      try {
        const [langsRes, catsRes] = await Promise.all([
          axios.get(`${CONFIG.API_URL}/user/enums/languages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${CONFIG.API_URL}/user/enums/categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const mapEnum = (arr) =>
          arr.map(v => ({
            value: v,
            label: v
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\b\w/g, c => c.toUpperCase()),
          }));

        setLanguagesEnum(mapEnum(langsRes.data));
        setCategoriesEnum(mapEnum(catsRes.data));
      } catch (err) {
        console.error("Failed to fetch enums", err);
      }
    };
    fetchEnums();
  }, []);

  const toggleItem = (item, setter) => {
    setter(prev =>
      prev.some(i => i.value === item.value)
        ? prev.filter(i => i.value !== item.value)
        : [...prev, item]
    );
  };
  const addStop = () => {
    if (!stop.time || !stop.title) return;
    setItinerary([...itineraries, {
      ...stop,
      stepNumber: itineraries.length + 1
    }]);
    setStop({ time: "", title: "", description: "" });
  };

  const removeStop = (i) => {
    const updated = itineraries
      .filter((_, index) => index !== i)
      .map((item, index) => ({
        ...item,
        stepNumber: index + 1,
      }));

    setItinerary(updated);
  };


  const addItem = (value, setter, reset) => {
    if (!value.trim()) return;
    setter((prev) => [...prev, value.trim()]);
    reset("");
  };

  const removeItem = (setter, i) =>
    setter((prev) => prev.filter((_, index) => index !== i));

  /* ================= SUBMIT ================= */
  const handleCreateTour = async (e) => {
    e.preventDefault();

    if (!name || !location || !description) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const tourObj = {
      name,
      location,
      duration,
      maxGuests: Number(maxGuests),
      price: Number(price),
      status,
      description,
      itineraries,
      included,
      notIncluded: excluded,
      importantInformation: info,
      languages: selectedLanguages.map(l => l.value),   // ✅
      categories: selectedCategories.map(c => c.value), // ✅
    };

    const formData = new FormData();
    formData.append("tour", JSON.stringify(tourObj));
    if (tourPic) formData.append("tourPic", tourPic);

    try {
      const res = await createTour(formData);
      console.log(tourObj);
      if (res.status === "success") {
        onTourCreated?.(res.data);
        onClose();
        navigate("/dashboard/guide/tourpackages");
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
      <div className="flex flex-col h-[62vh]">
        {/* ================= TABS ================= */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4 text-sm shrink-0">
          {["basic", "itineraries", "details"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStep(tab)}
              className={`flex-1 py-2 rounded-lg capitalize font-medium transition ${step === tab
                ? "bg-[#0FAF94] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab === "basic" ? "Basic Info" : tab}
            </button>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto pr-1">
          <form
            id="create-tour-form"
            onSubmit={handleCreateTour}
            className="space-y-4"
          >
            {/* ===== BASIC ===== */}
            {step === "basic" && (
              <>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Tour Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g. 4 hours"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Max Guests"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Price ($)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="DRAFTED">Draft</option>
                  <option value="POSTED">Active</option>
                </select>

                {/* Image */}
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block">
                  {tourPic ? (
                    <img
                      src={URL.createObjectURL(tourPic)}
                      className="h-40 w-full object-cover rounded-lg"
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
                    onChange={(e) => setTourPic(e.target.files[0])}
                  />
                </label>

                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Describe your tour experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            )}

            {/* ===== ITINERARY ===== */}
            {step === "itineraries" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                    type="time"
                    placeholder="Time"
                    value={stop.time}
                    onChange={(e) =>
                      setStop({ ...stop, time: e.target.value })
                    }
                  />
                  <input
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                    placeholder="Title"
                    value={stop.title}
                    onChange={(e) =>
                      setStop({ ...stop, title: e.target.value })
                    }
                  />
                </div>

                <input
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm"
                  placeholder="Description (optional)"
                  value={stop.description}
                  onChange={(e) =>
                    setStop({ ...stop, description: e.target.value })
                  }
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
                    className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <p className="text-sm font-medium text-emerald-600">
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
                  ["Not Included", excluded, setExcluded, excludedInput, setExcludedInput, "bg-red-50"],
                  ["Important Info", info, setInfo, infoInput, setInfoInput, "bg-yellow-50"],
                ].map(([label, list, setter, input, setInput, bg]) => (
                  <div key={label} className="space-y-3">
                    <h3 className="text-sm font-medium">{label}</h3>
                    <div className="flex gap-3">
                      <input
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => addItem(input, setter, setInput)}
                        className="w-10 h-10 border border-gray-300 rounded-xl"
                      >
                        +
                      </button>
                    </div>

                    {list.map((item, i) => (
                      <div
                        key={i}
                        className={`flex justify-between px-4 py-2 border border-gray-200 rounded-lg text-sm ${bg}`}
                      >
                        <span>{item}</span>
                        <Trash2
                          size={14}
                          className="text-red-500 cursor-pointer"
                          onClick={() => removeItem(setter, i)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-tour-form"
            disabled={loading}
            className="px-4 py-2 bg-[#0FAF94] text-white rounded-lg text-sm"
          >
            {loading ? "Creating..." : "Create Tour"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
