import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StepProgress from "./StepProgress";
import CONFIG from "../../../config";
import axios from "axios";
import { useBecomeGuide } from "./BecomeGuideContext";

export default function Form3() {
  const navigate = useNavigate();
  const { updateForm } = useBecomeGuide();

  /* ------------------ STATES ------------------ */
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");

  const [enumMap, setEnumMap] = useState([]); 
  // [{ label: "Adventure Tour", value: "ADVENTURE_TOUR" }]

  const [selectedSpeciality, setSelectedSpeciality] = useState([]);
  const [open, setOpen] = useState(false);

  /* ------------------ FETCH ENUMS ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");

    const fetchEnums = async () => {
      try {
        const res = await axios.get(
          `${CONFIG.API_URL}/user/enums/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const mapped = res.data.map(v => ({
          value: v,
          label: v
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase()),
        }));

        setEnumMap(mapped);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchEnums();
  }, []);

  /* ------------------ TOGGLE ------------------ */
  const toggleSpeciality = (spec) => {
    setSelectedSpeciality(prev =>
      prev.includes(spec)
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm("skills", {
      specialities: selectedSpeciality.map(s => s.value), // ✅ ENUM VALUES
      hourlyRate,
      bio,
    });

    navigate("/dashboard/become-guide/form4");
  };

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center py-10 px-4">
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={3}
      />

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6">
        <h1 className="text-3xl font-bold">Skills & Expertise</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Tell us about your specialties and experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ------------------ SPECIALITIES ------------------ */}
          <div className="relative">
            <label className="block font-medium mb-2">
              Tour Specializations
            </label>

            <div
              onClick={() => setOpen(!open)}
              className="border rounded-lg px-4 py-3 cursor-pointer flex justify-between"
            >
              <span className="text-gray-600">
                {selectedSpeciality.length
                  ? selectedSpeciality.map(s => s.label).join(", ")
                  : "Select your specialties..."}
              </span>
              <span>{open ? "▲" : "▼"}</span>
            </div>

            {open && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
                {enumMap.map(spec => (
                  <div
                    key={spec.value}
                    onClick={() => toggleSpeciality(spec)}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedSpeciality.includes(spec)
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                  >
                    {spec.label}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSpeciality.map(spec => (
                <div
                  key={spec.value}
                  className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                >
                  <span>{spec.label}</span>
                  <X
                    size={16}
                    className="ml-2 cursor-pointer"
                    onClick={() => toggleSpeciality(spec)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ------------------ RATE ------------------ */}
          <div>
            <label className="block font-medium mb-2">
              Hourly Rate (USD) 
            </label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>

          {/* ------------------ BIO ------------------ */}
          <div>
            <label className="block font-medium mb-2">
              Professional Bio
            </label>
            <textarea
              rows="5"
              maxLength={500}
              className="w-full border rounded-lg px-4 py-3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className="text-right text-gray-400 text-sm">
              {bio.length}/500
            </p>
          </div>

          {/* ------------------ BUTTONS ------------------ */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={() => navigate("/dashboard/become-guide/form2")}
              className="px-6 py-3 border rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
