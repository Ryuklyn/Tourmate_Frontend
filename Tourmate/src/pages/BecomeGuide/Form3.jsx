import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StepProgress from "./StepProgress";

export default function Form3() {
  const navigate = useNavigate();

  // States
  const [specializations, setSpecializations] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");

  const allSpeciality = [
    "Historical Tours",
    "Cultural Experiences",
    "Adventure Tours",
    "Food & Culinary Tours",
    "Nature & Wildlife Tours",
    "City Sightseeing",
    "Photography Tours",
    "Custom Private Tours",
    "Hiking & Trekking",
    "Religious & Spiritual Tours",
    "Eco-Tourism",
    "Luxury Tours",
  ];

  const [selectedSpeciality, setSelectedSpeciality] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleSpeciality = (spec) => {
    if (selectedSpeciality.includes(spec)) {
      setSelectedSpeciality(selectedSpeciality.filter((s) => s !== spec));
    } else {
      setSelectedSpeciality([...selectedSpeciality, spec]);
    }
  };

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center w-full py-10 px-4">
      {/* ------------------ STEP PROGRESS ------------------ */}
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={3} // change dynamically
      />
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6 relative">
        {/* ------------------ HEADING ------------------ */}
        <h1 className="text-3xl font-bold text-gray-900">Skills & Expertise</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Tell us about your specialties and experience
        </p>

        {/* ------------------ FORM AREA ------------------ */}
        <div className="space-y-6">
          {/* Tour Specializations */}
          <div className="relative w-full">
            <label className="block font-medium text-gray-700 mb-2">
              Tour Specializations
            </label>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <span className="text-gray-600">
                {selectedSpeciality.length > 0
                  ? selectedSpeciality.join(", ")
                  : "Select your specialties..."}
              </span>
              {/* <span className="text-gray-500">{open ? "▲" : "▼"}</span> */}
              <span className="text-gray-500">{open ? "▲" : "▼"}</span>
            </div>

            {open && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {allSpeciality.map((spec) => (
                  <div
                    key={spec}
                    onClick={() => toggleSpeciality(spec)}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedSpeciality.includes(spec)
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                  >
                    {spec}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSpeciality.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  <span>{spec}</span>
                  <X
                    size={16}
                    className="ml-2 cursor-pointer"
                    onClick={() => toggleSpeciality(spec)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Hourly Rate (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 50"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>

          {/* Professional Bio */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Professional Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              maxLength={500}
              placeholder="Tell travelers about yourself, your experience, and what makes your tours special..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className="text-right text-gray-400 text-sm">
              {bio.length}/500 characters
            </p>
          </div>
        </div>

        {/* ------------------ BUTTONS ------------------ */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/dashboard/become-guide/form2")}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={() => navigate("/dashboard/become-guide/form4")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
